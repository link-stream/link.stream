import { mapGetters } from 'vuex'
import { BasicButton, SpinnerButton } from '~/components/Button'
import { DropFoto } from '~/components/Uploader'
import { DatePicker, TimePicker } from '~/components/Picker'
import { SelectBox } from '~/components/Select'
import { required, requiredIf, url } from 'vuelidate/lib/validators'
import { appConstants } from '~/constants'
import { moment } from 'moment'

export const linkAddEditForm = {
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
            editing: false,
            saving: false,
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
                return
            }

            this.saving = true

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

            this.saving = false
        },
        handleImageChange({ image }) {
            this.imageBase64 = image ? image.base64 : null
        },
    },
}
