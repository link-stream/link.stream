<template>
    <div>
        <div class="step-fields">
            <b-form-group :label="isSong ? 'Song Title*' : 'Beat Title*'">
                <b-form-input
                    placeholder="Enter a title"
                    v-model="$v.form.title.$model"
                    :state="!$v.form.title.$error"
                ></b-form-input>
                <b-form-invalid-feedback>
                    Enter a title
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
                <div class="ls-search-input">
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
                                @click="handleRemoveCollabClick(index)"
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

export default {
    name: 'TrackInfoFormBlock',
    props: {
        active: {
            type: Boolean,
            default: false,
        },
        trackType: {
            type: Number,
        },
        trackInfo: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    data() {
        return {
            tag: '',
            form: {
                title: null,
                genre: {},
                tags: [],
                bpm: 0,
                key: null,
                trackPack: null,
                collabs: [
                    {
                        profitPercent: 100,
                        pubPercent: 100,
                        user: {
                            id: null,
                            name: null,
                            photo: null,
                        },
                    },
                ],
                ...this.trackInfo,
            },
        }
    },
    computed: {
        isSong() {
            return this.trackType === appConstants.tracks.types.song
        },
        ...mapGetters({
            user: 'me/user',
            genres: 'common/genres',
            audioKeys: 'common/audioKeys',
        }),
    },
    watch: {
        trackInfo() {
            this.form = {
                ...this.form,
                ...this.trackInfo,
            }
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
        this.$bus.$on('wz.validate.trackInfo', this.handleValidate)
        this.$bus.$on('modal.userSearch.userClick', this.handleAddCollab)
    },
    beforeMount() {
        this.form.collabs[0].user = {
            id: this.user.id,
            name: this.user.user_name,
            photo: this.user.photo,
        }
    },
    methods: {
        showCollabSearchModal() {
            this.$bus.$emit('modal.userSearch.show')
        },
        handleTagsChange(tags) {
            this.form.tags = tags
        },
        handleRemoveCollabClick(index) {
            this.form.collabs.splice(index, 1)
        },
        handleAddCollab(user) {
            const collabs = this.form.collabs
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
        handleValidate({ onSuccess }) {
            if (!this.active) {
                return
            }
            this.$v.form.$touch()
            if (this.$v.form.$invalid) {
                return
            }
            this.$bus.$emit('wz.updateForm', {
                trackInfo: { ...this.form },
            })
            onSuccess()
        },
    },
}
</script>