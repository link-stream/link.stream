<template>
    <div class="crd lnk-crd" :class="{ '--hidden': link.isPrivate }">
        <div class="crd-view" v-if="!editing">
            <div class="crd-main">
                <Icon icon="reorder" class="crd-reorder" />
                <div class="crd-body">
                    <div class="crd-art">
                        <img
                            class="crd-img"
                            :src="link.artwork"
                            :alt="link.title"
                        />
                    </div>
                    <div class="crd-info">
                        <h2 class="crd-title">{{ link.title }}</h2>
                        <small class="crd-vis" v-if="link.isPrivate"
                            >Hidden</small
                        >
                    </div>
                </div>
            </div>
            <div class="crd-actions">
                <span class="crd-hover">
                    <IconButton icon="trash" @click="confirmDelete" />
                </span>
                <IconButton icon="edit-2" @click="openEditView" />
            </div>
        </div>
        <div class="crd-edit" v-else>
            <IconButton
                icon="card-close"
                class="crd-edit-close"
                @click="closeEditView"
            />
            <div class="crd-edit-main">
                <div class="crd-edit-art">
                    <DropFoto :src="link.data_image" @change="updateImage" />
                </div>
                <div class="crd-edit-form">
                    <div class="form-group">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="e.g. https://myblog.blogspot.com"
                            v-model="$v.form.url.$model"
                            :class="{ 'is-invalid': $v.form.url.$error }"
                        />
                        <div class="invalid-feedback">Enter a valid URL</div>
                    </div>
                    <div class="form-group">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="e.g. My Blog"
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
            </div>
            <div class="crd-edit-actions">
                <div>
                    <IconButton icon="trash" @click="confirmDelete" />
                </div>
                <div>
                    <spinner-button
                        variant="tertiary"
                        size="xs"
                        :loading="loading.visibility"
                        @click="toggleVisibility"
                        >{{ link.isPublic ? 'Hide' : 'Show' }}
                    </spinner-button>
                    <spinner-button
                        variant="tertiary"
                        size="xs"
                        @click="save"
                        :loading="saving"
                        >Save</spinner-button
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { IconButton } from '~/components/Button'
import { Icon } from '~/components/Icon'
import { linkAddEditForm } from '~/mixins/links/linkAddEditForm'
import { appConstants } from '~/constants'

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
    data() {
        return {
            loading: {
                visibility: false,
            },
        }
    },
    methods: {
        openEditView() {
            this.editing = true
        },
        closeEditView() {
            this.editing = false
        },
        async toggleVisibility() {
            this.loading.visibility = true
            const { status, message, error } = await this.$store.dispatch(
                'me/updateLink',
                {
                    id: this.link.id,
                    params: {
                        public: this.link.isPrivate
                            ? appConstants.visibilities.public
                            : appConstants.visibilities.private,
                    },
                }
            )
            this.loading.visibility = false
        },
        confirmDelete() {
            this.$alert.confirm({
                title: 'Delete link?',
                message: 'This link and its data will be permanently deleted.',
                okCallback: this.delete,
            })
        },
        async delete() {
            const { status, message, error } = await this.$store.dispatch(
                'me/deleteLink',
                {
                    link: this.link,
                }
            )
            if (status === 'success') {
                this.$toast.success(message)
            } else {
                this.$toast.error(error)
            }
        },
    },
}
</script>
