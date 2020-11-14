<template>
    <div class="page page-choose-store my-4">
        <b-container>
            <b-row class="text-center d-flex justify-content-center">
                <b-col cols="12" class="mt-4 mb-2">
                    <label class="sign-in-text">Your Stores</label>
                </b-col>
                <b-col
                    cols="12"
                    class="store-col d-flex justify-content-center"
                    v-for="(store, index) in storeItems"
                    :key="index"
                >
                    <b-card class="store-card" tag="button" @click="signInStore(store)">
                        <b-card-text class="d-flex align-items-center">
                            <div class="store-logo">
                                <b-avatar size="40px" :src="store.data_image"></b-avatar>
                            </div>
                            <b-container fluid>
                                <b-row>
                                    <b-col cols="12" class="col-title d-flex align-items-start">
                                        <span class="store-display-name">
                                            {{
                                            store.display_name
                                            }}
                                        </span>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="12" class="col-title d-flex justify-content-start">
                                        <span class="store-url">
                                            {{
                                            displayUrl(store.url)
                                            | truncate(42)
                                            }}
                                        </span>
                                    </b-col>
                                </b-row>
                            </b-container>
                            <font-awesome-icon
                                :icon="['fas', 'chevron-right']"
                                class="store-chevron-right"
                            />
                        </b-card-text>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
    name: 'YourStores',
    data() {
        return {
            user: null,
            storeItems: [],
            baseUrl: '',
        }
    },
    created() {
        const getUrl = window.location
        this.baseUrl = getUrl.host
        const data = JSON.parse(localStorage.getItem('userStores'))
        this.user = data
        this.storeItems = data.store
        localStorage.removeItem('userStores')
    },
    methods: {
        displayUrl(url) {
            const appUrl = process.env.VUE_APP_URL
            return `${this.baseUrl}/${url}`
        },
        signInStore(store) {
            setTimeout(() => {
                var previous_route = Cookies.getJSON('previous_route')
                this.$store.dispatch('auth/loginNew', {
                    store: store,
                    user: this.user,
                    route: previous_route,
                })
            }, 1500)
        },
    },
}
</script>
