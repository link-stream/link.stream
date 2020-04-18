<template>
    <div class="page">
        <h1>Dashboard Page</h1>
        <div class="mb-4"></div>
        <spinner-button>Add Video</spinner-button>&nbsp;
        <spinner-button size="sm">Add Video</spinner-button>&nbsp;
        <spinner-button size="xs">Close</spinner-button>

        <div class="mb-4"></div>

        <spinner-button variant="secondary">Add Video</spinner-button>&nbsp;
        <spinner-button variant="secondary" size="sm">Add Video</spinner-button>&nbsp;
        <spinner-button variant="secondary" size="xs">Close</spinner-button>

        <div class="mb-4"></div>

        <spinner-button variant="tertiary">Add Video</spinner-button>&nbsp;
        <spinner-button variant="tertiary" size="sm">Add Video</spinner-button>&nbsp;
        <spinner-button variant="tertiary" size="xs">Close</spinner-button>

        <div class="mb-4"></div>

        <div class="custom-control custom-radio custom-control-inline">
            <input type="radio" class="custom-control-input" checked />
            <label class="custom-control-label">Option 1</label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
            <input type="radio" class="custom-control-input" />
            <label class="custom-control-label">Option 2</label>
        </div>
        <br />
        <br />
        <br />
        <DropFoto />
    </div>
</template>

<script>
import { SpinnerButton } from '~/components/Button'
import { DropFoto } from '~/components/Uploader'

export default {
    name: 'Dashboard',
    components: {
        SpinnerButton,
        DropFoto,
    },
}
</script>
