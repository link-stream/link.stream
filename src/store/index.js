import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from '~/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// Load store modules dynamically.
const requireContext = require.context('./modules', false, /.*\.js$/)

const modules = requireContext
    .keys()
    .map(file => [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)])
    .reduce((modules, [name, module]) => {
        modules[name] = { ...module, namespaced: true }
        return modules
    }, {})

const plugins = []

export default new Vuex.Store({
    modules: modules,
    strict: debug,
    plugins: debug ? plugins.concat([createLogger()]) : plugins,
})
