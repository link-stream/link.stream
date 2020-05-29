<template>
    <div class="page page-ua-link-add">
        <div class="page-header">
            <ls-button
                class="page-back"
                variant="text"
                :to="{ name: 'userAccountLinks' }"
            >
                <i class="LsIcon LsIcon-back"></i>
                <span>Links</span>
            </ls-button>
        </div>
        <div class="fwz">
            <section class="fwz-step">
                <header class="step-header">
                    <h2 class="step-title">Add a link</h2>
                </header>
                <main class="step-body">
                    <div class="step-main">
                        <div class="step-fields">
                            <b-form-group
                                label="Copy &amp; Paste Your Link URL"
                                label-for="urlInput"
                            >
                                <b-form-input
                                    v-model="$v.form.url.$model"
                                    :state="!$v.form.url.$error"
                                    placeholder="e.g. https://myblog.blogspot.com"
                                    id="urlInput"
                                />
                                <b-form-invalid-feedback>
                                    Enter a valid URL
                                </b-form-invalid-feedback>
                            </b-form-group>

                            <b-form-group
                                label="Link Title"
                                label-for="titleInput"
                            >
                                <b-form-input
                                    v-model="$v.form.title.$model"
                                    id="titleInput"
                                    placeholder="e.g. My Blog"
                                    :state="!$v.form.title.$error"
                                />
                                <b-form-invalid-feedback>
                                    Enter a title
                                </b-form-invalid-feedback>
                            </b-form-group>

                            <b-form-group label="Link Visibility">
                                <b-form-radio-group v-model="form.visibility">
                                    <b-form-radio value="1">
                                        Visible
                                    </b-form-radio>
                                    <b-form-radio value="2">
                                        Hidden
                                    </b-form-radio>
                                </b-form-radio-group>
                            </b-form-group>

                            <div v-if="form.scheduled">
                                <b-form-group label="Start Date">
                                    <b-input-group class="input-group-datetime">
                                        <LsDatePicker v-model="form.date" />
                                        <LsTimePicker v-model="form.time" />
                                    </b-input-group>
                                </b-form-group>
                                <b-form-group>
                                    <b-form-checkbox v-model="endDateEnabled">
                                        Set end date
                                    </b-form-checkbox>
                                </b-form-group>
                                <b-form-group
                                    label="End Date"
                                    v-if="endDateEnabled"
                                >
                                    <b-input-group class="input-group-datetime">
                                        <LsDatePicker v-model="form.endDate" />
                                        <LsTimePicker v-model="form.endTime" />
                                    </b-input-group>
                                </b-form-group>
                            </div>

                            <ls-button
                                variant="link"
                                @click="handleScheduleToggleClick"
                            >
                                {{
                                    form.scheduled
                                        ? 'Clear scheduling '
                                        : 'Schedule this link'
                                }}
                            </ls-button>
                        </div>
                    </div>
                    <div class="step-sidebar">
                        <DropImage
                            @file-add="handleImageAdded"
                            @file-remove="handleImageRemoved"
                        />
                    </div>
                </main>
            </section>
            <footer class="fwz-pager">
                <ls-button
                    class="fwz-prev-btn"
                    variant="secondary"
                    :to="{ name: 'userAccountLinks' }"
                    :disabled="loading"
                >
                    Cancel
                </ls-button>
                <ls-spinner-button
                    class="fwz-submit-btn"
                    :loading="loading"
                    @click="handleSaveClick"
                >
                    Add Link
                </ls-spinner-button>
            </footer>
        </div>
    </div>
</template>

<script>
import { linkAddEditForm } from '~/mixins/links/linkAddEditForm'

export default {
    name: 'AddLink',
    mixins: [linkAddEditForm],
    methods: {
        handleScheduleToggleClick() {
            this.form.scheduled = !this.form.scheduled
        },
    },
}
</script>
