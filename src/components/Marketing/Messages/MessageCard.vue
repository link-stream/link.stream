<template>
    <div class="Card MessageCard">
        <div class="item-body">
            <b-row>
                <b-col cols="12" sm="6" class="d-flex">
                    <div class="icon-container d-none d-sm-block">
                        <font-awesome-icon
                            v-if="message.type === 'Email'"
                            :icon="['fas', 'envelope-open-text']"
                            class="h3"
                        />
                        <font-awesome-icon
                            v-else-if="message.type === 'SMS'"
                            :icon="['fas', 'mobile-alt']"
                            class="h3"
                        />
                    </div>
                    <div class="text-content">
                        <h4 class="item-title">
                            {{ message.campaing_name }}
                        </h4>
                        <small class="item-subtitle">
                            <span class="message-type">
                                {{ message.type }}&nbsp;&middot;&nbsp;
                            </span>
                            <span>
                                {{
                                    message.status === 'Sent'
                                        ? 'Sent'
                                        : 'Edited'
                                }}
                                &nbsp;
                            </span>
                            <span class="message-datetime">
                                {{ message.created_at | fullDateTime }}
                            </span>
                        </small>
                    </div>
                </b-col>
                <b-col cols="12" sm="2">
                    <div
                        class="message-status"
                        :class="getStatusString.toLowerCase()"
                    >
                        {{ getStatusString }}
                    </div>
                </b-col>
                <b-col v-if="message.status === 'Sent'" cols="12" sm="4">
                    <b-row class="mx-0">
                        <b-col class="px-0">
                            <div class="number-value">
                                {{ message.opens }}%
                            </div>
                            <div class="number-title">
                                Opens
                            </div>
                        </b-col>
                        <b-col class="px-0">
                            <div class="number-value">
                                {{ message.clicks }}%
                            </div>
                            <div class="number-title">
                                Clicks
                            </div>
                        </b-col>
                        <b-col class="px-0">
                            <div class="number-value">
                                {{ message.revenue | currencyFormat }}
                            </div>
                            <div class="number-title">
                                Revenue
                            </div>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </div>
        <BasicButton
            v-if="message.status === 'Scheduled' || message.status === 'Draft'"
            variant="icon"
            title="Edit"
            class="card-edit-btn"
            size="sm"
            @click="handleEditClick"
        />
        <b-dropdown v-else class="actions-menu" variant="icon" right no-caret>
            <template v-slot:button-content>
                <Icon icon="dot-menu-h" />
            </template>
            <b-dropdown-item @click="handleViewReportClick">
                View Report
            </b-dropdown-item>
            <b-dropdown-item>
                View Email
            </b-dropdown-item>
            <b-dropdown-item>
                Duplicate
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
export default {
    name: 'MessageCard',
    props: {
        message: {
            type: Object,
            required: true,
        },
    },
    computed: {
        getStatusString() {
            if (this.message.status === 'Sent') {
                return 'Sent'
            } else {
                return this.message.scheduled ? 'Scheduled' : 'Draft'
            }
        },
    },
    methods: {
        handleEditClick() {
            if (this.message.type === 'SMS') {
                this.$store.dispatch('marketing/setSMSData', {
                    ...this.message,
                })
                this.$bus.$emit('modal.createSMS.open')
            } else if (this.message.type === 'Email') {
                console.log('Set message', this.message)
                this.$store.dispatch('marketing/setSMSData', {
                    ...this.message,
                })
                this.$router.push({
                    name: 'editMessage',
                })
            }
        },
        handleViewReportClick() {
            this.$router.push({
                name: 'reportMessage',
            })
        },
    },
}
</script>
