<template>
    <div class="ReviewBlock">
        <div class="Card">
            <h4 class="Card-title">Track Info</h4>
            <LsButton
                variant="icon-bg"
                title="Edit"
                class="edit-btn"
                @click="handleEditClick('trackInfo')"
            />
            <p>Title: {{ title }}</p>
            <p>Type: {{ isSong ? 'Song' : 'Beat' }}</p>
            <p>Genre: {{ genre }}</p>
            <p>Tags: {{ tags }}</p>
            <p>BPM: {{ bpm }}</p>
            <p>Key: {{ key }}</p>
            <p>Collaborators: {{ collabs }}</p>
        </div>

        <div class="Card">
            <h4 class="Card-title">Licensing</h4>
            <LsButton
                variant="icon-bg"
                title="Edit"
                class="edit-btn"
                @click="handleEditClick('licenses')"
            />
            <ul v-for="license in selectedLicenses" :key="license.id">
                <li>
                    ${{ license.price | trimZeroDecimal }} -
                    {{ license.title }}
                    <br />
                    {{ license.descripcion }}
                </li>
            </ul>
        </div>

        <div class="Card">
            <h4 class="Card-title">Files</h4>
            <LsButton
                variant="icon-bg"
                title="Edit"
                class="edit-btn"
                @click="handleEditClick('files')"
            />
            <p>
                <span class="text-danger" v-if="$v.files.untaggedMp3.$invalid">
                    Untagged MP3: Required
                </span>
                <template v-else-if="files.untaggedMp3">
                    Untagged MP3: {{ files.untaggedMp3.name }}
                </template>
            </p>
            <p>
                <span class="text-danger" v-if="$v.files.untaggedWav.$invalid">
                    Untagged WAV: Required
                </span>
                <template v-else-if="files.untaggedWav">
                    Untagged WAV: {{ files.untaggedWav.name }}
                </template>
            </p>
            <p v-if="files.tagged">Tagged File: {{ files.tagged.name }}</p>
            <p>
                <span class="text-danger" v-if="$v.files.stems.$invalid">
                    Track Stems: Required
                </span>
                <template v-else-if="files.stems">
                    Track Stems: {{ files.stems.name }}
                </template>
            </p>
        </div>

        <div class="Card">
            <h4 class="Card-title">Marketing</h4>
            <LsButton
                variant="icon-bg"
                title="Edit"
                class="edit-btn"
                @click="handleEditClick('marketing')"
            />
            <p v-if="!selectedPromos.length">No free downloads</p>
            <ul>
                <li v-for="m in selectedPromos" :key="m.id">
                    {{ m.title }}
                </li>
            </ul>
        </div>

        <div class="Card --vis">
            <div class="row-vis">
                <h4 class="Card-title">Visibility</h4>
                <div>
                    <small>{{ form.isPublic ? 'Public' : 'Private' }}</small>
                    <LsToggleButton v-model="form.isPublic" />
                </div>
            </div>
            <div>
                <b-form-group v-show="form.scheduled">
                    <b-input-group class="dt-input-group">
                        <LsDatePicker v-model="form.date" />
                        <LsTimePicker v-model="form.time" />
                    </b-input-group>
                    <div class="invalid-feedback" v-show="$v.form.$error">
                        Select date and time
                    </div>
                </b-form-group>
                <ls-button variant="link" @click="handleScheduleToggleClick">
                    {{
                        form.scheduled ? 'Remove schedule' : 'Schedule release'
                    }}
                </ls-button>
            </div>
        </div>

        <InfoEditModal
            v-if="editModal.trackInfo"
            @closed="handleEditModalClosed"
        />

        <LicensesEditModal
            v-else-if="editModal.licenses"
            @closed="handleEditModalClosed"
        />

        <FilesEditModal
            v-else-if="editModal.files"
            @closed="handleEditModalClosed"
        />

        <MarketingEditModal
            v-else-if="editModal.marketing"
            @closed="handleEditModalClosed"
        />
    </div>
</template>

<script>
import InfoEditModal from '../Modal/InfoEditModal'
import LicensesEditModal from '../Modal/LicensesEditModal'
import FilesEditModal from '../Modal/FilesEditModal'
import MarketingEditModal from '../Modal/MarketingEditModal'
import { requiredIf } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
    name: 'ReviewBlock',
    components: {
        InfoEditModal,
        LicensesEditModal,
        FilesEditModal,
        MarketingEditModal,
    },
    data() {
        const { time, date, scheduled, isPublic } = this.$store.getters[
            'trackAddWizard/form'
        ]
        return {
            form: {
                time,
                date,
                scheduled,
                isPublic,
            },
            editModal: {
                trackInfo: false,
                licenses: false,
                files: false,
                marketing: false,
            },
        }
    },
    validations() {
        return {
            files: this.filesValidationRules,
            form: {
                time: {
                    required: requiredIf(function() {
                        return this.form.scheduled
                    }),
                },
                date: {
                    required: requiredIf(function() {
                        return this.form.scheduled
                    }),
                },
            },
        }
    },
    watch: {
        form: {
            deep: true,
            handler() {
                this.updateWizardForm()
            },
        },
    },
    computed: {
        ...mapGetters({
            isSong: 'trackAddWizard/isSong',
            isMissingFiles: 'trackAddWizard/isMissingFiles',
            filesValidationRules: 'trackAddWizard/filesValidationRules',
        }),
        summary() {
            return this.$store.getters['trackAddWizard/form']
        },
        title() {
            return this.summary.title
        },
        genre() {
            return this.summary.genre ? this.summary.genre.genre : ''
        },
        bpm() {
            return this.summary.bpm
        },
        key() {
            return this.summary.key ? this.summary.key.name : ''
        },
        selectedLicenses() {
            return this.summary.selectedLicenses
        },
        selectedPromos() {
            return this.summary.selectedPromos
        },
        files() {
            return this.summary.files
        },
        collabs() {
            return this.summary.collabs.map(({ user }) => user.name).join(', ')
        },
        tags() {
            return this.summary.tags.map(({ text }) => text).join(', ')
        },
    },
    created() {
        this.$bus.$on('wz.validateBlock.review', this.handleBlockValidate)
    },
    destroyed() {
        this.$bus.$off('wz.validateBlock.review')
    },
    methods: {
        updateWizardForm() {
            this.$store.dispatch('trackAddWizard/updateForm', {
                ...this.form,
            })
        },
        handleBlockValidate({ onSuccess }) {
            this.$v.form.$touch()
            if (this.$v.form.$invalid) {
                this.$toast.error('Please add schedule date and time.')
                return
            }
            if (this.isMissingFiles) {
                this.$toast.error('Please add required files.')
                return
            }
            this.updateWizardForm()
            onSuccess()
        },
        handleScheduleToggleClick() {
            this.$v.form.$reset()
            this.form.scheduled = !this.form.scheduled
        },
        handleEditClick(section) {
            this.editModal[section] = true
        },
        handleEditModalClosed({ section }) {
            this.editModal[section] = false
        },
    },
}
</script>