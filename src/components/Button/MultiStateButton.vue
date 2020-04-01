<template>
    <b-button
        pill
        :variant="variant"
        :type="type"
        :class="{
            'btn-multiple-state': true,
            instagram,
            google,
            'show-spinner': loading,
            'show-success': !loading && error === false,
            'show-fail': !loading && error,
        }"
        :disabled="loading"
        @click="click"
    >
        <span class="spinner d-inline-block">
            <span class="bounce1"></span>
            <span class="bounce2"></span>
            <span class="bounce3"></span>
        </span>
        <span class="icon success">
            <font-awesome-icon :icon="['far', 'check-circle']" size="lg" />
        </span>
        <span class="icon fail">
            <i class="simple-icon-exclamation"></i>
            <font-awesome-icon :icon="['fas', 'exclamation-triangle']" size="lg" />
        </span>
        <div class="label">
            <slot></slot>
        </div>
    </b-button>
</template>

<script>
import { noop } from 'lodash'

export default {
    name: 'MultiStateButton',
    props: {
        type: {
            type: String,
            default: 'button',
        },
        variant: {
            type: String,
            default: 'primary',
        },
        instagram: {
            type: Boolean,
            default: false,
        },
        google: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        error: {
            type: Boolean,
            default: null,
        },
        onClick: {
            type: Function,
            default: noop,
        },
    },
    methods: {
        click() {
            this.$emit('onClick')
        },
    },
}
</script>