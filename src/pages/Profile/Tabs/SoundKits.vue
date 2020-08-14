<template>
    <div class="beats-container">
        <p v-if="!loading && !soundKits.length" class="text-center my-5">
            There are no public sound kits.
        </p>
        <LoadingSpinner class="page-loader" v-if="loading" />
        <div v-else>
            <b-form-row>
                <b-col
                    cols="12"
                    lg="3"
                    md="6"
                    v-for="(item, index) in soundKits"
                    :key="index"
                >
                    <SoundKitItem :artItem="item" :selected="index === currentIndex" />
                </b-col>
            </b-form-row>
            <div class="text-center mb-5">
                <basic-button variant="outline-black" size="md">
                    view More
                </basic-button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SoundKitItem from '@/components/Profile/SoundKitItem'
export default {
    name: 'ProfileSoundKits',
    components: {
        SoundKitItem,
    },
    props: {
        url: {
            type: String,
        },
    },
    computed: {
        ...mapGetters({
            soundKits: 'profile/soundKits',
        }),
    },
    data: () => ({
        loading: false,
        currentIndex: 0,
    }),
    async created() {
        this.loading = true
        await this.$store.dispatch('profile/getProfileMain', { url: this.url })
        await this.$store.dispatch('profile/getProfileKits')
        this.loading = false
        console.log(this.soundKits)
        console.log(this.soundKits.length)
    }

}
</script>
