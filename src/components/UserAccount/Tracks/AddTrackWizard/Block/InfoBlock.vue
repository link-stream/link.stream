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
                    :class="{
                        'is-invalid': $v.form.tags.$error,
                    }"
                    :placeholder="form.tags.length ? '' : 'Tags'"
                    :tags="form.tags"
                    @tags-changed="handleTagsChange"
                />
                <b-form-invalid-feedback :state="!$v.form.tags.$error">
                    Add 3 or more tags to describe your beat
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
                            :reduce="key => key"
                            label="name"
                        />
                    </b-form-group>
                </b-col>
            </b-form-row>

            <b-form-group :label="`Add to ${isSong ? 'Song' : 'Beat'} Pack`">
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
                        :key="index"
                    >
                        <div class="cell user-cell">
                            <div class="cell-title">
                                Collaborator
                            </div>
                            <div class="user-profile">
                                <UserAvatar :user="collab.$model.user" />
                                {{ collab.$model.user.name | truncate(14) }}
                                {{
                                    collab.$model.user.id == user.id
                                        ? '(you)'
                                        : ''
                                }}
                            </div>
                        </div>
                        <div class="cell profit-cell">
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
                        <div class="cell">
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
                        <div class="cell remove-cell">
                            <LsIconButton
                                icon="close"
                                class="remove-icon"
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
import { required, minLength } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
    name: 'InfoBlock',
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
                collabs: collabs.map(collab => ({ ...collab })),
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
            title: {
                required,
            },
            tags: {
                required,
                minLength: minLength(3),
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
            if (this.$v.form.title.$invalid) {
                this.$toast.error('Your beat needs a title.')
                return
            }
            if (this.$v.form.tags.$invalid) {
                this.$toast.error('Your beat needs 3 or more tags.')
                return
            }
            if (this.$v.form.collabs.$invalid) {
                this.$toast.error('Enter collaborators profit share.')
                return
            }
            this.updateWizardForm()
            onSuccess()
        },
        handleTagsChange(tags) {
            this.form.tags = tags
        },
        handleCollabRemoveClick(index) {
            this.form.collabs.splice(index, 1)
        },
        handleCollabAdd(user) {
            const { collabs } = this.form
            const alreadyAdded = collabs.find(c => c.user.id == user.id)
            if (alreadyAdded) {
                return
            }
            collabs.push({
                user,
                profit: null,
                publishing: null,
            })
        },
    },
}
</script>