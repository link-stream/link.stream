<template>
    <div
        class="crd lnk-crd"
        :class="{ '--private': link.isPrivate, '--loading': loading || saving }"
    >
        <div class="crd-loading-mask" role="status">
            <div class="spinner-grow"></div>
            <div class="spinner-grow"></div>
            <div class="spinner-grow"></div>
        </div>

        <section class="crd-view" v-if="!editing">
            <Icon icon="reorder" class="crd-reorder-i" />
            <div class="crd-art">
                <img class="crd-img" :src="link.artwork" :alt="link.title" />
            </div>
            <main class="crd-body">
                <h2 class="crd-title">{{ link.title }}</h2>
                <small class="crd-viz" v-if="link.isPrivate">Hidden</small>
            </main>
            <div class="crd-actions">
                <span class="crd-actions-hover">
                    <IconButton
                        icon="trash-2"
                        title="Delete"
                        class="crd-del-btn"
                        use-bg-img
                        @click="handleDeleteClick"
                    />
                </span>
                <IconButton
                    title="Edit"
                    class="crd-edit-btn"
                    use-bg-img
                    @click="openEditView"
                />
            </div>
        </section>

        <section class="crd-edit" v-else>
            <IconButton
                icon="close"
                class="crd-edit-close"
                title="Close"
                @click="closeEditView"
            />
            <main class="crd-edit-body">
                <div class="crd-edit-art">
                    <DropFoto
                        :src="link.data_image"
                        msg-long="Drag image here&nbsp;or&nbsp;<u>browse</u>"
                        msg-short=""
                        @change="updateImage"
                    />
                </div>
                <form class="crd-edit-form">
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
                </form>
            </main>
            <footer class="crd-edit-actions">
                <IconButton
                    icon="trash-sm"
                    title="Delete"
                    @click="handleDeleteClick"
                />
                <div class="actions-primary">
                    <icon-button
                        :title="link.isPublic ? 'Hide' : 'Unhide'"
                        @click="handleVisibilityClick"
                    >
                        <Icon
                            :icon="
                                link.isPublic
                                    ? 'eye-cir-gray'
                                    : 'eye-slash-cir-gray'
                            "
                        />
                    </icon-button>
                    <IconButton icon="clock-cir-gray" title="Schedule" />
                    <spinner-button variant="tertiary" size="xs" @click="save"
                        >Save</spinner-button
                    >
                </div>
            </footer>
        </section>
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
            loading: false,
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
            this.loading = true
            const { status, message, error } = await this.$store.dispatch(
                'me/updateLink',
                {
                    id: this.link.id,
                    params: {
                        public: this.link.isPublic
                            ? appConstants.visibilities.private
                            : appConstants.visibilities.public,
                    },
                }
            )
            this.loading = false
        },
        handleDeleteClick() {
            this.$alert.confirm({
                title: 'Delete link?',
                message: 'This link and its data will be permanently deleted.',
                okCallback: async () => {
                    const {
                        status,
                        message,
                        error,
                    } = await this.$store.dispatch('me/deleteLink', {
                        link: this.link,
                    })
                    status === 'success'
                        ? this.$toast.success(message)
                        : this.$toast.error(error)
                },
            })
        },
        handleVisibilityClick() {
            if (this.link.isPrivate) {
                this.toggleVisibility()
            } else {
                this.$alert.confirm({
                    title: 'Hide link?',
                    message:
                        'This link will be hidden from your visitors. Are you sure?',
                    okCallback: this.toggleVisibility,
                })
            }
        },
    },
}
</script>
