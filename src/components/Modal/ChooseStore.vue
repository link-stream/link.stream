<template>
    <b-modal
        modal-class="ChooseStore"
        centered
        size="lg"
        v-model="open"
        hide-footer
        title="Choose a Store"
        @hidden="$emit('close')"
    >
        <b-container>
            <b-row class="text-center d-flex justify-content-center">
                <b-col v-for="(store, index) in storeItems" :key="index">
                    <div>
                        <div class="store-logo mb-2" @click="signInStore(store)">
                            <b-avatar size="6rem" variant="secondary" :src="store.data_image"></b-avatar>
                        </div>
                        <span class="mt-4">{{ store.url }}</span>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </b-modal>
</template>

<script>
import Cookies from 'js-cookie'
export default {
    name: 'ChooseStore',
    data() {
        return {
            open: false,
            user: null,
            storeItems: [],
        }
    },
    created() {
        this.$bus.$on('modal.chooseStore.open', payload => {
            this.user = payload
            this.storeItems = payload.store
            this.open = true
        })
    },
    methods: {
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
        close() {
            this.open = false
        },
    },
}
</script>
