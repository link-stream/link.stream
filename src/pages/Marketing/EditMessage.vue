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
                        Someone To Love You
                    </h1>
                    <a href="#">Edit email name</a>
                </div>
                <div class="right-col">
                    <basic-button
                        class="btn-schedule"
                        variant="outline-black"
                        size="md"
                        :disabled="saving"
                    >
                        Schedule
                    </basic-button>
                    <spinner-button
                        size="md"
                        :loading="saving"
                        @click="handleSendClick"
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
                                <span class="font-weight-bold">{{ cntSubscribers | thousandCNumber }} subscribers </span>
                                subscribed contacts in the audience {{ `Hidro Kitty` }}
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
                            <small class="item-subtitle" v-if="subject">
                                {{ subject }}
                            </small>
                            <small class="item-subtitle placeholder-text" v-else>
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
                            <small class="item-subtitle placeholder-text" v-else>
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
                                <a href="#" class="test-link" @click.prevent="handleSenndTestClick">Send a test email</a>
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
                    <a href="#" class="link-save-later">Save for later</a>
                </div>
                <div class="float-right">
                    <basic-button
                        class="btn-schedule"
                        variant="outline-black"
                        size="md"
                        :disabled="saving"
                    >
                        Schedule
                    </basic-button>
                    <spinner-button
                        size="md"
                        :loading="saving"
                        @click="handleSendClick"
                    >
                        Send
                    </spinner-button>
                </div>
            </footer>
        </div>
        <EditSubjectModal />
        <EditSendtoModal />
        <EditFromModal />
        <SendTestModal />
    </div>                   
</template>
<script>
import EditSubjectModal from '@/components/Modal/EditSubjectModal'
import EditSendtoModal from '@/components/Modal/EditSendtoModal'
import EditFromModal from '@/components/Modal/EditFromModal'
import SendTestModal from '@/components/Modal/SendTestModal'
export default {
    name: 'EditMessage',
    components: {
        EditSubjectModal,
        EditSendtoModal,
        EditFromModal,
        SendTestModal,
    },
    data: () => ({
        loading: false,
        saving: false,
        cntSubscribers: 5749,
        subject: null,
        content: null,
        templateImageUrl: '/static/img/email-template-release.jpg'
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
        handleEditContentClick() {},
        handleSendClick() {},
        handleSenndTestClick() {
            this.$bus.$emit('modal.sendTest.open')
        },
    },
}
</script>