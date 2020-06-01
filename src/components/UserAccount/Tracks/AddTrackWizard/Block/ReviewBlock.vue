<template>
    <div class="block-review">
        <div class="Card">
            <h4 class="Card-title">Track Info</h4>
            <LsButton
                variant="icon-bg"
                title="Edit"
                class="edit-btn"
                @click="showEditModal('trackInfo')"
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
                @click="showEditModal('licenses')"
            />
            <p v-if="!licenses.length">No licenses selected</p>
            <ul v-for="license in licenses" :key="license.id">
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
                @click="showEditModal('files')"
            />
            <p v-if="!files.untagged && !files.stems && !files.tagged">
                No files added
            </p>
            <ul>
                <li v-if="files.untagged">
                    Untagged File: {{ files.untagged.name }}
                </li>
                <li v-if="files.stems">Track Stems: {{ files.stems.name }}</li>
                <li v-if="files.tagged">
                    Tagged Streaming File: {{ files.tagged.name }}
                </li>
            </ul>
        </div>

        <div class="Card">
            <h4 class="Card-title">Marketing</h4>
            <LsButton
                variant="icon-bg"
                title="Edit"
                class="edit-btn"
                @click="showEditModal('marketing')"
            />
            <p v-if="!marketing.length">No promotions selected</p>
            <ul>
                <li v-for="m in marketing" :key="m.id">
                    {{ m.title }}
                </li>
            </ul>
        </div>

        <TrackInfoEditModal
            v-if="modalShow.trackInfo"
            @hidden="handleEditModalHidden"
        />

        <LicensesEditModal
            v-if="modalShow.licenses"
            @hidden="handleEditModalHidden"
        />

        <FilesEditModal
            v-if="modalShow.files"
            @hidden="handleEditModalHidden"
        />

        <MarketingEditModal
            v-if="modalShow.marketing"
            @hidden="handleEditModalHidden"
        />
    </div>
</template>

<script>
import { appConstants } from '~/constants'
import TrackInfoEditModal from '../Modal/TrackInfoEditModal'
import LicensesEditModal from '../Modal/LicensesEditModal'
import FilesEditModal from '../Modal/FilesEditModal'
import MarketingEditModal from '../Modal/MarketingEditModal'

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
            modalShow: {
                trackInfo: false,
                licenses: false,
                files: false,
                marketing: false,
            },
        }
    },
    computed: {
        summary() {
            return this.$store.getters['trackAddWizard/form']
        },
        trackInfo() {
            return {
                genre: {},
                collabs: [],
                key: {},
                tags: [],
                ...this.summary.trackInfo,
            }
        },
        licenses() {
            return this.summary.licenses
        },
        files() {
            return this.summary.files
        },
        marketing() {
            return this.summary.marketing
        },
        isSong() {
            return (
                this.summary.trackInfo.trackType ===
                appConstants.tracks.types.song
            )
        },
        collabs() {
            return this.trackInfo.collabs.map(c => c.user.name).join(', ')
        },
        tags() {
            return this.trackInfo.tags.map(t => t.text).join(', ')
        },
    },
    methods: {
        showEditModal(modalName) {
            this.modalShow[modalName] = true
        },
        handleEditModalHidden({ modalName }) {
            this.modalShow[modalName] = false
        },
    },
}
</script>