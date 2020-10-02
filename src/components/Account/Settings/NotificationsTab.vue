<template>
    <div class="tab NotificationsTab">
        <div class="tab-body">
            <div class="notification">
                <div class="notification-item border-bottom">
                    <div class="item-body">
                        <h4 class="item-title">Sales</h4>
                        <small class="item-subtitle">
                            When someone purchases my tracks/sound kits
                        </small>
                    </div>
                    <div class="item-action">
                        <b-form-checkbox
                            class="custom-control-inline"
                            v-model="form.sales_email"
                        >
                            Email
                        </b-form-checkbox>
                        <b-form-checkbox
                            class="custom-control-inline"
                            v-model="form.sales_push"
                        >
                            Push Notification
                        </b-form-checkbox>
                    </div>
                </div>
                <div class="notification-item border-bottom">
                    <div class="item-body">
                        <h4 class="item-title">Follows</h4>
                        <small class="item-subtitle">
                            When someone follows you
                        </small>
                    </div>
                    <div class="item-action">
                        <b-form-checkbox
                            class="custom-control-inline"
                            v-model="form.follows_email"
                        >
                            Email
                        </b-form-checkbox>
                        <b-form-checkbox
                            class="custom-control-inline"
                            v-model="form.follows_push"
                        >
                            Push Notification
                        </b-form-checkbox>
                    </div>
                </div>
                <div class="notification-item border-bottom">
                    <div class="item-body">
                        <h4 class="item-title">Likes</h4>
                        <small class="item-subtitle">
                            When someone likes your track or sound kit
                        </small>
                    </div>
                    <div class="item-action">
                        <b-form-checkbox
                            class="custom-control-inline"
                            v-model="form.likes_email"
                        >
                            Email
                        </b-form-checkbox>
                        <b-form-checkbox
                            class="custom-control-inline"
                            v-model="form.likes_push"
                        >
                            Push Notification
                        </b-form-checkbox>
                    </div>
                </div>
                <div class="notification-item border-bottom">
                    <div class="item-body">
                        <h4 class="item-title">Reposts</h4>
                        <small class="item-subtitle">
                            When someone reposts your track or sound kit
                        </small>
                    </div>
                    <div class="item-action">
                        <b-form-checkbox
                            class="custom-control-inline"
                            v-model="form.reposts_email"
                        >
                            Email
                        </b-form-checkbox>
                        <b-form-checkbox
                            class="custom-control-inline"
                            v-model="form.reposts_push"
                        >
                            Push Notification
                        </b-form-checkbox>
                    </div>
                </div>
                <div class="notification-item border-bottom">
                    <div class="item-body">
                        <h4 class="item-title">Collaborations</h4>
                        <small class="item-subtitle">
                            When someone invites you to collaborate or updates
                            collaboration details
                        </small>
                    </div>
                    <div class="item-action">
                        <b-form-checkbox
                            class="custom-control-inline"
                            v-model="form.collaborations_email"
                        >
                            Email
                        </b-form-checkbox>
                        <b-form-checkbox
                            class="custom-control-inline"
                            v-model="form.collaborations_push"
                        >
                            Push Notification
                        </b-form-checkbox>
                    </div>
                </div>
            </div>
            <div class="notification ls-update">
                <h2 class="title">Updates from LinkStream</h2>
                <div class="notification-item border-top">
                    <div class="item-body">
                        <h4 class="item-title font-weight-light">
                            New LinkStream features
                        </h4>
                    </div>
                    <div class="item-action">
                        <b-form-checkbox
                            class="custom-control-inline chk-email"
                            v-model="form.ls_features_email"
                        >
                            Email
                        </b-form-checkbox>
                        <b-form-checkbox
                            class="custom-control-inline"
                            v-model="form.ls_features_push"
                        >
                            Push Notification
                        </b-form-checkbox>
                    </div>
                </div>
                <div class="notification-item border-top">
                    <div class="item-body">
                        <h4 class="item-title font-weight-light">
                            Surveys and feedback
                        </h4>
                    </div>
                    <div class="item-action">
                        <b-form-checkbox
                            class="custom-control-inline"
                            v-model="form.surveys_email"
                        >
                            Email
                        </b-form-checkbox>
                        <b-form-checkbox
                            class="custom-control-inline"
                            v-model="form.surveys_push"
                        >
                            Push Notification
                        </b-form-checkbox>
                    </div>
                </div>
                <div class="notification-item border-top">
                    <div class="item-body">
                        <h4 class="item-title font-weight-light">
                            LinkStream newsletter
                        </h4>
                    </div>
                    <div class="item-action">
                        <b-form-checkbox
                            class="custom-control-inline only-email"
                            v-model="form.ls_newsletter_email"
                        >
                            Email
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
                    @click="handleCancelClick"
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
import { mapGetters } from 'vuex'
export default {
    name: 'NotificationsTab',
    computed: {
        ...mapGetters({
            notification: 'me/notification',
        }),
    },
    data: () => ({
        form: {},
        saving: false,
    }),
    async created() {
        await this.$store.dispatch('me/loadNotification')
        this.resetForm()
    },
    methods: {
        async handleSaveClick() {
            const params = {}
            Object.entries(this.form).forEach(([key, value]) => {
                params[key] = value ? 1 : 0
            })
            this.saving = true
            const { status, message, error } = await this.$store.dispatch(
                'me/updateNotification',
                {
                    id: this.notification.id,
                    params,
                }
            )
            if (status === 'success') {
                this.$toast.success(message)
            } else {
                this.$toast.error(error)
            }
            this.saving = false
        },
        handleCancelClick() {
            this.resetForm()
        },
        resetForm() {
            this.form = {}
            Object.entries(this.notification).forEach(([key, value]) => {
                if (key !== 'id' && key !== 'user_id') {
                    this.form[key] = value == 1
                }
            })
        },
    },
}
</script>
