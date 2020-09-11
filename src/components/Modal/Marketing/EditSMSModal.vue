<template>
    <b-modal
        modal-class="EditSMSModal"
        centered
        v-model="open"
        size="lg"
    >
        <template v-slot:modal-header>
            <a href="#" class="modal-back" @click.prevent="back">
                <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </a>
            <BasicButton variant="icon" class="modal-close" @click="close" />
            <h4 class="title">Send an SMS message</h4>
        </template>
        <template v-slot:default>
            <b-form-group label="Segment or Tag (optional)" label-for="segmentTagInput">
                <BasicSelect
                    v-model="form.send_to"
                    id="segmentTagInput"
                    placeholder="Select Segment or Tag"
                    :options="sendtos"
                    :reduce="send_to => send_to.value"
                    label="title"
                />
            </b-form-group>
            <p>
                Message will be sent to
                <span class="active-number">
                    {{ cntSubscribers | thousandCNumber }}
                </span>
                SMS subscribers
            </p>
            <b-form-row v-if="smsData.scheduled">
                <b-col cols="12" sm="6">
                    <b-form-group label="Delivery Date">
                        <b-input-group class="date-input-group">
                            <DatePicker v-model="form.date" />
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
                            <TimePicker v-model="form.time" />
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-form-row>
            <b-form-group label="Message" label-for="content">
                <b-form-textarea
                    id="content"
                    name="content"
                    v-model="$v.form.content.$model"
                    placeholder="Please enter message content"
                    rows="5"
                    :maxlength="maxLength"
                    :state="!$v.form.content.$error"
                ></b-form-textarea>
                <template v-slot:description>
                    <span class="text-muted float-right">
                        Characters:
                        {{ `${form.content.length}/${maxLength}` }}
                    </span>
                </template>
                <b-form-invalid-feedback>
                    <template v-if="!$v.form.content.required">
                        Enter message content
                    </template>
                </b-form-invalid-feedback>
            </b-form-group>
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
                    {{ smsData.scheduled ? 'Schedule' : 'Send Now' }}
                </spinner-button>
            </div>
        </template>
    </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import { appConstants } from '~/constants'
import { required } from 'vuelidate/lib/validators'
import moment from 'moment'
export default {
    name: 'EditSMSModal',
    data: () => ({
        open: false,
        saving: false,
        form: {
            send_to: null,
            date: new Date(),
            time: '00:00:00',
            content: '',
        },
        cntSubscribers: 2257,
        maxLength: appConstants.maxMessageLength,
    }),
    computed: {
        ...mapGetters({
            user: 'me/user',
            timezones: 'common/timezones',
            sendtos: 'marketing/sendtos',
            smsData: 'marketing/smsData',
        }),
        timezone() {
            return this.timezones.find(({ id }) => id === this.user.timezone)
        },
    },
    watch: {
        smsData(value) {
            this.form = {
                ...value,
                date: new Date(value.date),
            }
        },
    },
    validations: {
        form: {
            content: {
                required,
            },
        },
    },
    async created() {
        this.$bus.$on('modal.editSMS.open', this.handleOpen)
        this.$bus.$on('modal.editSMS.close', this.handleClose)

        await this.$store.dispatch('common/loadTimezones')
        await this.$store.dispatch('marketing/getMessageSendto')
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
        back() {
            this.$bus.$emit('modal.createSMS.open')
            this.close()
        },
        async handleScheduleClick() {
            this.$v.form.$touch()
            if (this.$v.form.$invalid) {
                return
            }
            this.saving = true
            const params = {
                user_id: this.user.id,
                type: 'SMS',
                campaing_name: this.smsData.campaing_name,
                send_to: this.form.send_to,
                reply_to: '',
                subject: '',
                content: this.form.content,
                scheduled: this.smsData.scheduled,
                date: moment(this.form.date).format('YYYY-MM-DD'),
                time: this.form.time,
            }
            console.log(params)
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
                const { status, message, error } = await this.$store.dispatch('marketing/insertMessage', params)
                status === 'success'
                    ? this.$toast.success(message)
                    : this.$toast.error(error)
            }
            this.saving == false
            this.$router.push({
                name: 'sentSMS',
            })
            this.close()
        },
    },
}
</script>
