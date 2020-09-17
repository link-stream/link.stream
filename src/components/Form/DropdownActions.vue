<template>
    <b-dropdown
        class="dropdown-actions"
        left
        variant="link"
        toggle-class="text-decoration-none"
        no-caret
    >
        <template slot="button-content">
            <span>Actions</span>
            <font-awesome-icon :icon="['fas', 'chevron-down']" />
            <font-awesome-icon :icon="['fas', 'chevron-up']" />
        </template>
        <b-dropdown-item @click="$emit('unsubscribe')">
            Unsubscribe
        </b-dropdown-item>
        <b-dropdown-item @click="$emit('resubscribe')">
            Resubscribe
        </b-dropdown-item>
        <b-dropdown-item @click="$emit('archive')">
            Archive
        </b-dropdown-item>
    </b-dropdown>
</template>
<script>
export default {
    name: 'DropdownActions',
}
</script>
