import { mapGetters } from 'vuex'
import { SpinnerButton, BasicButton } from '~/components/Button'
import { SelectBox } from '~/components/Select'
import { required, minLength } from 'vuelidate/lib/validators'
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
            loading: false,
            editing: false,
            form: {
                url: null,
                title: null,
                genre: null,
                relatedTrack: null,
                visibility: appConstants.visibilities.private,
                scheduled: null,
                date: null,
                time: null,
            },
        }
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
        },
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
    methods: {
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
                date: scheduled ? moment(date).format('YYYY-MM-DD') : null,
                time: scheduled ? time : null,
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
                    this.close()
                } else {
                    this.$router.push({ name: 'userAccountVideos' })
                }
            } else {
                this.$toast.error(error)
            }

            this.loading = false
        },
    },
}
