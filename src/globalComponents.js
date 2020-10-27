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
    BFormCheckboxGroup,
    BFormRadio,
    BFormRadioGroup,
    BFormInvalidFeedback,
    BFormTextarea,
    BInputGroup,
    BInputGroupText,
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
    BAspect,
    BPaginationNav,
    BTable,
    BFormFile,
    BTooltip,
    BCard,
    BCardSubTitle,
    BCardText,
    BCardBody,
    BAvatar,
    BListGroup,
    BListGroupItem,
    BFormSelect,
    BBadge,
    BCardTitle,
    BCardHeader,
    BDropdownForm,
    BIconCreditCard,
    BIconX,
    BIconCheck,
    BIconPauseFill,
    BIconPlayFill,
    BIconFilter,
    BIconSearch,
    BIconEye,
    BIconEyeSlash,
    BIconBoxArrowInRight,
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
import {
    faChevronDown,
    faChevronUp,
    faChevronLeft,
    faChevronRight,
    faBell,
    faKey,
    faVial,
    faEnvelopeOpenText,
    faMobileAlt,
    faCheckCircle,
    faExclamationCircle,
    faCamera,
    faTimesCircle,
    faShareAltSquare,
} from '@fortawesome/free-solid-svg-icons'
import { faPaypal, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faFileAlt, faCopy } from '@fortawesome/free-regular-svg-icons'
import Vuelidate from 'vuelidate'
import { alertBox, eventBus } from '~/plugins'
import {
    BasicButton,
    SpinnerButton,
    IconButton,
    TogglerButton,
    TogglerButtonGroup,
} from '~/components/Button'
import { LoadingSpinner, LoadingMask } from '~/components/Loading'
import {
    BasicSelect,
    MultiSelect,
    DatePicker,
    TimePicker,
    TaggerInput,
    SearchInput,
} from '~/components/Form'
import Icon from '~/components/Icon/Icon'
import UserAvatar from '~/components/Avatar/UserAvatar'
import { BaseCard } from '~/components/Card'

// Install BootstrapVue components
Vue.use(ModalPlugin)
Vue.component('BModal', BModal)
Vue.component('BButton', BButton)
Vue.component('BForm', BForm)
Vue.component('BFormRow', BFormRow)
Vue.component('BFormGroup', BFormGroup)
Vue.component('BFormInput', BFormInput)
Vue.component('BFormCheckbox', BFormCheckbox)
Vue.component('BFormCheckboxGroup', BFormCheckboxGroup)
Vue.component('BFormRadio', BFormRadio)
Vue.component('BFormRadioGroup', BFormRadioGroup)
Vue.component('BFormInvalidFeedback', BFormInvalidFeedback)
Vue.component('BFormTextarea', BFormTextarea)
Vue.component('BInputGroup', BInputGroup)
Vue.component('BInputGroupText', BInputGroupText)
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
Vue.component('BAspect', BAspect)
Vue.component('BPaginationNav', BPaginationNav)
Vue.component('BTable', BTable)
Vue.component('BFormFile', BFormFile)
Vue.component('BTooltip', BTooltip)
Vue.component('BCard', BCard)
Vue.component('BCardSubTitle', BCardSubTitle)
Vue.component('BCardText', BCardText)
Vue.component('BCardBody', BCardBody)
Vue.component('BAvatar', BAvatar)
Vue.component('BListGroup', BListGroup)
Vue.component('BListGroupItem', BListGroupItem)
Vue.component('BFormSelect', BFormSelect)
Vue.component('BCardTitle', BCardTitle)
Vue.component('BCardHeader', BCardHeader)
Vue.component('BBadge', BBadge)
Vue.component('BDropdownForm', BDropdownForm)
Vue.component('BIconCreditCard', BIconCreditCard)
Vue.component('BIconX', BIconX)
Vue.component('BIconCheck', BIconCheck)
Vue.component('BIconPauseFill', BIconPauseFill)
Vue.component('BIconPlayFill', BIconPlayFill)
Vue.component('BIconFilter', BIconFilter)
Vue.component('BIconSearch', BIconSearch)
Vue.component('BIconEye', BIconEye)
Vue.component('BIconEyeSlash', BIconEyeSlash)
Vue.component('BIconBoxArrowInRight', BIconBoxArrowInRight)

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
library.add(
    faChevronDown,
    faChevronUp,
    faChevronLeft,
    faChevronRight,
    faKey,
    faBell,
    faVial,
    faEnvelopeOpenText,
    faMobileAlt,
    faCheckCircle,
    faExclamationCircle,
    faCamera,
    faTimesCircle,
    faShareAltSquare,
    faPaypal,
    faInstagram,
    faFileAlt,
    faCopy
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Install Vuelidate
Vue.use(Vuelidate)

// Install LS components
Vue.use(alertBox)
Vue.use(eventBus)
Vue.component('BaseCard', BaseCard)
Vue.component('UserAvatar', UserAvatar)
Vue.component('BasicButton', BasicButton)
Vue.component('SpinnerButton', SpinnerButton)
Vue.component('IconButton', IconButton)
Vue.component('TogglerButton', TogglerButton)
Vue.component('TogglerButtonGroup', TogglerButtonGroup)
Vue.component('BasicSelect', BasicSelect)
Vue.component('MultiSelect', MultiSelect)
Vue.component('DatePicker', DatePicker)
Vue.component('TimePicker', TimePicker)
Vue.component('TaggerInput', TaggerInput)
Vue.component('SearchInput', SearchInput)
Vue.component('Icon', Icon)
Vue.component('LoadingSpinner', LoadingSpinner)
Vue.component('LoadingMask', LoadingMask)

import VueCardFormat from 'vue-credit-card-validation'
import VueSlider from 'vue-slider-component'
import VueSocialSharing from 'vue-social-sharing'
import GAuth from 'vue-google-oauth2'
const gauthOption = {
    clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
    scope: 'profile https://www.googleapis.com/auth/youtube.upload',
    prompt: 'select_account',
}
Vue.use(GAuth, gauthOption)
Vue.use(VueCardFormat)
Vue.component('VueSlider', VueSlider)
Vue.use(VueSocialSharing)
