<template>
    <b-container fluid class="edit-landing-page">
        <div class="page-header">
            <a href="#" class="btn-back" @click.prevent="back">
                <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </a>
            <div class="title-container">
                <span class="title">
                    {{
                        form.campaing_name
                            ? form.campaing_name
                            : 'Untitled Landing Page'
                    }}
                </span>
                <IconButton
                    class="btn-edit"
                    icon="edit-white"
                    @click="editTitle"
                />
            </div>
        </div>
        <div class="page-body">
            <div class="left-col">
                <LandingPreviewEmail :landing-data="form" />
            </div>
            <div class="right-col">
                <div class="customize-panel">
                    <h1 class="title">
                        Customize your landing page
                    </h1>
                    <div class="viz-toggle mb-3">
                        <TogglerButton v-model="form.is_acitive" disabled />
                        <span class="toggle-label">
                            {{ form.is_acitive ? 'Active' : 'Private/Draft' }}
                        </span>
                    </div>
                    <b-form-group>
                        <template v-slot:label>
                            <span class="font-weight-bold">URL: </span>
                            <span>{{ fullUrl }}</span>
                        </template>
                        <b-form-input v-model="form.url" />
                    </b-form-group>
                    <div class="thumb-upload">
                        <h6>Logo</h6>
                        <div class="d-flex">
                            <div
                                v-if="form.logo"
                                class="logo-container has-image"
                            >
                                <div class="logo">
                                    <img :src="`${mediaURL}${form.logo}`" />
                                </div>
                                <IconButton
                                    class="btn-camera"
                                    icon="photo-camera"
                                    @click="showSelectMedia('logo')"
                                />
                            </div>
                            <div v-else class="logo-container">
                                <div class="logo">
                                    <IconButton
                                        class="btn-add-image"
                                        icon="add-image"
                                        @click="showSelectMedia('logo')"
                                    />
                                    <p class="lb-add-image">Add Logo</p>
                                </div>
                            </div>
                            <div class="text-container">
                                <div class="logo-text">
                                    <h6>Your Default Logo</h6>
                                    <a
                                        href="#"
                                        @click.prevent="showSelectMedia('logo')"
                                    >
                                        Replace
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="thumb-upload">
                        <h6>Image</h6>
                        <div class="d-flex">
                            <div
                                v-if="form.artwork"
                                class="logo-container has-image"
                            >
                                <div class="logo">
                                    <img :src="`${mediaURL}${form.artwork}`" />
                                </div>
                                <IconButton
                                    class="btn-camera"
                                    icon="photo-camera"
                                    @click="showSelectMedia('artwork')"
                                />
                            </div>
                            <div v-else class="logo-container">
                                <div class="logo">
                                    <IconButton
                                        class="btn-add-image"
                                        icon="add-image"
                                        @click="showSelectMedia('artwork')"
                                    />
                                    <p class="lb-add-image">Add Image</p>
                                </div>
                            </div>
                            <div class="text-container">
                                <div v-if="form.artwork" class="logo-text">
                                    <h6>Artwork Image</h6>
                                    <a href="#" @click.prevent="removeArtwork">
                                        Remove image
                                    </a>
                                </div>
                                <div v-else class="logo-text">
                                    <small class="text-muted">
                                        suggested Minimum Size: 600x600
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <b-form-group label="Headline">
                        <b-form-input
                            v-model="form.headline"
                            required
                            placeholder="Headline"
                        >
                        </b-form-input>
                    </b-form-group>
                    <b-form-group label="Body">
                        <b-form-textarea
                            v-model="form.body"
                            placeholder="Please enter text"
                            rows="5"
                        ></b-form-textarea>
                    </b-form-group>
                    <b-form-row>
                        <b-col>
                            <div ref="buttonColorPicker">
                                <b-form-group
                                    label="Button Color"
                                    class="color-picker-container"
                                >
                                    <b-input-group>
                                        <template v-slot:prepend>
                                            <a
                                                class="current-color"
                                                :class="{
                                                    nocolor: !form.button_color,
                                                }"
                                                :style="{
                                                    backgroundColor: form.button_color,
                                                }"
                                            ></a>
                                        </template>
                                        <b-form-input
                                            v-model="form.button_color"
                                            class="txt-color-value"
                                        ></b-form-input>
                                    </b-input-group>
                                    <color-picker
                                        v-model="buttonColor"
                                        v-if="isButtonColorPicker"
                                        @input="onChangeButtonColor"
                                    >
                                    </color-picker>
                                </b-form-group>
                            </div>
                        </b-col>
                        <b-col>
                            <div ref="backColorPicker">
                                <b-form-group
                                    label="Background Color"
                                    class="color-picker-container right-align"
                                >
                                    <b-input-group>
                                        <template v-slot:prepend>
                                            <a
                                                class="current-color"
                                                :class="{
                                                    nocolor: !form.background_color,
                                                }"
                                                :style="{
                                                    backgroundColor: form.background_color,
                                                }"
                                            ></a>
                                        </template>
                                        <b-form-input
                                            v-model="form.background_color"
                                            class="txt-color-value"
                                        ></b-form-input>
                                    </b-input-group>
                                    <color-picker
                                        v-model="backColor"
                                        v-if="isBackColorPicker"
                                        @input="onChangeBackColor"
                                    >
                                    </color-picker>
                                </b-form-group>
                            </div>
                        </b-col>
                    </b-form-row>
                    <div class="thumb-upload">
                        <h6>Background image</h6>
                        <div class="d-flex">
                            <div
                                v-if="form.background_image"
                                class="logo-container has-image"
                            >
                                <div class="logo">
                                    <img
                                        :src="
                                            `${mediaURL}${form.background_image}`
                                        "
                                    />
                                </div>
                                <IconButton
                                    class="btn-camera"
                                    icon="photo-camera"
                                    @click="showSelectMedia('background')"
                                />
                            </div>
                            <div v-else class="logo-container">
                                <div class="logo">
                                    <IconButton
                                        class="btn-add-image"
                                        icon="add-image"
                                        @click="showSelectMedia('background')"
                                    />
                                    <p class="lb-add-image">Add Image</p>
                                </div>
                            </div>
                            <div class="text-container">
                                <div
                                    v-if="form.background_image"
                                    class="logo-text"
                                >
                                    <h6>Background Image</h6>
                                    <a
                                        href="#"
                                        @click.prevent="removeBackgroundImage"
                                    >
                                        Remove image
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="actions">
                        <basic-button
                            class="btn-preview w-100"
                            variant="outline-black"
                            @click="handlePreviewClick"
                        >
                            Preview
                        </basic-button>
                        <div class="d-flex">
                            <spinner-button
                                class="btn-black btn-save"
                                :loading="saving"
                                @click="handleSaveClick"
                            >
                                Save
                            </spinner-button>
                            <spinner-button
                                class="btn-publish"
                                :loading="publishing"
                                @click="handlePublishClick"
                            >
                                Publish
                            </spinner-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <SelectMediaModal @select="setMedia" />
        <PreviewLandingModal />
        <EditLandingTitleModal
            v-if="isEditTitle"
            @close="isEditTitle = false"
        />
    </b-container>
</template>
<script>
import { Chrome } from 'vue-color'
import SelectMediaModal from '@/components/Modal/Marketing/SelectMediaModal'
import LandingPreviewEmail from '@/components/Marketing/LandingPages/LandingPreviewEmail'
import PreviewLandingModal from '@/components/Modal/Marketing/PreviewLandingModal'
import EditLandingTitleModal from '@/components/Modal/Marketing/EditLandingTitleModal'
import { appConstants } from '~/constants'
import { mapGetters } from 'vuex'
export default {
    name: 'EditEmailLandingPage',
    components: {
        'color-picker': Chrome,
        SelectMediaModal,
        LandingPreviewEmail,
        PreviewLandingModal,
        EditLandingTitleModal,
    },
    data: () => ({
        form: {
            type: 'Landing_Page',
            template_type: 'email',
            is_active: false,
            campaing_name: 'Untitled Landing Page',
            url: '',
            logo: '',
            artwork: '',
            headline: 'A header that will entice people to sign up',
            body:
                'Tell your subscribers about yourself and be sure to let them know what to expect when they subscribe.',
            button_color: '#DC2EA6',
            background_color: '',
            background_image: '',
        },
        isButtonColorPicker: false,
        buttonColor: {
            hex: '#DC2EA6',
        },
        isBackColorPicker: false,
        backColor: {
            hex: '',
        },
        selMediaType: null,
        mediaURL: appConstants.mediaURL,
        defaultCoverArt: appConstants.defaultCoverArt,
        isEditTitle: false,
        saving: false,
        publishing: false,
    }),
    computed: {
        ...mapGetters({
            landingData: 'marketing/landingData',
            user: 'me/user',
        }),
        fullUrl() {
            return `${appConstants.baseAppUrl}/${this.form.url}`
        },
    },
    watch: {
        landingData: {
            deep: true,
            handler(value) {
                this.form = {
                    ...this.form,
                    campaing_name: value.campaing_name
                        ? value.campaing_name
                        : '',
                }
            },
        },
    },
    mounted() {
        this.form = {
            ...this.form,
            ...this.landingData,
        }
        document.addEventListener('click', this.handleDocumentClick)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleDocumentClick)
    },
    methods: {
        back() {
            this.$router.push({
                name: 'landingPages',
            })
        },
        editTitle() {
            this.isEditTitle = true
        },
        onChangeButtonColor(val) {
            this.buttonColor = val
            this.form.button_color = val.hex
        },
        onChangeBackColor(val) {
            this.backColor = val
            this.form.background_color = val.hex
        },
        handleDocumentClick(e) {
            const el = this.$refs.buttonColorPicker
            if (!el) return
            if (!el.contains(e.target)) {
                this.isButtonColorPicker = false
            } else {
                this.isButtonColorPicker = true
            }
            const elBack = this.$refs.backColorPicker
            if (!elBack) return
            if (!elBack.contains(e.target)) {
                this.isBackColorPicker = false
            } else {
                this.isBackColorPicker = true
            }
        },
        showSelectMedia(type) {
            this.selMediaType = type
            this.$bus.$emit('modal.selectMedia.open')
        },
        handleSaveClick() {
            this.saving = true
            const params = {
                ...this.landingData,
                ...this.form,
                user_id: this.user.id,
                status: 'Draft',
            }
            this.saveLandingPage(params)
            this.saving = false            
        },
        handlePublishClick() {
            this.publishing = true
            const params = {
                ...this.landingData,
                ...this.form,
                user_id: this.user.id,
                status: 'Active',
            }
            this.saveLandingPage(params)
            this.publishing = false
        },
        removeArtwork() {
            this.form.artwork = ''
        },
        removeBackgroundImage() {
            this.form.background_image = ''
        },
        setMedia(url) {
            switch (this.selMediaType) {
                case 'logo':
                    this.form.logo = url
                    break
                case 'artwork':
                    this.form.artwork = url
                    break
                case 'background':
                    this.form.background_image = url
            }
        },
        async handlePreviewClick() {
            const params = {
                ...this.landingData,
                ...this.form,
            }
            await this.$store.dispatch('marketing/setLandingData', params)
            this.$bus.$emit('modal.previewLanding.open')
        },
        async saveLandingPage(params) {
            let response
            if (this.landingData.id) {
                response = await this.$store.dispatch(
                    'marketing/updateLandingPage',
                    {
                        id: this.landingData.id,
                        params: params,
                    }
                )
            } else {
                response = await this.$store.dispatch(
                    'marketing/insertLandingPage',
                    params
                )
            }
            const { status, message, error } = response
            status === 'success'
                ? this.$toast.success(message)
                : this.$toast.error(error)
            this.$router.push({
                name: 'landingPages',
            })
        }
    },
}
</script>
