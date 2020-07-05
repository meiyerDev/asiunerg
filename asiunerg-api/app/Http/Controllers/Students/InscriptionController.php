<?php

namespace App\Http\Controllers\Students;

use App\Inscription;
use App\Pedoxa\Project;
use App\Models\Student;
use App\Http\Resources\{
    FormAbsenceStudent,
    StudentMatterInscription
};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class InscriptionController extends Controller
{
    // public function index()
    // {
    //     $inscriptions = Auth::user();
    //     $inscriptions = User::first()->load('inscriptions.section.matter');
    //     return FormAbsenceStudent::make($inscriptions);
    // }

    public function getMatterInscription(Request $request)
    {
        $studentMatter = $request->user()->student->inscriptions->load('section.matter');
    	return StudentMatterInscription::make($studentMatter, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'horario' => 'required|mimes:pdf'
        ]);
        /* Obtener texto de pdf */
        $parser = new \Smalot\PdfParser\Parser();
        $pdf    = $parser->parseFile($request->file('horario'));
        $pages  = $pdf->getPages();

        /* Variables para calcular momentos de busqueda en el archivo */
        $code_save = false;
        $section_save = false;
        $inscriptions = [];

        foreach ($pages as $page) {
            
            $text = explode('\n', $page->getText());
            
            foreach ($text as $l) {
                
                /* validar que sea un horario proveniente de dace */
                if (! strpos($l,"Este documento sin el sello") || strpos($l,"Este documento sin el sello") === 0 )
                {
                    continue;
                }
                
                if (! strpos($l, "D.A.C.E") || strpos($l, "D.A.C.E") === 0 )
                {
                    continue;
                }
                
                if ( strlen($l) < 1 ) {
                    continue;
                }

                if (! strpos($l, "COD. MATERIA") )
                {
                    continue;
                }

                if (! strpos($l, "SCIH - ") )
                {
                    continue;
                }

                /* Convertir el string a un array para facilitar la busqueda */
                $array_init = explode("\t",$l);

                /* convertir en array para mejor tratamiento */
                $i = explode("\n",$array_init[3]);
                /* Obtener la cedula del Horario */
                $c = explode(' C.I.: ', $i[6]);
                $c = intval(explode(' - ', $c[1])[0]);
                
                /* Verificar que el horario le corresponda al estudiante secionado */
                if( Auth::user()->identity != $c )
                {
                    return response()->json([
                        'message' => __('El horario cargado no pertenece a su número de cédula, por favor verificar y cargar uno valido.')
                    ], 422);
                }

                /* verificar si no fue definida la variable periodo */
                if( !isset($period) )
                {
                    /* Obtener el periodo del archivo */
                    $p = explode(": ",$i[9]);
                    $p = explode(" -",$p[1]);
                    $period = $p[0];
                }

                /* iterar el array donde se buscarán los datos */
                foreach ($array_init as $key => $init) {

                    /* Verificar si ya se obtuvo un codigo de materia */
                    /* y si se activo el section_save */
                    if( $section_save && !empty($code_matter) )
                    {
                        /* De ser asi asegurarnos de que se haya */
                        /* saltado un espacio del array */
                        if ( isset($code_index) && $key !== ($code_index + 1) )
                        {
                            /* Obtener la seccion, guardarla en el array */
                            /* junto al codigo de materia y reiniciar las variables */
                            $section_matter = explode("\n", $init)[1];
                            $inscriptions[] = [
                                'code_matter' => $code_matter,
                                'section' => $section_matter
                            ];
                            $section_save = false;
                            $section_matter = null;
                            $code_matter = null;
                        }
                    }
                    
                    /* Verificar si se encuentra en la posición exacta para obtener el codigo de materia */
                    if ( $code_save || ( isset($code_index) && $key === ($code_index + 15) ) )
                    {
                        /* actualizar el code_index para verificacion de la seccion */
                        if(! isset($code_index) || $key === ($code_index + 15) )
                        {
                            $code_index = $key;
                        }
                        
                        /* Obtener codigo de materia del array */
                        $code_matter = explode("\n", $init)[1];
                        $section_save = true;
                        $code_save = false;
                    }
                    
                    /* conocer el inicio del proceso */
                    if ( explode("\n",$init)[0] === "AULA" ) {
                        $code_save = true;
                    }
                }                

            }
        }
        /* convirtiendo el periodo a pedoxa */
        $type_period = $period[4];
        $period_pedoxa = substr($period, 0, -1);
        $period_pedoxa = "$period_pedoxa-$type_period";

        /* Obteniendo ID del ultimo proyecto (PEDOXA) */
        $project = Project::orderBy('created','asc')->get()->last();
        
        /* Verificar si el horario corresponde al periodo actual activo */
        if ( $period_pedoxa != $project->lapso_academico )
        {
            return response()->json([
                'message' => __('El periodo académico del horario cargado no coincide con el activo actual.')
            ], 422);
        }
        
        /* Los encuentros secciones que pertenecen a el */
        $meetSections = $project->meetSectionViews;
        $save_inscriptions = [];
        
        /* el auth student */
        $student = Auth::user()->student;

        /* loop para cargar el array con los datos para registrar la inscripcion */
        foreach ($inscriptions as $inscription) {
            $meet = $meetSections->where('Seccion_nombre',$inscription['section'])->where('Materia_codigo',$inscription['code_matter'])->first();

            $exits_record = Inscription::where('student_id',$student->id)->where('section_id',$meet->Seccion_id)->exists();
            
            if (! $exits_record )
            {
                $save_inscriptions[] = [
                    'student_id' => $student->id,
                    'section_id' => $meet->Seccion_id,
                    'active' => true
                ];
            }
        }
        
        /* Fallar si no hay materias para guardar */
        if ( empty($save_inscriptions) )
        {
            return response()->json([
                'message' => __('No hay materias por guardar.')
            ], 422);
        }

        /* guardando los datos */
        DB::table('inscriptions')->insert($save_inscriptions);
        
        return response()->json([
            'message' => __('Horario cargado con éxito.')
        ], 201);
    }
}
