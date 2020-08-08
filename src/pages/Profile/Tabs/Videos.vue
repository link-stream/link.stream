<template>
    <div class="beats-container">
        <b-row>
            <b-col
                cols="12"
                lg="4"
                md="6"
                v-for="(item, index) in videos"
                :key="index"
            >
                <VideoItem :videoItem="item" />
            </b-col>
        </b-row>
        <div class="text-center mb-5">
            <basic-button variant="outline-black" size="md">
                view More
            </basic-button>
        </div>
    </div>
</template>
<script>
import { appConstants } from '~/constants'
import VideoItem from '@/components/Profile/VideoItem'
export default {
    name: 'ProfileSoundKits',
    components: {
        VideoItem,
    },
    data: () => ({
        videos: [
            {
                url: 'https://youtu.be/vwm_N2PCUz8',
                title: 'Video Title Placeholder',
                cnt_view: 2300000, 
            },
            {
                url: 'https://youtu.be/vwm_N2PCUz8',
                title: 'Video Title Placeholder',
                cnt_view: 2300000, 
            },
            {
                url: 'https://youtu.be/vwm_N2PCUz8',
                title: 'Video Title Placeholder',
                cnt_view: 2300000, 
            },
            {
                url: 'https://youtu.be/vwm_N2PCUz8',
                title: 'Video Title Placeholder',
                cnt_view: 2300000, 
            },
            {
                url: 'https://youtu.be/vwm_N2PCUz8',
                title: 'Video Title Placeholder',
                cnt_view: 2300000, 
            },
            {
                url: 'https://youtu.be/vwm_N2PCUz8',
                title: 'Video Title Placeholder',
                cnt_view: 2300000, 
            },
        ],
        currentIndex: 1,
    }),
}
</script>
