<script>
    import FormModalTeacher from './ui/FormModalTeacher';
	import ModalAssignMatter from './ui/ModalAssignMatter';
	export default {
		data() {
			return {
				showModalCreate: false,
				showModalUpdate: false,
                showModalMatter: false,
				teachers: [],
				editTeacher: null,
                loadExcel: false,
			}
		},
		components: {
			FormModalTeacher,
            ModalAssignMatter
		},
        mounted(){
            this.getTeachers();
        },
		methods:{
			async getTeachers(type = 'current') {
				let url = `/admin/profesores`;
				if(type === 'next'){
					url = `/admin/profesores?page=${this.currentPage + 1}`;
				}else if(type === 'prev'){
					url = `/admin/profesores?page=${this.currentPage - 1}`;
				}
				const response = (await axios.get(url)).data;
				this.teachers = response.data;
				this.currentPage = response.current_page;
			},
            async getTeacher(id,type) {
                const response = (await axios.get(`/admin/profesores/${id}/edit`)).data;
                this.editTeacher = response;
                if(type === 'edit') {
                    this.showModalUpdate = true;
                }
                if (type === 'matter') {
                    this.showModalMatter = true;
                }
            },
            async newTeacher(form) {
                const response = await axios.post('/admin/profesores',form);
                if(response.status === 201) {
                    this.teachers.unshift(response.data.data);
                    this.showModalCreate = false;
                }
            },
            async updateTeacher(form) {
                const response = await axios.put(`/admin/profesores/${form.id}`,form);
                if(response.status === 200){
                    this.editUser = null;
                    this.showModalUpdate = false;
                    this.getTeachers();
                }
            },
            async deleteTeacher(id) {
                const response = await axios.delete(`/admin/profesores/${id}`);
                if(response.status === 200){
                    this.getTeachers();
                }
            },
            postExcel(e) {
                const file = e.target.files[0];
                let formData = new FormData();
                formData.append('excel_teacher', file);
                this.loadExcel = true;
                this.successToast({ message: 'Subiendo Archivo.' });
                axios.post('/admin/profesores/nuevo/excel',formData)
                    .then(response => {
                        this.getTeachers();
                        // this.successToast({ message: "." });
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
                            <h3 class="mb-0">Profesores</h3>
                        </div>
                        <div class="col-8 col-lg-4 text-right">
                            <button type="button" class="btn btn-sm btn-success" @click.prevent="pickFile" :disabled="loadExcel">{{ !loadExcel ? 'Cargar Excel' : 'Cargando..'}}</button>
                            <a href="" class="btn btn-sm btn-primary" @click.prevent="showModalCreate = true">Nuevo</a>
                            <input type="file" class="d-none" @change="postExcel" ref="excel" name="excel_teacher">
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
                            <tr v-for="teacher in teachers" :key="teacher.id">
                                <td>{{ teacher.name }}</td>
                                <td>
                                    <a href="mailto:admin@argon.com">{{ teacher.email }}</a>
                                </td>
                                <td>{{ teacher.created_at }}</td>
                                <td class="text-center">
                                    <button class="btn btn-sm btn-info btn-icon-only" @click.prevent="getTeacher(teacher.id, 'matter')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-sm btn-warning btn-icon-only" @click.prevent="getTeacher(teacher.id, 'edit')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-sm btn-danger btn-icon-only" @click.prevent="deleteTeacher(teacher.id)">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="mx-3 py-2">
                    <button type="button" class="btn btn-sm btn-info" @click="getTeachers('prev')">Anterior</button>
                    <button type="button" class="btn btn-sm btn-info float-right" @click="getTeachers('next')">Siguiente</button>
                </div>
            </div>
        </div>
        <form-modal-teacher
        	v-if="showModalCreate"
        	@close="showModalCreate = false"
        	:teacher="{}"
        	:new-teacher="newTeacher">		
        </form-modal-teacher>
        <form-modal-teacher
        	v-if="showModalUpdate && editTeacher"
        	@close="showModalUpdate = false"
        	:teacher="editTeacher"
        	:new-teacher="updateTeacher">
        </form-modal-teacher>
        <modal-assign-matter
            v-if="showModalMatter && editTeacher"
            @close="showModalMatter = false"
            :teacher="editTeacher">
        </modal-assign-matter>
    </div>	
</template>