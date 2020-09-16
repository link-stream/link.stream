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
                <b-dropdown
                    class="dropdown-actions"
                    left
                    variant="link"
                    toggle-class="text-decoration-none"
                    no-caret
                >
                    <template slot="button-content">
                        <span>Actions</span>
                        <font-awesome-icon :icon="['fas', 'chevron-down']" />
                        <font-awesome-icon :icon="['fas', 'chevron-up']" />
                    </template>
                    <b-dropdown-item>Unsubscribe</b-dropdown-item>
                    <b-dropdown-item>Resubscribe</b-dropdown-item>
                    <b-dropdown-item>Archive</b-dropdown-item>
                </b-dropdown>
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
            <div class="page-empty" v-if="!loading && !items.length">
                <div class="empty-text">
                    Your subscribers will appear here.
                </div>
            </div>
            <LoadingSpinner class="page-loader" v-if="loading" />
            <div v-else-if="items.length > 0" class="subscriber-container">
                <b-table :fields="fields" :items="items" responsive>
                    <template v-slot:head(selected)="data">
                        <b-dropdown
                            class="select-actions"
                            left
                            variant="link"
                            toggle-class="text-decoration-none"
                            no-caret
                        >
                            <template slot="button-content">
                                <b-form-checkbox v-model="statusAll"></b-form-checkbox>
                                <span>{{ data.label }}</span>
                                <font-awesome-icon :icon="['fas', 'chevron-down']" />
                                <font-awesome-icon :icon="['fas', 'chevron-up']" />
                            </template>
                            <b-dropdown-item @click="selectVisible">Select visible</b-dropdown-item>
                            <b-dropdown-item @click="selectAll">Select all</b-dropdown-item>
                            <b-dropdown-item @click="deselectAll">Deselect all</b-dropdown-item>
                        </b-dropdown>
                    </template>
                    <template v-slot:cell(selected)="data">
                        <b-form-checkbox v-model="data.value"></b-form-checkbox>
                    </template>
                    <template v-slot:cell(name)="data">
                        <a href="#">
                            {{ data.value }}
                        </a>
                    </template>
                </b-table>
            </div>
        </main>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Subscribers',
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
                key: 'date_added',
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
        items: [
            {
                selected: false,
                name: 'Alyssa Tucker',
                email: 'alyssa@link.stream',
                date_added: '07/14/20 3:35pm',
                email_status: 'Subscribed',
                sms_status: 'Subscribed',
            },
            {
                selected: false,
                name: 'Alyssa Tucker',
                email: 'alyssa@link.stream',
                date_added: '07/14/20 3:35pm',
                email_status: 'Subscribed',
                sms_status: 'Subscribed',
            },
            {
                selected: false,
                name: 'Alyssa Tucker',
                email: 'alyssa@link.stream',
                date_added: '07/14/20 3:35pm',
                email_status: 'Subscribed',
                sms_status: 'Subscribed',
            },
        ],
        cntEmail: 5748,
        cntSms: 2257,
    }),
    computed: {
        ...mapGetters({
            subscribers: 'marketing/subscribers',
        }),
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
            this.items.forEach(item => {
                item.selected = true
            })
            this.statusAll = true
        },
        deselectAll() {
            this.items.forEach(item => {
                item.selected = false
            })
            this.statusAll = false
        },
        selectVisible() {
            this.items.forEach(item => {
                item.selected = true
            })
            this.statusAll = true
        }
    }
}
</script>
