<template>
    <div class="Card EditCard">
        <h4 class="Card-title" v-html="title"></h4>
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