<template>
    <div
        class="UnlimitedInputGroup input-group"
        :class="{ 'is-unlimited': isUnlimited }"
    >
        <div class="input-group-prepend">
            <button
                type="button"
                class="btn btn-outline-secondary"
                @click="handleUnlimitedClick"
            >
                Unlimited
            </button>
        </div>
        <input
            type="text"
            class="form-control"
            ref="input"
            :value="localValue"
            @input="handleCustomInput"
            @focusin="handleCustomFocusIn"
            @focusout="handleCustomFocusOut"
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
            type: String,
            default: '',
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
        const el = this.$refs.input
        new Cleave(el, { numeral: true })
        if (this.isUnlimited) {
            el.value = VALUE_UNLIMITED
        }
    },
    methods: {
        updateValue(value) {
            this.localValue = value
            this.$emit('input', stripCommas(value))
        },
        handleUnlimitedClick() {
            !this.isUnlimited && this.updateValue(VALUE_UNLIMITED)
        },
        handleCustomInput(e) {
            this.updateValue(e.target.value)
        },
        handleCustomFocusIn() {
            if (this.isUnlimited) {
                this.localValue = ''
            }
        },
        handleCustomFocusOut() {
            !this.localValue.trim() && this.updateValue(VALUE_UNLIMITED)
        },
    },
}
</script>
