const state = {
    menuStatus: true,
    menuType: 'menu-default',
}
const getters = {
    getMenuState(state) {
        return state.menuStatus
    },
    getMenuType(state) {
        return state.menuType
    },
}
const mutations = {
    setMenuStatus(state, status) {
        state.menuStatus = status
    },
    setMenuType(state, type) {
        state.menuType = type
    },
}
const actions = {}
export default {
    namespaced: false,
    state,
    mutations,
    actions,
    getters,
}
