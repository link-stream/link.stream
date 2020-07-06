<template>
    <div class="SearchInput">
        <Icon class="input-icon" icon="search" />
        <b-form-input
            :value="value"
            :placeholder="placeholder"
            :maxlength="maxlength"
            @input="handleInput"
        ></b-form-input>
        <IconButton
            icon="close"
            class="input-clear-btn"
            @click="handleClearClick"
            v-show="value ? true : false"
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
    },
    methods: {
        handleInput(value) {
            this.$emit('input', value)
        },
        handleClearClick() {
            this.$emit('input', '')
        },
    },
}
</script>