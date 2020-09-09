<template>
    <b-modal
        modal-class="CreateSMSModal"
        centered
        v-model="open"
        size="lg"
    >
        <template v-slot:modal-header>
            <BasicButton variant="icon" class="modal-close" @click="close" />
            <h4 class="title">Send a SMS to your followers</h4>
        </template>
        <template v-slot:default>
            <b-form-group label="Audience" label-for="audienceInput">
                <BasicSelect
                    v-model="$v.form.audience.$model"
                    id="audienceInput"
                    placeholder="Select Audience"
                    :options="audienceList"
                    :reduce="audience => audience.id"
                    label="name"
                    :state="!$v.form.audience.$error"
                />
                <b-form-invalid-feedback>
                    <template v-if="!$v.form.audience.required">
                        Select a audience
                    </template>
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Segment or Tag (optional)" label-for="segmentTagInput">
                <BasicSelect
                    v-model="form.segmentTag"
                    id="segmentTagInput"
                    placeholder="Select Segment or Tag"
                    :options="segmentTagList"
                    :reduce="segmentTag => segmentTag.id"
                    label="title"
                />
            </b-form-group>
            <p>
                Message will be sent to
                <span class="active-number">{{ cntSubscribers | thousandCNumber }}</span>
                SMS subscribers
            </p>
            <b-form-row>
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
            <b-form-group label="Message" label-for="message">
                <b-form-textarea
                    id="message"
                    name="message"
                    v-model="$v.form.message.$model"
                    placeholder="Please enter message content"
                    rows="5"
                    :maxlength="maxLength"
                    :state="!$v.form.message.$error"
                ></b-form-textarea>
                <template v-slot:description>
                    <span class="text-muted float-right">
                        Characters:
                        {{ `${form.message.length}/${maxLength}` }}
                    </span>
                </template>
                <b-form-invalid-feedback>
                    <template v-if="!$v.form.message.required">
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
import { appConstants } from '~/constants'
import { required } from 'vuelidate/lib/validators'
export default {
    name: 'SelectMessageTypeModal',
    data: () => ({
        open: false,
        form: {
            audience: null,
            segmentTag: null,
            date: new Date(),
            time: '00:00:00',
            message: '',
        },
        audienceList: [{
            id: '1',
            name: 'Hydro Kitty',
        }],
        segmentTagList: [{
            id: 0,
            title: 'All SMS subscribers in audience',
        }],
        cntSubscribers: 2257,
        maxLength: appConstants.maxMessageLength,
    }),
    computed: {
        ...mapGetters({
            user: 'me/user',
            timezones: 'common/timezones',
        }),
        timezone() {
            return this.timezones.find(({ id }) => id === this.user.timezone)
        }
    },
    validations: {
        form: {
            audience: {
                required,
            },
            message: {
                required,
            },
        },
    },
    async created() {
        this.$bus.$on('modal.createSMS.open', this.handleOpen)
        this.$bus.$on('modal.createSMS.close', this.handleClose)
        await this.$store.dispatch('common/loadTimezones')
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
        handleScheduleClick() {
            this.$v.form.$touch()
            if (this.$v.form.$invalid) {
                return
            }
            console.log(this.form)
            this.close()
        },
    },
}
</script>
