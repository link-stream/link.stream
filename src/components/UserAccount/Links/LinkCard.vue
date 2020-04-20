<template>
    <div class="crd lnk-crd" :class="{ 'is-editing': editing }">
        <div class="crd__viewer" v-if="!editing">
            <div class="crd__flex">
                <Icon icon="reorder" class="crd__reorder lnk-crd-drag-sel" />
                <div class="crd__body">
                    <div class="crd__thumb">
                        <img class="crd__img" :src="link.artwork" :alt="link.title" />
                    </div>
                    <div class="crd__info">
                        <h2 class="crd__title">{{ link.title }}</h2>
                    </div>
                </div>
            </div>
            <div class="crd__act">
                <IconButton icon="edit-2" @click="handleEditClick" />
            </div>
        </div>
        <div class="crd__editor" v-else>
            <div>
                <DropFoto :src="link.data_image" @change="handleImageChange" />
            </div>
            <div>
                <div class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        v-model="$v.form.url.$model"
                        :class="{'is-invalid': $v.form.url.$error }"
                    />
                    <div class="invalid-feedback">Enter a valid URL</div>
                </div>
                <div class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        v-model="$v.form.title.$model"
                        :class="{'is-invalid': $v.form.title.$error }"
                    />
                    <div class="invalid-feedback">Enter a title</div>
                </div>

                <div class="form-group" v-if="form.scheduled">
                    <div
                        class="input-group datetime-input-group"
                        :class="{'is-invalid': $v.form.date.$error || $v.form.time.$error }"
                    >
                        <DatePicker v-model="form.date" />
                        <TimePicker v-model="form.time" />
                    </div>
                    <div
                        class="invalid-feedback"
                        v-if="$v.form.date.$error || $v.form.time.$error"
                    >Select a date and time</div>
                </div>
            </div>
            <basic-button @click="handleScheduleClick">Schedule</basic-button>
            <spinner-button @click="handleSaveClick" :loading="saving">Save</spinner-button>
            <basic-button @click="handleDeleteClick">Delete</basic-button>
            <basic-button @click="handleCancelClick">Cancel</basic-button>
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
        handleEditClick() {
            this.editing = true
        },
        handleCancelClick() {
            this.editing = false
        },
        handleDeleteClick() {
            this.$emit('delete-click', { link: this.link })
        },
    },
}
</script>
