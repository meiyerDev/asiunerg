<script>
    import FormModalStudent from './ui/FormModalStudent';
	import ModalStudentMatter from './ui/ModalStudentMatter';
	export default {
		data() {
			return {
				showModalCreate: false,
				showModalUpdate: false,
                showModalMatter: false,
				students: [],
				editStudent: null,
                loadExcel: false,
			}
		},
		components: {
			FormModalStudent,
            ModalStudentMatter
		},
        mounted(){
            this.getStudents();
        },
		methods:{
			async getStudents(type = 'current') {
				let url = `/admin/estudiantes`;
				if(type === 'next'){
					url = `/admin/estudiantes?page=${this.currentPage + 1}`;
				}else if(type === 'prev'){
					url = `/admin/estudiantes?page=${this.currentPage - 1}`;
				}
				const response = (await axios.get(url)).data;
				this.students = response.data;
				this.currentPage = response.current_page;
			},
            async getStudent(id, type) {
                const response = (await axios.get(`/admin/estudiantes/${id}/edit`)).data;
                this.editStudent = response;
                if(type === 'edit') {
                    this.showModalUpdate = true;
                }
                if(type === 'matter'){
                    this.showModalMatter = true;
                }
            },
            async deleteStudent(id) {
                this.warnToast({ message: 'Eliminando estudiante.' });
                const response = await axios.delete(`/admin/estudiantes/${id}`);
                if(response.status === 200){
                    this.getStudents();
                    this.successToast({ message: `${response.data.message}` });
                }
            },
            async newStudent(form) {
                this.successToast({ message: 'Registrando estudiante.' });
                const response = await axios.post('/admin/estudiantes',form);
                if(response.status === 201) {
                    this.students.unshift(response.data.data);
                    this.showModalCreate = false;
                    this.successToast({ message: `${response.data.message}` });
                }
            },
            async updateStudent(form) {
                this.successToast({ message: 'Actualizando datos.' });
                const response = await axios.put(`/admin/estudiantes/${form.id}`,form);
                if(response.status === 200){
                    this.editStudent = null;
                    this.showModalUpdate = false;
                    this.getStudents();
                    this.successToast({ message: `${response.data.message}` });
                }
            },
            postExcel(e) {
                const file = e.target.files[0];
                let formData = new FormData();
                formData.append('excel_student', file);
                this.loadExcel = true;
                this.successToast({ message: 'Subiendo Archivo.' });
                axios.post('/admin/estudiantes/nuevo/excel',formData)
                    .then(response => {
                        this.getStudents();
                        this.successToast({ message: `${response.data.message}` });
                    })
                    .catch(error => {
                        this.errorToast({ message: `${error.response.data.message}` });
                    });
                e.target.value = '';
                this.loadExcel = false;
            },
            pickFile() {
                this.$refs.excel.click();
            },
		},
        notifications: {
            errorToast: {
                // You can have any name you want instead of 'showLoginError'
                title: "Error",
                message: "",
                type: "error" // You also can use 'VueNotifications.types.error' instead of 'error'
            },
            warnToast: {
                // You can have any name you want instead of 'showLoginError'
                title: "Cuidado:",
                message: "",
                type: "warn" // You also can use 'VueNotifications.types.error' instead of 'error'
            },
            infoToast: {
                // You can have any name you want instead of 'showLoginError'
                title: "Consejo:",
                message: "",
                type: "info" // You also can use 'VueNotifications.types.error' instead of 'error'
            },
            successToast: {
                // You can have any name you want instead of 'showLoginError'
                title: "Correcto",
                message: "",
                type: "success" // You also can use 'VueNotifications.types.error' instead of 'error'
            }
        }
	}
</script>

<template>
	<div class="row">
        <div class="col">
            <div class="card shadow">
                <div class="card-header border-0">
                    <div class="row align-items-center">
                        <div class="col-4 col-lg-8">
                            <h3 class="mb-0">Estudiantes</h3>
                        </div>
                        <div class="col-8 col-lg-4 text-right">
                            <button type="button" class="btn btn-sm btn-success" @click.prevent="pickFile" :disabled="loadExcel">{{ !loadExcel ? 'Cargar Excel' : 'Cargando..'}}</button>
                            <a href="" class="btn btn-sm btn-primary" @click.prevent="showModalCreate = true">Nuevo</a>
                            <input type="file" class="d-none" @change="postExcel" ref="excel" name="excel_student">
                        </div>
                    </div>
                </div>
                
                <div class="table-responsive">
                    <table class="table table-hover align-items-center table-flush">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Correo Electrónico</th>
                                <th scope="col">Creado en</th>
                                <th scope="col" class="text-center">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="student in students" :key="student.id">
                                <td>{{ student.name }}</td>
                                <td>
                                    <a href="mailto:admin@argon.com">{{ student.email }}</a>
                                </td>
                                <td>{{ student.created_at }}</td>
                                <td class="text-center">
                                    <button class="btn btn-sm btn-info btn-icon-only" @click.prevent="getStudent(student.id, 'matter')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-sm btn-warning btn-icon-only" @click.prevent="getStudent(student.id, 'edit')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-sm btn-danger btn-icon-only" @click.prevent="deleteStudent(student.id)">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="mx-3 py-2">
	                    <button type="button" class="btn btn-sm btn-info" @click="getStudents('prev')">Anterior</button>
	                    <button type="button" class="btn btn-sm btn-info float-right" @click="getStudents('next')">Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
        <form-modal-student
        	v-if="showModalCreate"
        	@close="showModalCreate = false"
        	:student="{}"
        	:new-student="newStudent">		
        </form-modal-student>
        <form-modal-student
        	v-if="showModalUpdate && editStudent"
        	@close="showModalUpdate = false"
        	:student="editStudent"
        	:new-student="updateStudent">
        </form-modal-student>
        <modal-student-matter
            v-if="showModalMatter && editStudent"
            @close="showModalMatter = false"
            :student="editStudent">
        </modal-student-matter>
    </div>	
</template>