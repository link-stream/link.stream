import { mapGetters } from 'vuex'
import { SpinnerButton, BasicButton } from '~/components/Button'
import { SelectBox } from '~/components/Select'
import { required, requiredIf, minLength } from 'vuelidate/lib/validators'
import { helpers } from 'vuelidate/lib/validators'
import { appConstants } from '~/constants'
import moment from 'moment'

export const videoAddEditForm = {
    components: {
        SpinnerButton,
        BasicButton,
        SelectBox,
    },
    created() {
        this.$store.dispatch('common/loadTimes')
        this.$store.dispatch('common/loadGenres')
        this.$store.dispatch('me/loadTracks')
        this.$store.dispatch('me/loadVisibilities')
    },
    data() {
        return {
            editing: false,
            saving: false,
            form: {
                url: null,
                title: null,
                genre: null,
                relatedTrack: null,
                visibility: appConstants.user.visibilities.private,
                date: null,
                time: null,
                scheduled: null,
            },
        }
    },
    computed: {
        ...mapGetters({
            user: ['me/user'],
            relatedTracks: ['me/tracks'],
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
        handleScheduleClick() {
            this.$v.form.date.$reset()
            this.$v.form.time.$reset()
            this.form.date = null
            this.form.time = null
            this.form.scheduled = !this.form.scheduled
        },
        async handleSaveClick() {
            this.$v.form.$touch()

            if (this.$v.form.$invalid) {
                return
            }

            this.saving = true

            const {
                url,
                title,
                genre,
                relatedTrack,
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
                related_track: relatedTrack,
                public: visibility,
                scheduled: scheduled ? 1 : 0,
            }

            if (scheduled) {
                params.date = moment(date).format('YYYY-MM-DD')
                params.time = time
            }

            const { status, error, message } = this.editing
                ? await this.$store.dispatch('me/updateVideo', {
                      id: this.video.id,
                      params,
                  })
                : await this.$store.dispatch('me/createVideo', {
                      params,
                  })

            if (status === 'success') {
                this.$toast.success(message)
                if (this.editing) {
                    this.editing = false
                } else {
                    this.$router.push({ name: 'userAccountVideos' })
                }
            } else {
                this.$toast.error(error)
            }

            this.saving = false
        },
    },
}
