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
                    <DropdownActions
                        @unsubscribe="handleUnsubscribeClick"
                        @resubscribe="handleResubscribeClick"
                        @archive="handleArchiveClick"
                    />
                </div>
                <div class="status-container">
                    <CustomStarRating :rating="rating" />
                    <div class="subscriber-status">
                        {{ subscriber.email_status }}
                    </div>
                </div>
            </div>
            <div class="right-col move-actions">
                <span class="move-numbers">
                    {{ index + 1 }}
                    of
                    {{ subscribers.length }}
                </span>
                <b-button
                    variant="light"
                    size="sm"
                    class="btn-previous"
                    @click="handlePreviousClick"
                    :disabled="index === 0"
                >
                    <font-awesome-icon :icon="['fas', 'chevron-left']" />
                </b-button>
                <b-button
                    variant="light"
                    size="sm"
                    class="btn-next"
                    @click="handleNextClick"
                    :disabled="index === subscribers.length - 1"
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
                        Landing Page Name
                    </span>
                    on
                    {{ subscriber.created_at | customizeDate('MMMM Do') }}
                    at
                    {{ subscriber.created_at | customizeDate('hh:mm A') }}
                </p>
                <p>
                    Email Marketing Engagement: Rarely
                </p>
                <p>
                    Gender unknown | Age unknown |
                    <a href="#">Edit</a>
                </p>
            </div>
            <b-row>
                <b-col cols="6" md="3">
                    <div class="recipient-container">
                        <div class="recipient-status">
                            <h2 class="number">0%</h2>
                            <p class="description">
                                Open Rate
                            </p>
                        </div>
                    </div>
                </b-col>
                <b-col cols="6" md="3">
                    <div class="recipient-container">
                        <div class="recipient-status">
                            <h2 class="number">0%</h2>
                            <p class="description">
                                Click Rate
                            </p>
                        </div>
                    </div>
                </b-col>
                <b-col cols="6" md="3">
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
                </b-col>
            </b-row>
            <div class="note-container">
                <div class="note-title">
                    <div class="left-title">
                        Write a note about this subscriber
                    </div>
                    <div class="right-title">
                        {{ 1000 - note.length }}
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
                    <TaggerInput
                        v-model="tag"
                        :tags="tags"
                        :allTags="allTags"
                        @tags-changed="handleTagsChange"
                    />
                </div>
            </div>
            <div class="detail-container profile">
                <div class="title-container">
                    <h1 class="title">Profile information</h1>
                    <a href="#" class="actions">Edit</a>
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
                            First Name
                        </div>
                        <span>-</span>
                    </div>
                    <div class="profile-item">
                        <div class="caption">
                            Last Name
                        </div>
                        <span>-</span>
                    </div>
                    <div class="profile-item">
                        <div class="caption">
                            Birthday
                        </div>
                        <span>-</span>
                    </div>
                </div>
            </div>
            <div class="detail-container activity-feed">
                <div class="title-container">
                    <h1 class="title">Activity feed</h1>
                </div>
                <div
                    class="one-activity"
                    v-for="(activity, index) in activities"
                    :key="`activity-${index}`"
                >
                    <h4 class="title">
                        {{ activity.datetime | customizeDate('MMMM Do') }}
                    </h4>
                    <div class="activity">
                        Was Sent the
                        {{ activity.type }}
                        <a href="#">
                            {{ activity.title }}
                        </a>
                    </div>
                    <div class="time">
                        {{ activity.datetime | customizeDate('h:mm A') }}
                    </div>
                </div>
            </div>
        </main>
        <footer class="page-header">
            <div class="ml-auto move-actions">
                <span class="move-numbers">
                    {{ index + 1 }}
                    of
                    {{ subscribers.length }}
                </span>
                <b-button
                    variant="light"
                    size="sm"
                    class="btn-previous"
                    @click="handlePreviousClick"
                    :disabled="index === 0"
                >
                    <font-awesome-icon :icon="['fas', 'chevron-left']" />
                </b-button>
                <b-button
                    variant="light"
                    size="sm"
                    class="btn-next"
                    @click="handleNextClick"
                    :disabled="index === subscribers.length - 1"
                >
                    <font-awesome-icon :icon="['fas', 'chevron-right']" />
                </b-button>
            </div>
        </footer>
    </div>
</template>
<script>
import DropdownActions from '~/components/Form/DropdownActions'
import CustomStarRating from '~/components/Form/CustomStarRating'
import { mapGetters } from 'vuex'
export default {
    name: 'SubscriberDetails',
    components: {
        DropdownActions,
        CustomStarRating,
    },
    props: {
        index: {
            type: Number,
            default: 0,
        },
        subscribers: {
            type: Array,
        },
    },
    data: () => ({
        rating: 3,
        note: '',
        tag: '',
        activities: [
            {
                type: 'mail',
                title: 'Someone To Love You',
                datetime: '2020/09/08 12:21:00',
            },
            {
                type: 'mail',
                title: 'Welcome',
                datetime: '2020/09/07 12:20:00',
            },
        ],
    }),
    computed: {
        ...mapGetters({
            user: 'me/user',
            allTags: 'marketing/tags',
        }),
        subscriber() {
            return this.subscribers[this.index]
        },
        tags() {
            return this.subscriber.tags.split(',').map(tag => ({
                text: tag.trim(),
                value: tag.trim(),
            }))
        },
    },
    async created() {
        await this.$store.dispatch('marketing/getTags')
    },
    methods: {
        handleUnsubscribeClick() {
            console.log('Unsubscribe')
        },
        handleResubscribeClick() {
            console.log('Resubscribe')
        },
        handleArchiveClick() {
            console.log('Archive')
        },
        handlePreviousClick() {
            if (this.index > 0) {
                this.index--
            }
        },
        handleNextClick() {
            if (this.index < this.subscribers.length - 1) {
                this.index++
            }
        },
        handleTagsChange(tags) {
            console.log('tags', tags)
        },
    },
}
</script>
