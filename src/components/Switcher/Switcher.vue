<template>
    <label :class="classObject">
        <span class="switcher__label" v-if="textDisabled" v-text="textDisabled"></span>
        <input type="checkbox" :disabled="disabled" @change="trigger" :checked="value" />
        <div></div>
        <span class="switcher__label" v-if="textEnabled" v-text="textEnabled"></span>
    </label>
</template>

<script>
export default {
    name: 'Switcher',
    props: {
        typeBold: {
            default: false,
        },
        value: {
            default: false,
        },
        disabled: {
            default: false,
        },
        textEnabled: {
            default: '',
        },
        textDisabled: {
            default: '',
        },
        color: {
            default: 'default',
        },
        emitOnMount: {
            default: true,
        },
    },
    mounted() {
        if (this.emitOnMount) {
            this.$emit('input', this.value)
        }
    },
    methods: {
        trigger(e) {
            this.$emit('input', e.target.checked)
        },
    },
    computed: {
        classObject() {
            const { color, value, typeBold, disabled } = this
            return {
                switcher: true,
                'switcher--unchecked': !value,
                'switcher--disabled': disabled,
                'switcher--bold': typeBold,
                'switcher--bold--unchecked': typeBold && !value,
                [`switcher-color--${color}`]: color,
            }
        },
    },
}
</script>

<style lang="scss" scoped>
/**
 * Colors
 */
$color-default: #aaa;
$color-green: #53b96e;
$color-blue: #539bb9;
$color-red: #b95353;
$color-orange: #b97953;
$color-yellow: #bab353;

$colors: (
    default: $color-default,
    blue: $color-blue,
    red: $color-red,
    yellow: $color-yellow,
    orange: $color-orange,
    green: $color-green,
);

.switcher {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    &__label {
        display: block;
        margin: 1rem;
    }

    input {
        opacity: 0;
        height: 100%;
        position: absolute;
        z-index: 1;
        cursor: pointer;
    }

    div {
        height: 15px;
        width: 76px;
        position: relative;
        border-radius: 30px;
        display: -webkit-flex;
        display: -ms-flex;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        cursor: pointer;
        transition: linear 0.2s, background-color linear 0.2s;

        &:after {
            content: '';
            height: 20px;
            width: 20px;
            border-radius: 100px;
            display: block;
            transition: linear 0.15s, background-color linear 0.15s;
            position: absolute;
            left: 100%;
            margin-left: -18px;
            cursor: pointer;
            top: -3px;
            box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
        }
    }

    &--unchecked {
        div {
            justify-content: flex-end;

            &:after {
                left: 15px;
            }
        }
    }

    &--disabled {
        div {
            opacity: 0.3;
        }

        input {
            cursor: not-allowed;
        }
    }

    &--bold {
        div {
            top: -8px;
            height: 26px;
            width: 81px;

            &:after {
                margin-left: -24px;
                top: 3px;
            }
        }

        &--unchecked {
            div {
                &:after {
                    left: 28px;
                }
            }
        }

        .switcher__label {
            span {
                padding-bottom: 7px;
                display: inline-block;
            }
        }
    }

    @each $colorName, $color in $colors {
        &.switcher-color--#{$colorName} {
            div {
                @if $colorName == 'default' {
                    background-color: lighten($color, 5%);
                } @else {
                    background-color: lighten($color, 10%);
                }

                &:after {
                    @if $colorName == 'default' {
                        background-color: darken($color, 5%);
                    } @else {
                        background-color: $color;
                    }
                }
            }

            &.switcher--unchecked {
                div {
                    @if $colorName == 'default' {
                        background-color: $color;
                    } @else {
                        background-color: lighten($color, 30%);
                    }

                    &:after {
                        background-color: lighten($color, 10%);
                    }
                }
            }
        }
    }
}
</style>
