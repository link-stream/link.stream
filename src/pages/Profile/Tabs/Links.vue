<template>
    <div class="beats-container">
        <p v-if="!loading && !links.length" class="text-center my-5">
            There are no links.
        </p>
        <LoadingSpinner class="page-loader" v-if="loading" />
        <div v-else>
            <b-form-row>
                <b-col
                    cols="12"
                    lg="3"
                    md="6"
                    v-for="(item, index) in links"
                    :key="index"
                >
                    <LinkItem :linkItem="item" />
                </b-col>
            </b-form-row>
            <div class="text-center mb-5">
                <basic-button variant="outline-black" size="md" class="btn-view-more">
                    view More
                </basic-button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import LinkItem from '@/components/Profile/LinkItem'
export default {
    name: 'ProfileLinks',
    components: {
        LinkItem,
    },
    props: {
        url: {
            type: String,
        },
    },
    computed: {
        ...mapGetters({
            links: 'profile/links',
        }),
    },
    data: () => ({
        loading: false,
    }),
    async created() {
        this.loading = true
        await this.$store.dispatch('profile/getProfileMain', { url: this.url })
        await this.$store.dispatch('profile/getProfileLinks')
        this.loading = false
    },
}
</script>
