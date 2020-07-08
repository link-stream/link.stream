<template>
    <div class="page page-pack-add-edit">
        <nav class="page-nav">
            <basic-button
                class="back-btn"
                variant="text"
                :to="{ name: 'accountBeatPacks' }"
            >
                <i class="ico ico-back"></i>
                <span>Beat Packs</span>
            </basic-button>
        </nav>
        <LoadingSpinner class="page-loader" v-if="loading" />
        <div v-else>
            <header class="page-header">
                <div class="left-col">
                    <h1 class="page-title">{{
                        isEditMode ? pack.title : 'Create Beat Pack'
                    }}</h1>
                </div>
                <div class="right-col">
                    <basic-button
                        class="cancel-btn"
                        variant="secondary"
                        size="md"
                        :disabled="saving"
                        :to="{ name: 'accountBeatPacks' }"
                    >
                        Cancel
                    </basic-button>
                    <spinner-button
                        size="md"
                        :loading="saving"
                        @click="handleSaveClick"
                    >
                        Save
                    </spinner-button>
                </div>
            </header>
            <main class="page-body">
                <div class="left-col">
                    <base-card title="Beat Pack Details" class="info-card">
                        <b-form-group label="Title">
                            <b-form-input
                                placeholder="e.g. My Beat Pack"
                                v-model="$v.form.title.$model"
                                :state="!$v.form.title.$error"
                            ></b-form-input>
                            <b-form-invalid-feedback>
                                <template v-if="!$v.form.title.required">
                                    Enter a title
                                </template>
                                <template v-else-if="!$v.form.title.isUnique">
                                    You already have a pack with this title,
                                    pick a new one.
                                </template>
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="License Type">
                            <BasicSelect
                                v-model="form.licenseId"
                                placeholder="Select License"
                                :class="{
                                    'is-invalid': $v.form.licenseId.$error,
                                }"
                                :options="licenses"
                                :reduce="license => license.id"
                                label="title"
                            />
                            <b-form-invalid-feedback
                                :force-show="$v.form.licenseId.$error"
                            >
                                Pick a license type
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Price">
                            <div class="money-input">
                                <Icon class="input-icon" icon="dollar" />
                                <input
                                    type="text"
                                    v-model="$v.form.price.$model"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': $v.form.price.$error,
                                    }"
                                    v-cleave="{
                                        numeral: true,
                                    }"
                                />
                            </div>
                            <b-form-invalid-feedback
                                :force-show="$v.form.price.$error"
                            >
                                Enter a price
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Genre">
                            <BasicSelect
                                v-model="form.genreId"
                                placeholder="Select Genre"
                                :options="genres"
                                :reduce="genre => genre.id"
                                label="genre"
                            />
                        </b-form-group>
                        <b-form-group label="Tags(3)">
                            <TaggerInput
                                v-model="tag"
                                :tags="form.tags"
                                :class="{
                                    'is-invalid': $v.form.tags.$error,
                                }"
                                @tags-changed="handleTagsChange"
                            />
                            <b-form-invalid-feedback
                                :state="!$v.form.tags.$error"
                            >
                                Add 3 or more tags to help people find this pack
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Description">
                            <textarea
                                class="form-control"
                                rows="4"
                                v-model="form.description"
                            ></textarea>
                        </b-form-group>
                    </base-card>
                    <base-card title="Beats" class="beats-card">
                        <multi-select
                            placeholder="Search for Beats to add"
                            class="beats-multiselect"
                            v-model="form.selectedBeats"
                            :options="beats"
                        >
                            <template
                                v-slot:option-content="{ option, selected }"
                            >
                                <div class="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        class="custom-control-input"
                                        :checked="
                                            !!selected.find(
                                                ({ id }) => id == option.id
                                            )
                                        "
                                    />
                                    <label class="custom-control-label"></label>
                                </div>
                                <div class="option-cover">
                                    <span
                                        class="lock-overlay"
                                        v-if="option.isPrivate"
                                    ></span>
                                    <img
                                        :src="option.coverart"
                                        :alt="option.title"
                                    />
                                </div>
                                <div>
                                    <h4 class="option-title">
                                        {{ option.title }}
                                    </h4>
                                    <small>
                                        {{ genreLabelById(option.genre_id) }}
                                    </small>
                                </div>
                            </template>
                            <template v-slot:select-empty="{ options }">
                                <span v-if="options.length">
                                    No matching beats.
                                </span>
                                <span v-else>
                                    You don't have any beats.
                                    <br />
                                    <basic-button
                                        variant="link"
                                        :to="{ name: 'accountBeatAdd' }"
                                    >
                                        Add a Beat
                                    </basic-button>
                                </span>
                            </template>
                        </multi-select>
                        <div class="selected-beats">
                            <ul v-if="form.selectedBeats.length">
                                <li
                                    v-for="(beat, index) in form.selectedBeats"
                                    :key="beat.id"
                                >
                                    <Icon icon="drag" />
                                    <div class="item-number">
                                        {{ index + 1 }}
                                    </div>
                                    <div class="item-body">
                                        <h4 class="item-title">
                                            {{ beat.title }}
                                        </h4>
                                        <small class="item-subtitle">
                                            {{ genreLabelById(beat.genre_id) }}
                                        </small>
                                    </div>
                                    <div class="item-cover">
                                        <span
                                            class="lock-overlay"
                                            v-if="beat.isPrivate"
                                        ></span>
                                        <img
                                            :src="beat.coverart"
                                            :alt="beat.title"
                                        />
                                    </div>
                                    <IconButton
                                        icon="close"
                                        @click="handleBeatRemoveClick(index)"
                                    />
                                </li>
                            </ul>
                            <div class="no-selected-beats" v-else>
                                <Icon icon="music-note" />
                                <p>There are no Beats in this Pack</p>
                            </div>
                        </div>
                    </base-card>
                </div>
                <div class="right-col">
                    <div class="Card viz-card">
                        <header class="card-header">
                            <div class="card-title">
                                Visibility
                            </div>
                            <div class="viz-toggle">
                                <span class="toggle-label">
                                    {{ form.isPublic ? 'Public' : 'Private' }}
                                </span>
                                <TogglerButton v-model="form.isPublic" />
                            </div>
                        </header>
                        <b-form-group
                            v-show="form.scheduled"
                            label="Set Release Date"
                        >
                            <b-input-group class="date-input-group">
                                <DatePicker v-model="form.date" />
                                <TimePicker v-model="form.time" />
                            </b-input-group>
                        </b-form-group>
                        <basic-button
                            variant="link"
                            @click="handleScheduleToggle"
                        >
                            {{
                                form.scheduled
                                    ? 'Remove release date'
                                    : 'Set release date'
                            }}
                        </basic-button>
                    </div>
                    <div class="Card">
                        <drop-image
                            variant="inline"
                            msg-long="Drag artwork here or<br><u>browse for file</u>"
                            :src="form.coverArtBase64"
                            @add-file="handleImageAdd"
                            @remove-file="handleImageRemove"
                        >
                            <template v-slot:upload-controls>
                                <small
                                    class="text-hint"
                                    v-if="!form.coverArtBase64"
                                >
                                    Suggested Dimensions: 1000x1000
                                </small>
                            </template>
                        </drop-image>
                    </div>
                </div>
            </main>
            <footer class="page-footer">
                <basic-button
                    class="cancel-btn"
                    variant="secondary"
                    size="md"
                    :disabled="saving"
                    :to="{ name: 'accountBeatPacks' }"
                >
                    Cancel
                </basic-button>
                <spinner-button
                    size="md"
                    :loading="saving"
                    @click="handleSaveClick"
                >
                    Save
                </spinner-button>
            </footer>
        </div>
    </div>
</template>

<script>
import { DropImage } from '~/components/Uploader'
import { required, minLength } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
    name: 'BeatPackAddEdit',
    components: {
        DropImage,
    },
    data() {
        return {
            isEditMode: false,
            loading: false,
            saving: false,
            tag: '',
            form: {
                title: '',
                licenseId: '',
                price: '',
                genreId: '',
                description: '',
                tags: [],
                coverArtBase64: '',
                selectedBeats: [],
                isPublic: false,
                scheduled: false,
                date: new Date(),
                time: '00:00:00',
            },
        }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
            genres: 'common/genres',
            licenses: 'me/licenses',
            beats: 'me/beats',
            genreLabelById: 'common/genreLabelById',
        }),
    },
    validations: {
        form: {
            price: {
                required,
            },
            licenseId: {
                required,
            },
            tags: {
                required,
                minLength: minLength(3),
            },
            title: {
                required,
                async isUnique() {
                    return true
                },
            },
        },
    },
    async created() {
        this.loading = true
        await this.$store.dispatch('common/loadGenres')
        await this.$store.dispatch('me/loadLicenses')
        await this.$store.dispatch('me/loadBeats')
        this.loading = false
    },
    methods: {
        handleTagsChange(tags) {
            this.form.tags = tags
        },
        handleScheduleToggle() {
            this.$v.form.$reset()
            this.form.scheduled = !this.form.scheduled
        },
        handleImageAdd(file) {
            this.form.coverArtBase64 = file.base64
        },
        handleImageRemove() {
            this.form.coverArtBase64 = null
        },
        handleBeatRemoveClick(index) {
            this.form.selectedBeats.splice(index, 1)
        },
        handleSaveClick() {
            this.$v.form.$touch()
            return
        },
    },
}
</script>