<template>
    <div class="select-status">
        <p class="top-desc">
            Upload or import multiple subscribers. Not sure how to format your
            import?
            <a :href="smapleFileName" download>
                Download sample CSV file
            </a>
        </p>
        <b-form-group class="email-status" label="Select email opt-in status">
            <b-row>
                <b-col cols="12" sm="8">
                    <BasicSelect
                        v-model="emailStatus"
                        :options="statusList"
                        :reduce="status => status.value"
                        label="text"
                    />
                </b-col>
            </b-row>
        </b-form-group>
        <div class="down-desc">
            <p class="mb-0 font-weight-bold">
                Only add subscribers that gave you permission.
            </p>
            <p class="mb-0">
                Purchased email lists, co-registered subscribers and any other
                people who did not give you their permission directly can not be
                emailed with LinkStream.
            </p>
        </div>
        <div class="sms-status">
            <b-form-checkbox
                v-model="smsStatus"
                value="subscribed"
                unchecked-value="unsubscribed"
            >
                Subscribe to SMS
            </b-form-checkbox>
            <div class="sms-desc">
                <p class="mb-0">
                    Checking this will sign subscribers up to receive texts from
                    you if they have an associated phone number.
                </p>
                <p class="mb-0">
                    Only add subscribers if you have their permission to receive
                    SMS messages from you.
                </p>
            </div>
        </div>
        <footer class="page-footer">
            <spinner-button class="btn-next" @click="handleNextClick">
                Next
            </spinner-button>
        </footer>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { appConstants } from '~/constants'
export default {
    name: 'SelectStatus',
    data: () => ({
        statusList: [
            {
                value: 'subscribed',
                text: 'Subscribed',
            },
            {
                value: 'unsubscribed',
                text: 'UnsubScribed',
            },
            // {
            //     value: 'archived',
            //     text: 'Archived',
            // },
        ],
        emailStatus: 'unsubscribed',
        smsStatus: 'unsubscribed',
        smapleFileName: appConstants.sampleSubscribersFile,
    }),
    computed: {
        ...mapGetters({
            importData: 'marketing/importData',
        }),
    },
    methods: {
        async handleNextClick() {
            const params = {
                ...this.importData,
                emailStatus: this.emailStatus,
                smsStatus: this.smsStatus,
            }
            await this.$store.dispatch('marketing/setImportData', params)
            this.$emit('next')
        },
    },
}
</script>
