<template>
    <div class="Card FilesCard">
        <div class="Card-title">
            Files
        </div>
        <div class="Card-body">
            <DropAudio
                title="Untagged .MP3"
                xclass="{ 'is-invalid': $v.files.untaggedMp3.$error }"
                xsrc="files.untaggedMp3 && files.untaggedMp3.base64"
                xfilename="files.untaggedMp3 && files.untaggedMp3.name"
                :acceptTypes="['.mp3']"
                xfile-added="handleUntaggeMp3Added"
                xfile-removed="handleUntaggedMp3Removed"
            />

            <DropAudio
                title="Untagged .WAV"
                xclass="{ 'is-invalid': $v.files.untaggedWav.$error }"
                xsrc="files.untaggedWav && files.untaggedWav.base64"
                xfilename="files.untaggedWav && files.untaggedWav.name"
                :acceptTypes="['.wav']"
                xfile-added="handleUntaggedWavAdded"
                xfile-removed="handleUntaggedWavRemoved"
            />

            <DropAudio
                title="Tagged Streaming File (.MP3 or .WAV)"
                xsrc="files.tagged && files.tagged.base64"
                xfilename="files.tagged && files.tagged.name"
                xfile-added="handleTaggedAdded"
                xfile-removed="handleTaggedRemoved"
            />

            <DropFile
                title="Track Stems .ZIP (or .RAR)"
                xclass="{ 'is-invalid': $v.files.stems.$error }"
                :acceptTypes="['.rar', '.zip']"
                xsrc="files.stems && files.stems.base64"
                xfilename="files.stems && files.stems.name"
                xfile-added="handleStemsAdded"
                xfile-removed="handleStemsRemoved"
            />
        </div>
    </div>
</template>

<script>
import { DropAudio, DropFile } from '~/components/Uploader'

export default {
    name: 'FilesCard',
    components: {
        DropAudio,
        DropFile,
    },
}
</script>