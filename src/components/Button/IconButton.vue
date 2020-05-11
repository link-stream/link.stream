<template>
    <button
        class="btn btn-icon"
        :class="{ '--bg-img': useBgImg }"
        :type="type"
        @click="handleClick"
    >
        <slot>
            <Icon :icon="icon" v-if="!useBgImg" />
        </slot>
    </button>
</template>

<script>
export default {
    name: 'IconButton',
    props: {
        type: {
            type: String,
            default: 'button',
        },
        icon: {
            type: String,
            default: '',
        },
        useBgImg: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        handleClick() {
            this.$emit('click')
        },
    },
}
</script>
