<template>
    <b-container fluid class="edit-landing-page lead">
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
                <LandingPreviewLead :landing-data="form" />
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
                    <b-form-group class="url-form">
                        <template v-slot:label>
                            <span class="font-weight-bold">URL: </span>
                            <span>{{ fullUrl }}</span>
                        </template>
                        <b-form-input
                            v-model="$v.form.url.$model"
                            placeholder="URL"
                            :state="!$v.form.url.$error"
                        />
                        <b-form-invalid-feedback>
                            <template v-if="!$v.form.url.required">
                                Enter the URL.
                            </template>
                            <template v-else-if="!$v.form.url.minLength">
                                The URL must have at least 5 letters.
                            </template>
                            <template v-else-if="!$v.form.url.uniqueUsername">
                                The URL exists, enter a new one.
                            </template>
                        </b-form-invalid-feedback>
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
import LandingPreviewLead from '@/components/Marketing/LandingPages/LandingPreviewLead'
import { editPage } from '~/mixins'
import { appConstants, templates } from '~/constants'
export default {
    name: 'EditLeadLandingPage',
    mixins: [editPage],
    components: {
        LandingPreviewLead,
    },
    data: () => ({
        form: {
            type: 'Landing_Page',
            template_type: 'lead',
            is_active: false,
            campaing_name: 'Untitled Landing Page',
            url: '',
            logo: '',
            headline: 'Subscribe to our list',
            body:
                'Tell your subscribers about yourself and be sure to let them know what to expect when they subscribe.',
            button_color: '#DC2EA6',
            background_image: '',
        },
    }),
    methods: {
        complieContent() {
            let landingContent = templates.pages.lead

            landingContent = landingContent.replace(
                'LANDING_CUSTOM_PAGE_TITLE',
                this.form.campaing_name
            )

            let backUrl = 'none'
            if (this.form.background_image) {
                backUrl = `url(${this.mediaURL}${this.form.background_image})`
            }
            landingContent = landingContent.replace(
                'LANDING_CUSTOM_BACK_IMAGE',
                backUrl
            )

            let logoUrl = `${appConstants.baseAppUrl}${appConstants.emailDefaultLogo}`
            if (this.form.logo) {
                logoUrl = `${this.mediaURL}${this.form.logo}`
            }
            landingContent = landingContent.replace(
                'LANDING_CUSTOM_LOGO',
                logoUrl
            )

            landingContent = landingContent.replace(
                'LANDING_CUSTOM_HEADLINE',
                this.form.headline
            )
            landingContent = landingContent.replace(
                'LANDING_CUSTOM_BODY',
                this.form.body
            )

            landingContent = landingContent.replace(
                'LANDING_CUSTOM_BUTTON_COLOR',
                this.form.button_color
            )
            return landingContent
        },
    },
}
</script>
