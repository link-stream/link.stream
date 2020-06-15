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
            @input="handleInputInput"
            @focusin="handleInputFocusIn"
            @focusout="handleInputFocusOut"
        />
    </div>
</template>

<script>
import Cleave from 'cleave.js'
import { stripCommas } from '~/utils'

const VALUE_UNLIMITED = 'Unlimited'

export default {
    name: 'UnlimitedInputGroup',
    props: {
        value: {
            type: [String, Number],
        },
    },
    data() {
        return { localValue: this.value }
    },
    computed: {
        isUnlimited() {
            return this.localValue === VALUE_UNLIMITED
        },
    },
    mounted() {
        const inputEl = this.$refs.input
        new Cleave(inputEl, { numeral: true })
        inputEl.value = this.localValue
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
        handleInputInput(e) {
            this.localValue = e.target.value
            this.updateValue()
        },
        handleInputFocusIn() {
            if (this.isUnlimited) {
                this.localValue = null
            }
        },
        handleInputFocusOut() {
            if (!this.localValue || !this.localValue.trim()) {
                this.localValue = VALUE_UNLIMITED
                this.updateValue()
            }
        },
    },
}
</script>
