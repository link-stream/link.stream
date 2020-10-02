<template>
    <b-container fluid class="edit-landing-page">
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
                <div class="landing-content">
                    <b-row>
                        <div class="select-view-type">
                            <div class="view-type left active">
                                Desktop
                            </div>
                            <div class="view-type right">
                                Mobile
                            </div>
                        </div>
                    </b-row>
                    <div class="landing-container">
                        <div class="landing-header">
                            <div class="landing-logo">
                                <img src="/static/media/logo1.png" />
                            </div>
                        </div>
                        <div class="landing-body">
                            <b-row>
                                <b-col
                                    cols="12"
                                    sm="6"
                                    class="artwork-container"
                                >
                                    <img src="/static/media/placeholder.png" />
                                </b-col>
                                <b-col cols="12" sm="6" class="text-content">
                                    <h1 class="title">
                                        {{ headline }}
                                    </h1>
                                    <div class="description">
                                        {{ body }}
                                    </div>
                                    <b-form-group label="Name">
                                        <b-form-input />
                                    </b-form-group>
                                    <b-form-group label="Email">
                                        <b-form-input />
                                    </b-form-group>
                                    <BasicButton class="btn-signup">
                                        Sign Up
                                    </BasicButton>
                                </b-col>
                            </b-row>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-col">
                <div class="customize-panel">
                    <h1 class="title">
                        Customize your landing page
                    </h1>
                    <div class="thumb-upload no-image">
                        <h6>Image</h6>
                        <div class="d-flex">
                            <div class="logo-container">
                                <div class="logo">
                                    <IconButton
                                        class="btn-add-image"
                                        icon="add-image"
                                        @click="showSelectMedia"
                                    />
                                    <p class="lb-add-image">Add Image</p>
                                </div>
                            </div>
                            <div class="text-container">
                                <div class="logo-text">
                                    <small class="text-muted">
                                        Suggested Minimum Size: 600x600
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <b-form-group label="Headline">
                        <b-form-input
                            v-model="headline"
                            required
                            placeholder="Headline"
                        >
                        </b-form-input>
                    </b-form-group>
                    <b-form-group label="Body">
                        <b-form-textarea
                            v-model="body"
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
                                                href="#"
                                                class="current-color"
                                                :style="{
                                                    backgroundColor: buttonColorHex,
                                                }"
                                            ></a>
                                        </template>
                                        <b-form-input
                                            v-model="buttonColorHex"
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
                                                href="#"
                                                class="current-color"
                                                :class="{
                                                    noColor: !backColorHex,
                                                }"
                                                :style="{
                                                    backgroundColor: backColorHex,
                                                }"
                                            ></a>
                                        </template>
                                        <b-form-input
                                            v-model="backColorHex"
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
                        <div class="logo-container">
                            <div class="logo">
                                <IconButton
                                    class="btn-add-image"
                                    icon="add-image"
                                    @click="showSelectMedia"
                                />
                                <p class="lb-add-image">Add Image</p>
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
        <SelectMediaModal />
    </b-container>
</template>
<script>
import { Chrome } from 'vue-color'
import SelectMediaModal from '@/components/Modal/Marketing/SelectMediaModal'
export default {
    name: 'EditLandingPage',
    components: {
        'color-picker': Chrome,
        SelectMediaModal,
    },
    data: () => ({
        headline: 'A header that will entice people to sign up',
        body:
            'Tell your subscribers about yourself and be sure to let them know what to expect when they subscribe.',
        isButtonColorPicker: false,
        buttonColorHex: '#DC2EA6',
        buttonColor: {
            hex: '#DC2EA6',
        },
        isBackColorPicker: false,
        backColorHex: '',
        backColor: {
            hex: '',
        },
    }),
    watch: {
        buttonColorHex(val) {
            this.buttonColor = {
                hex: val,
            }
        },
        backColorHex(val) {
            this.backColor = {
                hex: val,
            }
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
            this.buttonColorHex = val.hex
        },
        onChangeBackColor(val) {
            this.backColor = val
            this.backColorHex = val.hex
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
        showSelectMedia() {
            this.$bus.$emit('modal.selectMedia.open')
        },
        handleNextClick() {
            this.$router.push({
                name: 'landingPages',
            })
        },
    },
}
</script>
