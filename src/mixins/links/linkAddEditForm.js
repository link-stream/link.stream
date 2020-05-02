import { mapGetters } from 'vuex'
import { BasicButton, SpinnerButton } from '~/components/Button'
import { DropFoto } from '~/components/Uploader'
import { DatePicker, TimePicker } from '~/components/Picker'
import { SelectBox } from '~/components/Select'
import { required, url } from 'vuelidate/lib/validators'
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
            endDateEnabled: false,
            form: {
                url: null,
                title: null,
                image: null,
                visibility: appConstants.visibilities.public,
                scheduled: null,
                date: new Date(),
                time: '00:00:00',
                endDate: new Date(),
                endTime: '00:00:00',
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

            const { url, title, data_image } = this.link

            this.form = {
                ...this.form,
                url,
                title,
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
        },
    },
    methods: {
        updateImage({ image }) {
            this.form.image = image ? image.base64 : null
        },
        toggleSchedule() {
            this.form.scheduled = !this.form.scheduled
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
                image,
                visibility,
                scheduled,
                date,
                time,
                endDate,
                endTime,
            } = this.form

            const params = {
                user_id: this.user.id,
                url,
                title,
            }

            if (this.editing) {
                const imageChanged = image !== this.link.data_image
                if (imageChanged) {
                    params.image = image
                }
            } else {
                params.image = image
                params.public = visibility
                if (scheduled) {
                    params.scheduled = 1
                    params.date = moment(date).format('YYYY-MM-DD')
                    params.time = time
                    if (this.endDateEnabled) {
                        params.end_date = moment(endDate).format('YYYY-MM-DD')
                        params.end_time = endTime
                    }
                }
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
                    this.hideEditView()
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
