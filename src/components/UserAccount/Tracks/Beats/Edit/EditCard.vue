<template>
    <div class="ls-card EditCard">
        <h4 class="card-title" v-html="title"></h4>
        <div class="card-body">
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