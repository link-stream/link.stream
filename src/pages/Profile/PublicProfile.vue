<template>
    <b-container class="page page-public-profile">
        <MainInfo />
        <TabNav />
        <div class="page-body">
            <component v-bind:is="currentTabComponent"></component>
        </div>
        <ArtPlayer />
    </b-container>
</template>

<script>
import {
    MainInfo,
    TabNav,
    ProfileBeats,
    ProfileSoundKits,
    ProfileVideos,
    ProfileLinks,
    ProfileAbout,
} from '@/components/Profile'
import ArtPlayer from '@/components/Profile/ArtPlayer'
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
}
</script>
