<template>
  <div class="card shadow">
    <div class="card-header">
      <div class="h3">Fromulario de Reporte</div>
    </div>
    <div class="card-body border-0">
      <form method="POST" action="/admin/reportes/descargar">
        <div class="row">
          <div class="col-12 col-sm-12 col-md-10 col-lg-6">
            <h5 class="mb-0">Tipo de reporte</h5>
            <hr class="m-0" />
            <div class="form-group">
              <label for="type_report" class="col-form-label">
                Seleccione el tipo de reporte
                <span class="text-danger">*</span>
              </label>
              <select id="type_report" name="type_report" class="form-control" v-model="type_report" @change="getDepartments()">
                <option :value="0" disabled selected>Seleccione..</option>
                <option :value="1">Por profesor</option>
                <option :value="2">Por departamento</option>
                <option :value="3">Por materia</option>
              </select>
            </div>
          </div>
          <div class="col-12 col-sm-12 col-md-10 col-lg-6">
            <h5 class="mb-0">Datos Requeridos</h5>
            <hr class="m-0" />

            <!-- POR PROFESOR -->
            <div class="form-group" v-if="type_report === 1">
              <label for="identity" class="col-form-label">
                Cédula del profesor
                <span class="text-danger">*</span>
              </label>
              <input
                type="number"
                id="identity"
                name="identity"
                class="form-control"
                placeholder="Ingrese cédula para reportar"
                v-model="data_required.identity"
                required
              />
            </div>
            <!-- POR PROFESOR -->

            <!-- POR DEPARTAMENTO -->
            <div class="form-group" v-else-if="type_report === 2">
              <label for="deparment" class="col-form-label">
                Seleccione el Departamento
                <span class="text-danger">*</span>
              </label>
              <select id="deparment" name="department" class="form-control" v-model="data_required.department">
                <option :value="0" disabled selected>Seleccione..</option>
                <option v-for="department in tools.departments" :key="department.id" :value="department.id">{{ department.department }}</option>
              </select>
            </div>
            <!-- POR DEPARTAMENTO -->

            <!-- POR PROFESOR -->
            <div class="form-group" v-else-if="type_report === 3">
              <label for="identity" class="col-form-label">
                Código de Materia
                <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                id="matter"
                name="matter"
                class="form-control"
                placeholder="Ingrese el código de materia para reportar"
                v-model="data_required.matter"
              />
            </div>
            <!-- POR PROFESOR -->

            <div class="h4 text-center mt-5" v-else>No se requieren datos adicionales</div>
          </div>
          <div class="col-12 text-right">
            <button type="submit" class="btn btn-primary">Generar Reporte</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type_report: 0,
      data_required: {
        identity: "",
        department: "",
        matter: "",
      },
      tools: {
        departments: [],
      }
    };
  },
  methods: {
    async getDepartments() {
      if (this.type_report === 2) {
        const response = (await axios.get('/admin/tools/departamentos'));
        if (response.status === 200) {
          this.tools.departments = response.data.data;
        }
      }
    }
  }
};
</script>

<style>
</style>