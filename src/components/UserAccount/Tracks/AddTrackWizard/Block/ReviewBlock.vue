<template>
    <div>
        <div class="c-card" v-if="trackInfo">
            <h4>Track Info</h4>
            <ls-button @click="handleEditTrackInfoClick">Edit</ls-button>
            <p>Title: {{ trackInfo.title }}</p>
            <p>Type: {{ isSong ? 'Song' : 'Beat' }}</p>
            <p>Genre: {{ trackInfo.genre.genre }}</p>
            <p>Tags: {{ tags }}</p>
            <p>BPM: {{ trackInfo.bpm }}</p>
            <p>Key: {{ trackInfo.key }}</p>
            <p>Collaborators: {{ collabs }}</p>
        </div>

        <div class="c-card">
            <h4>Licenses</h4>
            <ls-button @click="handleEditLicensesClick">Edit</ls-button>
            <div v-for="license in licenses" :key="license.id" class="mb-2">
                <div>
                    ${{ license.prize | trimZeroDecimal }} -
                    {{ license.title }}
                </div>
                <div>{{ license.descripcion }}</div>
            </div>
        </div>

        <div class="c-card">
            <h4>Files</h4>
            <ls-button @click="handleEdiFilesClick">Edit</ls-button>
            <div v-if="files.untagged">
                Untagged File: {{ files.untagged.name }}
            </div>
            <div v-if="files.stems">Track Stems: {{ files.stems.name }}</div>
            <div v-if="files.tagged">
                Tagged Streaming File: {{ files.tagged.name }}
            </div>
        </div>

        <div class="c-card">
            <h4>Marketing</h4>
            <ls-button @click="handleEditMarketingClick">Edit</ls-button>
            <div v-for="m in marketing" :key="m.id">
                {{ m.title }}
            </div>
        </div>
    </div>
</template>

<script>
import { appConstants } from '~/constants'

export default {
    name: 'ReviewBlock',
    props: {
        summary: {
            type: Object,
            required: true,
        },
    },
    computed: {
        trackInfo() {
            return this.summary.trackInfo
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
            return this.summary.trackType === appConstants.tracks.types.song
        },
        collabs() {
            return this.trackInfo
                ? this.trackInfo.collabs.map(c => c.user.name).join(', ')
                : ''
        },
        tags() {
            return this.trackInfo
                ? this.trackInfo.tags.map(t => t.text).join(', ')
                : ''
        },
    },
    methods: {
        handleEditTrackInfoClick() {
            const { trackType, trackInfo } = this.summary
            this.$bus.$emit('modal.trackInfoEdit.show', {
                trackType,
                trackInfo,
            })
        },
        handleEditLicensesClick() {
            this.$bus.$emit('modal.licensesEdit.show', {
                selected: this.licenses,
            })
        },
        handleEdiFilesClick() {
            this.$bus.$emit('modal.filesEdit.show', {
                files: this.files,
            })
        },
        handleEditMarketingClick() {
            this.$bus.$emit('modal.marketingEdit.show', {
                selected: this.marketing,
            })
        },
    },
}
</script>