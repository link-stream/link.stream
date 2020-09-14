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
                    <h1 class="page-title">
                        {{ emailName }}
                    </h1>
                    <a href="#" @click.prevent="showEditEmail">
                        Edit email name
                    </a>
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
                                {{ `Hidro Kitty` }}
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
                                Hydro Kitty &middot; hello@hydrokitty.com
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
                        />
                        <div class="left-col">
                            <h4 class="item-title">
                                Subject
                            </h4>
                            <small v-if="subject" class="item-subtitle">
                                {{ subject }}
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
                        />
                        <div class="left-col">
                            <h4 class="item-title">
                                Content
                            </h4>
                            <small class="item-subtitle" v-if="content">
                                {{ content }}
                            </small>
                            <small
                                v-else
                                class="item-subtitle placeholder-text"
                            >
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
                                    @click.prevent="handleSenndTestClick"
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
        </div>
    </div>
</template>
<script>
export default {
    name: 'ReportMessage',
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
        subject: null,
        content: null,
        isEditEmailName: false,
        emailName: 'Someone To Love You',
        tempEmailName: '',
        templateImageUrl: '/static/img/email-template-release.jpg',
    }),
    methods: {
        handleEditSendtoClick() {
            this.$bus.$emit('modal.editSendto.open')
        },
        handleEditFromClick() {
            this.$bus.$emit('modal.editFrom.open')
        },
        handleEditSubjectClick() {
            this.$bus.$emit('modal.editSubject.open')
        },
        handleEditContentClick() {
            this.$router.push({
                name: 'customizeMessage',
            })
        },
        handleSendClick() {
            this.$bus.$emit('modal.reviewEmail.open')
        },
        handleSenndTestClick() {
            this.$bus.$emit('modal.sendTest.open')
        },
        handleScheduleClick() {
            this.$bus.$emit('modal.scheduleEmail.open')
        },
        handleSaveClick() {
            this.emailName = this.tempEmailName
            this.isEditEmailName = false
        },
        showEditEmail() {
            this.isEditEmailName = true
            this.tempEmailName = this.emailName
        },
        handleSaveLaterClick() {
            console.log('save later')
        },
    },
}
</script>
