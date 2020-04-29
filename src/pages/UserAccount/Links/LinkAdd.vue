<template>
    <div class="page page-ua-link-add">
        <div class="page-nav">
            <basic-button
                class="page-back"
                variant="text"
                :to="{ name: 'userAccountLinks' }"
            >
                <i class="ls-i ls-i-back"></i>Links
            </basic-button>
        </div>

        <div class="fwz --final-step">
            <header class="fwz-header">
                <h1 class="fwz-title">Add a link</h1>
            </header>

            <section class="fwz-step">
                <form class="fwz-step-form">
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
                        <b-form-invalid-feedback
                            >Enter a valid URL</b-form-invalid-feedback
                        >
                    </b-form-group>

                    <b-form-group label="Link Title" label-for="titleInput">
                        <b-form-input
                            v-model="$v.form.title.$model"
                            id="titleInput"
                            placeholder="e.g. My Blog"
                            :state="!$v.form.title.$error"
                        />
                        <b-form-invalid-feedback
                            >Enter a title</b-form-invalid-feedback
                        >
                    </b-form-group>

                    <b-form-group label="Link Visibility">
                        <b-form-radio-group v-model="form.visibility">
                            <b-form-radio value="1">Visible</b-form-radio>
                            <b-form-radio value="2">Hidden</b-form-radio>
                        </b-form-radio-group>
                    </b-form-group>

                    <b-form-group label="Publish Date" v-if="form.scheduled">
                        <b-input-group class="datetime-input-group">
                            <DatePicker v-model="$v.form.date.$model" />
                            <TimePicker v-model="$v.form.time.$model" />
                        </b-input-group>
                    </b-form-group>

                    <basic-button variant="link" @click="toggleSchedule">
                        {{
                            form.scheduled
                                ? 'Clear scheduling '
                                : 'Schedule this link'
                        }}
                    </basic-button>
                </form>
                <aside class="fwz-step-aside">
                    <DropFoto @change="updateImage" />
                </aside>
            </section>

            <footer class="fwz-pager">
                <basic-button
                    class="fwz-prev"
                    variant="secondary"
                    :to="{ name: 'userAccountLinks' }"
                    :disabled="loading"
                    >Cancel</basic-button
                >
                <spinner-button
                    class="fwz-submit"
                    :loading="loading"
                    @click="save"
                    >Add Link</spinner-button
                >
            </footer>
        </div>
    </div>
</template>

<script>
import { linkAddEditForm } from '~/mixins/links/linkAddEditForm'

export default {
    name: 'LinkAdd',
    mixins: [linkAddEditForm],
}
</script>
