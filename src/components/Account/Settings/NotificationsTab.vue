<template>
    <div class="tab NotificationsTab">
        <div class="tab-body">
            <div class="mb-3">
                <div 
                    class="notification-item border-bottom"
                    v-for="(item, index) in notificationItems"
                    :key="index"
                >
                    <div class="item-body">
                        <h4 class="item-title">
                            {{ item.title }}
                        </h4>
                        <small class="item-subtitle">
                            {{ item.description }}
                        </small>
                    </div>
                    <div class="item-action">
                        <b-form-checkbox
                            class="custom-control-inline"
                            :checked="item.email"
                        >
                            Email
                        </b-form-checkbox>
                        <b-form-checkbox
                            v-if="item.type === 1"
                            class="custom-control-inline"
                            :checked="item.push_notification"
                        >
                            Push Notification
                        </b-form-checkbox>
                    </div>
                </div>
            </div>
            <div class="my-5">
                <h2 class="my-2">Updates from LinkStream</h2>
                <div 
                    class="notification-item border-top"
                    v-for="(item, index) in updateNotifictionsItems"
                    :key="index"
                >
                    <div class="item-body">
                        <h4 class="item-title font-weight-light">
                            {{ item.title }}
                        </h4>
                    </div>
                    <div class="item-action">
                        <b-form-checkbox
                            class="custom-control-inline"
                            :checked="item.email"
                            :class="{ 'only-email': item.type==2 }"
                        >
                            Email
                        </b-form-checkbox>
                        <b-form-checkbox
                            v-show="item.type === 1"
                            class="custom-control-inline"
                            :checked="item.push_notification"
                        >
                            Push Notification
                        </b-form-checkbox>
                    </div>
                </div>
            </div>
            <footer class="page-footer border-top mt-3 pt-3">
                <basic-button
                    class="cancel-btn"
                    variant="secondary"
                    size="md"
                    :disabled="saving"
                >
                    Cancel
                </basic-button>
                <spinner-button
                    size="md"
                    :loading="saving"
                    @click="handleSaveClick"
                    class="float-right"
                >
                    Save
                </spinner-button>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotificationsTab',
    data: () =>({
        notificationItems: [
            {
                id: 1,
                title: 'Sales',
                description: 'When someone purchases my tracks/sound kits',
                email: false,
                push_notification: false,
                type: 1
            },
            {
                id: 2,
                title: 'Follows',
                description: 'When someone follows you',
                email: false,
                push_notification: false,
                type: 1
            },
            {
                id: 3,
                title: 'Likes',
                description: 'When someone likes your track or sound kit',
                email: false,
                push_notification: false,
                type: 1
            },
            {
                id: 4,
                title: 'Reposts',
                description: 'When someone reposts your track or sound kit',
                email: false,
                push_notification: false,
                type: 1
            },
            {
                id: 5,
                title: 'Collaborations',
                description: 'When someone invites you to collaborate or updates collaboration details',
                email: false,
                push_notification: false,
                type: 1
            },
        ],
        updateNotifictionsItems: [
            {
                id: 6,
                title: 'New LinkStream features',
                email: false,
                push_notification: false,
                type: 1
            },
            {
                id: 7,
                title: 'Surveys and feedback',
                email: false,
                push_notification: false,
                type: 1
            },
            {
                id: 8,
                title: 'LinkStream newsletter',
                email: false,
                push_notification: false,
                type: 2
            },
        ],
        saving : false,
    }),
    methods: {
        handleSaveClick() {}
    },
}
</script>