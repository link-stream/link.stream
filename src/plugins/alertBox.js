import { AlertBox } from '~/components/Alert'

export default {
    install(Vue) {
        Vue.prototype.$alert = new Vue(AlertBox).$mount()
    },
}
