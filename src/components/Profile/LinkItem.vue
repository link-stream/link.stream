<template>
    <div class="link-item">
        <div class="img-container">
            <img v-if="linkItem.data_image" :src="linkItem.data_image" @load="handleLoad" />
        </div>
        <div class="link-desc" :class="{ 'no-img': !linkItem.data_image }">
            <div class="title">{{ linkItem.title }}</div>
            <a
                class="link"
                :href="linkItem.url"
                target="_blank"
                @click="handleAction"
            >{{ linkItem.url }}</a>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
import { api } from '~/services'
export default {
    name: 'LinkItemm',
    props: {
        linkItem: {
            type: Object,
        },
    },
    methods: {
        handleLoad() {
            $("a[href^='http']").each(function() {
                if (!$(this).find('img').length) {
                    $(this).prepend(
                        '<img src="https://www.google.com/s2/favicons?domain=' +
                            this.href +
                            '">'
                    )
                }
            })
        },
        async handleAction() {
            const params = {
                id: this.linkItem.id,
                type: 'link',
                action: 'play',
            }
            await api.profiles.insertAction(params)
        },
    },
}
</script>
