<template>
    <div class="page">
        <h1>Dashboard Page</h1>
        <br />
        <spinner-button>Add Video</spinner-button>
        <spinner-button size="sm">Add Video</spinner-button>
        <spinner-button size="xs">Close</spinner-button>
        <br />
        <br />
        <br />
        <spinner-button variant="secondary">Add Video</spinner-button>
        <spinner-button variant="secondary" size="sm">Add Video</spinner-button>
        <spinner-button variant="secondary" size="xs">Close</spinner-button>
        <br />
        <br />
        <br />
        <spinner-button variant="tertiary">Add Video</spinner-button>
        <spinner-button variant="tertiary" size="sm">Add Video</spinner-button>
        <spinner-button variant="tertiary" size="xs">Close</spinner-button>
        <br />
        <br />
        <br />
        <div class="custom-control custom-radio custom-control-inline">
            <input
                type="radio"
                id="customRadioInline1"
                name="customRadioInline1"
                class="custom-control-input"
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
    </div>
</template>

<script>
import { SpinnerButton } from '~/components/Button'
export default {
    name: 'Dashboard',
    components: {
        SpinnerButton,
    },
}
</script>
