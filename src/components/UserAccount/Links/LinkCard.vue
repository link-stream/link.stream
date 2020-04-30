<template>
    <div class="crd crd-lnk" :class="{ '--private': link.isPrivate }">
        <div class="crd-load-mask" role="status" v-if="loading">
            <LoadingSpinner />
        </div>
        <section class="crd-viewing" v-if="!editing">
            <Icon icon="reorder" class="crd-reorder-i" />
            <div class="crd-art">
                <img class="crd-img" :src="link.artwork" :alt="link.title" />
            </div>
            <main class="crd-body">
                <h2 class="crd-title">{{ link.title }}</h2>
                <small class="crd-vis" v-if="link.isPrivate">Hidden</small>
            </main>
            <IconButton
                icon="trash-2"
                title="Delete"
                class="crd-del-btn"
                use-bg-img
                @click="deleteLink"
            />
            <IconButton
                title="Edit"
                class="crd-edit-btn"
                use-bg-img
                @click="showEditView"
            />
        </section>
        <section class="crd-editing" v-else>
            <IconButton
                icon="close"
                class="crd-edit-close"
                title="Close"
                @click="hideEditView"
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
                    <b-form-group>
                        <b-form-input
                            placeholder="e.g. https://myblog.blogspot.com"
                            v-model="$v.form.url.$model"
                            :state="!$v.form.url.$error"
                        ></b-form-input>
                        <b-form-invalid-feedback>
                            Enter a valid URL
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group>
                        <b-form-input
                            placeholder="e.g. My Blog"
                            v-model="$v.form.title.$model"
                            :state="!$v.form.title.$error"
                        ></b-form-input>
                        <b-form-invalid-feedback>
                            Enter a title
                        </b-form-invalid-feedback>
                    </b-form-group>
                </form>
            </main>
            <footer class="crd-edit-actions">
                <IconButton
                    icon="trash-sm"
                    title="Delete"
                    @click="deleteLink"
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
                    <IconButton
                        icon="clock-cir-gray"
                        title="Schedule"
                        @click="handleScheduleClick"
                    />
                    <basic-button variant="tertiary" size="xs" @click="save">
                        Save
                    </basic-button>
                </div>
            </footer>
            <footer class="schedule-dt" v-if="link.scheduled">
                Scheduled: {{ link.date | mmddyyyy }}
                <b-dropdown variant="link" text="Modify" no-caret>
                    <b-dropdown-item @click="handleScheduleClick">
                        Change Date
                    </b-dropdown-item>
                    <b-dropdown-item @click="removeLinkScheduling">
                        Remove Scheduling
                    </b-dropdown-item>
                </b-dropdown>
            </footer>
        </section>
    </div>
</template>

<script>
import { IconButton } from '~/components/Button'
import { Icon } from '~/components/Icon'
import { LoadingSpinner } from '~/components/Loading'
import { linkAddEditForm } from '~/mixins/links/linkAddEditForm'
import { appConstants } from '~/constants'

export default {
    name: 'VideoCard',
    mixins: [linkAddEditForm],
    components: {
        IconButton,
        Icon,
        LoadingSpinner,
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
        async toggleLinkVisibility() {
            this.loading = true
            const { status, error } = await this.$store.dispatch(
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
            status !== 'success' && this.$toast.error(error)
            this.loading = false
        },
        deleteLink() {
            this.$alert.confirm({
                title: 'Delete link?',
                message: 'This link and its data will be permanently deleted.',
                okCallback: async () => {
                    this.loading = true
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
                    this.loading = false
                },
            })
        },
        async removeLinkScheduling() {
            this.loading = true
            const { status, message, error } = await this.$store.dispatch(
                'me/updateLink',
                {
                    id: this.link.id,
                    params: {
                        scheduled: 0,
                        date: null,
                        time: null,
                        end_date: null,
                        end_time: null,
                    },
                }
            )
            status === 'success'
                ? this.$toast.success(message)
                : this.$toast.error(error)
            this.loading = false
        },
        handleScheduleClick() {
            this.$emit('schedule-click', this.link)
        },
        handleVisibilityClick() {
            if (this.link.isPrivate) {
                this.toggleLinkVisibility()
            } else {
                this.$alert.confirm({
                    title: 'Hide link?',
                    message:
                        'This link will be hidden from your visitors. Are you sure?',
                    okCallback: this.toggleLinkVisibility,
                })
            }
        },
    },
}
</script>
