import { mapGetters } from 'vuex'
import { DropImage } from '~/components/Uploader'
import { required, url } from 'vuelidate/lib/validators'
import moment from 'moment'

export const linkAddEditForm = {
    components: {
        DropImage,
    },
    data() {
        return {
            editing: false,
            processing: false,
            endDateEnabled: false,
            form: {
                url: null,
                title: null,
                coverArtBase64: null,
                visibility: 1,
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
        }),
    },
    watch: {
        editing(newValue) {
            if (!newValue) {
                return
            }

            const { url, title, data_image } = this.link

            this.form = {
                ...this.form,
                url,
                title,
                coverArtBase64: data_image,
            }
        },
    },
    methods: {
        handleImageAdded(file) {
            this.form.coverArtBase64 = file.base64
        },
        handleImageRemoved() {
            this.form.coverArtBase64 = null
        },
        async handleSaveClick() {
            this.$v.form.$touch()

            if (this.$v.form.$invalid) {
                return
            }

            this.processing = true

            const {
                url,
                title,
                coverArtBase64,
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
                const coverArtChanged = coverArtBase64 !== this.link.data_image
                if (coverArtChanged) {
                    params.image = coverArtBase64
                }
            } else {
                params.image = coverArtBase64
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
                    this.closeEditMode()
                } else {
                    this.$router.push({ name: 'userAccountLinks' })
                }
            } else {
                this.$toast.error(error)
            }

            this.processing = false
        },
    },
}
