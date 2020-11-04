<template>
    <b-container fluid class="edit-landing-page lead">
        <div class="page-header">
            <a href="#" class="btn-back" @click.prevent="back">
                <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </a>
            <div class="title-container">
                <span class="title">Untitled Landing Page</span>
                <IconButton
                    class="btn-edit"
                    icon="edit-white"
                    @click="editTitle"
                />
            </div>
        </div>
        <div class="page-body">
            <div class="left-col">
                <LandingPreviewLead :landing-data="form" />
            </div>
            <div class="right-col">
                <div class="customize-panel">
                    <h1 class="title">
                        Customize your landing page
                    </h1>
                    <div class="viz-toggle mb-3">
                        <TogglerButton v-model="form.is_acitive" />
                        <span class="toggle-label">
                            {{ form.is_acitive ? 'Active' : 'Private/Draft' }}
                        </span>
                    </div>
                    <b-form-group class="url-form">
                        <template v-slot:label>
                            <span class="font-weight-bold">URL: </span>
                            <span>{{ fullUrl }}</span>
                        </template>
                        <b-form-input v-model="form.title" />
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
                        <b-col cols="6">
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
                    </b-form-row>
                    <div class="thumb-upload">
                        <h6>Background image</h6>
                        <div class="d-flex">
                            <div
                                v-if="form.background_image"
                                class="logo-container has-image"
                            >
                                <div class="logo">
                                    <img :src="`${mediaURL}${form.background_image}`" />
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
                        <basic-button class="btn-black btn-save" @click="handleSaveClick">
                            Save
                        </basic-button>
                        <basic-button class="btn-publish" @click="handlePublishClick">
                            Publish
                        </basic-button>
                    </div>
                </div>
            </div>
        </div>
        <SelectMediaModal @select="setMedia" />
    </b-container>
</template>
<script>
import { Chrome } from 'vue-color'
import SelectMediaModal from '@/components/Modal/Marketing/SelectMediaModal'
import LandingPreviewLead from '@/components/Marketing/LandingPages/LandingPreviewLead'
import { appConstants } from '~/constants'
export default {
    name: 'EditLeadLandingPage',
    components: {
        'color-picker': Chrome,
        SelectMediaModal,
        LandingPreviewLead,
    },
    data: () => ({
        form: {
            is_active: true,
            title: '',
            logo: '',
            headline: 'Subscribe to our list',
            body:
                'Tell your subscribers about yourself and be sure to let them know what to expect when they subscribe.',
            button_color: '#DC2EA6',
            background_image: '',
        },
        isButtonColorPicker: false,
        buttonColor: {
            hex: '#DC2EA6',
        },
        selMediaType: null,
        mediaURL: appConstants.mediaURL,
    }),
    computed: {
        fullUrl() {
            return `${appConstants.baseAppUrl}/${this.form.title}`
        },
    },
    mounted() {
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
        editTitle() {},
        onChangeButtonColor(val) {
            this.buttonColor = val
            this.form.button_color = val.hex
        },
        handleDocumentClick(e) {
            const el = this.$refs.buttonColorPicker
            if (!el) return
            if (!el.contains(e.target)) {
                this.isButtonColorPicker = false
            } else {
                this.isButtonColorPicker = true
            }
        },
        showSelectMedia(type) {
            this.selMediaType = type
            this.$bus.$emit('modal.selectMedia.open')
        },
        handleSaveClick() {
            this.$router.push({
                name: 'landingPages',
            })
        },
        handlePublishClick() {},
        removeBackgroundImage() {
            this.form.background_image = ''
        },
        setMedia(url) {
            switch (this.selMediaType) {
                case 'logo':
                    this.form.logo = url
                    break
                case 'background':
                    this.form.background_image = url
            }
        },
    },
}
</script>
