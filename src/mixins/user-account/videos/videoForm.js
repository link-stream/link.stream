import { mapGetters } from 'vuex'
import { required, requiredIf, minLength } from 'vuelidate/lib/validators'
import { helpers } from 'vuelidate/lib/validators'

const VISIBILITY_SCHEDULED = 3

export const videoFormMixin = {
    computed: {
        isVisibilityScheduled() {
            return this.form.visibility === VISIBILITY_SCHEDULED
        },
        ...mapGetters({
            timezones: ['common/timezones'],
            times: ['common/times'],
            genres: ['common/genres'],
            relatedTracks: ['me/tracks'],
            visibilities: ['me/visibilities'],
        }),
        ytVidId() {
            return this.$youtube.getIdFromUrl(this.video.url)
        },
    },
    watch: {
        'form.visibility': function() {
            this.$v.form.pubDate.$reset()
            this.$v.form.pubTimezone.$reset()
            this.$v.form.pubTime.$reset()
        },
    },
    validations: {
        form: {
            youtubeUrl: {
                required,
                validUrl(value) {
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
            pubDate: {
                required: requiredIf(function() {
                    return this.isVisibilityScheduled
                }),
            },
            pubTimezone: {
                required: requiredIf(function() {
                    return this.isVisibilityScheduled
                }),
            },
            pubTime: {
                required: requiredIf(function() {
                    return this.isVisibilityScheduled
                }),
            },
        },
    },
}
