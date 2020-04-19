<template>
    <div class="crd lnk-crd" :class="{ 'is-editing': editing }">
        <div class="crd__viewer" v-if="!editing">
            <div class="crd__flex">
                <Icon icon="reorder" class="crd__reorder vid-crd-drag-sel" />
                <div class="crd__body">
                    <div class="crd__thumb">
                        <img class="crd__img" :src="link.image" :alt="link.title" />
                    </div>
                    <div class="crd__info">
                        <h2 class="crd__title">{{ link.title }}</h2>
                        <small class="crd__priv" v-if="!link.public">Private</small>
                    </div>
                </div>
            </div>
            <div class="crd__act">
                <span class="crd__hov">
                    <IconButton icon="trash" @click="remove" />
                </span>
                <IconButton icon="edit-2" @click="edit" />
            </div>
        </div>
        <div class="crd__editor" v-else>
            <div>
                <DropFoto :src="link.image" />
            </div>
            <div>
                <div class="form-group">
                    <input type="text" class="form-control" v-model="form.url" />
                    <div class="invalid-feedback">Looks good!</div>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" v-model="form.title" />
                    <div class="invalid-feedback">Looks good!</div>
                </div>

                <div class="form-group">
                    <div class="input-group">
                        <DatePicker v-model="form.date" />
                        <TimePicker v-model="form.time" />
                    </div>
                    <div class="invalid-feedback">Looks good!</div>
                </div>
            </div>
            <basic-button @click="save">Save</basic-button>
            <basic-button @click="remove">Delete</basic-button>
            <basic-button @click="cancel">Cancel</basic-button>
        </div>
    </div>
</template>

<script>
import { IconButton } from '~/components/Button'
import { Icon } from '~/components/Icon'
import { linkAddEditForm } from '~/mixins/links/linkAddEditForm'

export default {
    name: 'VideoCard',
    mixins: [linkAddEditForm],
    components: {
        IconButton,
        Icon,
    },
    props: {
        link: {
            type: Object,
            required: true,
        },
    },
    methods: {
        edit() {
            this.editing = true
        },
        cancel() {
            this.editing = false
        },
        remove() {},
    },
}
</script>
