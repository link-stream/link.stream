import { trackAddWizardTypes } from '../mutationTypes'
import { cloneDeep } from 'lodash'

const initialState = () => ({
    licenses: [],
    form: {
        selectedLicenses: [],
        selectedPromos: [],
        files: {
            tagged: null,
            untagged: null,
            stems: null,
        },
        trackInfo: {
            trackType: null,
            imageBase64: null,
            title: null,
            genre: {},
            tags: [],
            bpm: 0,
            key: {},
            trackPack: null,
            collabs: [
                /*{
                    profitPercent: null,
                    pubPercent: null,
                    user: {
                        id: null,
                        name: null,
                        photo: null,
                    },
                },*/
            ],
        },
    },
})

const state = initialState()

const mutations = {
    [trackAddWizardTypes.UPDATE_FORM](state, { values }) {
        state.form = {
            ...state.form,
            ...cloneDeep(values),
        }
    },
    [trackAddWizardTypes.SET_LICENSES](state, { licenses }) {
        state.licenses = cloneDeep(licenses)
    },
    [trackAddWizardTypes.UPDATE_LICENSE](state, { index, license }) {
        state.licenses.splice(index, 1, cloneDeep(license))
    },
}

const actions = {
    async updateForm({ commit }, values) {
        commit({
            type: trackAddWizardTypes.UPDATE_FORM,
            values,
        })
    },
    async setLicenses({ commit }, { licenses }) {
        commit({
            type: trackAddWizardTypes.SET_LICENSES,
            licenses,
        })
    },
    async updateLicense({ state, commit }, { license }) {
        const index = state.licenses.map(l => l.id).indexOf(license.id)
        commit({
            type: trackAddWizardTypes.UPDATE_LICENSE,
            index,
            license,
        })
    },
}

const getters = {
    licenses: ({ licenses }) => licenses,
    form: ({ form }) => form,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
