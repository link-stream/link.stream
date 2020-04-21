<template>
    <div class="crd lnk-crd" :class="{ 'is-editing': editing }">
        <div class="crd-viewer" v-if="!editing">
            <div class="crd-flex">
                <Icon icon="reorder" class="crd-reorder lnk-crd-drag-sel" />
                <div class="crd-body">
                    <div class="crd-thumb">
                        <img
                            class="crd-img"
                            :src="link.artwork"
                            :alt="link.title"
                        />
                    </div>
                    <div class="crd-info">
                        <h2 class="crd-title">{{ link.title }}</h2>
                    </div>
                </div>
            </div>
            <div class="crd-act">
                <IconButton icon="edit-2" @click="showEditView" />
            </div>
        </div>
        <div class="crd-editor" v-else>
            <div>
                <DropFoto :src="link.data_image" @change="updateImage" />
            </div>
            <div>
                <div class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        v-model="$v.form.url.$model"
                        :class="{ 'is-invalid': $v.form.url.$error }"
                    />
                    <div class="invalid-feedback">Enter a valid URL</div>
                </div>
                <div class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        v-model="$v.form.title.$model"
                        :class="{ 'is-invalid': $v.form.title.$error }"
                    />
                    <div class="invalid-feedback">Enter a title</div>
                </div>

                <div class="form-group" v-if="form.scheduled">
                    <div
                        class="input-group datetime-input-group"
                        :class="{
                            'is-invalid':
                                $v.form.date.$error || $v.form.time.$error,
                        }"
                    >
                        <DatePicker v-model="form.date" />
                        <TimePicker v-model="form.time" />
                    </div>
                    <div
                        class="invalid-feedback"
                        v-if="$v.form.date.$error || $v.form.time.$error"
                        >Select a date and time</div
                    >
                </div>
            </div>
            <basic-button @click="toggleSchedule">Schedule</basic-button>
            <spinner-button @click="save" :loading="saving"
                >Save</spinner-button
            >
            <basic-button @click="handleDeleteClick">Delete</basic-button>
            <basic-button @click="hideEditView">Cancel</basic-button>
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
        showEditView() {
            this.editing = true
        },
        hideEditView() {
            this.editing = false
        },
        handleDeleteClick() {
            this.$emit('delete-click', this.link)
        },
    },
}
</script>
