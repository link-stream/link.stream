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
