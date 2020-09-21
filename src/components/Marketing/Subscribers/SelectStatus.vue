<template>
    <div class="select-status">
        <p class="top-desc">
            Upload or import multiple subscribers. Not sure how to format your
            import?
            <a href="#">
                Download sample CSV file
            </a>
        </p>
        <b-form-group class="email-status" label="Select email opt-in status">
            <b-row>
                <b-col cols="12" sm="8">
                    <BasicSelect v-model="emailStatus" :options="statusList" />
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
            <b-form-checkbox v-model="smsStatus">
                Subscribe to SMS
            </b-form-checkbox>
            <div class="sms-desc">
                Checking this will sign subscribers up to receive texts from you
                if they have an associated phone number. Only add subscribers if
                you have their permission to receive SMS messages from you.
            </div>
        </div>
    </div>
</template>
<script>
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
            {
                value: 'archived',
                text: 'Archived',
            },
        ],
        emailStatus: 'Subscribed',
        smsStatus: '',
    }),
}
</script>
