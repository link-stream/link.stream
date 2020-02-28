<template>
    <b-button
        pill
        :type="type"
        :class="{
            'btn-round btn-multiple-state': true,
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

<style lang="scss" scoped>
.btn-round {
    height: 50px;
    margin: auto;
    padding: 0 1.25 * $spacer;
    font-weight: $font-weight-semi-bold;
    border: 0;

    &:focus {
        box-shadow: none;
    }

    &.pink {
        background-color: $linkstream-1;
        &:not(:disabled):not(.disabled):active {
            background-color: $linkstream-1;
        }
    }

    &.instagram {
        background: linear-gradient(135deg, #a624d2 0%, #ce5353 47.8%, #ffb02d 100%);
        &:not(:disabled):not(.disabled):active {
            background: linear-gradient(135deg, #a624d2 0%, #ce5353 47.8%, #ffb02d 100%);
        }
    }

    &.google {
        background-color: #d44c4c;
        &:not(:disabled):not(.disabled):active {
            background-color: #d44c4c;
        }
    }
}

.btn-multiple-state {
    position: relative;
    transition: opacity 500ms;

    .spinner,
    .icon {
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        opacity: 0;
        visibility: hidden;
        top: 50%;
        transform: translateY(-50%);
        transition: opacity 500ms;
        // color: $button-text-color;
    }

    .icon i {
        vertical-align: text-bottom;
        font-size: 18px;
    }

    .label {
        display: flex;
        justify-content: space-between;
        transition: opacity 500ms;
    }

    &.show-spinner {
        .label {
            opacity: 0;
        }

        .spinner {
            opacity: 1;
            visibility: visible;
        }
    }

    &.show-success {
        .label {
            opacity: 0;
        }

        .icon.success {
            opacity: 1;
            visibility: visible;
        }
    }

    &.show-fail {
        .label {
            opacity: 0;
        }

        .icon.fail {
            opacity: 1;
            visibility: visible;
        }
    }

    .spinner {
        width: 36px;
        text-align: center;

        > span {
            width: 6px;
            height: 6px;
            background-color: white;
            border-radius: 100%;
            display: inline-block;
            -webkit-animation: sk-bouncedelay 1.2s infinite ease-in-out both;
            animation: sk-bouncedelay 1.2s infinite ease-in-out both;

            &.bounce1 {
                -webkit-animation-delay: -0.32s;
                animation-delay: -0.32s;
            }

            &.bounce2 {
                -webkit-animation-delay: -0.16s;
                animation-delay: -0.16s;
            }
        }
    }
}

@-webkit-keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
        -webkit-transform: scale(0);
    }

    40% {
        -webkit-transform: scale(1);
    }
}

@keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
        -webkit-transform: scale(0);
        transform: scale(0);
    }

    40% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}
</style>
