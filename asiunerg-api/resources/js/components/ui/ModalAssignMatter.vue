<script>
	export default Vue.extend({
		props: [
			'teacher'
		],
		data() {
			return {
				mattersAssign: [],
			};
		},
		mounted() {
			this.getMatterAssing();
		},
		methods: {
			getMatterAssing() {
				axios.get(`/admin/profesores/${this.teacher.id}/materias/asignadas`)
					.then(response => {
						this.mattersAssign = response.data.data.matters;
					})
					.catch(error => {
						console.log(error)
					})
			},
		}
	});
</script>

<template>
	<transition name="modal" class="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-dialog modal-sm" role="document">
					<div class="modal-content">
						
						<div class="modal-body">
							<div class="d-flex justify-content-between">
								<h3 class="modal-title">Materias asignadas del profesor</h3>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true" @click="$emit('close')">&times;</span>
								</button>
							</div>
							<div class="mt-2 row justify-content-center align-content-center">
								<div class="col-6">
									<h5 class="col-form-label">Cédula</h5>
									<p v-text="teacher.identity"></p>
								</div>
								<div class="col-6">
									<h5 class="col-form-label">Nombres</h5>
									<p v-text="teacher.name"></p>
								</div>
							</div>
							<div class="table-responsive">
								<table class="table align-items-center">
									<thead>
										<tr>
											<th>Código</th>
											<th>Materia</th>
											<th>Secciones</th>
											<th>Acciones</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="matter in mattersAssign" :key="mattersAssign.id">
											<td>{{ matter.code }}</td>
											<td>{{ matter.name }}</td>
											<td>{{ matter.section }}</td>
											<td>
												<a href="/" class="btn btn-sm btn-success">Estudiantes</a>
												<a href="/" class="btn btn-sm btn-warning">Clases</a>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>	
	</transition>
</template>

<style scoped>
	.modal-mask {
		position: fixed;
		z-index: 9998;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		display: table;
		transition: opacity .3s ease;
	}

	.modal-wrapper {
		max-width: 100px;
		display: table-cell;
		vertical-align: middle;
	}

	/*
	 * The following styles are auto-applied to elements with
	 * transition="modal" when their visibility is toggled
	 * by Vue.js.
	 *
	 * You can easily play with the modal transition by editing
	 * these styles.
	 */

	 .modal-enter {
	 	opacity: 0;
	 }

	 .modal-leave-active {
	 	opacity: 0;
	 }

	 .modal-enter,
	 .modal-leave-active {
	 	-webkit-transform: scale(1.1);
	 	transform: scale(1.1);
	 }
</style>