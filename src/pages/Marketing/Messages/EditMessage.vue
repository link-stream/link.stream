<template>
    <div class="page page-edit-message">
        <nav class="page-nav">
            <basic-button
                class="back-btn"
                variant="text"
                :to="{ name: 'marketingMessages' }"
            >
                <i class="ico ico-back"></i>
                <span>Messages</span>
            </basic-button>
        </nav>
        <LoadingSpinner class="page-loader" v-if="loading" />
        <div v-else>
            <header class="page-header">
                <div class="left-col">
                    <div v-if="isEditEmailName" class="edit-email-container">
                        <b-form-input
                            v-model="form.campaing_name"
                            placeholder="Email Name Placeholder"
                        >
                        </b-form-input>
                        <spinner-button
                            class="btn-save"
                            @click="handleSaveClick"
                            size="sm"
                        >
                            Save
                        </spinner-button>
                        <basic-button
                            class="text-black"
                            variant="link"
                            @click="handleCancelClick"
                        >
                            Cancel
                        </basic-button>
                    </div>
                    <div v-else>
                        <h1 class="page-title">
                            {{ form.campaing_name }}
                        </h1>
                        <a href="#" @click.prevent="showEditEmail">
                            Edit email name
                        </a>
                    </div>
                </div>
                <div class="right-col">
                    <basic-button
                        class="btn-schedule"
                        variant="outline-black"
                        size="md"
                        @click="handleScheduleClick"
                        :disabled="isEditEmailName"
                    >
                        Schedule
                    </basic-button>
                    <spinner-button
                        size="md"
                        :loading="saving"
                        @click="handleSendClick"
                        :disabled="isEditEmailName"
                    >
                        Send
                    </spinner-button>
                </div>
            </header>
            <main class="page-body">
                <div class="Card EditMessageCard">
                    <div class="card-item">
                        <font-awesome-icon
                            :icon="['fas', 'check-circle']"
                            class="item-status completed"
                        />
                        <div class="left-col">
                            <h4 class="item-title">
                                Send to
                            </h4>
                            <small class="item-subtitle">
                                All
                                <span class="font-weight-bold">
                                    {{ cntSubscribers | thousandCNumber }}
                                    subscribers
                                </span>
                                subscribed contacts in the audience
                                {{ form.user_name }}
                            </small>
                        </div>
                        <div class="right-col">
                            <BasicButton
                                variant="icon"
                                title="Edit"
                                class="card-edit-btn"
                                size="sm"
                                @click="handleEditSendtoClick"
                            />
                        </div>
                    </div>
                    <div class="card-item">
                        <font-awesome-icon
                            :icon="['fas', 'check-circle']"
                            class="item-status completed"
                        />
                        <div class="left-col">
                            <h4 class="item-title">
                                From
                            </h4>
                            <small class="item-subtitle">
                                {{ form.user_name }}
                                &middot;
                                {{ form.reply_to }}
                            </small>
                        </div>
                        <div class="right-col">
                            <BasicButton
                                variant="icon"
                                title="Edit"
                                class="card-edit-btn"
                                size="sm"
                                @click="handleEditFromClick"
                            />
                        </div>
                    </div>
                    <div class="card-item">
                        <font-awesome-icon
                            :icon="['fas', 'check-circle']"
                            class="item-status"
                            :class="{ completed: form.subject }"
                        />
                        <div class="left-col">
                            <h4 class="item-title">
                                Subject
                            </h4>
                            <small v-if="form.subject" class="item-subtitle">
                                {{ form.subject }}
                            </small>
                            <small
                                v-else
                                class="item-subtitle placeholder-text"
                            >
                                What's the subject line for this email campaign?
                            </small>
                        </div>
                        <div class="right-col">
                            <BasicButton
                                variant="icon"
                                title="Edit"
                                class="card-edit-btn"
                                size="sm"
                                @click="handleEditSubjectClick"
                            />
                        </div>
                    </div>
                    <div class="card-item">
                        <font-awesome-icon
                            :icon="['fas', 'check-circle']"
                            class="item-status"
                            :class="{ completed: form.content }"
                        />
                        <div class="left-col">
                            <h4 class="item-title">
                                Content
                            </h4>
                            <small class="item-subtitle placeholder-text">
                                Design and manage the content of your email
                            </small>
                            <div class="template-container">
                                <div class="image-container">
                                    <img :src="templateImageUrl" />
                                    <IconButton
                                        class="btn-visible"
                                        icon="visible"
                                    />
                                </div>
                                <a
                                    href="#"
                                    class="test-link"
                                    @click.prevent="handleSendTestClick"
                                >
                                    Send a test email
                                </a>
                            </div>
                        </div>
                        <div class="right-col">
                            <BasicButton
                                variant="icon"
                                title="Edit"
                                class="card-edit-btn"
                                size="sm"
                                @click="handleEditContentClick"
                            />
                        </div>
                    </div>
                </div>
            </main>
            <footer class="page-footer">
                <div class="float-left">
                    <basic-button
                        class="link-save-later text-black"
                        variant="link"
                        @click="handleSaveLaterClick"
                        :disabled="isEditEmailName"
                    >
                        Save for later
                    </basic-button>
                </div>
                <div class="float-right">
                    <basic-button
                        class="btn-schedule"
                        variant="outline-black"
                        size="md"
                        @click="handleScheduleClick"
                        :disabled="isEditEmailName"
                    >
                        Schedule
                    </basic-button>
                    <spinner-button
                        size="md"
                        :loading="saving"
                        @click="handleSendClick"
                        :disabled="isEditEmailName"
                    >
                        Send
                    </spinner-button>
                </div>
            </footer>
        </div>
        <EditSubjectModal v-if="isShowSubject" @close="isShowSubject = false" />
        <EditSendtoModal v-if="isShowSendto" @close="isShowSendto = false" />
        <EditFromModal v-if="isShowFrom" @close="isShowFrom = false" />
        <SendTestModal />
        <ScheduleEmailModal />
        <ReviewEmailModal />
    </div>
</template>
<script>
import EditSubjectModal from '@/components/Modal/Marketing/EditSubjectModal'
import EditSendtoModal from '@/components/Modal/Marketing/EditSendtoModal'
import EditFromModal from '@/components/Modal/Marketing/EditFromModal'
import SendTestModal from '@/components/Modal/Marketing/SendTestModal'
import ScheduleEmailModal from '@/components/Modal/Marketing/ScheduleEmailModal'
import ReviewEmailModal from '@/components/Modal/Marketing/ReviewEmailModal'
import { mapGetters } from 'vuex'
export default {
    name: 'EditMessage',
    components: {
        EditSubjectModal,
        EditSendtoModal,
        EditFromModal,
        SendTestModal,
        ScheduleEmailModal,
        ReviewEmailModal,
    },
    data: () => ({
        loading: false,
        saving: false,
        cntSubscribers: 5749,
        form: {
            user_name: null,
            email: null,
            campaing_name: null,
            subject: null,
            content: null,
        },
        isEditEmailName: false,
        isShowSendto: false,
        isShowFrom: false,
        isShowSubject: false,
        templateImageUrl: '/static/img/email-template_1.jpg',
    }),
    computed: {
        ...mapGetters({
            smsData: 'marketing/smsData',
        }),
    },
    watch: {
        smsData: {
            deep: true,
            handler(value) {
                this.form = {
                    ...value,
                }
            },
        },
    },
    created() {
        this.form = {
            ...this.smsData,
        }
    },
    methods: {
        handleEditSendtoClick() {
            this.isShowSendto = true
        },
        handleEditFromClick() {
            this.isShowFrom = true
        },
        handleEditSubjectClick() {
            this.isShowSubject = true
        },
        handleEditContentClick() {
            let routerName = 'customizeMessage'
            switch (this.smsData.template_type) {
                case 'release':
                    routerName = 'customizeMessage'
                    break
                case 'plain':
                    routerName = 'customizeMessagePlain'
                    break
                case 'video':
                    routerName = 'customizeMessageVideo'
                    break
            }
            this.$router.push({
                name: routerName,
            })
        },
        async handleSendClick() {
            const params = {
                ...this.smsData,
                scheduled: false,
                date: null,
                time: null,
                status: 'Pending',
                template_type: this.smsData.template_type ? this.smsData.template_type : 'release'
            }
            console.log('smsData', params)
            await this.$store.dispatch('marketing/setSMSData', params)
            this.$bus.$emit('modal.reviewEmail.open')
        },
        handleSendTestClick() {
            this.$bus.$emit('modal.sendTest.open')
        },
        handleScheduleClick() {
            this.$bus.$emit('modal.scheduleEmail.open')
        },
        async handleSaveClick() {
            const params = {
                ...this.smsData,
                campaing_name: this.form.campaing_name,
            }
            await this.$store.dispatch('marketing/setSMSData', params)
            this.isEditEmailName = false
        },
        showEditEmail() {
            this.isEditEmailName = true
        },
        async handleSaveLaterClick() {
            const params = {
                ...this.smsData,
                scheduled: false,
                date: null,
                time: null,
                status: 'Draft',
                template_type: this.smsData.template_type ? this.smsData.template_type : 'release'
            }
            await this.$store.dispatch('marketing/setSMSData', params)
            console.log(this.smsData)
            let response
            if (this.smsData.id) {
                response = await this.$store.dispatch(
                    'marketing/updateMessage',
                    {
                        id: this.smsData.id,
                        params: params,
                    }
                )
            } else {
                response = await this.$store.dispatch(
                    'marketing/insertMessage',
                    params
                )
            }
            const { status, message, error } = response
            status === 'success'
                ? this.$toast.success(message)
                : this.$toast.error(error)
        },
        handleCancelClick() {
            this.form.campaing_name = this.smsData.campaing_name
            this.isEditEmailName = false
        },
    },
}
</script>
