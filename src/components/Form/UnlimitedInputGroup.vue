<template>
    <div
        class="UnlimitedInputGroup input-group"
        :class="{ 'is-unlimited': isUnlimited }"
    >
        <div class="input-group-prepend">
            <button
                type="button"
                class="btn btn-outline-secondary"
                @click="handleButtonClick"
            >
                Unlimited
            </button>
        </div>
        <input
            type="text"
            class="form-control"
            ref="input"
            :value="localValue"
            v-cleave="{
                numeral: true,
            }"
            @input="handleInputInput"
            @focusin="handleInputFocusIn"
            @focusout="handleInputFocusOut"
        />
    </div>
</template>

<script>
import { stripCommas } from '~/utils'

const VALUE_UNLIMITED = 'Unlimited'

export default {
    name: 'UnlimitedInputGroup',
    props: {
        value: {
            type: [String, Number],
        },
    },
    directives: {
        cleave: {
            inserted(el, binding) {
                el.cleave = new Cleave(el, binding.value || {})
            },
        },
    },
    data() {
        return { localValue: null }
    },
    computed: {
        isUnlimited() {
            return this.localValue === VALUE_UNLIMITED
        },
    },
    watch: {
        value(value) {
            if (stripCommas(value) !== stripCommas(this.localValue)) {
                this.localValue = value
            }
        },
    },

    methods: {
        updateValue() {
            this.$emit('input', stripCommas(this.localValue))
        },
        handleButtonClick() {
            if (!this.isUnlimited) {
                this.localValue = VALUE_UNLIMITED
                this.updateValue()
            }
        },
        handleInputInput(evt) {
            this.localValue = evt.target.value
            this.updateValue()
        },
        handleInputFocusIn() {
            if (this.isUnlimited) {
                this.localValue = ''
            }
        },
        handleInputFocusOut() {
            if (!this.localValue.length) {
                this.localValue = VALUE_UNLIMITED
                this.updateValue()
            }
        },
    },
}
</script>
