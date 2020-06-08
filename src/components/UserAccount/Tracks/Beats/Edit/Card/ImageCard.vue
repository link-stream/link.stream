<template>
    <div class="Card ImageCard">
        <DropImage />
    </div>
</template>

<script>
import { DropImage } from '~/components/Uploader'

export default {
    name: 'ImageCard',
    components: {
        DropImage,
    },
}
</script>