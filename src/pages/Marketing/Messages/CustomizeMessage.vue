<template>
    <b-container fluid class="customize-message">
        <div class="page-header">
            <a href="#" class="btn-back" @click.prevent="back">
                <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </a>
            <h4 class="title">Customize</h4>
            <b-button
                pill
                class="btn-send-test"
                size="md"
                @click="handleTestClick"
            >
                Send Test
            </b-button>
        </div>
        <div class="page-body">
            <div class="left-col" :style="viewType === 'desktop' ? emailBackStyle: ''">
                <div class="message-content" :class="viewType">
                    <b-row>
                        <div class="select-view-type">
                            <a
                                href="#"
                                class="view-type left"
                                :class="{ active: viewType === 'desktop' }"
                                @click.prevent="viewType = 'desktop'"
                            >
                                Desktop
                            </a>
                            <a
                                href="#"
                                class="view-type right"
                                :class="{ active: viewType === 'mobile' }"
                                @click.prevent="viewType = 'mobile'"
                            >
                                Mobile
                            </a>
                        </div>
                    </b-row>
                    <div class="phone-frame">
                        <div class="message-frame" :style="viewType === 'mobile' ? emailBackStyle : ''">
                            <div class="message-container">
                                <div class="message-header">
                                    <div class="message-logo">
                                        <img :src="form.logo" alt="Logo" />
                                    </div>
                                    <div class="new-release">
                                        New release
                                    </div>
                                </div>
                                <div class="message-body">
                                    <div class="artwork-container">
                                        <img :src="form.artwork" alt="Artwork" />
                                    </div>
                                    <h1 class="message-title">
                                        {{ form.headline }}
                                    </h1>
                                    <div class="more-info">
                                        {{ form.body }}
                                    </div>
                                    <basic-button
                                        class="btn-listen"
                                        :style="{
                                            backgroundColor: form.button_color,
                                        }"
                                    >
                                        Listen Now
                                    </basic-button>
                                </div>
                                <div class="message-footer">
                                    <div class="logo-container">
                                        <img src="@/assets/img/logo/logo-h-lg.png" />
                                    </div>
                                    <div class="text">
                                        <p>
                                            You are receiving this email because you
                                            opted in via our website.
                                        </p>
                                        <p>
                                            You can
                                            <a href="#"> update your preferences </a>
                                            for this artist or
                                            <a hre="#"> unsubscribe</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
            <div class="right-col">
                <div class="customize-panel">
                    <h1 class="title">
                        Customize your email
                    </h1>
                    <div class="thumb-upload has-image">
                        <h6>Logo</h6>
                        <div class="d-flex">
                            <div
                                v-if="form.logo"
                                class="logo-container has-image"
                            >
                                <div class="logo">
                                    <img :src="form.logo" />
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
                                    <a href="#">Replace</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <b-form-group label="Choose a release to promote">
                        <BasicSelect
                            v-model="promoteName"
                            placeholder="Search by name"
                            :options="nameList"
                            :reduce="audience => audience.id"
                            label="name"
                        />
                    </b-form-group>
                    <div class="thumb-upload no-image">
                        <h6>Artwork</h6>
                        <div class="d-flex">
                            <div
                                v-if="form.artwork"
                                class="logo-container has-image"
                            >
                                <div class="logo">
                                    <img :src="form.artwork" />
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
                            placeholder="Please enter message content"
                            rows="3"
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
                                                :style="{
                                                    backgroundColor:
                                                        form.button_color,
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
                                                    noColor: !form.background_color,
                                                }"
                                                :style="{
                                                    backgroundColor:
                                                        form.background_color,
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
                    <div class="thumb-upload no-image">
                        <h6>Background image</h6>
                        <div class="d-flex">
                            <div
                                v-if="form.background_image"
                                class="logo-container has-image"
                            >
                                <div class="logo">
                                    <img :src="form.background_image" />
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
                        <basic-button class="btn-next" @click="handleNextClick">
                            Next
                        </basic-button>
                    </div>
                </div>
            </div>
        </div>
        <SelectMediaModal @select="setMedia" />
        <SendTestModal />
    </b-container>
</template>
<script>
import { Chrome } from 'vue-color'
import SelectMediaModal from '@/components/Modal/Marketing/SelectMediaModal'
import SendTestModal from '@/components/Modal/Marketing/SendTestModal'
import { mapGetters } from 'vuex'
export default {
    name: 'CustomizeMessage',
    components: {
        'color-picker': Chrome,
        SelectMediaModal,
        SendTestModal,
    },
    data: () => ({
        promoteName: null,
        nameList: [],
        isButtonColorPicker: false,
        buttonColor: {
            hex: '#DC2EA6',
        },
        isBackColorPicker: false,
        backColor: {
            hex: '',
        },
        form: {
            headline: 'Title of Your Release',
            body: 'Add more information about this media here',
            logo: '',
            artwork: '',
            button_color: '#DC2EA6',
            background_color: '',
            background_image: '',
            content: '',
        },
        selMediaType: null,
        viewType: 'desktop',
    }),
    computed: {
        ...mapGetters({
            smsData: 'marketing/smsData',
        }),
        emailBackStyle() {
            return {
                backgroundColor: this.form.background_color,
                backgroundImage: `url(${this.form.background_image})`,
            }
        },
    },
    mounted() {
        this.form = {
            ...this.smsData,
        }
        console.log(this.smsData)
        document.addEventListener('click', this.handleDocumentClick)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleDocumentClick)
    },
    methods: {
        back() {
            this.$router.push({
                name: 'editMessage',
            })
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
        async handleNextClick() {
            const params = {
                ...this.smsData,
                ...this.form,
                content: this.form.headline,
            }
            await this.$store.dispatch('marketing/setSMSData', params)
            this.$router.push({
                name: 'editMessage',
            })
        },
        handleTestClick() {
            this.$bus.$emit('modal.sendTest.open')
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
    },
}
</script>
