<template>
    <b-container class="page page-public-profile">
        <MainInfo />
        <TabNav />
        <div class="page-body">
            <component v-bind:is="currentTabComponent" :url="url"></component>
        </div>
        <BuyLicenseModal />
        <AddedCartModal />
        <ShareArtModal />
    </b-container>
</template>

<script>
import {
    ProfileBeats,
    ProfileSoundKits,
    ProfileVideos,
    ProfileLinks,
    ProfileAbout,
} from './Tabs'
import MainInfo from '@/components/Profile/MainInfo'
import TabNav from '@/components/Profile/TabNav'
import BuyLicenseModal from '@/components/Modal/BuyLicenseModal'
import AddedCartModal from '@/components/Modal/AddedCartModal'
import ShareArtModal from '@/components/Modal/ShareArtModal'
export default {
    name: 'PublicProfile',
    components: {
        MainInfo,
        TabNav,
        ProfileBeats,
        ProfileSoundKits,
        ProfileVideos,
        ProfileLinks,
        ProfileAbout,
        BuyLicenseModal,
        AddedCartModal,
        ShareArtModal,
    },
    props: {
        url: {
            type: String,
        },
    },
    computed: {
        currentTabComponent() {
            switch (this.$route.name) {
                case 'profileBeats':
                    return 'ProfileBeats'
                case 'profileSoundKits':
                    return 'ProfileSoundKits'
                case 'profileVideos':
                    return 'ProfileVideos'
                case 'profileLinks':
                    return 'ProfileLinks'
                case 'profileAbout':
                    return 'ProfileAbout'
                default:
                    return 'ProfileBeats'
            }
        },
    },
    async created() {
        await this.$store.dispatch('common/loadGenres')
    },
}
</script>
