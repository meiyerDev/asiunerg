<script>
	import ModalComponent from './ui/ModalComponent'
	export default {
		data() {
			return {
				classesData: [],
				classes: [],
				classesSelected: {},
				showModal: false,
				codeFilter: '',
				search: true
			}
		},
		components: {
			ModalComponent
		},
		mounted() {
			this.getClasses()
		},
		methods: {
			async getClasses() {
				const data = (await axios.get('/admin/clases/listado')).data.data
				this.classes = data
				this.classesData = data
			},
			async getClass(id) {
				this.classesSelected = this.classes.filter(classe => classe.id === id)[0]
				this.showModal = true
			},
			async onChangeFilter() {
				if (this.codeFilter !== '') {
					this.classes = this.classesData.filter(classe => classe.matter.code === this.codeFilter)
				}else{
					this.classes = this.classesData
				}
			}
		},
		watch: {
			codeFilter: function(val) {
				this.onChangeFilter()
			}
		}
	}
</script>

<template>
	<div class="row">
        <div class="col-12 mb-2">
            <div class="card shadow">
                <div class="card-body border-0 d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div class="h3">Listado de Clases impartidas</div>
                	<input type="text" class="col-12 col-md-5 col-lg-3 form-control"
                		placeholder="Ingrese código de materia"
                		v-model="codeFilter"
                	>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-1" v-for="classe in classes" :key="classe.id">
            <div class="card shadow">
                <div class="card-header h3 text-center text-uppercase">
                    {{ classe.matter.name }}
                </div>
                <div class="card-body d-flex flex-column">
                	<div class="font-weight-bold">
                		<span class="text-danger">Seccion: </span>{{ classe.matter.section }}
                	</div>
                	<div class="font-weight-bold">Tema:</div>
                	<p class="mb-1">{{ classe.theme }}</p>
                	<div class="mb-2">
                		<span class="text-danger">Fecha:</span> {{ classe.created_at }}
                	</div>
            		<a class="text-right text-primary font-weight-bold text-uppercase mt-2 pointer-event" href="#" @click.prevent="getClass(classe.id)">Ver clase</a>
                </div>
            </div>
        </div>
        <modal-component
        	v-if="showModal"
        	@close="showModal = false"
        >
        	<template v-slot:title>
		        Datos de clase 
		    </template>
		    <template v-slot:body>
		    	<div class="d-flex flex-column">
		    		<div class="font-weight-bold">
		    			Materia:
		    		</div>
		    		<p class="mb-1">{{ classesSelected.matter.name }}</p>
		    		<div class="mb-1">
		    			<span class="font-weight-bold">Sección: </span>{{ classesSelected.matter.section }}
		    		</div>
		    		<div class="mb-1">
		    			<span class="font-weight-bold">Profesor: </span>{{ `${classesSelected.teacher.name} ${classesSelected.teacher.lastname}` }}
		    		</div>
                	<div class="font-weight-bold">Tema:</div>
                	<p class="mb-1">{{ classesSelected.theme }}</p>
                	<div class="font-weight-bold text-danger">Observación:</div>
                	<p class="text-justify mb-1">{{ classesSelected.observation }}</p>
                	<div>
                		<span class="text-danger">Fecha impartida:</span> {{ classesSelected.created_at }}
                	</div>
            	</div>
		    </template>
        </modal-component>	
    </div>
</template>