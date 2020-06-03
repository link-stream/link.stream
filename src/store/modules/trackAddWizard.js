import { trackAddWizardTypes } from '../mutationTypes'
import { cloneDeep } from 'lodash'
import { required } from 'vuelidate/lib/validators'
import { appConstants } from '~/constants'

const initialState = () => ({
    licenses: [],
    form: {
        selectedLicenses: [],
        selectedPromos: [],
        files: {
            /**
             * e.g.
             * tagged: {
             *   name: null,
             *   base64: null
             * }
             */
            tagged: null,
            untagged: null,
            stems: null,
        },
        trackType: null,
        imageBase64: null,
        title: null,
        genre: {},
        tags: [],
        bpm: 0,
        key: {},
        trackPack: null,
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
    [trackAddWizardTypes.UPDATE_FORM](state, { values }) {
        for (let k in values) {
            state.form
        }
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
    form: ({ form }) => form,
    licenses: ({ licenses }) => licenses,
    isSong: ({ form }) => form.trackType === appConstants.tracks.types.song,
    isMissingFiles: ({ form }, getters) => {
        const validations = getters.filesValidations
        const { files } = form
        if (validations.untagged.required && !files.untagged) {
            return true
        }
        if (validations.tagged.required && !files.tagged) {
            return true
        }
        if (validations.stems.required && !files.stems) {
            return true
        }
        return false
    },
    filesValidations: ({ form }) => {
        const { selectedLicenses } = form
        const validations = {
            untagged: {},
            tagged: {},
            stems: {},
        }
        selectedLicenses.forEach(license => {
            if (license.mp3 == '1') {
                validations.untagged.required = required
            }
            if (license.wav == '1') {
                validations.tagged.required = required
            }
            if (license.trackout_stems == '1') {
                validations.stems.required = required
            }
        })
        return validations
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
