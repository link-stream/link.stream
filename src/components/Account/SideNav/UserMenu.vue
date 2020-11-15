<template>
    <div class="user-menu position-relative d-inline-block" v-if="user">
        <b-container fluid>
            <b-dropdown
                class="dropdown-menu-right"
                dropup
                right
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
            >
                <template slot="button-content">
                    <span>
                        <b-img
                            v-if="user"
                            :alt="user.display_name"
                            :src="user.data_image"
                            rounded="circle"
                            class="avatar"
                        />
                        <vue-letter-avatar
                            v-else
                            :name="user.display_name"
                            size="40"
                            :rounded="true"
                        />
                    </span>
                    <span class="user-name">{{ user.display_name }}</span>
                    <font-awesome-icon :icon="['fas', 'chevron-down']" />
                    <font-awesome-icon :icon="['fas', 'chevron-up']" />
                </template>
                <div class="user-dropdown">
                    <div v-if="user.type === 'producer'">
                        <div v-for="(store, index) in stores" :key="index">
                            <b-dropdown-item
                                :id="`store-name-${index}`"
                                :active="store.id === user.id"
                                @click="changeStore(store)"
                            >
                                <b-img
                                    :alt="store.display_name"
                                    :src="store.data_image"
                                    rounded="circle"
                                    class="dropdown-item-avatar"
                                />
                                {{ store.url | truncate(16) }}
                            </b-dropdown-item>
                        </div>
                    </div>
                    <b-dropdown-divider v-if="user.type === 'producer'" />
                    <b-dropdown-item
                        @click="addStore"
                        v-if="user.type === 'producer'"
                        :disabled="stores.length === 10"
                    >Add store</b-dropdown-item>
                    <b-dropdown-item :to="{ name: 'accountProfileEdit' }">Account</b-dropdown-item>
                    <b-dropdown-item>Features</b-dropdown-item>
                    <b-dropdown-item>History</b-dropdown-item>
                    <b-dropdown-item>Support</b-dropdown-item>
                    <b-dropdown-divider />
                    <b-dropdown-item @click="logout">Sign out</b-dropdown-item>
                </div>
            </b-dropdown>
        </b-container>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import { appConstants } from '~/constants'

export default {
    name: 'TopNavUserMenu',
    computed: {
        ...mapGetters({
            auth: 'auth/user',
            user: 'me/user',
            stores: 'me/stores',
        }),
    },
    // data() {
    //     return {
    //         store: null,
    //     }
    // },
    // watch: {
    //     stores() {
    //         this.store = this.stores.find(store => store.id === this.auth.id)
    //     },
    // },
    methods: {
        async changeStore(store) {
            if (store.id !== this.user.id) {
                const authuser = Cookies.getJSON(appConstants.cookies.auth.name)
                const tempUser = {
                    id: authuser.user_id,
                    token: authuser.user_token,
                }
                await this.$store.dispatch('auth/logout')
                this.$store.dispatch('auth/loginNew', {
                    store: store,
                    user: tempUser,
                    route: '',
                })
                window.location = '/app'
            }
        },
        addStore() {
            const userInfo = {
                user_id: this.auth.user_id,
                user_token: this.auth.user_token,
            }
            this.$bus.$emit('modal.addstore.open', userInfo)
        },
        async logout() {
            await this.$store.dispatch('auth/logout')
            this.$router.push({ name: 'login' })
        },
    },
}
</script>
