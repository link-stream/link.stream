<template>
    <div class="page page-subscribers">
        <header class="page-header">
            <div class="left-col">
                <h1 class="page-title">Manage subscribers</h1>
                <h4 class="page-subtitle">
                    You have
                    <span class="font-weight-bold">
                        {{ cntEmail | thousandCNumber }}
                    </span>
                    email subscribers and
                    <span class="font-weight-bold">
                        {{ cntSms | thousandCNumber }}
                    </span>
                    SMS subscribers
                </h4>
            </div>
            <div class="right-col">
                <basic-button @click="handleAddClick">
                    Add Subscribers
                </basic-button>
            </div>
        </header>
        <main class="page-body">
            <div class="action-bar">
                <DropdownActions
                    @unsubscribe="handleUnsubscribeClick"
                    @resubscribe="handleResubscribeClick"
                    @archive="handleArchiveClick"
                />
                <SearchInput
                    pill
                    color="black"
                    v-model="searchString"
                    placeholder="Search contacts"
                    direction="right"
                    class="search-form"
                    @keyupEnter="searchContact"
                />
                <basic-button
                    class="btn-export text-black"
                    variant="link"
                    @click="handleExportClick"
                >
                    Export List
                </basic-button>
                <div class="page-status">
                    1-20 Of
                    {{ 6095 | thousandCNumber }}
                </div>
            </div>
            <div class="page-empty" v-if="!loading && !subscribers.length">
                <div class="empty-text">
                    Your subscribers will appear here.
                </div>
            </div>
            <LoadingSpinner class="page-loader" v-if="loading" />
            <div
                v-else-if="subscribers.length > 0"
                class="subscriber-container"
            >
                <b-table :fields="fields" :items="realSubscribers" responsive>
                    <template v-slot:head(selected)="data">
                        <b-dropdown
                            class="select-actions"
                            left
                            variant="link"
                            toggle-class="text-decoration-none"
                            no-caret
                        >
                            <template slot="button-content">
                                <b-form-checkbox v-model="statusAll" />
                                <span>{{ data.label }}</span>
                                <font-awesome-icon
                                    :icon="['fas', 'chevron-down']"
                                />
                                <font-awesome-icon
                                    :icon="['fas', 'chevron-up']"
                                />
                            </template>
                            <b-dropdown-item @click="selectVisible">
                                Select visible
                            </b-dropdown-item>
                            <b-dropdown-item @click="selectAll">
                                Select all
                            </b-dropdown-item>
                            <b-dropdown-item @click="deselectAll">
                                Deselect all
                            </b-dropdown-item>
                        </b-dropdown>
                    </template>
                    <template v-slot:cell(selected)="data">
                        <b-form-checkbox v-model="data.value"></b-form-checkbox>
                    </template>
                    <template v-slot:cell(name)="data">
                        <router-link
                            :to="{
                                name: 'subscriberDetails',
                                params: {
                                    subscribers: realSubscribers,
                                    index: parseInt(data.index),
                                },
                            }"
                        >
                            {{ data.value }}
                        </router-link>
                    </template>
                    <template v-slot:cell(created_at)="data">
                        {{ data.value | customizeDate('MM/DD/YY h:mma') }}
                    </template>
                    <template v-slot:cell(email_status)="data">
                        <span class="text-capitalize">{{ data.value }}</span>
                    </template>
                    <template v-slot:cell(sms_status)="data">
                        <span class="text-capitalize">{{ data.value }}</span>
                    </template>
                </b-table>
            </div>
        </main>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import DropdownActions from '~/components/Form/DropdownActions'
export default {
    name: 'Subscribers',
    components: {
        DropdownActions,
    },
    data: () => ({
        loading: false,
        searchString: '',
        statusAll: null,
        fields: [
            {
                key: 'selected',
                label: '',
            },
            {
                key: 'name',
                label: 'Name',
            },
            {
                key: 'email',
                label: 'Email',
            },
            {
                key: 'created_at',
                label: 'Date added',
            },
            {
                key: 'email_status',
                label: 'Email Status',
            },
            {
                key: 'sms_status',
                label: 'SMS Status',
            },
        ],
        realSubscribers: [],
        cntEmail: 5748,
        cntSms: 2257,
    }),
    computed: {
        ...mapGetters({
            subscribers: 'marketing/subscribers',
        }),
    },
    watch: {
        subscribers() {
            this.realSubscribers = this.subscribers.map(item => {
                return {
                    selected: false,
                    ...item,
                }
            })
        },
    },
    async created() {
        this.loading = true
        await this.$store.dispatch('marketing/getSubscribers')
        this.loading = false
    },
    methods: {
        handleAddClick() {
            this.$router.push({
                name: 'addSubscriber',
            })
        },
        searchContact() {},
        handleExportClick() {},
        selectAll() {
            this.realSubscribers.forEach(item => {
                item.selected = true
            })
            this.statusAll = true
        },
        deselectAll() {
            this.realSubscribers.forEach(item => {
                item.selected = false
            })
            this.statusAll = false
        },
        selectVisible() {
            this.realSubscribers.forEach(item => {
                item.selected = true
            })
            this.statusAll = true
        },
        handleUnsubscribeClick() {
            console.log('Unsubscribe')
        },
        handleResubscribeClick() {
            console.log('Resubscribe')
        },
        handleArchiveClick() {
            console.log('Archive')
        },
    },
}
</script>
