<template>
    <div class="LsToggleButtonGroup btn-group btn-group-toggle">
        <label class="btn btn-purple" :class="{ active: localValue === true }">
            <input type="radio" :value="true" v-model="localValue" />
            Yes
        </label>
        <label class="btn btn-purple" :class="{ active: localValue === false }">
            <input type="radio" :value="false" v-model="localValue" />
            No
        </label>
    </div>
</template>

<script>
export default {
    name: 'LsToggleButtonGroup',
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            localValue: this.value,
        }
    },
    watch: {
        localValue() {
            this.$emit('input', this.localValue)
        },
    },
}
</script>
