<template>
    <div class="Card EditCard">
        <div class="Card-title EditCard-title" v-html="title"></div>
        <div class="Card-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EditCard',
    props: {
        title: {
            type: String,
        },
    },
}
</script>