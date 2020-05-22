<template>
    <div>
        <div class="crd" v-if="trackInfo">
            <h4>Track Info</h4>
            <p>Title: {{ trackInfo.title }}</p>
            <p>Type: {{ isSong ? 'Song' : 'Beat' }}</p>
            <p>Genre: {{ trackInfo.genre.genre }}</p>
            <p>Tags: {{ trackInfo.tags.join(', ') }}</p>
            <p>BPM: {{ trackInfo.bpm }}</p>
            <p>Key: {{ trackInfo.key }}</p>
            <p>
                Collaborators:
                {{
                    trackInfo.collabs.map(collab => collab.user.name).join(', ')
                }}
            </p>
        </div>

        <div class="crd">
            <h4>Licenses</h4>
            <div v-for="license in licenses" :key="license.id" class="mb-2">
                <div>
                    ${{ license.prize | trimZeroDecimal }} -
                    {{ license.title }}
                </div>
                <div>{{ license.descripcion }}</div>
            </div>
        </div>

        <div class="crd">
            <h4>Files</h4>
            <div v-if="files.untagged">
                Untagged File: {{ files.untagged.name }}
            </div>
            <div v-if="files.stems">Track Stems: {{ files.stems.name }}</div>
            <div v-if="files.tagged">
                Tagged Streaming File: {{ files.tagged.name }}
            </div>
        </div>

        <div class="crd">
            <h4>Marketing</h4>
            <div v-for="m in marketing" :key="m.id">
                {{ m.title }}
            </div>
        </div>
    </div>
</template>

<script>
import { appConstants } from '~/constants'

export default {
    name: 'ReviewPane',
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
    },
}
</script>