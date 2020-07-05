<template>
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h3 class="modal-title"><slot name="title"></slot></h3>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true" @click="$emit('close')">&times;</span>
							</button>
						</div>
						<div class="modal-body form-row">
							<slot name="body">
							</slot>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-muted" @click="$emit('close')">
								Cancelar
							</button>
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