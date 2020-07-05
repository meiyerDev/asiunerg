/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
import miniToastr from 'mini-toastr';
import VueNotifications from 'vue-notifications'

const toastTypes = {
    success: 'success',
    error: 'error',
    info: 'info',
    warn: 'warn'
  }
miniToastr.init({types: toastTypes})
function toast ({title, message, type, timeout, cb}) {
    return miniToastr[type](message, title, timeout, cb)
  }

  const options = {
    success: toast,
    error: toast,
    info: toast,
    warn: toast
  }
Vue.use(VueNotifications, options)

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('users-list', require('./components/UsersList.vue').default);
Vue.component('teachers-list', require('./components/TeachersList.vue').default);
Vue.component('students-list', require('./components/StudentsList.vue').default);
Vue.component('classes-list', require('./components/ClassesList.vue').default);
Vue.component('report-form', require('./components/ReportForm.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
});
