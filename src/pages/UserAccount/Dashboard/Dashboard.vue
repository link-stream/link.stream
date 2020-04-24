<template>
    <div class="page">
        <h1>Dashboard Page</h1>

        <div class="my-4">
            <basic-button variant="iconic-outline"
                ><i class="ls-i ls-i-eye"></i
            ></basic-button>
        </div>

        <div class="mb-4">
            <basic-button>Add Video</basic-button>&nbsp;
            <basic-button size="sm">Add Video</basic-button>&nbsp;
            <basic-button size="xs">Close</basic-button>
        </div>

        <div class="mb-4">
            <basic-button variant="secondary">Add Video</basic-button>&nbsp;
            <basic-button variant="secondary" size="sm">Add Video</basic-button
            >&nbsp;
            <basic-button variant="secondary" size="xs">Close</basic-button>
        </div>

        <div class="mb-4">
            <basic-button variant="tertiary">Add Video</basic-button>&nbsp;
            <basic-button variant="tertiary" size="sm">Add Video</basic-button
            >&nbsp;
            <basic-button variant="tertiary" size="xs">Close</basic-button>
        </div>

        <div class="mb-4">
            <div class="custom-control custom-radio custom-control-inline">
                <input
                    type="radio"
                    id="customRadioInline1"
                    name="customRadioInline1"
                    class="custom-control-input"
                    checked
                />
                <label class="custom-control-label" for="customRadioInline1"
                    >Option 1</label
                >
            </div>
            <div class="custom-control custom-radio custom-control-inline">
                <input
                    type="radio"
                    id="customRadioInline2"
                    name="customRadioInline1"
                    class="custom-control-input"
                />
                <label class="custom-control-label" for="customRadioInline2"
                    >Option 2</label
                >
            </div>
        </div>

        <div class="mb-4">
            <DropFoto />
        </div>
    </div>
</template>

<script>
import { SpinnerButton, BasicButton } from '~/components/Button'
import { DropFoto } from '~/components/Uploader'

export default {
    name: 'Dashboard',
    components: {
        SpinnerButton,
        DropFoto,
        BasicButton,
    },
}
</script>
