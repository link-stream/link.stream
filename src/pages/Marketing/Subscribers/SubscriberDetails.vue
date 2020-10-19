<template>
    <div class="page page-subscriber-details">
        <nav class="page-nav">
            <basic-button
                class="back-btn"
                variant="text"
                :to="{ name: 'subscribers' }"
            >
                <i class="ico ico-back"></i>
                <span>Subscribers</span>
            </basic-button>
        </nav>
        <header class="page-header">
            <div class="left-col">
                <div class="d-flex">
                    <h1 class="page-title">
                        {{ subscriber.name }}
                    </h1>
                    <DropdownActions @change="updateStatus" />
                </div>
                <div class="status-container">
                    <div class="subscriber-status">
                        {{ subscriber.email_status }}
                    </div>
                </div>
            </div>
            <div class="right-col move-actions">
                <span class="move-numbers">
                    {{ currentIndex + 1 }}
                    of
                    {{ subscribers.length }}
                </span>
                <b-button
                    variant="light"
                    size="sm"
                    class="btn-previous"
                    @click="handlePreviousClick"
                    :disabled="currentIndex === 0"
                >
                    <font-awesome-icon :icon="['fas', 'chevron-left']" />
                </b-button>
                <b-button
                    variant="light"
                    size="sm"
                    class="btn-next"
                    @click="handleNextClick"
                    :disabled="currentIndex === subscribers.length - 1"
                >
                    <font-awesome-icon :icon="['fas', 'chevron-right']" />
                </b-button>
            </div>
        </header>
        <main class="page-body">
            <div class="main-information">
                <p>
                    Added via
                    <span class="font-weight-bold">
                        {{ subscriber.created_in }}
                    </span>
                    on
                    {{ subscriber.created_at | customizeDate('MMMM Do') }}
                    at
                    {{ subscriber.created_at | customizeDate('hh:mm A') }}
                </p>
                <p>
                    Gender:
                    <span v-if="subscriber.gender">
                        {{ subscriber.gender === 'M' ? 'Male' : 'Female' }}
                    </span>
                    <span v-else>
                        unknown
                    </span>
                    | Age:
                    <span v-if="subscriber.birthday">
                        {{ subscriber.birthday | age }}
                    </span>
                    <span v-else>
                        unknown
                    </span>
                </p>
            </div>
            <b-row v-if="!loading">
                <b-col cols="6">
                    <div class="recipient-container">
                        <div class="recipient-status">
                            <h2 class="number">
                                {{ subscriberDetails.open_rate }}%
                            </h2>
                            <p class="description">
                                Open Rate
                            </p>
                        </div>
                    </div>
                </b-col>
                <b-col cols="6">
                    <div class="recipient-container">
                        <div class="recipient-status">
                            <h2 class="number">
                                {{ subscriberDetails.click_rate }}%
                            </h2>
                            <p class="description">
                                Click Rate
                            </p>
                        </div>
                    </div>
                </b-col>
                <!-- <b-col cols="6" md="3">
                    <div class="recipient-container">
                        <div class="recipient-status">
                            <h2 class="number">$0.00</h2>
                            <p class="description">
                                Total Revenue
                            </p>
                        </div>
                    </div>
                </b-col>
                <b-col cols="6" md="3">
                    <div class="recipient-container">
                        <div class="recipient-status">
                            <h2 class="number">$0.00</h2>
                            <p class="description">
                                Average order value
                            </p>
                        </div>
                    </div>
                </b-col> -->
            </b-row>
            <div class="note-container">
                <div class="note-title">
                    <div class="left-title">
                        Write a note about this subscriber
                    </div>
                    <div class="right-title">
                        {{ 1000 - (note ? note.length : 0) }}
                        characters remaining
                    </div>
                </div>
                <b-form-textarea
                    v-model="note"
                    rows="5"
                    placeholder="Write an internal note here"
                ></b-form-textarea>
                <basic-button
                    variant="outline-light"
                    size="sm"
                    class="btn-add-note"
                    @click="addNote"
                >
                    Add Note
                </basic-button>
            </div>
            <div class="detail-container tags">
                <div class="title-container">
                    <h1 class="title">Tags</h1>
                    <!-- <a href="#" class="actions">Add tag</a> -->
                </div>
                <div class="tags-list">
                    <span
                        v-for="tag in tags"
                        :key="tag.text"
                        class="subscriber-tag"
                    >
                        {{ tag.text }}
                    </span>
                </div>
            </div>
            <div class="detail-container profile">
                <div class="title-container">
                    <h1 class="title">Profile information</h1>
                    <a
                        href="#"
                        class="actions"
                        @click.prevent="showEditSubscriber"
                    >
                        Edit
                    </a>
                </div>
                <div class="content">
                    <div class="profile-item">
                        <div class="caption">
                            Email Address
                        </div>
                        <a href="#">
                            {{ subscriber.email }}
                        </a>
                    </div>
                    <div class="profile-item">
                        <div class="caption">
                            Name
                        </div>
                        <a href="#" v-if="subscriber.name">
                            {{ subscriber.name }}
                        </a>
                        <span v-else>-</span>
                    </div>
                    <div class="profile-item">
                        <div class="caption">
                            Phone
                        </div>
                        <a href="#" v-if="subscriber.phone">
                            {{ subscriber.phone }}
                        </a>
                        <span v-else>-</span>
                    </div>
                    <div class="profile-item">
                        <div class="caption">
                            Birthday
                        </div>
                        <a href="#" v-if="subscriber.birthday">
                            {{ subscriber.birthday }}
                        </a>
                        <span v-else>-</span>
                    </div>
                </div>
            </div>
            <div class="detail-container activity-feed" v-if="!loading">
                <div class="title-container">
                    <h1 class="title">Activity feed</h1>
                </div>
                <div
                    class="one-activity"
                    v-for="(activity, index) in subscriberDetails.feed"
                    :key="`activity-${index}`"
                >
                    <h4 class="title">
                        {{ activity.date | customizeDate('MMMM Do') }}
                    </h4>
                    <div class="activity">
                        {{ activity.log }}
                    </div>
                    <div class="time">
                        {{ activity.date | customizeDate('h:mm A') }}
                    </div>
                </div>
            </div>
        </main>
        <footer class="page-header">
            <div class="ml-auto move-actions">
                <span class="move-numbers">
                    {{ currentIndex + 1 }}
                    of
                    {{ subscribers.length }}
                </span>
                <b-button
                    variant="light"
                    size="sm"
                    class="btn-previous"
                    @click="handlePreviousClick"
                    :disabled="currentIndex === 0"
                >
                    <font-awesome-icon :icon="['fas', 'chevron-left']" />
                </b-button>
                <b-button
                    variant="light"
                    size="sm"
                    class="btn-next"
                    @click="handleNextClick"
                    :disabled="currentIndex === subscribers.length - 1"
                >
                    <font-awesome-icon :icon="['fas', 'chevron-right']" />
                </b-button>
            </div>
        </footer>
        <EditSubscriberModal />
    </div>
</template>
<script>
import DropdownActions from '~/components/Form/DropdownActions'
import CustomStarRating from '~/components/Form/CustomStarRating'
import { mapGetters } from 'vuex'
import { api } from '~/services'
import EditSubscriberModal from '~/components/Modal/Marketing/EditSubscriberModal'
export default {
    name: 'SubscriberDetails',
    components: {
        DropdownActions,
        CustomStarRating,
        EditSubscriberModal,
    },
    props: {
        index: {
            type: Number,
            default: 0,
        },
    },
    data: () => ({
        loading: false,
        subscriberDetails: {},
        currentIndex: -1,
        rating: 3,
        note: '',
        tag: '',
    }),
    computed: {
        ...mapGetters({
            user: 'me/user',
            allTags: 'marketing/tags',
            subscribers: 'marketing/subscribers',
        }),
        subscriber() {
            return this.subscribers[this.currentIndex]
        },
        tags() {
            if (this.subscriber.tags) {
                return this.subscriber.tags.split(',').map(tag => ({
                    text: tag.trim(),
                    value: tag.trim(),
                }))
            } else {
                return []
            }
        },
    },
    watch: {
        subscriber() {
            this.note = this.subscriber.note
            this.updateSubscriberDetails()
        },
    },
    async created() {
        this.currentIndex = this.index
        await this.$store.dispatch('marketing/getTags')
    },
    methods: {
        handleArchiveClick() {},
        handlePreviousClick() {
            if (this.currentIndex > 0) {
                this.currentIndex--
            }
        },
        handleNextClick() {
            if (this.currentIndex < this.subscribers.length - 1) {
                this.currentIndex++
            }
        },
        async updateSubscriberDetails() {
            this.loading = true
            const { status, data } = await api.marketing.getSubscriber(
                this.user.id,
                this.subscriber.id
            )
            if (status === 'success') {
                this.subscriberDetails = data[0]
            }
            this.loading = false
        },
        async addNote() {
            const params = {
                ...this.subscriber,
                note: this.note,
            }
            const { status, message, error } = await this.$store.dispatch(
                'marketing/updateSubscriber',
                {
                    id: this.subscriber.id,
                    params: params,
                }
            )
            if (status === 'success') {
                this.$toast.success(message)
            } else {
                this.$toast.error(error)
            }
        },
        showEditSubscriber() {
            this.$store.dispatch('marketing/setCurrentSubscriber', {
                ...this.subscriber,
            })
            this.$bus.$emit('modal.editSubscriber.open')
        },
        async updateStatus(action) {
            const selIdList = [
                {
                    id: this.subscriber.id,
                },
            ]
            const params = {
                user_id: this.user.id,
                action: action,
                list: JSON.stringify(selIdList),
            }
            const { status, message, error } = await this.$store.dispatch(
                'marketing/updateSubscribersStatus',
                params
            )
            if (status === 'success') {
                this.$toast.success(message)
            } else {
                this.$toast.error(error)
            }
            this.statusAll = false
        },
    },
}
</script>
