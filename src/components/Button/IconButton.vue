<template>
    <button class="btn btn-icon" :type="type" @click="handleClick">
        <slot>
            <Icon :icon="icon" />
        </slot>
    </button>
</template>

<script>
import { Icon } from '~/components/Icon'

export default {
    name: 'IconButton',
    components: {
        Icon,
    },
    props: {
        type: {
            type: String,
            default: 'button',
        },
        icon: {
            type: String,
            default: '',
        },
    },
    methods: {
        handleClick() {
            this.$emit('click')
        },
    },
}
</script>
