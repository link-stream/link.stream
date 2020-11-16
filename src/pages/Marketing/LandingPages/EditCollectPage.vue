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
                <LandingPreviewCollect :landing-data="form" />
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
                    <b-form-group label="Choose a release to promote">
                        <vue-select
                            v-model="promote"
                            placeholder="Search by name"
                            :options="promotes"
                            label="title"
                            class="BasicSelect"
                            @input="setPromoteUrl"
                        >
                            <template v-slot:open-indicator>
                                <Icon icon="select-arrow" class="arrow-icon" />
                            </template>
                            <template v-slot:option="option">
                                <div class="promote-container">
                                    <div class="image-container">
                                        <img
                                            :src="
                                                option.data_image
                                                    ? option.data_image
                                                    : defaultCoverArt
                                            "
                                        />
                                    </div>
                                    <div class="promote-text">
                                        <div class="promote-title">
                                            {{ option.title }}
                                        </div>
                                        <div class="promote-type">
                                            {{ option.type }}
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </vue-select>
                    </b-form-group>
                    <div class="thumb-upload">
                        <h6>Artwork</h6>
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
                            placeholder="Title of Your Release"
                        >
                        </b-form-input>
                    </b-form-group>
                    <b-form-group label="Price">
                        <b-input-group prepend="$" class="price-input-group">
                            <b-form-input
                                v-model="form.price"
                                required
                                placeholder="Price"
                            />
                        </b-input-group>
                    </b-form-group>
                    <b-form-group label="Body">
                        <b-form-textarea
                            v-model="form.body"
                            placeholder="Add more information about this media here"
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
                    <b-form-group label="Instagram">
                        <b-form-input
                            v-model="form.instagram"
                            placeholder="http://instagram.com"
                        >
                        </b-form-input>
                    </b-form-group>
                    <b-form-group label="Facebook">
                        <b-form-input
                            v-model="form.facebook"
                            placeholder="http://www.facebook.com"
                        >
                        </b-form-input>
                    </b-form-group>
                    <b-form-group label="Twitter">
                        <b-form-input
                            v-model="form.twitter"
                            placeholder="http://www.twitter.com"
                        >
                        </b-form-input>
                    </b-form-group>
                    <b-form-group label="Spotify">
                        <b-form-input
                            v-model="form.spotify"
                            placeholder="https://www.spotify.com"
                        >
                        </b-form-input>
                    </b-form-group>
                    <b-form-group label="SoundCloud">
                        <b-form-input
                            v-model="form.soundcloud"
                            placeholder="https://soundcloud.com"
                        >
                        </b-form-input>
                    </b-form-group>
                    <b-form-group label="Website">
                        <b-form-input
                            v-model="form.website"
                            placeholder="http://www.yourwebsite.com"
                        >
                        </b-form-input>
                    </b-form-group>
                    <b-form-group label="Email">
                        <b-form-input
                            v-model="form.email"
                            placeholder="your@email.com"
                        >
                        </b-form-input>
                    </b-form-group>
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
import LandingPreviewCollect from '@/components/Marketing/LandingPages/LandingPreviewCollect'
import { editPage } from '~/mixins'
import { mapGetters } from 'vuex'
import { appConstants, templates } from '~/constants'
export default {
    name: 'EditCollectLandingPage',
    mixins: [editPage],
    components: {
        LandingPreviewCollect,
    },
    data: () => ({
        form: {
            type: 'Landing_Page',
            template_type: 'collect',
            is_active: false,
            campaing_name: 'Untitled Landing Page',
            url: '',
            logo: '',
            artwork: '',
            headline: 'Release Title',
            body:
                "To get started, choose a release to sell from your store. Then, describe what makes this release unique. We'll automatically add a payment form so visitors can buy directly from your LinkStream Store.",
            button_color: '#DC2EA6',
            background_color: '',
            background_image: '',
            promote_id: '',
            price: 0,
            instagram: '',
            facebook: '',
            twitter: '',
            spotify: '',
            soundcloud: '',
            website: '',
            email: '',
        },
        promote: null,
    }),
    computed: {
        ...mapGetters({
            promotes: 'marketing/promotes',
        }),
    },
    async created() {
        await this.$store.dispatch('marketing/getMarketingPromotes')
        this.initPromote()
    },
    methods: {
        setPromoteUrl() {
            let typeUrl = ''
            switch (this.promote.type) {
                case 'beat':
                    typeUrl = 'beats'
                    break
                case 'pack':
                    typeUrl = 'beat-packs'
                    break
                case 'kit':
                    typeUrl = 'kits'
                    break
            }
            const linkUrl = `${appConstants.baseAppUrl}/${this.user.url}/${typeUrl}/${this.promote.id}`
            this.form.promote_id = linkUrl
        },
        initPromote() {
            if (this.landingData.promote_id) {
                let aryData = this.landingData.promote_id.split('/')
                const curType = aryData[aryData.length - 2]
                const curId = aryData[aryData.length - 1]
                let realType = ''
                switch (curType) {
                    case 'beats':
                        realType = 'beat'
                        break
                    case 'beat-packs':
                        realType = 'pack'
                        break
                    case 'kits':
                        realType = 'kit'
                        break
                }
                this.promote = this.promotes.find(
                    ({ id, type }) => id == curId && type == realType
                )
            }
        },

        complieContent() {
            let landingContent = templates.pages.collect

            landingContent = landingContent.replace(
                'LANDING_CUSTOM_PAGE_TITLE',
                this.form.campaing_name
            )

            landingContent = landingContent.replace(
                'LANDING_CUSTOM_BANNER',
                this.user.banner_url
            )

            let logoUrl = `${appConstants.baseAppUrl}${appConstants.emailDefaultLogo}`
            if (this.form.logo) {
                logoUrl = `${this.mediaURL}${this.form.logo}`
            }
            landingContent = landingContent.replace(
                'LANDING_CUSTOM_LOGO',
                logoUrl
            )

            let artworkUrl = ''
            if (this.form.artwork) {
                artworkUrl = `${this.mediaURL}${this.form.artwork}`
            }
            landingContent = landingContent.replace(
                'LANDING_CUSTOM_ARTWORK',
                artworkUrl
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
                'LANDING_CUSTOM_BUTTON_LINK',
                this.form.promote_id
            )
            landingContent = landingContent.replace(
                'LANDING_CUSTOM_BUTTON_COLOR',
                this.form.button_color
            )

            const priceString = this.$options.filters.currencyFormat(
                this.form.price
            )
            landingContent = landingContent.replace(
                'LANDING_CUSTOM_PRICE',
                priceString
            )
            let socialLink
            if (this.form.instagram) {
                socialLink = `<a href="${this.form.instagram}" target="_blank" title="Instagram"><i class="fab fa-instagram-square"></i></a>`
            } else {
                socialLink = ''
            }
            landingContent = landingContent.replace(
                'LANDING_CUSTOM_SOCIAL_INSTAGRAM',
                socialLink
            )
            if (this.form.facebook) {
                socialLink = `<a href="${this.form.facebook}" target="_blank" title="Facebook"><i class="fab fa-facebook-square"></i></a>`
            } else {
                socialLink = ''
            }
            landingContent = landingContent.replace(
                'LANDING_CUSTOM_SOCIAL_FACEBOOK',
                socialLink
            )
            if (this.form.twitter) {
                socialLink = `<a href="${this.form.twitter}" target="_blank" title="Twitter"><i class="fab fa-twitter-square"></i></a>`
            } else {
                socialLink = ''
            }
            landingContent = landingContent.replace(
                'LANDING_CUSTOM_SOCIAL_TWITTER',
                socialLink
            )
            if (this.form.spotify) {
                socialLink = `<a href="${this.form.spotify}" target="_blank" title="Spotify"><i class="fab fa-spotify custom-icon"></i></a>`
            } else {
                socialLink = ''
            }
            landingContent = landingContent.replace(
                'LANDING_CUSTOM_SOCIAL_SPOTIFY',
                socialLink
            )
            if (this.form.soundcloud) {
                socialLink = `<a href="${this.form.soundcloud}" target="_blank" title="Soundcloud"><i class="fab fa-soundcloud custom-icon"></i></a>`
            } else {
                socialLink = ''
            }
            landingContent = landingContent.replace(
                'LANDING_CUSTOM_SOCIAL_SOUNDCLOUD',
                socialLink
            )
            if (this.form.website) {
                socialLink = `<a href="${this.form.website}" target="_blank" title="Website"><i class="fas fa-globe custom-icon"></i></a>`
            } else {
                socialLink = ''
            }
            landingContent = landingContent.replace(
                'LANDING_CUSTOM_SOCIAL_WEBSITE',
                socialLink
            )
            if (this.form.email) {
                socialLink = `<a href="mailto:${this.form.email}" title="Email"><i class="fas fa-envelope-square"></i></a>`
            } else {
                socialLink = ''
            }
            landingContent = landingContent.replace(
                'LANDING_CUSTOM_SOCIAL_EMAIL',
                socialLink
            )
            return landingContent
        },
    },
}
</script>
