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
        <footer class="page-footer">
            <spinner-button class="btn-next" @click="handleNextClick">
                Next
            </spinner-button>
        </footer>
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
            'Email Address,Name,Phone,Birthday,Tags\nemail1@example.com,John Doe,(555) 555-5555,08/03,"influencer,friend"\nemail2@example.com,Jane Doe,,04/22',
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
        async handleNextClick() {
            if (this.importType === 'spreadsheet') {
                if (!this.contentSubscribers) {
                    this.$toast.error('Please type or paste subscribers')
                    return
                }
                let dataRows = this.contentSubscribers.split('\n')
                if (dataRows.length < 2) {
                    this.$toast.error('Invalid format!')
                    return
                }
                let subscribers = []
                const headFields = this.splitCsv(dataRows[0]).map(item => {
                    return item.toLowerCase()
                })
                for (let k = 1; k < dataRows.length; k++) {
                    let row = {}
                    const curData = this.splitCsv(dataRows[k])
                    headFields.forEach((field, index) => {
                        let curStr = curData[index]
                        if (curStr && curStr.charAt(0) === '"') {
                            curStr = curStr.slice(1)
                        }
                        if (curStr && curStr.charAt(curStr.length - 1) === '"') {
                            curStr = curStr.slice(0, curStr.length - 1)
                        }
                        row[field] = curStr
                    })
                    subscribers.push(row)
                }
                console.log(subscribers)
                await this.$store.dispatch('marketing/setImportSubscribers', subscribers)
                this.$emit('next')
            }
        },
        splitCsv(str) {
            return str.split(',').reduce((accum, curr) => {
                if (accum.isConcatting) {
                    accum.soFar[accum.soFar.length-1] += ',' + curr
                } else {
                    accum.soFar.push(curr)
                }
                if(curr.split('"').length % 2 == 0) {
                    accum.isConcatting = !accum.isConcatting
                }
                return accum;
            }, {
                soFar: [],
                isConcatting: false
            }).soFar
        }
    },
}
</script>
