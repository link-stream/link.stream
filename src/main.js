// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '~/store'
import '~/globalComponents'
import '~/filters'
import '~/directives'
import '~/assets/scss/app.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
export default new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    components: { App },
})
