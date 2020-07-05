<script>
    import FormModalUser from './ui/FormModalUser';
    export default {
        data() {
            return {
                users:[],
                currentPage: null,
                showModalCreate: false,
                showModalUpdate: false,
                editUser: null,
            }
        },
        components: {
            FormModalUser
        },
        mounted() {
            this.getUsers();
        },
        methods: {
            async getUsers(type = 'current') {
                let url = `/admin/users`;
                if(type === 'next'){
                    url = `/admin/users?page=${this.currentPage + 1}`;
                }else if(type === 'prev'){
                    url = `/admin/users?page=${this.currentPage - 1}`;
                }
                const response = (await axios.get(url)).data;
                this.users = response.data;
                this.currentPage = response.current_page;
            },
            async newUser(form) {
                const response = await axios.post('/admin/users',form);
                if(response.status === 201) {
                    this.users.unshift(response.data.data);
                    this.showModalCreate = false;
                }
            },
            async showUser(id) {
                const response = (await axios.get(`/admin/users/${id}/edit`)).data;
                this.editUser = response;
                this.showModalUpdate = true;
            },
            async updateUser(form) {
                this.editUser = null;
                const response = (await axios.put(`/admin/users/${form.id}`,form)).data;
                this.getUsers();
            },
            async deleteUser(id) {
                const response = await axios.delete(`/admin/users/${id}`);
                if(response.status === 200){
                    this.getUsers();
                }
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
                        <div class="col-8">
                            <h3 class="mb-0">Usuarios Administradores</h3>
                        </div>
                        <div class="col-4 text-right">
                            <a href="" class="btn btn-sm btn-primary" @click.prevent="showModalCreate = true">Nuevo</a>
                        </div>
                    </div>
                </div>
                
                <div class="table-responsive">
                    <table class="table align-items-center table-flush">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Correo Electrónico</th>
                                <th scope="col">Creado en</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" :key="user.id">
                                <td>{{ user.name }}</td>
                                <td>
                                    <a href="mailto:admin@argon.com">{{ user.email }}</a>
                                </td>
                                <td>{{ user.created_at }}</td>
                                <td class="text-right">
                                    <button class="btn btn-sm btn-warning btn-icon-only" @click.prevent="showUser(user.id)">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-sm btn-danger btn-icon-only" @click.prevent="deleteUser(user.id)">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="mx-3 py-2">
	                    <button type="button" class="btn btn-sm btn-info" @click="getUsers('prev')">Anterior</button>
	                    <button type="button" class="btn btn-sm btn-info float-right" @click="getUsers('next')">Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
        <form-modal-user
        	v-if="showModalCreate"
        	@close="showModalCreate = false"
        	:user="{}"
        	:new-user="newUser">		
        </form-modal-user>
        <form-modal-user
        	v-if="showModalUpdate && editUser"
        	@close="showModalUpdate = false"
        	:user="editUser"
        	:new-user="updateUser">
        </form-modal-user>
    </div> 
</template>