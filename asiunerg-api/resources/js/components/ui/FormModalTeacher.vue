<script>
	export default Vue.extend({
		props: [
			'newTeacher',
			'teacher',
		],
		data() {
			return {
				identity: this.teacher.identity ?? '',
				name: this.teacher.name ?? '',
				username: this.teacher.username ?? '',
				email: this.teacher.email ?? '',
				error: false,
				errorMessage: '',
			}
		},
		methods: {
			handleSubtmit() {
				this.newTeacher({
					id: this.teacher.id,
					identity: this.identity,
					name: this.name,
					username: this.username,
					email: this.email
				})
			},
			searchIdentity() {
				axios.get(`/admin/profesores/${this.identity}`)
					.then(response => {
						const data = response.data
						if(data.status === 422){
							this.error = true;
							this.errorMessage = data.message;
						}else{
							this.error = false;
						}
						this.name = data.nombres ? `${data.nombres} ${data.apellidos}` : '';
						this.email = data.email ?? '';
					})
			}
		},
		watch: {
			identity: function(val) {
				if(val.length >= 6 && val.length <= 9){
					this.searchIdentity();
				}
				if(val.length < 6){
					this.error = false;
				}
			}
		}
	})
</script>

<template>
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h3 class="modal-title">{{teacher.id === undefined ? 'Crear nuevo usuario profesor': 'Actualizar usuario profesor'}}</h3>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true" @click="$emit('close')">&times;</span>
							</button>
						</div>
						<form @submit.prevent="handleSubtmit">
							<div class="modal-body row">
								<div class="alert alert-danger col-12" v-if="error">{{ errorMessage }}</div>
								<slot name="body">
									<div class="col-6 col-md-6 col-xl-12 form-group">
										<label class="col-form-label">Cédula</label>
										<input type="text" class="form-control" v-model="identity" :readonly="identity !== '' && name != ''" placeholder="Ingrese una cédula a buscar..." pattern="^[0-9]{8}" title="Solo Números.">
									</div>
									<div class="col-6 col-md-6 col-xl-12 form-group">
										<label class="col-form-label">Nombre</label>
										<input type="text" class="form-control" v-model="name" readonly pattern="^[a-zA-Záéíóúñ ]{3,30}" title="Ingrese solo letras.">
									</div>
									<div class="col-6 col-md-6 col-xl-12 form-group">
										<label class="col-form-label">Nombre de usuario</label>
										<input type="text" class="form-control" v-model="username" pattern="^([a-z]+[0-9]{0,2}){4,12}$" title="Solo letras minusculas y 4 numeros">
									</div>
									<div class="col-6 col-md-6 col-xl-12 form-group">
										<label class="col-form-label">Correo electrónico</label>
										<input type="email" class="form-control" v-model="email">
									</div>
								</slot>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-muted" @click="$emit('close')">
									Cancelar
								</button>
								<button type="submit" class="btn btn-primary">{{ !teacher.id ? 'Crear' : 'Actualizar' }}</button>
							</div>
						</form>
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

