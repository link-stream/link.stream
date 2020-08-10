<template>
    <div class="link-item">
        <div class="img-container">
            <img  v-if="linkItem.img" :src="linkItem.img" />
        </div>
        <div class="link-desc" :class="{'no-img': !linkItem.img}">
            <div class="title">
                {{ linkItem.title }}
            </div>
            <a class="link" :href="linkItem.link">
                {{ linkItem.link }}
            </a>
        </div>
    </div>
</template>
<script>

export default {
    name: 'LinkItemm',
    props: {
        linkItem: {
            type: Object
        },
    },
    
}
</script>
