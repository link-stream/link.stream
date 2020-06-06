<template>
    <b-modal modal-class="LinkScheduleModal" centered v-model="open">
        <template v-slot:modal-header>
            <LsButton variant="icon-bg" class="modal-close" @click="close" />
            <h2 class="modal-title">Schedule link</h2>
        </template>

        <template v-slot:default>
            <div class="form-group">
                <b-form-group label="Start Date">
                    <b-input-group class="dt-input-group">
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
                        @change="handleEndDateCheckChange"
                    >
                        Set end date
                    </b-form-checkbox>
                </b-form-group>

                <b-form-group label="End Date" v-show="endDateEnabled">
                    <b-input-group class="dt-input-group">
                        <LsDatePicker v-model="form.endDate" />
                        <LsTimePicker v-model="form.endTime" />
                    </b-input-group>
                    <div
                        class="invalid-feedback"
                        v-show="
                            $v.form.endDate.$error || $v.form.endTime.$error
                        "
                    >
                        Select end date and time
                    </div>
                </b-form-group>
            </div>
        </template>

        <template v-slot:modal-footer>
            <ls-button class="action-btn" variant="secondary" @click="close">
                Cancel
            </ls-button>
            <ls-spinner-button
                class="action-btn"
                :loading="loading"
                @click="handleSaveClick"
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
    data() {
        return {
            open: false,
            loading: false,
            endDateEnabled: false,
            form: {
                date: null,
                time: null,
                endDate: null,
                endTime: null,
            },
        }
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
    created() {
        this.$bus.$on('modal.linkSchedule.open', this.handleOpen)
    },
    methods: {
        close() {
            this.open = false
        },
        handleEndDateCheckChange() {
            this.$v.form.endDate.$reset()
            this.$v.form.endTime.$reset()
            this.endDateEnabled = !this.endDateEnabled
        },
        handleOpen(link) {
            this.$v.form.$reset()
            this.link = { ...link }
            this.endDateEnabled = false
            this.form = {
                date: null,
                time: null,
                endDate: null,
                endTime: null,
            }
            if (!this.link.scheduled) {
                this.open = true
                return
            }
            const { date, time, end_date, end_time } = this.link
            this.endDateEnabled = end_date && end_time ? true : false
            this.form = {
                ...this.form,
                date: new Date(date + ' 00:00:00'),
                time,
            }
            if (this.endDateEnabled) {
                this.form = {
                    ...this.form,
                    endDate: new Date(end_date + ' 00:00:00'),
                    endTime: end_time,
                }
            }
            this.open = true
        },
        async handleSaveClick() {
            this.$v.form.$touch()

            if (this.$v.form.$invalid) {
                return
            }

            this.loading = true

            const { date, time, endDate, endTime } = this.form

            const params = {
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
    },
}
</script>
