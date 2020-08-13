<template>
    <b-container class="page page-public-profile">
        <MainInfo />
        <TabNav />
        <div class="page-body">
            <component v-bind:is="currentTabComponent"></component>
        </div>
        <ArtPlayer />
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
import ArtPlayer from '@/components/Profile/ArtPlayer'
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
        ArtPlayer,
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
        console.log('userUrl', this.url)
        await this.$store.dispatch('profile/getProfile', { url: this.url })
    },
}
</script>
