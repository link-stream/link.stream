import Vue from 'vue'
import { has } from 'lodash'
import { call } from '~/services'
import { appConstants } from '~/constants'
import * as types from '../mutationTypes'

// observable state
// used to avoid repeated requests
let _unobservableState = {}
function refreshUnobservableState() {
    _unobservableState = {}
}
function ustate(key, value) {
    if (value === undefined) {
        return _unobservableState[key]
    }
    _unobservableState[key] = value
}

// state
const initialState = () => ({
    orders: [],
    workers: {},
})

export const state = initialState()

// mutations
export const mutations = {
    [types.RESET](state) {
        // acquire initial state
        const s = initialState()
        Object.keys(s).forEach(key => {
            state[key] = s[key]
        })
        refreshUnobservableState()
    },

    // fetch work orders
    [types.FETCH_WORK_ORDERS](state, orders) {
        state.orders = orders
    },

    [types.GET_WORKER_DETAIL](state, worker) {
        Vue.set(state.workers, worker.id, worker)
    },
}

// actions
export const actions = {
    async loadWokOrders({ commit }) {
        try {
            if (ustate('orders')) return
            ustate('orders', 1)
            // successful fetching orders
            const { orders = [] } = await call(`${appConstants.API_URL}/work_orders`)
            commit(types.FETCH_WORK_ORDERS, orders)
            ustate('orders', 2)
        } catch (e) {
            // failure fetching orders
            console.log(e)
            ustate('orders', 0)
        }
    },

    async loadWorderDetails({ commit }, { workerId }) {
        try {
            if (ustate(`worker.${workerId}`)) return
            ustate(`worker.${workerId}`, 1)
            // successful fetching worker detail
            const { worker = {} } = await call(`${appConstants.API_URL}/workers/${workerId}`)
            commit(types.GET_WORKER_DETAIL, worker)
            ustate(`worker.${workerId}`, 2)
        } catch (e) {
            // failure fetching worker detail
            console.log(e)
            ustate(`worker.${workerId}`, 0)
        }
    },
}

// getters
export const getters = {
    orders: state => state.orders,
    worker: state => workerId => {
        if (has(state.workers, workerId)) return state.workers[workerId]
        return null
    },
}
