import Vue from 'vue'
import 'typeface-montserrat'
import {
    ModalPlugin,
    BModal,
    BButton,
    BForm,
    BFormRow,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BFormRadio,
    BFormRadioGroup,
    BFormInvalidFeedback,
    BFormTextarea,
    BInputGroup,
    BContainer,
    BRow,
    BCol,
    BSpinner,
    BNavbar,
    BNavbarNav,
    BNavbarBrand,
    BImg,
    BIcon,
    BLink,
    BDropdown,
    BDropdownItem,
    BDropdownDivider,
} from 'bootstrap-vue'
import VueProgressBar from 'vue-progressbar'
import VueLetterAvatar from 'vue-letter-avatar'
import Toast from 'vue-toastification'
import vuePerfectScrollbar from 'vue-perfect-scrollbar'
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
import {
    LsButton,
    LsSpinnerButton,
    LsIconButton,
    PreviewPillButton,
} from '~/components/Button'
import { LsSpinner } from '~/components/Loading'
import { LsSelect, LsDatePicker, LsTimePicker } from '~/components/Form'
import { LsIcon } from '~/components/Icon'
import UserAvatar from '~/components/Avatar/UserAvatar'

// Install BootstrapVue components
Vue.use(ModalPlugin)
Vue.component('BModal', BModal)
Vue.component('BButton', BButton)
Vue.component('BForm', BForm)
Vue.component('BFormRow', BFormRow)
Vue.component('BFormGroup', BFormGroup)
Vue.component('BFormInput', BFormInput)
Vue.component('BFormCheckbox', BFormCheckbox)
Vue.component('BFormRadio', BFormRadio)
Vue.component('BFormRadioGroup', BFormRadioGroup)
Vue.component('BFormInvalidFeedback', BFormInvalidFeedback)
Vue.component('BFormTextarea', BFormTextarea)
Vue.component('BInputGroup', BInputGroup)
Vue.component('BContainer', BContainer)
Vue.component('BRow', BRow)
Vue.component('BCol', BCol)
Vue.component('BSpinner', BSpinner)
Vue.component('BNavbar', BNavbar)
Vue.component('BNavbarNav', BNavbarNav)
Vue.component('BNavbarBrand', BNavbarBrand)
Vue.component('BImg', BImg)
Vue.component('BIcon', BIcon)
Vue.component('BLink', BLink)
Vue.component('BDropdown', BDropdown)
Vue.component('BDropdownItem', BDropdownItem)
Vue.component('BDropdownDivider', BDropdownDivider)

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

// Install VueTagsInput
Vue.use(VueTagsInput)

// Install base components
Vue.component('LsButton', LsButton)
Vue.component('LsSpinnerButton', LsSpinnerButton)
Vue.component('LsIconButton', LsIconButton)
Vue.component('PreviewPillButton', PreviewPillButton)
Vue.component('LsSelect', LsSelect)
Vue.component('LsDatePicker', LsDatePicker)
Vue.component('LsTimePicker', LsTimePicker)
Vue.component('LsIcon', LsIcon)
Vue.component('LsSpinner', LsSpinner)
Vue.component('UserAvatar', UserAvatar)
