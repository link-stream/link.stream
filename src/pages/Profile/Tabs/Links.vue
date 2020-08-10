<template>
    <div class="beats-container">
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
            <basic-button variant="outline-black" size="md">
                view More
            </basic-button>
        </div>
    </div>
</template>
<script>
import LinkItem from '@/components/Profile/LinkItem'
import $ from 'jquery'
export default {
    name: 'ProfileLinks',
    components: {
        LinkItem,
    },
    data: () => ({
        links: [
            {
                img: '/static/img/profile/Spaceman-Bitmap.jpg',
                title: 'Enter to win a prize pack worth over $1000!',
                link: 'https://apple.com',
            },
            {
                img: '/static/img/profile/Spaceman-Bitmap.jpg',
                title: 'Outpost LA City Market - RSVP',
                link: 'https://apple.com',
            },
            {
                img: '',
                title: 'Hydro Kitty Website',
                link: 'https://apple.com',
            },
            {
                img: '/static/img/profile/Spaceman-Bitmap.jpg',
                title: 'Hydro Kitty Website',
                link: 'https://apple.com',
            },
            {
                img: '',
                title: 'Hydro Kitty Website',
                link: 'https://apple.com',
            },
            {
                img: '/static/img/profile/Spaceman-Bitmap.jpg',
                title: 'Hydro Kitty Website',
                link: 'https://apple.com',
            },
        ],
        currentIndex: 1,
    }),
    mounted() {
        $("a[href^='http']").each(function() {
	        $(this).prepend('<img src="https://www.google.com/s2/favicons?domain=' + this.href + '">')
        })
    },
}
</script>
