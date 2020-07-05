<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte de ausencia de profesores</title>
    <style>
        @page {
            margin: 0cm 0cm;
            font-family: Arial;
        }

        body {
            margin: 3cm 2cm 2cm;
        }

        header {
            position: fixed;
            top: 0cm;
            left: 0cm;
            right: 0cm;
            height: 2cm;
            color: white;
            text-align: center;
            line-height: 30px;
        }

        footer {
            position: fixed;
            bottom: 0cm;
            left: 0cm;
            right: 0cm;
            height: 2cm;
            color: white;
            text-align: center;
            line-height: 35px;
        }

        .mt-3 {
            margin-top: 1rem !important;
        }

        .mb-3 {
            margin-bottom: 1rem !important;
        }

        .text-center {
            text-align: center;
        }

        .text-left {
            text-align: left;
        }

        .text-muted {
            color: #8898aa;
        }

        .table {
            width: 100%;
            margin-bottom: 1rem;

            background-color: transparent;
        }

        .table th,
        .table td {
            padding: 1rem;

            vertical-align: top;

            border-top: 1px solid #000000;
        }

        .table thead th {
            vertical-align: bottom;

            border-bottom: 2px solid #000000;
        }

        .table tbody+tbody {
            border-top: 2px solid #000000;
        }

        .table .table {
            background-color: #f8f9fe;
        }

        .table-sm th,
        .table-sm td {
            padding: .5rem;
        }

        .table-bordered {
            border: 1px solid #000000;
        }

        .table-bordered th,
        .table-bordered td {
            border: 1px solid #000000;
        }

        .table-bordered thead th,
        .table-bordered thead td {
            border-bottom-width: 2px;
        }

        .table-striped tbody tr:nth-of-type(odd) {
            background-color: rgba(0, 0, 0, .05);
        }
    </style>
</head>

<body>
    <header>
        <p class="text-center text-muted">REPORTE EMITIDO POR ASIUNERG - {{Carbon\Carbon::now()->format('d-m-Y') }}</p>
    </header>
    <main>
        <div class="text-center mb-3">
            República Bolivariana de Venezuela<br />
            Ministerio del Poder Popular para la Educación Superior<br />
            Universidad Nacional Experimental de los Llanos Centrales "Rómulo Gallegos"<br />
            {{ $matters->last()->department->direction->area->nombre }}
        </div>
        <div class="text-left mt-3">
            Materia: {{ $matters->last()->nombre }}<br />
            Departamento: {{ $matters->last()->department->nombre }}<br />
            Total Materias: {{ $count_matters }}<br />
            Total Secciones Activas: {{ $count_sections }}<br />
            Total Ausencias: {{ $absences->count() }}<br />
        </div>
        <h2 class="text-center">Ausencias de Profesores</h2>
        <table class="table table-sm table-bordered table-striped">
            <thead>
                <tr>
                    <th>NUM</th>
                    <th>CÉDULA</th>
                    <th>NOMBRE</th>
                    <th>SECCIÓN</th>
                    <th>FECHA DE AUSENCIA</th>
                    <th>FECHA INFORMADA</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($absences as $index => $item)
                <tr class="text-center">
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $item->absence->teacher->cedula }}</td>
                    <td>{{ $item->absence->teacher->nombres." ".$item->absence->teacher->apellidos }}</td>
                    <td>{{ $item->absence->section->nombre }}</td>
                    <td>{{ $item->asistent_date->format('d-m-Y') }}</td>
                    <td>{{ $item->created_at->format('d-m-Y') }}</td>
                </tr>
                @empty
                <h3>No hay ausencias informadas</h3>
                @endforelse

            </tbody>
        </table>
    </main>
    <footer>
        <p class="text-center text-muted">REPORTE EMITIDO POR ASIUNERG - {{Carbon\Carbon::now()->format('d-m-Y') }}</p>
    </footer>
</body>

</html>