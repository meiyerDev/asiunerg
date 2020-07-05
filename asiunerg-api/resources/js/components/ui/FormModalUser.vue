<script>
	export default Vue.extend({
		props: [
			'newUser',
			'user',
		],
		data() {
			return {
				name: this.user.name,
				username: this.user.username,
				email: this.user.email,
			}
		},
		methods: {
			handleSubtmit() {
				this.newUser({
					id: this.user.id,
					name: this.name,
					username: this.username,
					email: this.email
				})
				this.name = '';
				this.username = '';
				this.email = '';
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
							<h3 class="modal-title">Crear nuevo usuario</h3>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true" @click="$emit('close')">&times;</span>
							</button>
						</div>
						<form @submit.prevent="handleSubtmit">
							<div class="modal-body row">
								<slot name="body">
									<div class="col-6 col-xl-12 form-group">
										<label class="col-form-label">Nombre</label>
										<input type="text" class="form-control" v-model="name">
									</div>
									<div class="col-6 col-xl-12 form-group">
										<label class="col-form-label">Nombre de usuario</label>
										<input type="text" class="form-control" v-model="username">
									</div>
									<div class="col-12 form-group">
										<label class="col-form-label">Correo electrónico</label>
										<input type="text" class="form-control" v-model="email">
									</div>
								</slot>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-muted" @click="$emit('close')">
									Cancelar
								</button>
								<button type="submit" class="btn btn-primary">{{ !user.id ? 'Crear' : 'Actualizar' }}</button>
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

