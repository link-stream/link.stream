<template>
    <b-container fluid class="page page-public-profile">
        <MainInfo />
        <TabNav />
        <b-container class="page-body">
            <component v-bind:is="currentTabComponent" :url="url"></component>
        </b-container>
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
import moment from 'moment'
import Cookies from 'js-cookie'
import { api } from '~/services'
import MainInfo from '@/components/Profile/MainInfo'
import TabNav from '@/components/Profile/TabNav'
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
    },
    props: {
        url: {
            type: String,
            default: 'beats',
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
    data() {
        return {
            session: [],
        }
    },
    async created() {        
        const profile = await api.profiles.getProfileMain(this.url)
        //Visitor Info                         
        if (!Cookies.getJSON('session_id')) {
            const response = await api.users.getIpAddress()
            const visitorIp = response.visitor_ip.split('.').join('')
            const sessionId = `${visitorIp}${moment().format('YYYYMMDDHHmmss')}`
            const sha1 = require('sha1')
            const encryptSessionId = sha1(sessionId)
            Cookies.set('session_id', encryptSessionId)
            const utm = Cookies.getJSON('params_url.utm_source')
            const ref_id = Cookies.getJSON('params_url.ref_id')
            await api.users.insertVisitor({
                user_id: profile.data.id,
                session_id: encryptSessionId,
                agent: window.navigator.userAgent,
                url: window.location.href,
                utm_source: utm ? utm : '',
                ref_id: ref_id ? ref_id : '',
            })
        } 
        await this.$store.dispatch('common/loadGenres')
    },
}
</script>
