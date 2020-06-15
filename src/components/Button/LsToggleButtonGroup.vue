<template>
    <div class="LsToggleButtonGroup btn-group btn-group-toggle">
        <label
            class="btn btn-purple"
            :class="{ active: toggled }"
            @click="handleClick"
        >
            Yes
        </label>
        <label
            class="btn btn-purple"
            :class="{ active: !toggled }"
            @click="handleClick"
        >
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
            toggled: !!this.value,
        }
    },
    methods: {
        handleClick() {
            this.toggled = !this.toggled
            this.$emit('input', this.toggled)
        },
    },
}
</script>
