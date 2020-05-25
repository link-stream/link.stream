import { mapGetters } from 'vuex'
import { DropImage } from '~/components/Uploader'
import { required, url } from 'vuelidate/lib/validators'
import { appConstants } from '~/constants'
import moment from 'moment'

export const linkAddEditForm = {
    components: {
        DropImage,
    },
    data() {
        return {
            editing: false,
            loading: false,
            endDateEnabled: false,
            form: {
                url: null,
                title: null,
                imageBase64: null,
                visibility: appConstants.visibilities.public,
                scheduled: null,
                date: new Date(),
                time: '00:00:00',
                endDate: new Date(),
                endTime: '00:00:00',
            },
        }
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
                imageBase64: data_image,
            }
        },
    },
    methods: {
        handleImageAdded(file) {
            this.form.imageBase64 = file.base64
        },
        handleImageRemoved() {
            this.form.imageBase64 = null
        },
        async handleSaveClick() {
            this.$v.form.$touch()

            if (this.$v.form.$invalid) {
                return
            }

            this.loading = true

            const {
                url,
                title,
                imageBase64,
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
                const didImageChange = imageBase64 !== this.link.data_image
                if (didImageChange) {
                    params.image = imageBase64
                }
            } else {
                params.image = imageBase64
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
                    this.closeEdit()
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
