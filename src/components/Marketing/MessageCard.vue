<template>
    <div class="Card MessageCard">
        <div class="item-body">
            <b-row>
                <b-col
                    cols="12"
                    sm="6"
                    class="d-flex"
                >
                    <div class="icon-container d-none d-sm-block">
                        <font-awesome-icon
                            v-if="message.type === 'email'" 
                            :icon="['fas', 'envelope-open-text']"
                            class="h3"
                        />
                        <font-awesome-icon
                            v-else-if="message.type === 'sms'" 
                            :icon="['fas', 'mobile-alt']"
                            class="h3"
                        />
                    </div>
                    <div class="text-content">
                        <h4 class="item-title">
                            {{ message.title }}
                        </h4>
                        <small class="item-subtitle">
                            <span class="message-type">{{ message.type }}&middot;</span>
                            <span>{{ message.status === 'sent' ? 'Sent' : 'Editted' }}</span>
                            <span class="message-datetime">{{ message.datetime | fullDateTime }}</span>
                        </small>
                    </div>
                </b-col>
                <b-col
                    cols="12"
                    sm="2"
                >
                    <div class="message-status" :class="message.status">
                        {{ message.status }}
                    </div>
                </b-col>
                <b-col
                    v-if="message.status === 'sent'"
                    cols="12"
                    sm="4"
                >
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
            v-if="message.status === 'scheduled' || message.status === 'draft'"
            variant="icon"
            title="Edit"
            class="card-edit-btn"
            size="sm"
            @click="handleEditClick"
        />
        <b-dropdown
            v-else
            class="actions-menu"
            variant="icon"
            right
            no-caret
        >
            <template v-slot:button-content>
                <Icon icon="dot-menu-h" />
            </template>
            <b-dropdown-item>
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
import { appConstants } from '~/constants'

export default {
    name: 'MessageCard',
    props: {
        message: {
            type: Object,
            required: true,
        },
    },
    methods: {
        handleEditClick() {},
    },
}
</script>
