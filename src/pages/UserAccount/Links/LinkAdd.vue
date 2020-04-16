<template>
    <div class="page page-ua-link-add">
        <div class="form-wiz is-final-step">
            <div class="fwz__topnav">
                <basic-button
                    class="fwz__back"
                    variant="link"
                    :to="{ name: 'userAccountLinks' }"
                >
                    <i class="ls-ic ls-ic-back"></i>
                    Links
                </basic-button>
            </div>

            <header class="fwz__header">
                <h1 class="fwz__title">
                    Add a link
                </h1>
            </header>

            <main class="fwz__body">
                <b-form-group
                    label="Copy &amp; Paste Your Link URL"
                    label-for="urlInput"
                >
                    <b-form-input
                        v-model="$v.form.url.$model"
                        :state="!$v.form.url.$error"
                        id="urlInput"
                    />
                    <b-form-invalid-feedback>
                        The URL is required
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Link Title" label-for="titleInput">
                    <b-form-input
                        v-model="$v.form.title.$model"
                        id="titleInput"
                        :state="!$v.form.title.$error"
                    />
                    <b-form-invalid-feedback>
                        The Title is required
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Link Visibility">
                    <b-form-radio-group v-model="form.visibility">
                        <b-form-radio value="1">Visible</b-form-radio>
                        <b-form-radio value="2">Hidden</b-form-radio>
                    </b-form-radio-group>
                </b-form-group>
            </main>

            <footer class="fwz__pager">
                <basic-button
                    class="fwz__prev"
                    variant="secondary"
                    :to="{ name: 'userAccountLinks' }"
                    :disabled="isSaving"
                    >Cancel</basic-button
                >
                <spinner-button
                    class="fwz__submit"
                    :loading="isSaving"
                    @click="save"
                    >Add Link</spinner-button
                >
            </footer>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { BasicButton, SpinnerButton } from '~/components/Button'
import { required } from 'vuelidate/lib/validators'
import { appConstants } from '~/constants'

export default {
    name: 'LinkAdd',
    components: {
        BasicButton,
        SpinnerButton,
    },
    data() {
        return {
            isSaving: false,
            form: {
                url: null,
                title: null,
                visibility: appConstants.user.visibilities.public,
            },
        }
    },
    validations: {
        form: {
            url: {
                required,
            },
            title: {
                required,
            },
        },
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
            visibilities: 'me/visibilities',
        }),
    },
    methods: {
        async save() {
            this.$v.form.$touch()

            if (this.$v.form.$invalid) {
                return
            }

            this.isSaving = true

            const { url, title, visibility } = this.form

            const params = {
                user_id: this.user.id,
                url,
                title,
                public: visibility,
            }

            const {
                status,
                message,
                error,
            } = await this.$store.dispatch('me/createLink', { params })

            if (status === 'success') {
                this.$toast.success(message)
                this.$router.push({ name: 'userAccountLinks' })
            } else {
                this.$toast.error(error)
            }

            this.isSaving = false
        },
    },
}
</script>
