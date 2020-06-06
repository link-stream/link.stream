<template>
    <div class="TrackInfoBlock">
        <div class="fieldset">
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
                        <div class="cell --user">
                            <div class="cell-title">
                                Collaborator
                            </div>
                            <div class="user-profile">
                                <UserAvatar :user="collab.$model.user" />
                                {{ collab.$model.user.name | truncate(14) }}
                                {{ index == 0 ? '(you)' : '' }}
                            </div>
                        </div>
                        <div class="cell --profit">
                            <div class="cell-title">
                                Profit %
                            </div>
                            <b-form-group>
                                <b-form-input
                                    type="number"
                                    v-model="collab.profit.$model"
                                    :state="!collab.profit.$error"
                                ></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="cell --pub">
                            <div class="cell-title">
                                Publishing %
                            </div>
                            <b-form-group>
                                <b-form-input
                                    type="number"
                                    v-model="collab.publishing.$model"
                                    :state="!collab.publishing.$error"
                                ></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="cell --remove">
                            <LsIconButton
                                icon="close"
                                class="remove-ibtn"
                                v-if="index > 0"
                                @click="handleCollabRemoveClick(index)"
                            />
                            <ls-button
                                variant="link"
                                class="remove-btn"
                                v-if="index > 0"
                                @click="handleCollabRemoveClick(index)"
                            >
                                Remove Collaborator
                            </ls-button>
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
import { mapGetters } from 'vuex'

export default {
    name: 'TrackInfoBlock',
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
        const {
            trackType,
            title,
            genre,
            tags,
            bpm,
            key,
            trackPack,
            collabs,
        } = this.$store.getters['trackAddWizard/form']

        return {
            tag: '',
            form: {
                trackType,
                title,
                genre: { ...genre },
                tags: [...tags],
                bpm,
                key: { ...key },
                trackPack,
                collabs: [...collabs],
            },
        }
    },
    computed: {
        ...mapGetters({
            genres: 'common/genres',
            audioKeys: 'common/audioKeys',
            isSong: 'trackAddWizard/isSong',
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
    validations: {
        form: {
            title: {
                required,
            },
            collabs: {
                $each: {
                    profit: {
                        required,
                    },
                    publishing: {
                        required,
                    },
                },
            },
        },
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
                ...this.form,
            })
        },
        showCollabSearchModal() {
            this.$bus.$emit('modal.userSearch.open')
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
                profit: null,
                publishing: null,
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