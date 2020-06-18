<template>
    <div class="InfoBlock">
        <div class="fieldset">
            <b-form-group :label="isSong ? 'Song Title*' : 'Beat Title*'">
                <b-form-input
                    placeholder="e.g. My Beat"
                    v-model="$v.form.title.$model"
                    :state="!$v.form.title.$error"
                ></b-form-input>
                <b-form-invalid-feedback>
                    <template v-if="!$v.form.title.required">
                        Enter a title
                    </template>
                    <template v-else-if="!$v.form.title.isUnique">
                        You already have a beat with this title, pick a new one.
                    </template>
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Primary Genre">
                <LsSelect
                    v-model="form.genre"
                    placeholder="Select Genre"
                    :options="genres"
                    label="genre"
                />
            </b-form-group>

            <b-form-group label="Tags(3)">
                <LsTagsInput
                    v-model="tag"
                    :class="{
                        'is-invalid': $v.form.tags.$error,
                    }"
                    :tags="form.tags"
                    @tags-changed="handleTagsChange"
                />
                <b-form-invalid-feedback :state="!$v.form.tags.$error">
                    Add 3 or more tags that describe the beat
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-row>
                <b-col md="6">
                    <b-form-group label="BPM">
                        <b-form-input
                            type="number"
                            v-model="form.bpm"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group label="Key">
                        <LsSelect
                            v-model="form.key"
                            placeholder="Select"
                            :options="audioKeys"
                            label="name"
                        />
                    </b-form-group>
                </b-col>
            </b-form-row>

            <b-form-group :label="`Add to ${isSong ? 'Song' : 'Beat'} Pack`">
                <div class="search-input">
                    <LsIcon class="input-icon" icon="search" />
                    <b-form-input
                        v-model="form.trackPack"
                        :placeholder="
                            `Search for ${isSong ? 'song' : 'beat'} pack`
                        "
                    ></b-form-input>
                </div>
            </b-form-group>

            <div class="collabs">
                <div class="collabs-grid">
                    <div
                        class="fr"
                        v-for="(collab, index) in form.collabs"
                        :key="index"
                    >
                        <div class="fc user-col">
                            <label>Collaborator</label>
                            <div class="mini-profile">
                                <UserAvatar :user="collab.user" />
                                {{ collab.user.name | truncate(14) }}
                                {{ collab.user.id == user.id ? '(you)' : '' }}
                            </div>
                        </div>
                        <div class="fc profit-col">
                            <label>Profit %</label>
                            <input
                                type="text"
                                class="form-control"
                                :readonly="index == 0"
                                :value="collab.profit"
                                @keyup="handleCollabProfitInput(collab, $event)"
                            />
                        </div>
                        <div class="fc pub-col">
                            <label>Publishing %</label>
                            <input
                                type="text"
                                class="form-control"
                                :readonly="index === 0"
                                :value="collab.publishing"
                                @keyup="
                                    handleCollabPublishingInput(collab, $event)
                                "
                            />
                        </div>
                        <div class="fc remove-col" v-if="index > 0">
                            <LsIconButton
                                icon="close"
                                class="remove-icon"
                                @click="handleCollabRemoveClick(index)"
                            />
                            <ls-button
                                variant="link"
                                class="remove-btn"
                                @click="handleCollabRemoveClick(index)"
                            >
                                Remove Collaborator
                            </ls-button>
                        </div>
                    </div>
                </div>
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
import { collabsProfitFormMixin } from '~/mixins/tracks/collabsProfitForm'
import { required, minLength } from 'vuelidate/lib/validators'
import { api } from '~/services'
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'

export default {
    name: 'InfoBlock',
    mixins: [collabsProfitFormMixin],
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
        } = this.$store.state.trackAddWizard.form
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
                collabs: cloneDeep(collabs),
            },
        }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
            genres: 'common/genres',
            audioKeys: 'common/audioKeys',
            isSong: 'trackAddWizard/isSong',
        }),
    },
    validations: {
        form: {
            tags: {
                required,
                minLength: minLength(3),
            },
            title: {
                required,
                async isUnique(value) {
                    if (!value) {
                        return true
                    }
                    const { status } = await api.audios.getAvailability({
                        userId: this.user.id,
                        value,
                    })
                    return status === 'success'
                },
            },
        },
    },
    created() {
        this.$bus.$on('wz.nextClick', this.validate)
        this.$bus.$on('wz.prevClick', this.updateWizardForm)
        this.$bus.$on('wz.editModal.saveClick', this.validate)
        this.$bus.$on('modal.userSearch.userSelected', this.handleCollabAdd)
    },
    destroyed() {
        this.$bus.$off('modal.userSearch.userSelected')
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
        validate({ onSuccess }) {
            this.$v.form.$touch()

            if (!this.$v.form.title.required) {
                this.$toast.error('Enter a title.')
                return
            }

            if (!this.$v.form.title.isUnique) {
                this.$toast.error(
                    'You already have a beat with that title, pick a new one.'
                )
                return
            }

            if (this.$v.form.tags.$invalid) {
                this.$toast.error('Add 3 or more tags that describe the beat.')
                return
            }

            this.updateWizardForm()
            onSuccess()
        },
        handleTagsChange(tags) {
            this.form.tags = tags
        },
    },
}
</script>
