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
            <input
                type="radio"
                id="customRadioInline1"
                name="customRadioInline1"
                class="custom-control-input"
                checked
            />
            <label class="custom-control-label" for="customRadioInline1">Option 1</label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
            <input
                type="radio"
                id="customRadioInline2"
                name="customRadioInline1"
                class="custom-control-input"
            />
            <label class="custom-control-label" for="customRadioInline2">Option 2</label>
        </div>

        <div class="mb-4"></div>

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
