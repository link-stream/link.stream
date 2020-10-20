<template>
    <b-modal modal-class="ScheduleEmailModal" centered v-model="open" size="lg">
        <template v-slot:modal-header>
            <BasicButton variant="icon" class="modal-close" @click="close" />
            <h4 class="title">Schedule this email</h4>
            <p class="mb-0">
                This message will be sent to all
                <span class="font-weight-bold">
                    {{ smsData.cnt_subscribers | thousandCNumber }}
                </span>
                subscribers
                <a href="#" class="btn-link">Edit Recipients</a>
            </p>
        </template>
        <template v-slot:default>
            <b-form-row>
                <b-col cols="12" sm="6">
                    <b-form-group label="Delivery Date">
                        <b-input-group class="date-input-group">
                            <DatePicker v-model="date" />
                        </b-input-group>
                    </b-form-group>
                </b-col>
                <b-col cols="12" sm="6">
                    <b-form-group label="Send Time">
                        <template v-slot:label>
                            <label class="mb-0">Send Time</label>
                            <small class="float-right">
                                {{ timezone.zone }}
                                <a href="#">Edit</a>
                            </small>
                        </template>
                        <b-input-group class="date-input-group">
                            <TimePicker v-model="time" />
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-form-row>
        </template>
        <template v-slot:modal-footer>
            <div class="right-col">
                <basic-button
                    class="action-btn cancel-btn text-black"
                    variant="link"
                    @click="close"
                >
                    Cancel
                </basic-button>
                <spinner-button
                    class="action-btn"
                    :loading="saving"
                    @click="handleScheduleClick"
                >
                    Schedule
                </spinner-button>
            </div>
        </template>
    </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
    name: 'ScheduleEmailModal',
    data: () => ({
        open: false,
        saving: false,
        date: new Date(),
        time: '00:00:00',
        cntSubscribers: 2257,
    }),
    computed: {
        ...mapGetters({
            user: 'me/user',
            timezones: 'common/timezones',
            smsData: 'marketing/smsData',
        }),
        timezone() {
            return this.timezones.find(({ id }) => id === this.user.timezone)
        },
    },
    async created() {
        this.$bus.$on('modal.scheduleEmail.open', this.handleOpen)
        this.$bus.$on('modal.scheduleEmail.close', this.handleClose)
        await this.$store.dispatch('common/loadTimezones')
        this.date = this.smsData.date
            ? new Date(this.smsData.date + ' 23:59:59')
            : new Date()
        this.time = this.smsData.time
        // console.log(this.smsData.date)
        // console.log(moment(this.smsData.date))
    },
    methods: {
        close() {
            this.open = false
        },
        handleClose() {
            this.open = false
        },
        handleOpen() {
            this.open = true
        },
        async handleScheduleClick() {
            this.saving = true
            const params = {
                ...this.smsData,
                scheduled: true,
                date: moment(this.date).format('YYYY-MM-DD'),
                time: this.time,
                status: 'Scheduled',
                template_type: this.smsData.template_type
                    ? this.smsData.template_type
                    : 'release',
            }
            if (this.smsData.id) {
                const { status, message, error } = await this.$store.dispatch(
                    'marketing/updateMessage',
                    {
                        id: this.smsData.id,
                        params: params,
                    }
                )
                status === 'success'
                    ? this.$toast.success(message)
                    : this.$toast.error(error)
            } else {
                const { status, message, error } = await this.$store.dispatch(
                    'marketing/insertMessage',
                    params
                )
                status === 'success'
                    ? this.$toast.success(message)
                    : this.$toast.error(error)
            }
            this.saving == false
            this.close()
            this.$router.push({
                name: 'marketingMessages',
            })
        },
    },
}
</script>
