<template>
  <b-modal 
    modal-class="ShareArtModal" 
    v-model="open" 
    centered 
    size="lg" 
    hide-footer 
    @hidden="$emit('close')"
    no-close-on-backdrop
    no-close-on-esc
    >
        <template v-slot:modal-header>
            <BasicButton variant="icon" class="modal-close" @click="close" />
            <h2>Store Info</h2>
        </template>
        <template v-slot:default>
            <b-container>
                <b-form
                    @submit.stop.prevent="onSubmit"
                    @reset="resetForm"
                    :novalidate="true"
                    id="store-form"
                >
                    <b-row>
                        <b-col cols="12">
                            <b-form-group
                                label="Store Name"
                                label-for="input_store_name"
                                class="mb-3 error-l-110 email-form-group"
                            >
                                <b-form-input
                                    id="input_store_name"
                                    name="input_store_name"
                                    v-model="form.storeName"
                                    v-validate="{ required: true }"
                                    :state="validateState('input_store_name')"
                                    aria-describedby="store_name-live-feedback"
                                    data-vv-as="store name"
                                ></b-form-input>
                                <b-form-invalid-feedback id="store_name-live-feedback">
                                    {{
                                    veeErrors.first('input_store_name')
                                    }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group
                                label="Store URL"
                                class="mb-4 error-l-100"
                            >
                                <label class="small text-muted">
                                    {{ baseUrl }}/
                                </label>
                                <template>
                                    <b-form-input
                                        id="url"
                                        name="url"
                                        type="text"
                                        class="d-inline-block w-50 small px-2"
                                        v-model="form.url"
                                        v-validate="{
                                            required: true,
                                            uniqueUrl: true, 
                                            regex: /^[a-zA-Z0-9-_]+$/,
                                            min: 8,                                   
                                        }"
                                        :state="validateState('url')"
                                        aria-describedby="url-live-feedback"
                                        data-vv-as="url"
                                    ></b-form-input>
                                    <b-button
                                        variant="transparent"
                                        class="btn btn-input-spinner"
                                        v-if="validating.url"
                                    >
                                        <b-spinner></b-spinner>
                                    </b-button>
                                    <b-form-invalid-feedback
                                        id="url-live-feedback"
                                    >
                                        {{ veeErrors.first('url') }}
                                    </b-form-invalid-feedback>
                                </template>                                
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" class="text-center">
                            <spinner-button
                                type="submit"
                                class="auth-btn mt-3 signin-btn"
                                :loading="status.loading.addstore"
                                :error="status.error.addstore"
                            >Create Store</spinner-button>
                        </b-col>
                    </b-row>
                </b-form>     
            </b-container>
            
        </template>
    </b-modal>
</template>

<script>
import { api } from '~/services'
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import { appConstants } from '~/constants'
import { Validator } from 'vee-validate'
import { setStatusChange } from '~/utils'
export default {
    name: 'AddStore',
    computed: {
        ...mapGetters({
            user: 'me/user',
        }),
    },
    data: () => ({
        open: false,
        userId: '',
        userToken: '',
        baseUrl: '',
        form: {
            storeName: null,
            url: null,
            editableUrl: true
        },
        validating: {
            url: false,
        },
        status: {
            loading: {
                addstore: false,
            },
            error: {
                addstore: null,
            },
        },
    }),
    created() {
        const getUrl = window.location
        this.baseUrl = getUrl.host
        this.$bus.$on('modal.addstore.open', payload => {
            this.userId = payload.user_id
            this.userToken = payload.user_token
            this.open = true
        })
        this.$bus.$on('modal.addstore.close', this.close)
    },
    mounted() {
        // URL availability validations
        Validator.extend('uniqueUrl', {
            validate: async value => {
                this.validating.url = true
                const { status, error } = await api.users.getAvailability({
                    type: 'url',
                    value,
                    userId: 'x',
                })
                if (status !== 'success') {
                    return { data: { message: error } }
                }
                this.validating.url = false
                return { valid: true }
            },
            getMessage: (field, params, data) => data.message,
        })
    },
    methods: {
        validateState(ref) {
            if (
                this.veeFields[ref] &&
                (this.veeFields[ref].dirty || this.veeFields[ref].validated)
            ) {
                return !this.veeErrors.has(ref)
            }
            return null
        },
        resetForm() {
            this.form = {
                storeName: null,
                url: null,
            }
            this.$nextTick(() => {
                this.$validator.reset()
            })
        },
        onSubmit() {
            this.$validator.validateAll().then(async result => {
                if (!result) {
                    return
                }
                this.status.loading.addstore = true
                const { storeName, url } = { ...this.form }
                const { status, data, error } = await api.users.addStore({
                    user_token: this.userToken,
                    user_id: this.userId,
                    store_name: storeName,
                    store_url: url,
                })
                if (status === 'success') {
                    setStatusChange(this, 'status.error.addstore', false)
                    const authuser = Cookies.getJSON(appConstants.cookies.auth.name)  
                    const tempUser = { 
                        id: authuser.user_id,
                        token: authuser.user_token
                    }
                    await this.$store.dispatch('auth/logout')  
                    this.$store.dispatch('auth/loginNew', {
                        store: data,
                        user: tempUser,
                        route: '',
                    })
                    this.status.loading.addstore = false
                    this.close()
                    window.location = '/app'
                } else {
                    setStatusChange(this, 'status.error.addstore')
                    this.$toast.error(error)
                }
                this.status.loading.addstore = false
            })
        },
        close() {
            if (!this.status.loading.addstore) {
                this.resetForm()
                this.open = false
            }            
        },
    }
}
</script>