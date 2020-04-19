<template>
    <div class="page page-ua-link-add">
        <div class="form-wiz is-final-step">
            <div class="fwz__topnav">
                <basic-button class="fwz__back" variant="link" :to="{ name: 'userAccountLinks' }">
                    <i class="ls-ic ls-ic-back"></i>
                    Links
                </basic-button>
            </div>

            <header class="fwz__header">
                <h1 class="fwz__title">Add a link</h1>
            </header>

            <section class="fwz__step">
                <main>
                    <b-form-group label="Copy &amp; Paste Your Link URL" label-for="urlInput">
                        <b-form-input
                            v-model="$v.form.url.$model"
                            :state="!$v.form.url.$error"
                            placeholder="e.g. https://myblog.blogspot.com"
                            id="urlInput"
                        />
                        <b-form-invalid-feedback>Enter a valid URL</b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group label="Link Title" label-for="titleInput">
                        <b-form-input
                            v-model="$v.form.title.$model"
                            id="titleInput"
                            placeholder="e.g. My Blog"
                            :state="!$v.form.title.$error"
                        />
                        <b-form-invalid-feedback>Enter a title</b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group label="Link Visibility">
                        <b-form-radio-group v-model="form.visibility">
                            <b-form-radio value="1">Visible</b-form-radio>
                            <b-form-radio value="2">Hidden</b-form-radio>
                        </b-form-radio-group>
                    </b-form-group>

                    <b-form-group label="Publish Date" v-if="form.scheduled">
                        <b-input-group
                            class="datetime-input-group"
                            :class="{ 'is-invalid': $v.form.date.$error || $v.form.time.$error }"
                        >
                            <DatePicker v-model="$v.form.date.$model" />
                            <TimePicker v-model="$v.form.time.$model" />
                        </b-input-group>
                        <b-form-invalid-feedback
                            :state="
                            $v.form.date.$error || $v.form.time.$error
                                ? false
                                : true
                            "
                        >Select a date and time</b-form-invalid-feedback>
                    </b-form-group>

                    <basic-button variant="link" @click="toggleScheduled">
                        {{
                        form.scheduled ? 'Clear scheduling ' : 'Schedule this link'
                        }}
                    </basic-button>
                </main>
                <aside>
                    <DropFoto @change="handleImageChange" />
                </aside>
            </section>

            <footer class="fwz__pager">
                <basic-button
                    class="fwz__prev"
                    variant="secondary"
                    :to="{ name: 'userAccountLinks' }"
                    :disabled="isSaving"
                >Cancel</basic-button>
                <spinner-button class="fwz__submit" :loading="isSaving" @click="save">Add Link</spinner-button>
            </footer>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { BasicButton, SpinnerButton } from '~/components/Button'
import { DropFoto } from '~/components/Uploader'
import { DatePicker, TimePicker } from '~/components/Picker'
import { SelectBox } from '~/components/Select'
import { required, requiredIf, url } from 'vuelidate/lib/validators'
import { appConstants } from '~/constants'
import { moment } from 'moment'

export default {
    name: 'LinkAdd',
    components: {
        BasicButton,
        SpinnerButton,
        DropFoto,
        DatePicker,
        TimePicker,
        SelectBox,
    },
    data() {
        return {
            isSaving: false,
            imageBase64: null,
            form: {
                url: 'http://slicvic.com',
                title: 'slicvic',
                visibility: appConstants.user.visibilities.public,
                date: null,
                time: null,
                scheduled: false,
            },
        }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
            visibilities: 'me/visibilities',
            times: 'common/times',
        }),
    },
    validations: {
        form: {
            url: {
                required,
                url,
            },
            title: {
                required,
            },
            date: {
                required: requiredIf(function() {
                    return this.form.scheduled
                }),
            },
            time: {
                required: requiredIf(function() {
                    return this.form.scheduled
                }),
            },
        },
    },
    methods: {
        toggleScheduled() {
            this.form.scheduled = !this.form.scheduled
            this.form.date = null
            this.form.time = null
            this.$v.form.date.$reset()
            this.$v.form.time.$reset()
        },
        async save() {
            this.$v.form.$touch()

            if (this.$v.form.$invalid) {
                console.log('xxx')
                return
            }

            this.isSaving = true

            const { url, title, visibility, date, time, scheduled } = this.form

            const params = {
                user_id: this.user.id,
                url,
                title,
                public: visibility,
                scheduled: scheduled ? 1 : 0,
                image: this.imageBase64,
            }

            if (scheduled) {
                params.date = moment(date).format('YYYY-MM-DD')
                params.time = time
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
        handleImageChange({ image }) {
            this.imageBase64 = image ? image.base64 : null
        },
    },
}
</script>
