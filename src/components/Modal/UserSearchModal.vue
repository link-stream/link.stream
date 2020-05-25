<template>
    <b-modal
        modal-class="mdl-user-search"
        ref="modal"
        size="lg"
        centered
        hide-footer
        v-model="shown"
    >
        <template v-slot:modal-header>
            <LsIconButton class="modal-close" use-bg-img @click="close" />
            <h2 class="modal-title">Search for collaborator</h2>
        </template>

        <template v-slot:default>
            <div class="search-input" :class="{ '--loading': loading }">
                <LsSpinner animation="bounce" />
                <input
                    type="text"
                    class="form-control"
                    placeholder="Username or email"
                    maxlength="35"
                    v-model="query"
                />
                <LsIconButton
                    icon="close"
                    class="search-clear-btn"
                    @click="handleClearClick"
                    v-show="allowClear"
                />
            </div>

            <ul v-show="showResults">
                <li
                    v-for="user in results"
                    :key="user.id"
                    @click="handleUserClick(user)"
                >
                    <ls-button variant="link">
                        <UserAvatar :username="user.name" :src="user.photo" />
                        {{ user.name }}
                    </ls-button>
                </li>
                <li>
                    Can't find who you're looking for?
                    <ls-button variant="link" @click="handleInviteClick">
                        Send an invite
                    </ls-button>
                </li>
            </ul>
        </template>
    </b-modal>
</template>

<script>
import { api } from '~/services/api'
import { appConstants } from '~/constants'
import { mapGetters } from 'vuex'
import { debounce } from 'lodash'

const MIN_QUERY_LENGTH = 3
const MAX_RESULTS = 5

export default {
    name: 'UserSearchModal',
    data() {
        return {
            /**
             * @type {array}
             * e.g. [{ id: null, name: null, photo: null }]
             */
            results: [],
            shown: false,
            showResults: false,
            loading: false,
            query: '',
        }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
        }),
        validQuery() {
            return this.query.length >= MIN_QUERY_LENGTH
        },
        allowClear() {
            return this.query ? true : false
        },
    },
    watch: {
        query() {
            if (this.validQuery) {
                this.debounceSeach()
            } else {
                this.reset()
            }
        },
    },
    created() {
        this.$bus.$on('modal.userSearch.show', this.handleShow)
        this.debounceSeach = debounce(() => {
            this.loading = true
            this.search()
        }, 500)
    },
    methods: {
        reset() {
            this.showResults = false
            this.loading = false
        },
        close() {
            this.shown = false
        },
        async search() {
            if (!this.validQuery) {
                this.reset()
                return
            }

            const { status, data } = await api.users.searchCollab({
                userId: this.user.id,
                search: this.query,
            })

            if (!this.validQuery) {
                this.reset()
                return
            }

            if (status === 'success') {
                this.results = data.slice(0, MAX_RESULTS).map(user => {
                    return {
                        id: user.id,
                        name: user.user_name,
                        photo: user.data_image,
                    }
                })
            }

            this.showResults = true
            this.loading = false
        },
        handleClearClick() {
            this.query = ''
        },
        handleInviteClick() {
            this.close()
            this.$bus.$emit('modal.userInvite.show')
        },
        handleShow() {
            this.shown = true
        },
        handleUserClick(user) {
            this.close()
            this.$bus.$emit('modal.userSearch.userClick', user)
        },
    },
}
</script>
