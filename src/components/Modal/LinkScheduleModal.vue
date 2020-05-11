<template>
    <b-modal
        modal-class="mdl-lnk-sched"
        ref="modal"
        @hidden="handleHidden"
        centered
        no-close-on-backdrop
        no-close-on-esc
    >
        <template v-slot:modal-header>
            <LsIconButton class="modal-close" use-bg-img @click="close" />
            <h2 class="modal-title">Schedule link</h2>
        </template>

        <template v-slot:default>
            <div class="form-group">
                <b-form-group label="Start Date">
                    <b-input-group class="input-group-datetime">
                        <LsDatePicker v-model="form.date" />
                        <LsTimePicker v-model="form.time" />
                    </b-input-group>
                    <div
                        class="invalid-feedback"
                        v-if="$v.form.date.$error || $v.form.time.$error"
                    >
                        Select start date and time
                    </div>
                </b-form-group>

                <b-form-group>
                    <b-form-checkbox
                        :checked="endDateEnabled"
                        @change="toggleEndDate"
                    >
                        Set end date
                    </b-form-checkbox>
                </b-form-group>

                <b-form-group label="End Date" v-if="endDateEnabled">
                    <b-input-group class="input-group-datetime">
                        <LsDatePicker v-model="form.endDate" />
                        <LsTimePicker v-model="form.endTime" />
                    </b-input-group>
                    <div
                        class="invalid-feedback"
                        v-if="$v.form.endDate.$error || $v.form.endTime.$error"
                    >
                        Select end date and time
                    </div>
                </b-form-group>
            </div>
        </template>

        <template v-slot:modal-footer>
            <ls-button class="modal-action" variant="secondary" @click="close">
                Cancel
            </ls-button>
            <ls-spinner-button
                class="modal-action"
                :loading="loading"
                @click="save"
            >
                Save
            </ls-spinner-button>
        </template>
    </b-modal>
</template>

<script>
import { required, requiredIf } from 'vuelidate/lib/validators'
import moment from 'moment'

export default {
    name: 'LinkScheduleModal',
    props: {
        link: {
            type: Object,
            required: true,
        },
    },
    data() {
        const data = {
            loading: false,
            endDateEnabled: false,
            form: {
                date: null,
                time: null,
                endDate: null,
                endTime: null,
            },
        }

        if (this.link.scheduled) {
            const { date, time, end_date, end_time } = this.link
            data.form.date = new Date(date + ' 00:00:00')
            data.form.time = time
            if (end_date && end_time) {
                data.endDateEnabled = true
                data.form.endDate = new Date(end_date + ' 00:00:00')
                data.form.endTime = end_time
            }
        }

        return data
    },
    validations: {
        form: {
            date: {
                required,
            },
            time: {
                required,
            },
            endDate: {
                required: requiredIf(function() {
                    return this.endDateEnabled
                }),
            },
            endTime: {
                required: requiredIf(function() {
                    return this.endDateEnabled
                }),
            },
        },
    },
    mounted() {
        this.$refs.modal.show()
    },
    methods: {
        close() {
            this.$refs.modal.hide()
        },
        toggleEndDate() {
            this.form.endDate = null
            this.form.endTime = null
            this.$v.form.endDate.$reset()
            this.$v.form.endTime.$reset()
            this.endDateEnabled = !this.endDateEnabled
        },
        async save() {
            this.$v.form.$touch()

            if (this.$v.form.$invalid) {
                return
            }

            this.loading = true

            const { date, time, endDate, endTime } = this.form

            let params = {
                scheduled: 1,
                date: moment(date).format('YYYY-MM-DD'),
                time,
                end_date: null,
                end_time: null,
            }

            if (this.endDateEnabled) {
                params.end_date = moment(endDate).format('YYYY-MM-DD')
                params.end_time = endTime
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
