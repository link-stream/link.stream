<template>
    <b-modal
        :modal-class="{
            UserSearchModal: true,
            '--search-done': showResults,
        }"
        size="lg"
        centered
        hide-footer
        v-model="open"
    >
        <template v-slot:modal-header>
            <LsButton variant="icon-bg" class="modal-close" @click="close" />
            <h2 class="modal-title">Search for collaborator</h2>
        </template>

        <template v-slot:default>
            <div class="search-box" :class="{ '--searching': searching }">
                <LsIcon class="search-icon" icon="search" />
                <input
                    type="text"
                    class="search-input form-control"
                    placeholder="Username or email"
                    maxlength="35"
                    v-model="query"
                />
                <LsIconButton
                    icon="close"
                    class="search-clear"
                    @click="handleClearClick"
                    v-show="query ? true : false"
                />
                <LsSpinner animation="bounce" />
            </div>

            <ul class="search-results" v-show="showResults">
                <li
                    v-for="user in results"
                    :key="user.id"
                    @click="handleUserClick(user)"
                >
                    <UserAvatar :user="user" />
                    {{ user.name }}
                </li>
                <li class="invite">
                    <p>
                        Can't find who you're looking for?
                        <ls-button variant="link" @click="handleInviteClick">
                            Send an invite
                        </ls-button>
                    </p>
                </li>
            </ul>
        </template>
    </b-modal>
</template>

<script>
import { api } from '~/services/api'
import { mapGetters } from 'vuex'
import { debounce } from 'lodash'

const MIN_QUERY_LENGTH = 2
const MAX_RESULTS = 5

export default {
    name: 'UserSearchModal',
    data() {
        return {
            open: false,
            showResults: false,
            searching: false,
            query: null,
            /**
             * @type {array}
             * e.g. [{ id: null, name: null, photo: null }]
             */
            results: [],
        }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
        }),
        isValidQuery() {
            return this.query && this.query.length >= MIN_QUERY_LENGTH
                ? true
                : false
        },
    },
    watch: {
        query() {
            if (this.isValidQuery) {
                this.debounceSeach()
            } else {
                this.reset()
            }
        },
    },
    created() {
        this.$bus.$on('modal.userSearch.open', this.handleOpen)
        this.debounceSeach = debounce(() => {
            this.searching = true
            this.search()
        }, 500)
    },
    methods: {
        reset() {
            this.showResults = false
            this.searching = false
        },
        close() {
            this.open = false
        },
        async search() {
            if (!this.isValidQuery) {
                this.reset()
                return
            }

            const { status, data } = await api.users.searchCollab({
                userId: this.user.id,
                search: this.query,
            })

            if (!this.isValidQuery) {
                this.reset()
                return
            }

            if (status === 'success') {
                this.results = data
                    .slice(0, MAX_RESULTS)
                    .map(({ id, user_name, data_image }) => {
                        return {
                            id,
                            name: user_name,
                            photo: data_image,
                        }
                    })
            }

            this.showResults = true
            this.searching = false
        },
        handleClearClick() {
            this.query = null
        },
        handleInviteClick() {
            this.close()
            this.$bus.$emit('modal.userInvite.open')
        },
        handleUserClick(user) {
            this.close()
            this.$bus.$emit('modal.userSearch.userSelected', user)
        },
        handleOpen() {
            this.open = true
        },
    },
}
</script>
