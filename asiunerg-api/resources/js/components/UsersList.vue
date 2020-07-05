<script>
import FormModalUser from "./ui/FormModalUser";
export default {
  data() {
    return {
      users: [],
      currentPage: null,
      showModalCreate: false,
      showModalUpdate: false,
      editUser: null
    };
  },
  components: {
    FormModalUser
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers(type = "current") {
      let url = `/admin/users`;
      if (type === "next") {
        url = `/admin/users?page=${this.currentPage + 1}`;
      } else if (type === "prev") {
        url = `/admin/users?page=${this.currentPage - 1}`;
      }
      const response = (await axios.get(url)).data;
      this.users = response.data;
      this.currentPage = response.current_page;
    },
    newUser(form) {
      this.infoToast({ message: "Registrando usuario." });
      axios
        .post("/admin/users", form)
        .then(response => {
          if (response.status === 201) {
            this.users.unshift(response.data.data);
            this.showModalCreate = false;
          }
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.errorToast({ message: `${error.response.data.message}` });
            for (const e in error.response.data.errors) {
              if (error.response.data.errors.hasOwnProperty(e)) {
                const element = error.response.data.errors[e][0];
                this.errorToast({ message: element });
              }
            }
          } else if (error.response.status === 400) {
            this.errorToast({ message: `400 Bad Request` });
          } else if (error.response.status === 500) {
            this.errorToast({ message: `500` });
          }
        });
    },
    async showUser(id) {
      const response = (await axios.get(`/admin/users/${id}/edit`)).data;
      this.editUser = response;
      this.showModalUpdate = true;
    },
    async updateUser(form) {
      this.infoToast({ message: "Actualizando usuario." });
      this.editUser = null;
      axios
        .put(`/admin/users/${form.id}`, form)
        .then(response => {
          if (response.status === 201) {
            this.users.unshift(response.data.data);
            this.showModalCreate = false;
            this.getUsers();
          }
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.errorToast({ message: `${error.response.data.message}` });
            for (const e in error.response.data.errors) {
              if (error.response.data.errors.hasOwnProperty(e)) {
                const element = error.response.data.errors[e][0];
                this.errorToast({ message: element });
              }
            }
          } else if (error.response.status === 400) {
            this.errorToast({ message: `400 Bad Request` });
          } else if (error.response.status === 500) {
            this.errorToast({ message: `500` });
          }
        });
    },
    async deleteUser(id) {
      this.warnToast({ message: "Eliminando usuario." });
      const response = await axios.delete(`/admin/users/${id}`);
      if (response.status === 200) {
        this.getUsers();
        this.successToast({ message: `${response.data.message}` });
      } else {
        this.errorToast({ message: `${response.data.message}` });
      }
    }
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
      title: "Cuidado",
      message: "",
      type: "warn" // You also can use 'VueNotifications.types.error' instead of 'error'
    },
    infoToast: {
      // You can have any name you want instead of 'showLoginError'
      title: "Información",
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
};
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
              <a href class="btn btn-sm btn-primary" @click.prevent="showModalCreate = true">Nuevo</a>
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
                  <button
                    class="btn btn-sm btn-warning btn-icon-only"
                    @click.prevent="showUser(user.id)"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button
                    class="btn btn-sm btn-danger btn-icon-only"
                    @click.prevent="deleteUser(user.id)"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="mx-3 py-2">
            <button type="button" class="btn btn-sm btn-info" @click="getUsers('prev')">Anterior</button>
            <button
              type="button"
              class="btn btn-sm btn-info float-right"
              @click="getUsers('next')"
            >Siguiente</button>
          </div>
        </div>
      </div>
    </div>
    <form-modal-user
      v-if="showModalCreate"
      @close="showModalCreate = false"
      :user="{}"
      :new-user="newUser"
    ></form-modal-user>
    <form-modal-user
      v-if="showModalUpdate && editUser"
      @close="showModalUpdate = false"
      :user="editUser"
      :new-user="updateUser"
    ></form-modal-user>
  </div>
</template>