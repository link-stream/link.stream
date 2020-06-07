import { types, trackAddWizardTypes } from '../mutationTypes'
import { cloneDeep } from 'lodash'
import { required } from 'vuelidate/lib/validators'
import { appConstants } from '~/constants'

const initialState = () => ({
    licenses: [],
    form: {
        selectedLicenses: [],
        selectedPromos: [],
        trackType: null,
        coverArtBase64: null,
        title: null,
        genre: {},
        tags: [],
        bpm: '',
        key: {},
        trackPack: null,
        time: null,
        date: null,
        scheduled: false,
        isPublic: true,
        files: {
            /**
             * e.g.
             * tagged: {
             *   name: null,
             *   base64: null
             * }
             */
            stems: null,
            tagged: null,
            untaggedMp3: null,
            untaggedWav: null,
        },
        collabs: [
            /**
             * e.g.
             * {
             *   profit: null,
             *   publishing: null,
             *   user: {
             *     id: null,
             *     name: null,
             *     photo: null,
             *   }
             * }
             */
        ],
    },
})

const state = initialState()

const mutations = {
    [types.RESET](state) {
        const s = initialState()
        for (let key in state) {
            state[key] = s[key]
        }
    },

    [trackAddWizardTypes.UPDATE_FORM](state, { values }) {
        const form = { ...state.form }
        for (let k in values) {
            if (k in form) {
                form[k] = cloneDeep(values[k])
            }
        }
        state.form = form
    },

    [trackAddWizardTypes.SET_LICENSES](state, { licenses }) {
        state.licenses = cloneDeep(licenses)
    },

    [trackAddWizardTypes.UPDATE_LICENSE](state, { index, license }) {
        state.licenses.splice(index, 1, cloneDeep(license))
    },
}

const actions = {
    reset({ commit }) {
        commit(types.RESET)
    },

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
    form: ({ form }) => form,
    licenses: ({ licenses }) => licenses,
    isSong: ({ form }) => form.trackType === appConstants.tracks.types.song,
    isMissingFiles: ({ form }, getters) => {
        const rules = getters.filesValidationRules
        const { files } = form
        if (rules.untaggedMp3.required && !files.untaggedMp3) {
            return true
        }
        if (rules.untaggedWav.required && !files.untaggedWav) {
            return true
        }
        if (rules.stems.required && !files.stems) {
            return true
        }
        return false
    },
    filesValidationRules: ({ form }) => {
        const { selectedLicenses } = form
        const rules = {
            untaggedMp3: {},
            untaggedWav: {},
            stems: {},
        }
        selectedLicenses.forEach(license => {
            if (license.mp3 === '1') {
                rules.untaggedMp3 = { required }
            }
            if (license.wav == '1') {
                rules.untaggedWav = { required }
            }
            if (license.trackout_stems == '1') {
                rules.stems = { required }
            }
        })
        return rules
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
