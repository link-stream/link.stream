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
            >
                Send Test
            </b-button>
        </div>
        <div class="page-body">
            <div class="left-col">
                <div class="message-content">
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
                    <div class="message-container">
                        <div class="message-header">
                            <div class="message-logo">
                                <img src="/static/media/logo1.png" />
                            </div>
                            <div class="new-release">
                                New release
                            </div>
                        </div>
                        <div class="message-body">
                            <div class="artwork-container">
                                <img src="/static/media/placeholder.png" />
                            </div>
                            <h1 class="message-title">
                                Title of Your Release
                            </h1>
                            <div class="more-info">
                                Add more information about this media here
                            </div>
                            <basic-button class="btn-listen">
                                Listen Now
                            </basic-button>
                        </div>
                        <div class="message-footer">
                            <div class="logo-container">
                                <img src="@/assets/img/logo/logo-h-lg.png" />
                            </div>
                            <div class="text">
                                <p>
                                    You are receiving this email because you opted in via our website.
                                </p>
                                <p>
                                    You can <a href="#">update your preferences</a> for this artist or <a hre="#">unsubscribe</a>
                                </p>
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
                            <div class="logo-container has-image">
                                <div class="logo">
                                    <img src="/static/media/logo1.png" />
                                </div>
                                <IconButton
                                    class="btn-camera"
                                    icon="photo-camera"
                                    @click="showSelectMedia"
                                />
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
                                    <small class="text-muted">suggested Minimum Size: 600x600</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <b-form-group label="Headline">
                        <b-form-input
                            v-model="headLine"
                            required
                            placeholder="Headline"
                        >
                        </b-form-input>
                    </b-form-group>
                    <b-form-group label="Body">
                        <b-form-textarea
                            v-model="message"
                            placeholder="Please enter message content"
                            rows="3"
                        ></b-form-textarea>
                    </b-form-group>
                    <b-form-row>
                        <b-col>
                            <div ref="buttonColorPicker">
                                <b-form-group label="Button Color" class="color-picker-container">
                                    <b-input-group>
                                        <template v-slot:prepend>
                                            <a
                                                href="#"
                                                class="current-color"
                                                :style="`background-color: ${buttonColorHex}`"
                                            ></a>
                                        </template>
                                        <b-form-input v-model="buttonColorHex" class="txt-color-value"></b-form-input>
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
                                <b-form-group label="Background Color" class="color-picker-container right-align">
                                    <b-input-group>
                                        <template v-slot:prepend>
                                            <a
                                                href="#"
                                                class="current-color"
                                                :class="{ 'no-color': !backColorHex }"
                                                :style="`background-color: ${backColorHex}`"
                                            ></a>
                                        </template>
                                        <b-form-input v-model="backColorHex" class="txt-color-value"></b-form-input>
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
                        <basic-button class="btn-next">
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
    name: 'CustomizeMessage',
    components: {
        'color-picker': Chrome,
        SelectMediaModal,
    },
    data: () => ({
        promoteName: null,
        headLine: null,
        message: null,
        nameList: [],

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
                hex: val
            }
        },
        backColorHex(val) {
            this.backColor = {
                hex: val
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
            this.$router.push( {
                name: 'editMessage',
            })
        },
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
    },
}
</script>