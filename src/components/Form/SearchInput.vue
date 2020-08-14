<template>
    <div class="SearchInput">
        <!-- <Icon class="input-icon" icon="search" /> -->
        <b-icon-search
            class="input-icon"
            :variant="color ? color : 'muted'"
            :class="direction"
        />
        <input
            type="text"
            class="form-control"
            :value="value"
            :placeholder="placeholder"
            :maxlength="maxlength"
            @input="handleInput"
            @focus="handleFocus"
            @keyup.enter="handleKeyup"
            :style="customStyle"
        />
        <!-- <IconButton
            icon="close"
            class="input-clear-btn"
            @click="handleClearClick"
            v-show="!!value"
        /> -->
        <b-icon-x
            class="input-clear-btn"
            :class="direction"
            :variant="color ? color : 'muted'"
            @click="handleClearClick"
            v-show="!!value"
        />
    </div>
</template>

<script>
export default {
    name: 'SearchInput',
    props: {
        value: {
            type: String,
        },
        placeholder: {
            type: String,
        },
        maxlength: {
            type: String,
        },
        pill: {
            type: Boolean,
            default: false,
        },
        color: {
            type: String
        },
        direction: {
            type: String,
            default: 'left'
        }
    },
    computed: {
        customStyle() {
            return {
                borderRadius: this.pill ? '3rem' : '',
                color: this.color === 'white' ? 'white' : '',
                backgroundColor: this.color === 'white' ? '#2E2E2E' : (this.color === 'black' ? '#F5F5F5' : ''),
                border: this.color ? 0: '',
            }
        }
    },
     methods: {
        handleInput(e) {
            this.$emit('input', e.target.value)
        },
        handleClearClick() {
            this.$emit('input', '')
        },
        handleFocus() {
            this.$emit('focus')
        },
        handleKeyup() {
            this.$emit('keyupEnter')
        },
    },
}
</script>