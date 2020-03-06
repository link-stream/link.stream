<template>
    <b-container fluid class="p-sm-2">
        <b-row>
            <b-col cols="12">
                <h2 class="page-title">Edit your profile</h2>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <div class="cover-image-container my-2">
                    <b-link href="#" class="image-picker" v-b-modal.modalbasic>
                        <font-awesome-icon :icon="['fas', 'camera']" size="lg" />
                    </b-link>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { ImageUploader } from '~/components/Uploader'

export default {
    name: 'ProfileEdit',
    components: {
        ImageUploader,
    },
    methods: {
        chooseCover() {
            this.$refs['modalbasic'].show()
        },
    },
}
</script>

<style lang="scss" scoped>
.cover-image-container {
    position: relative;
    width: 100%;
    max-width: 802px;
    padding-bottom: 25.4364%;
    background: $gray-400;

    .image-picker {
        position: absolute;
        right: 12px;
        bottom: 9px;
        color: white;

        &:hover,
        &:focus,
        &:active {
            color: $link-color;
        }
    }
}
</style>
