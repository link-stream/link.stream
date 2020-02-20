import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VeeValidate from 'vee-validate'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'

// Install BootstrapVue
Vue.use(BootstrapVue)
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
