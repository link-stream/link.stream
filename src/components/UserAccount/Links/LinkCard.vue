<template>
    <div class="c-card --link" :class="{ '--private': link.isPrivate }">
        <LsSpinnerMask v-show="loading" />
        <section class="c-content" v-show="!editing">
            <LsIcon class="c-reorder-i" icon="reorder" />
            <div class="c-media" @click="handleEditClick">
                <img class="c-img" :src="link.artwork" :alt="link.title" />
            </div>
            <main class="c-info" @click="handleEditClick">
                <h2 class="c-title">{{ link.title }}</h2>
                <small class="c-subtitle" v-if="link.isPrivate">
                    Hidden
                </small>
            </main>
            <LsIconButton
                icon="trash-2"
                title="Delete"
                class="c-del-btn"
                use-bg-img
                @click="handleDeleteClick"
            />
            <LsIconButton
                title="Edit"
                class="c-edit-btn"
                use-bg-img
                @click="handleEditClick"
            />
        </section>
        <section class="c-edit" v-if="editing">
            <LsIconButton
                icon="close"
                class="c-edit-close"
                title="Close"
                @click="closeEdit"
            />
            <main class="c-edit-body">
                <DropImage
                    :src="link.data_image"
                    msg-long="Drag image here&nbsp;or&nbsp;<u>browse</u>"
                    msg-short=""
                    @file-add="handleImageAdded"
                    @file-remove="handleImageRemoved"
                />
                <form class="c-edit-form">
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
            <footer class="c-edit-actions">
                <div class="actions-left">
                    <LsIconButton
                        icon="trash-sm"
                        title="Delete"
                        @click="handleDeleteClick"
                    />
                </div>
                <div class="actions-right">
                    <ls-icon-button
                        :title="link.isPublic ? 'Hide' : 'Unhide'"
                        @click="handleVisibilityToggleClick"
                    >
                        <LsIcon
                            :icon="
                                link.isPublic
                                    ? 'eye-cir-gray'
                                    : 'eye-slash-cir-gray'
                            "
                        />
                    </ls-icon-button>
                    <LsIconButton
                        icon="clock-cir-gray"
                        title="Schedule"
                        @click="handleChangeScheduleClick"
                    />
                    <ls-button
                        variant="tertiary"
                        size="xs"
                        @click="handleSaveClick"
                    >
                        Save
                    </ls-button>
                </div>
            </footer>
            <footer class="schedule-dt" v-if="link.scheduled">
                Scheduled: {{ link.date | mmddyyyy }}
                <b-dropdown variant="link" text="Modify" no-caret>
                    <b-dropdown-item @click="handleChangeScheduleClick">
                        Change Date
                    </b-dropdown-item>
                    <b-dropdown-item @click="handleRemoveScheduleClick">
                        Remove Scheduling
                    </b-dropdown-item>
                </b-dropdown>
            </footer>
        </section>
    </div>
</template>

<script>
import { LsSpinnerMask } from '~/components/Loading'
import { linkAddEditForm } from '~/mixins/links/linkAddEditForm'
import { appConstants } from '~/constants'

export default {
    name: 'VideoCard',
    mixins: [linkAddEditForm],
    components: {
        LsSpinnerMask,
    },
    props: {
        link: {
            type: Object,
            required: true,
        },
    },
    methods: {
        async toggleVisibility() {
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
        closeEdit() {
            this.editing = false
        },
        handleEditClick() {
            this.editing = true
        },
        handleChangeScheduleClick() {
            this.$emit('schedule-click', this.link)
        },
        handleDeleteClick() {
            this.$alert.confirm({
                title: 'Delete link?',
                message: 'This link and its data will be permanently deleted.',
                onOk: async () => {
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
        async handleRemoveScheduleClick() {
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
        handleVisibilityToggleClick() {
            if (this.link.isPrivate) {
                this.toggleVisibility()
            } else {
                this.$alert.confirm({
                    title: 'Hide link?',
                    message:
                        'This link will be hidden from your visitors. Are you sure?',
                    onOk: this.toggleVisibility,
                })
            }
        },
    },
}
</script>
