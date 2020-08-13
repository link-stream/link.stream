<template>
    <div class="beats-container">
        <LoadingSpinner class="page-loader" v-if="loading" />
        <b-form-row>
            <b-col
                cols="12"
                lg="3"
                md="6"
                v-for="(item, index) in beats"
                :key="index"
            >
                <ArtItem :artItem="item" :selected="index === currentIndex" />
            </b-col>
        </b-form-row>
        <div class="text-center mb-5">
            <basic-button variant="outline-black" size="md">
                view More
            </basic-button>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ArtItem from '@/components/Profile/ArtItem'
export default {
    name: 'ProfileBeats',
    components: {
        ArtItem,
    },
    props: {
        url: {
            type: String,
        },
    },
    computed: {
        ...mapGetters({
            beats: 'profile/beats',
        }),
    },
    data: () => ({
        loading: false,
        currentIndex: 1,
    }),
    async created() {
        this.loading = true
        await this.$store.dispatch('profile/getProfileMain', { url: this.url })
        await this.$store.dispatch('profile/getProfileBeats')
        this.loading = false
        console.log('beats', this.beats)
    }
}
</script>
