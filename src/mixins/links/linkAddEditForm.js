import { mapGetters } from 'vuex'
import { BasicButton, SpinnerButton } from '~/components/Button'
import { DropFoto } from '~/components/Uploader'
import { DatePicker, TimePicker } from '~/components/Picker'
import { SelectBox } from '~/components/Select'
import { required, requiredIf, url } from 'vuelidate/lib/validators'
import { appConstants } from '~/constants'
import moment from 'moment'

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
            loading: false,
            form: {
                url: null,
                title: null,
                visibility: appConstants.visibilities.public,
                scheduled: null,
                date: null,
                time: null,
                image: null,
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
    watch: {
        editing() {
            if (!this.editing) {
                return
            }
            const {
                url,
                title,
                public: visibility,
                scheduled,
                date,
                time,
                data_image,
            } = this.link
            this.form = {
                ...this.form,
                url,
                title,
                visibility,
                scheduled,
                date: new Date(date + ' 00:00:00'),
                time,
                image: data_image,
            }
        },
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
        updateImage({ image }) {
            this.form.image = image ? image.base64 : null
        },
        toggleSchedule() {
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

            this.loading = true

            const {
                url,
                title,
                visibility,
                date,
                time,
                scheduled,
                image,
            } = this.form

            const params = {
                user_id: this.user.id,
                url,
                title,
                public: visibility,
                scheduled: scheduled ? 1 : 0,
                image,
            }

            if (scheduled) {
                params.date = moment(date).format('YYYY-MM-DD')
                params.time = time
            }

            const { status, message, error } = this.editing
                ? await this.$store.dispatch('me/updateLink', {
                      id: this.link.id,
                      params,
                  })
                : await this.$store.dispatch('me/createLink', { params })

            if (status === 'success') {
                this.$toast.success(message)
                if (this.editing) {
                    this.closeEditView()
                } else {
                    this.$router.push({ name: 'userAccountLinks' })
                }
            } else {
                this.$toast.error(error)
            }

            this.loading = false
        },
    },
}
