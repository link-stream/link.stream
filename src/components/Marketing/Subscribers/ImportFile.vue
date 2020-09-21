<template>
    <div class="import-type">
        <p class="description">
            Upload or import multiple subscribers. Not sure how to format your
            import?
            <a href="#">
                Download sample CSV file
            </a>
        </p>
        <b-form-group>
            <b-form-radio v-model="importType" name="import-type" value="file">
                Upload file
            </b-form-radio>
        </b-form-group>
        <div class="file-container" v-if="importType === 'file'">
            <p class="mb-2">
                Drop or browse to upload your file
            </p>
            <DropFile
                :filename="fileSubscribers.name"
                :src="fileSubscribers.base64"
                :acceptTypes="['.xls', '.xlsx', '.tsv', '.csv', '.txt']"
                @add-file="handleFileAdd"
                @remove-file="handleFileRemove"
            >
                <template v-slot:preview-body>
                    <div
                        v-if="isFileAdded"
                        class="preview-title"
                        v-html="fileSubscribers.name"
                    ></div>
                </template>
                <template v-slot:upload-section>
                    <i class="upload-icon"></i>
                    <div class="upload-msg">
                        <div class="upload-msg-l">
                            Add a .xls, .xlsx, .tsv, .csv, or .txt or
                            <span class="active-number">browse</span>
                        </div>
                    </div>
                </template>
            </DropFile>
        </div>
        <b-form-group>
            <b-form-radio
                v-model="importType"
                name="import-type"
                value="spreadsheet"
            >
                Copy and paste from spreadsheet
            </b-form-radio>
        </b-form-group>
        <b-form-group
            v-if="importType === 'spreadsheet'"
            label="Type or paste subscribers"
        >
            <b-form-textarea
                v-model="contentSubscribers"
                :placeholder="placeholderText"
                rows="5"
            >
            </b-form-textarea>
        </b-form-group>
    </div>
</template>
<script>
import { DropFile } from '~/components/Uploader'
export default {
    name: 'ImportFile',
    components: {
        DropFile,
    },
    data: () => ({
        importType: 'file',
        contentSubscribers: '',
        placeholderText:
            'Email Address,First Name,Last Name,Phone,Birthday,Tags\nemail1@example.com,John Doe,(555) 555-5555,08/03,"influencer,friend"\nemail2@example.com,Jane Doe,,04/22',
        fileSubscribers: '',
    }),
    computed: {
        isFileAdded() {
            return !!this.fileSubscribers.base64
        },
    },
    methods: {
        handleFileAdd({ name, base64 }) {
            console.log(base64)
            this.fileSubscribers = {
                name,
                base64,
            }
        },
        handleFileRemove() {
            this.fileSubscribers = {}
        },
    },
}
</script>
