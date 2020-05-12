<template>
    <button
        class="btn btn-icon"
        :class="{ '--bg-img': useBgImg }"
        :type="type"
        @click="handleClick"
    >
        <slot>
            <LsIcon :icon="icon" v-if="!useBgImg" />
        </slot>
    </button>
</template>

<script>
export default {
    name: 'LsIconButton',
    props: {
        type: {
            type: String,
            default: 'button',
        },
        icon: {
            type: String,
            default: null,
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
