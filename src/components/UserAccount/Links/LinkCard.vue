<template>
    <div class="Card LinkCard" :class="{ 'is-private': link.isPrivate }">
        <LsSpinnerMask v-show="loading" />
        <section class="view-block" v-show="!editing">
            <LsIcon class="drag-icon" icon="drag" />
            <div class="Card-media" @click="handleEditClick">
                <img class="Card-img" :src="link.artwork" :alt="link.title" />
            </div>
            <main class="Card-body" @click="handleEditClick">
                <h2 class="Card-title">{{ link.title }}</h2>
                <small class="Card-subtitle" v-if="link.isPrivate">
                    Hidden
                </small>
            </main>
            <LsButton
                variant="icon-bg"
                title="Delete"
                class="trash-btn"
                @click="handleDeleteClick"
            />
            <LsButton
                variant="icon-bg"
                title="Edit"
                class="edit-btn"
                @click="handleEditClick"
            />
        </section>
        <section class="edit-block" v-if="editing">
            <LsIconButton
                icon="close"
                class="close-btn"
                title="Close"
                @click="closeEditMode"
            />
            <main class="Card-body">
                <DropImage
                    :src="link.data_image"
                    msg-long="Drag image here&nbsp;or&nbsp;<u>browse</u>"
                    msg-short=""
                    @file-add="handleImageAdded"
                    @file-remove="handleImageRemoved"
                />
                <form class="edit-form">
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
            <footer class="edit-actions">
                <div class="col-left">
                    <LsIconButton
                        icon="trash-sm"
                        title="Delete"
                        @click="handleDeleteClick"
                    />
                </div>
                <div class="col-right">
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
            <div class="pubdate" v-if="link.scheduled">
                Scheduled: {{ link.date | mmddyyyy }}
                <b-dropdown variant="link" text="Modify" no-caret>
                    <b-dropdown-item @click="handleChangeScheduleClick">
                        Change Date
                    </b-dropdown-item>
                    <b-dropdown-item @click="handleRemoveScheduleClick">
                        Remove Scheduling
                    </b-dropdown-item>
                </b-dropdown>
            </div>
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
        closeEditMode() {
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
