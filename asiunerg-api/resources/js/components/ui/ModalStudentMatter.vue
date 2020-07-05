<script>
	export default Vue.extend({
		props: [
			'student'
		],
		data() {
			return {
				matterInscription: [],
			};
		},
		mounted() {
			this.getMatterAssing();
		},
		methods: {
			getMatterAssing() {
				axios.get(`/admin/estudiantes/${this.student.id}/materias/inscritas`)
					.then(response => {
						this.matterInscription = response.data.data;
					})
					.catch(error => {
						console.log(error)
					})
			},
		}
	});
</script>

<template>
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-dialog modal-sm" role="document">
					<div class="modal-content">
						
						<div class="modal-body">
							<div class="d-flex justify-content-between">
								<h3 class="modal-title">Materias inscritas del estudiante</h3>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true" @click="$emit('close')">&times;</span>
								</button>
							</div>
							<div class="mt-2 row justify-content-center align-content-center">
								<div class="col-6">
									<h5 class="col-form-label">Cédula</h5>
									<p v-text="student.identity"></p>
								</div>
								<div class="col-6">
									<h5 class="col-form-label">Nombres</h5>
									<p v-text="`${student.name} ${student.lastname}`"></p>
								</div>
							</div>
							<div class="table-responsive">
								<table class="table align-items-center table-overflow">
									<thead>
										<tr>
											<th>Código</th>
											<th>Materia</th>
											<th>Secciones</th>
											<th>Acciones</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="matter in matterInscription" :key="matter.id">
											<td>{{ matter.code }}</td>
											<td>{{ matter.name }}</td>
											<td>{{ matter.section }}</td>
											<td>
												<a :href="`/`" class="btn btn-sm btn-warning">Clases</a>
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

	.modal-content {
		height: 100%;
	}
	@media (max-width: 575px) {
		.modal-sm {
		    max-width: 300px;
		}
	}
	.modal-body {
		max-height: calc(100vh - (1.75rem * 2));
		overflow-y: scroll;
	}

	.modal-wrapper {
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