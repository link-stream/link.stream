import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueProgressBar from 'vue-progressbar'
import Toast from 'vue-toastification'
import VeeValidate from 'vee-validate'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Install VueProgressBar
Vue.use(VueProgressBar, {
    color: '#dc2ea6',
    failedColor: 'red',
    height: '2px',
})
// Install VueToast
Vue.use(Toast, {
    // registration props here
    position: 'bottom-center',
})
// Install VeeValidate
Vue.use(VeeValidate, {
    inject: true,
    fieldsBagName: 'veeFields',
    errorBagName: 'veeErrors',
})
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
// Install Fontawesome
library.add(faUserSecret, fab)
Vue.component('font-awesome-icon', FontAwesomeIcon)
