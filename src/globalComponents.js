import Vue from 'vue'
import 'typeface-montserrat'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueProgressBar from 'vue-progressbar'
import VueLetterAvatar from 'vue-letter-avatar'
import Toast from 'vue-toastification'
import vuePerfectScrollbar from 'vue-perfect-scrollbar'
import vSelect from 'vue-select'
import VueYoutube from 'vue-youtube'
import VCalendar from 'v-calendar'
import { Plugin } from 'vue-fragment'
import VeeValidate from 'vee-validate'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import Vuelidate from 'vuelidate'
import { alertBox, eventBus } from '~/plugins'
import VueTagsInput from '@johmun/vue-tags-input'

// Install BootstrapVue
Vue.use(BootstrapVue)

// Install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// Install VueProgressBar
Vue.use(VueProgressBar, {
    color: '#dc2ea6',
    failedColor: 'red',
    height: '2px',
})

// Install Vue Letter Avatar
Vue.use(VueLetterAvatar)

// Install VueToast
Vue.use(Toast, {
    position: 'top-right',
    hideProgressBar: true,
    hideCloseButton: false,
})

// Installl Perfect Scrollbar
Vue.component('vue-perfect-scrollbar', vuePerfectScrollbar)

// Install Vue Select
Vue.component('v-select', vSelect)

// Install Vue Youtube
Vue.use(VueYoutube)

// Install Vue Calendar
Vue.use(VCalendar, {
    firstDayOfWeek: 2,
    formats: {
        title: 'MMM YY',
        weekdays: 'WW',
        navMonths: 'MMMM',
        input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
        dayPopover: 'L',
    },
    datePickerShowDayPopover: false,
    popoverExpanded: true,
    popoverDirection: 'bottom',
})

// Install Vue Fragment
Vue.use(Plugin)

// Install VeeValidate
Vue.use(VeeValidate, {
    inject: true,
    fieldsBagName: 'veeFields',
    errorBagName: 'veeErrors',
})

// Install Fontawesome
library.add(fas, fab, far)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Install Vuelidate
Vue.use(Vuelidate)

// Install alert box
Vue.use(alertBox)

// Install event bus
Vue.use(eventBus)

// Install VueTagsInput
Vue.use(VueTagsInput)
