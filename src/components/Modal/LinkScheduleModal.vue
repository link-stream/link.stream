<template>
    <b-modal
        modal-class="mdl-lnk-sched"
        v-model="show"
        @hidden="handleHidden"
        centered
        no-close-on-backdrop
        no-close-on-esc
    >
        <template v-slot:modal-header>
            <IconButton class="modal-close" use-bg-img @click="close" />
            <h2 class="modal-title">Schedule link</h2>
        </template>

        <template v-slot:default>
            <div class="form-group">
                <div class="input-group input-group-datetime">
                    <DatePicker v-model="form.date" />
                    <TimePicker v-model="form.time" />
                </div>
                <div class="invalid-feedback" v-if="formError">
                    Select a date and time
                </div>
            </div>
            <basic-button
                variant="link"
                @click="removeSchedule"
                v-if="canRemoveSchedule"
            >
                Remove scheduling
            </basic-button>
        </template>

        <template v-slot:modal-footer>
            <basic-button
                class="modal-action"
                variant="secondary"
                @click="close"
            >
                Cancel
            </basic-button>
            <spinner-button
                class="modal-action"
                :loading="loading"
                @click="save"
            >
                Save
            </spinner-button>
        </template>
    </b-modal>
</template>

<script>
import { DatePicker, TimePicker } from '~/components/Picker'
import { IconButton, BasicButton, SpinnerButton } from '~/components/Button'
import { requiredIf } from 'vuelidate/lib/validators'
import moment from 'moment'

export default {
    name: 'LinkScheduleModal',
    components: {
        DatePicker,
        TimePicker,
        IconButton,
        BasicButton,
        SpinnerButton,
    },
    props: {
        link: {
            type: Object,
            required: true,
        },
    },
    data() {
        const { date, time, scheduled } = this.link

        return {
            show: true,
            loading: false,
            formError: false,
            form: {
                date: scheduled ? new Date(date + ' 00:00:00') : null,
                time: scheduled ? time : null,
            },
        }
    },
    computed: {
        canRemoveSchedule() {
            return this.link.scheduled && this.form.date && this.form.time
        },
    },
    watch: {
        form: {
            deep: true,
            handler(form) {
                if (form.date && form.time) {
                    this.formError = false
                }
            },
        },
    },
    validations: {
        form: {
            date: {
                required: requiredIf(function() {
                    return this.form.time ? true : false
                }),
            },
            time: {
                required: requiredIf(function() {
                    return this.form.date ? true : false
                }),
            },
        },
    },
    methods: {
        close() {
            this.show = false
        },
        removeSchedule() {
            this.form.date = null
            this.form.time = null
        },
        async save() {
            if (this.$v.form.$invalid) {
                this.formError = true
                return
            }

            this.loading = true

            const { date, time } = this.form

            let params = {
                scheduled: 0,
                time: null,
                date: null,
            }

            if (date && time) {
                params = {
                    ...params,
                    scheduled: 1,
                    date: moment(date).format('YYYY-MM-DD'),
                    time,
                }
            }

            const { status, message, error } = await this.$store.dispatch(
                'me/updateLink',
                {
                    id: this.link.id,
                    params,
                }
            )

            if (status === 'success') {
                this.close()
                this.$toast.success(message)
            } else {
                this.$toast.error(error)
            }

            this.loading = false
        },
        handleHidden() {
            this.$emit('hidden')
        },
    },
}
</script>
