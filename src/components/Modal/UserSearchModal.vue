<template>
    <b-modal
        modal-class="mdl-user-search"
        ref="modal"
        size="lg"
        @hidden="handleHidden"
        centered
        hide-footer
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
                    @click="clearQuery"
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
                    <ls-button variant="link" @click="showInviteModal">
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
             * @var {array}
             * e.g. [{ id: null, name: null, photo: null }]
             */
            results: [],
            showResults: false,
            loading: false,
            query: '',
        }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
        }),
        isValidQuery() {
            return this.query.length >= MIN_QUERY_LENGTH
        },
        allowClear() {
            return this.query ? true : false
        },
    },
    watch: {
        query() {
            if (this.isValidQuery) {
                this.loading = true
                this.debounceSeach()
            } else {
                this.resetSearch()
            }
        },
    },
    mounted() {
        this.$refs.modal.show()
    },
    created() {
        this.debounceSeach = debounce(this.search, 500)
    },
    methods: {
        clearQuery() {
            this.query = ''
        },
        resetSearch() {
            this.showResults = false
            this.loading = false
        },
        close() {
            this.$refs.modal.hide()
        },
        showInviteModal() {
            this.close()
            this.$bvModal.show('mdlUserInvite')
        },
        async search() {
            if (!this.isValidQuery) {
                this.resetSearch()
                return
            }

            const { status, data } = await api.users.searchCollab({
                userId: this.user.id,
                search: this.query,
            })

            if (!this.isValidQuery) {
                this.resetSearch()
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
        handleHidden() {
            this.$emit('hidden')
        },
        handleUserClick(user) {
            this.close()
            this.$emit('user-select', user)
        },
    },
}
</script>
