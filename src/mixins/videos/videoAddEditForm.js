import { appConstants } from '~/constants'
import { mapGetters } from 'vuex'
import { required, requiredIf, minLength } from 'vuelidate/lib/validators'
import { helpers } from 'vuelidate/lib/validators'

import moment from 'moment'

export const videoAddEditForm = {
    created() {
        this.$store.dispatch('common/loadTimes')
        this.$store.dispatch('common/loadGenres')
        this.$store.dispatch('me/loadTracks')
        this.$store.dispatch('me/loadVisibilities')
    },
    data() {
        return {
            isSaving: false,
            form: {
                url: null,
                title: null,
                genre: null,
                relatedtrack: null,
                visibility: appConstants.user.visibilities.private,
                date: null,
                time: null,
                scheduled: null,
            },
        }
    },
    computed: {
        isEditMode() {
            return this.videoToEdit ? true : false
        },
        ...mapGetters({
            user: ['me/user'],
            relatedtracks: ['me/tracks'],
            visibilities: ['me/visibilities'],
            times: ['common/times'],
            genres: ['common/genres'],
        }),
        ytVidId() {
            return this.$youtube.getIdFromUrl(this.form.url)
        },
    },
    validations: {
        form: {
            url: {
                required,
                valid(value) {
                    return (
                        !helpers.req(value) ||
                        !!this.$youtube.getIdFromUrl(value)
                    )
                },
            },
            title: {
                required,
                minLength: minLength(10),
            },
            genre: {
                required,
            },
            visibility: {
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
            this.$v.form.date.$reset()
            this.$v.form.time.$reset()
            this.form.date = null
            this.form.time = null
            this.form.scheduled = !this.form.scheduled
        },
        resetForm() {
            this.isSaving = false
            this.$v.form.$reset()
            Object.keys(this.form).forEach(key => {
                this.form[key] = null
            })
        },
        async save() {
            this.$v.form.$touch()

            if (this.$v.form.$invalid) {
                return
            }

            this.isSaving = true

            const {
                url,
                title,
                genre,
                relatedtrack,
                visibility,
                date,
                time,
                scheduled,
            } = this.form

            const params = {
                user_id: this.user.id,
                url,
                title,
                genre_id: genre,
                related_track: relatedtrack,
                public: visibility,
                scheduled: scheduled ? 1 : 0,
            }

            if (scheduled) {
                params.date = moment(date).format('YYYY-MM-DD')
                params.time = time
            }

            const { status, error, message } = this.isEditMode
                ? await this.$store.dispatch('me/updateVideo', {
                      id: this.videoToEdit.id,
                      params,
                  })
                : await this.$store.dispatch('me/createVideo', {
                      params,
                  })

            if (status === 'success') {
                this.$toast.success(message)
                this.isEditMode
                    ? this.closeModal()
                    : this.$router.push({ name: 'userAccountVideos' })
            } else {
                this.$toast.error(error)
            }

            this.isSaving = false
        },
    },
}
