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
            <p>Title: {{ trackInfo.title }}</p>
            <p>Type: {{ isSong ? 'Song' : 'Beat' }}</p>
            <p>Genre: {{ trackInfo.genre.genre || '' }}</p>
            <p>Tags: {{ tags }}</p>
            <p>BPM: {{ trackInfo.bpm }}</p>
            <p>Key: {{ trackInfo.key.name || '' }}</p>
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
            <p v-if="!selectedLicenses.length">No licenses selected</p>
            <ul v-for="license in selectedLicenses" :key="license.id">
                <li>
                    <p>
                        ${{ license.prize | trimZeroDecimal }} -
                        {{ license.title }}
                    </p>
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
                <span class="text-danger" v-if="$v.files.untagged.$invalid">
                    Untagged File: Required
                </span>
                <template v-else-if="files.untagged">
                    Untagged File: {{ files.untagged.name }}
                </template>
            </p>
            <p>
                <span class="text-danger" v-if="$v.files.stems.$invalid">
                    Track Stems: Required
                </span>
                <template v-else-if="files.stems">
                    Track Stems: {{ files.stems.name }}
                </template>
            </p>
            <p>
                <span class="text-danger" v-if="$v.files.tagged.$invalid">
                    Tagged File: Required
                </span>
                <template v-else-if="files.tagged">
                    Tagged File: {{ files.tagged.name }}
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
            <p v-if="!selectedPromos.length">No promotions selected</p>
            <ul>
                <li v-for="m in selectedPromos" :key="m.id">
                    {{ m.title }}
                </li>
            </ul>
        </div>

        <TrackInfoEditModal
            v-if="edit.trackInfo"
            @hidden="handleEditModalHidden"
        />

        <LicensesEditModal
            v-else-if="edit.licenses"
            @hidden="handleEditModalHidden"
        />

        <FilesEditModal
            v-else-if="edit.files"
            @hidden="handleEditModalHidden"
        />

        <MarketingEditModal
            v-else-if="edit.marketing"
            @hidden="handleEditModalHidden"
        />
    </div>
</template>

<script>
import TrackInfoEditModal from '../Modal/TrackInfoEditModal'
import LicensesEditModal from '../Modal/LicensesEditModal'
import FilesEditModal from '../Modal/FilesEditModal'
import MarketingEditModal from '../Modal/MarketingEditModal'
import { appConstants } from '~/constants'
import { mapGetters } from 'vuex'

export default {
    name: 'ReviewBlock',
    components: {
        TrackInfoEditModal,
        LicensesEditModal,
        FilesEditModal,
        MarketingEditModal,
    },
    data() {
        return {
            edit: {
                trackInfo: false,
                licenses: false,
                files: false,
                marketing: false,
            },
        }
    },
    validations() {
        return {
            files: this.filesValidations,
        }
    },
    computed: {
        ...mapGetters({
            filesValidations: 'trackAddWizard/filesValidations',
        }),
        form() {
            return this.$store.getters['trackAddWizard/form']
        },
        trackInfo() {
            return this.form.trackInfo
        },
        selectedLicenses() {
            return this.form.selectedLicenses
        },
        selectedPromos() {
            return this.form.selectedPromos
        },
        files() {
            return this.form.files
        },
        collabs() {
            return this.trackInfo.collabs.map(c => c.user.name).join(', ')
        },
        tags() {
            return this.trackInfo.tags.map(t => t.text).join(', ')
        },
        isSong() {
            return (
                this.form.trackInfo.trackType === appConstants.tracks.types.song
            )
        },
    },
    methods: {
        handleEditClick(section) {
            this.edit[section] = true
        },
        handleEditModalHidden({ section }) {
            this.edit[section] = false
        },
    },
}
</script>