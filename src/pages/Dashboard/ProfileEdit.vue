<template>
    <b-container fluid class="p-sm-2">
        <b-form @submit.stop.prevent="onSubmit" @reset="resetForm" :novalidate="true">
            <b-row>
                <b-col cols="12">
                    <h2 class="page-title">Edit your profile</h2>
                </b-col>
                <b-col cols="12" class="my-3">
                    <div class="profile-images-container">
                        <div class="banner-container" ref="banner-container">
                            <DokaOverlay
                                utils="crop"
                                class="banner"
                                :crop="banner.crop"
                                :src="banner.src"
                                :enabled="banner.enabled"
                                @confirm="handleDokaConfirmBanner"
                                @cancel="handleDokaCancelBanner"
                            >
                                <b-button v-if="!banner.enabled" @click="$refs['banner'].click()">
                                    <font-awesome-icon :icon="['fas', 'camera']" size="lg" />
                                </b-button>
                                <input
                                    ref="banner"
                                    v-if="!banner.enabled"
                                    type="file"
                                    accept="image/*"
                                    @change="handleFileChangeBanner"
                                />
                                <img :src="banner.image" />
                            </DokaOverlay>
                        </div>
                        <div class="avatar-container">
                            <div class="avatar-box">
                                <input
                                    ref="avatar"
                                    v-if="!avatar.enabled"
                                    type="file"
                                    accept="image/*"
                                    @change="handleFileChangeAvatar"
                                />
                                <img v-if="avatar.image" :src="avatar.image" />
                                <vue-letter-avatar v-else :name="user.display_name" size="150" :rounded="true" />
                            </div>
                            <b-button v-if="!avatar.enabled" @click="$refs['avatar'].click()">
                                <font-awesome-icon :icon="['fas', 'camera']" size="lg" />
                            </b-button>
                        </div>
                    </div>
                    <DokaModal
                        v-if="avatar.enabled"
                        utils="crop,filter,color"
                        cropAspectRatio="1"
                        :src="avatar.src"
                        :outputData="true"
                        :cropMask="mask"
                        @confirm="handleDokaConfirmAvatar"
                        @cancel="handleDokaCancelAvatar"
                    />
                </b-col>
                <b-col cols="12" class="profile_edit_elements">
                    <b-row>
                        <b-col cols="12">
                            <b-form-group class="mb-4 error-l-110">
                                <slot name="label">
                                    <label for="display_name">
                                        Display name
                                        <span class="text-danger">*</span>
                                    </label>
                                </slot>
                                <b-form-input
                                    id="display_name"
                                    name="display_name"
                                    type="text"
                                    v-model="form.display_name"
                                    v-validate="{ required: true, min: 8 }"
                                    :state="validateState('display_name')"
                                    aria-describedby="display-name-live-feedback"
                                    data-vv-as="display name"
                                ></b-form-input>
                                <b-form-invalid-feedback id="display-name-live-feedback">
                                    {{ veeErrors.first('display_name') }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group label="Profile URL" class="mb-4 error-l-100">
                                <label class="small text-muted">link.stream/</label>
                                <template v-if="form.editableUrl">
                                    <b-form-input
                                        id="url"
                                        name="url"
                                        type="text"
                                        class="d-inline-block w-50 small px-2"
                                        v-model="form.url"
                                        v-validate="{ required: true, min: 8 }"
                                        :state="validateState('url')"
                                        aria-describedby="url-live-feedback"
                                        data-vv-as="url"
                                    ></b-form-input>
                                    <b-form-invalid-feedback id="url-live-feedback">
                                        {{ veeErrors.first('url') }}
                                    </b-form-invalid-feedback>
                                </template>
                                <template v-else>
                                    <label class="small">{{ form.url }}</label>
                                </template>
                                <b-button
                                    pill
                                    variant="outline-secondary"
                                    size="sm"
                                    class="ml-4 btn-customize-url"
                                    @click="handleCustomizeUrl"
                                >
                                    <template v-if="form.editableUrl">Done</template>
                                    <template v-else>Customize</template>
                                </b-button>
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                            <b-form-group label="First name" label-for="first_name" class="mb-4">
                                <b-form-input
                                    id="first_name"
                                    name="first_name"
                                    type="text"
                                    v-model="form.first_name"
                                ></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                            <b-form-group label="Last name" label-for="last_name" class="mb-4">
                                <b-form-input
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    v-model="form.last_name"
                                ></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                            <b-form-group label="City" label-for="city" class="mb-4">
                                <b-form-input id="city" name="city" type="text" v-model="form.city"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                            <b-form-group label="Country" label-for="country" class="mb-4">
                                <b-form-input
                                    id="country"
                                    name="country"
                                    type="text"
                                    v-model="form.country"
                                ></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group label="Bio" label-for="bio" class="mb-4">
                                <b-form-textarea
                                    id="bio"
                                    name="bio"
                                    v-model="form.bio"
                                    placeholder="A short bio that will appear on your profile"
                                    rows="3"
                                ></b-form-textarea>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col cols="12">
                    <MultiStateButton
                        type="submit"
                        class="pink px-5 text-uppercase mt-5"
                        :loading="status.loading.update"
                        :error="status.error.update"
                    >
                        <span></span>
                        <span class="m-0">Save Updates</span>
                        <span></span>
                    </MultiStateButton>
                </b-col>
            </b-row>
        </b-form>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { DokaModal, DokaOverlay, toURL } from 'vue-doka'
import S3Client from '~/plugins/aws_s3'
import { setStatusChange } from '~/utils'
import { call } from '~/services'
import { appConstants } from '~/constants'
import { MultiStateButton } from '~/components/Button'

export default {
    name: 'ProfileEdit',
    components: {
        DokaModal,
        DokaOverlay,
        MultiStateButton,
    },
    data() {
        return {
            mask: (root, setInnerHTML) => {
                // https://pqina.nl/doka/docs/patterns/api/doka-instance/#setting-the-crop-mask
                setInnerHTML(
                    root,
                    `
                    <mask id="my-mask">
                        <rect x="0" y="0" width="100%" height="100%" fill="white"/>
                        <circle cx="50%" cy="50%" r="50%" fill="black"/>
                    </mask>
                    <rect fill="rgba(255,255,255,.3125)" x="0" y="0" width="100%" height="100%" mask="url(#my-mask)"/>
                    <circle cx="50%" cy="50%" r="50%" fill="transparent" stroke-width="1" stroke="#fff"/>
                `
                )
            },
            banner: {
                enabled: false,
                image: this.$store.getters.profileBanner,
                srcPrev: null,
                src: null,
                crop: {
                    aspectRatio: appConstants.profileBannerAspectRatio,
                },
            },
            avatar: {
                enabled: false,
                image: this.$store.getters.avatar,
                srcPrev: null,
                src: null,
                crop: {
                    aspectRatio: 1,
                },
            },
            form: {
                banner: null,
                avatar: null,
                display_name: this.$store.getters.user.display_name,
                first_name: this.$store.getters.user.first_name,
                last_name: this.$store.getters.user.last_name,
                city: this.$store.getters.user.city,
                country: this.$store.getters.user.country,
                bio: this.$store.getters.user.bio,
                url: this.$store.getters.user.url,
                editableUrl: false,
            },
            status: {
                loading: {
                    update: false,
                },
                error: {
                    update: null,
                },
            },
        }
    },
    computed: {
        ...mapGetters(['user']),
    },
    mounted() {
        window.addEventListener('resize', this.handleWindowResize)
        this.handleWindowResize()
    },
    methods: {
        // Resize
        handleWindowResize(event) {
            if (event && !event.isTrusted) {
                return
            }
            this.$refs['banner-container'].style.height =
                appConstants.profileBannerAspectRatio * this.$refs['banner-container'].clientWidth + 'px'
        },
        // Banner
        handleFileChangeBanner(e) {
            if (!e.target.files.length) return
            this.banner = {
                ...this.banner,
                srcPrev: this.banner.src,
                src: e.target.files[0],
                enabled: true,
            }
        },
        handleDokaConfirmBanner(output) {
            this.banner = {
                ...this.banner,
                srcPrev: null,
                image: toURL(output.file),
                crop: output.data.crop,
                enabled: false,
            }
            this.form = {
                ...this.form,
                banner: output.file,
            }
        },
        handleDokaCancelBanner() {
            this.banner = {
                ...this.banner,
                src: this.banner.srcPrev || this.banner.src,
                srcPrev: null,
                enabled: false,
            }
        },
        // Avatar
        handleFileChangeAvatar(e) {
            if (!e.target.files.length) return
            this.avatar = {
                ...this.avatar,
                srcPrev: this.avatar.src,
                src: e.target.files[0],
                enabled: true,
            }
        },
        handleDokaConfirmAvatar(output) {
            this.avatar = {
                ...this.avatar,
                srcPrev: null,
                image: toURL(output.file),
                crop: output.data.crop,
                enabled: false,
            }
            this.form = {
                ...this.form,
                avatar: output.file,
            }
        },
        handleDokaCancelAvatar() {
            this.avatar = {
                ...this.avatar,
                src: this.avatar.srcPrev || this.avatar.src,
                srcPrev: null,
                enabled: false,
            }
        },
        // Form
        validateState(ref) {
            if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
                return !this.veeErrors.has(ref)
            }
            return null
        },
        handleCustomizeUrl() {
            if (this.form.editableUrl) {
                this.$validator.validate('url').then(async result => {
                    if (!result) {
                        return
                    }
                    this.form.editableUrl = false
                })
            } else {
                this.form.editableUrl = true
            }
        },
        async onSubmit() {
            this.$validator.validateAll().then(async result => {
                if (!result) {
                    return
                }
                this.status.loading.update = true
                let banner = null
                if (this.form.banner) {
                    // upload banner to s3
                    S3Client.config.dirName = process.env.AWS.DIR + '/Profile'
                    const banner_file = await S3Client.uploadFile(
                        this.form.banner,
                        `banner_${this.user.id}_${new Date().getTime()}`
                    )
                    banner = banner_file.location.substring(banner_file.location.lastIndexOf('/') + 1)
                }
                let avatar = null
                if (this.form.avatar) {
                    // upload avatar to s3
                    S3Client.config.dirName = process.env.AWS.DIR + '/Profile'
                    const avatar_file = await S3Client.uploadFile(
                        this.form.avatar,
                        `avatar_${this.user.id}_${new Date().getTime()}`
                    )
                    avatar = avatar_file.location.substring(avatar_file.location.lastIndexOf('/') + 1)
                }
                try {
                    const { display_name, first_name, last_name, url, city, country, bio } = this.form
                    const params = { display_name, first_name, last_name, url, city, country, bio }
                    if (banner) params.banner = banner
                    if (avatar) params.image = avatar
                    console.log(params)
                    const { status, data, error = null } = await call(`/users/${this.user.id}`, params, 'PUT')
                    if (status === 'success') {
                        setStatusChange(this, 'status.error.update', false, () => {
                            this.resetForm()
                        })
                        this.$store.dispatch('updateProfile', { user: data })
                        this.$toast.success('Your profile has been updated successfully.')
                    } else {
                        setStatusChange(this, 'status.error.update')
                        this.$toast.error(error)
                    }
                } catch (e) {
                    setStatusChange(this, 'status.error.update')
                    console.log(e)
                    // this.$toast.error(e.response.data.error || e.message || e || 'Unexpected error')
                }

                this.status.loading.update = false
            })
        },
        resetForm() {},
    },
}
</script>

<style lang="scss" scoped>
.profile-images-container {
    .banner-container {
        position: relative;
        width: 100%;
        max-width: 802px;
        background: $gray-400;

        .banner {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;

            button {
                position: absolute;
                bottom: 0.5 * $spacer;
                right: 0.5 * $spacer;
                color: $white;
                background: transparent;
                border: none;
                box-shadow: none !important;
                z-index: 2;

                &:hover {
                    color: $linkstream-1;
                }
            }

            input[type='file'] {
                display: none;
            }
        }
    }

    .avatar-container {
        position: relative;
        margin-top: -90px;
        margin-left: 25px;
        width: 156px;
        height: 156px;

        .avatar-box {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: $white;
            overflow: hidden;
            border: 3px solid $white;
            @include border-radius(9999em);

            input[type='file'] {
                display: none;
            }

            img {
                display: block;
                width: 100%;
            }
        }

        button {
            position: absolute;
            bottom: 10px;
            right: 10px;
            height: 40px;
            width: 40px;
            padding: 0;
            color: $text-color;
            background: $gray-400;
            border: none;
            box-shadow: none !important;
            @include border-radius(9999em);
        }
    }
}
.profile_edit_elements {
    max-width: 500px;

    .btn-customize-url {
        font-size: 70%;
        line-height: 1;
    }
}
</style>
