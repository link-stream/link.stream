import { Chrome } from 'vue-color'
import SelectMediaModal from '@/components/Modal/Marketing/SelectMediaModal'
import PreviewLandingModal from '@/components/Modal/Marketing/PreviewLandingModal'
import EditLandingTitleModal from '@/components/Modal/Marketing/EditLandingTitleModal'
import { appConstants } from '~/constants'
import { mapGetters } from 'vuex'
import VueSelect from 'vue-select'
import { api } from '~/services'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
    components: {
        'color-picker': Chrome,
        SelectMediaModal,
        PreviewLandingModal,
        VueSelect,
        EditLandingTitleModal,
    },
    data: () => ({
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
    validations: {
        form: {
            url: {
                required,
                minLength: minLength(5),
                uniqueUrl(value) {
                    return this.availabilityValidator(value)
                },
            },
        },
    },
    mounted() {
        this.form = {
            ...this.form,
            ...this.landingData,
            is_acitive: this.landingData.status === 'Active',
        }
        this.$v.form.$touch()
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
        async handleSaveClick() {
            this.$v.form.$touch()
            if (this.$v.form.$invalid) {
                return
            }
            this.saving = true
            const params = {
                ...this.landingData,
                ...this.form,
                user_id: this.user.id,
                status: 'Draft',
                content: this.complieContent(),
            }
            await this.saveLandingPage(params)
            this.saving = false
        },
        async handlePublishClick() {
            
            if (this.$v.form.$invalid) {
                return
            }
            this.publishing = true
            const params = {
                ...this.landingData,
                ...this.form,
                user_id: this.user.id,
                status: 'Active',
                content: this.complieContent(),
            }
            await this.saveLandingPage(params)
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
        },
        async availabilityValidator(url) {
            if (!url) return
            const id = this.landingData.id ? this.landingData.id : ''
            const { status } = await api.marketing.getLandingPageAvailability(
                url,
                id
            )
            return status === 'success'
        },
    },
}
