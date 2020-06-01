<template>
    <div class="TrackInfoFormBlock">
        <div class="step-fields">
            <b-form-group label="Track Type" v-if="!noTrackTypeField">
                <b-form-radio-group v-model="form.trackType">
                    <b-form-radio value="2">
                        Beat
                    </b-form-radio>
                    <b-form-radio value="1">
                        Song
                    </b-form-radio>
                </b-form-radio-group>
            </b-form-group>

            <b-form-group :label="isSong ? 'Song Title*' : 'Beat Title*'">
                <b-form-input
                    placeholder="Enter a title"
                    v-model="$v.form.title.$model"
                    :state="!$v.form.title.$error"
                ></b-form-input>
                <b-form-invalid-feedback>
                    Title can't be blank
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Primary Genre">
                <LsSelect
                    v-model="form.genre"
                    placeholder="Select Genre"
                    :options="genres"
                    :reduce="genre => genre"
                    label="genre"
                />
            </b-form-group>

            <b-form-group label="Tags(3)">
                <VueTagsInput
                    v-model="tag"
                    :placeholder="form.tags.length ? '' : 'Tags'"
                    :tags="form.tags"
                    @tags-changed="handleTagsChange"
                />
            </b-form-group>

            <b-form-row>
                <b-col md="6">
                    <b-form-group label="BPM">
                        <b-form-input v-model="form.bpm"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group label="Key">
                        <LsSelect
                            v-model="form.key"
                            placeholder="Select"
                            :options="audioKeys"
                            :reduce="key => key"
                            label="name"
                        />
                    </b-form-group>
                </b-col>
            </b-form-row>

            <b-form-group
                class="input-track-pack"
                :label="`Add to ${isSong ? 'Song' : 'Beat'} Pack`"
            >
                <div class="search-box">
                    <LsIcon class="search-icon" icon="search" />
                    <b-form-input
                        v-model="form.trackPack"
                        class="search-input"
                        :placeholder="
                            `Search for ${isSong ? 'song' : 'beat'} pack`
                        "
                    ></b-form-input>
                </div>
            </b-form-group>

            <div class="collabs">
                <ul>
                    <li
                        v-for="(collab, index) in $v.form.collabs.$each.$iter"
                        :key="collab.id"
                    >
                        <div class="cell cell--name">
                            <div class="cell-title">
                                Collaborator
                            </div>
                            <div class="user-profile">
                                <UserAvatar
                                    :username="collab.$model.user.name"
                                    :src="collab.$model.user.photo"
                                />
                                {{ collab.$model.user.name | truncate(14) }}
                                {{ index == 0 ? '(you)' : '' }}
                            </div>
                        </div>
                        <div class="cell cell--profit">
                            <div class="cell-title">
                                Profit %
                            </div>
                            <b-form-group>
                                <b-form-input
                                    v-model="collab.profitPercent.$model"
                                    :state="!collab.profitPercent.$error"
                                ></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="cell cell--pub">
                            <div class="cell-title">
                                Publishing %
                            </div>
                            <b-form-group>
                                <b-form-input
                                    v-model="collab.pubPercent.$model"
                                    :state="!collab.pubPercent.$error"
                                ></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="cell cell--action">
                            <LsIconButton
                                icon="close"
                                class="remove-btn"
                                v-if="index > 0"
                                @click="handleCollabRemoveClick(index)"
                            />
                        </div>
                    </li>
                </ul>

                <ls-button
                    variant="text"
                    class="add-btn"
                    @click="showCollabSearchModal"
                >
                    <LsIcon icon="plus" />
                    Add Collaborator
                </ls-button>
            </div>
        </div>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { appConstants } from '~/constants'
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'

export default {
    name: 'TrackInfoFormBlock',
    props: {
        isEditMode: {
            type: Boolean,
            default: false,
        },
        noTrackTypeField: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            tag: '',
            form: cloneDeep(
                this.$store.getters['trackAddWizard/form'].trackInfo
            ),
        }
    },
    computed: {
        isSong() {
            return this.form.trackType == appConstants.tracks.types.song
        },
        ...mapGetters({
            genres: 'common/genres',
            audioKeys: 'common/audioKeys',
        }),
    },
    watch: {
        form: {
            deep: true,
            handler() {
                !this.isEditMode && this.updateWizardForm()
            },
        },
    },
    validations() {
        return {
            form: {
                title: {
                    required,
                },
                collabs: {
                    $each: {
                        profitPercent: {
                            required,
                        },
                        pubPercent: {
                            required,
                        },
                    },
                },
            },
        }
    },
    created() {
        this.$bus.$on('wz.validateBlock.trackInfo', this.handleBlockValidate)
        this.$bus.$on('modal.userSearch.userClick', this.handleCollabAdd)
    },
    destroyed() {
        this.$bus.$off('wz.validateBlock.trackInfo')
        this.$bus.$off('modal.userSearch.userClick')
    },
    methods: {
        updateWizardForm() {
            this.$store.dispatch('trackAddWizard/updateForm', {
                trackInfo: {
                    ...this.form,
                    imageBase64: this.$store.getters['trackAddWizard/form']
                        .trackInfo.imageBase64,
                },
            })
        },
        showCollabSearchModal() {
            this.$bus.$emit('modal.userSearch.show')
        },
        handleTagsChange(tags) {
            this.form.tags = tags
        },
        handleCollabRemoveClick(index) {
            this.form.collabs.splice(index, 1)
        },
        handleCollabAdd(user) {
            const { collabs } = this.form
            const alreadyAdded = collabs.find(
                collab => collab.user.id == user.id
            )
            if (alreadyAdded) {
                return
            }
            collabs.push({
                user,
                profitPercent: null,
                pubPercent: null,
            })
        },
        handleBlockValidate({ onSuccess }) {
            this.$v.form.$touch()
            if (this.$v.form.$invalid) {
                return
            }
            this.updateWizardForm()
            onSuccess()
        },
    },
}
</script>