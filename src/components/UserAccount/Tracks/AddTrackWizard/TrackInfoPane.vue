<template>
    <div>
        <UserSearchModal
            v-if="showCollabSearchModal"
            @hidden="showCollabSearchModal = false"
            @user-select="handleCollabAdd"
        />
        <UserInviteModal />
        <div class="step-fields">
            <b-form-group
                :label="isSong ? 'Song Title*' : 'Beat Title*'"
                label-for="titleInput"
            >
                <b-form-input
                    id="titleInput"
                    placeholder="Enter a title"
                    v-model="$v.form.title.$model"
                    :state="!$v.form.title.$error"
                ></b-form-input>
                <b-form-invalid-feedback>
                    Enter a title
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Primary Genre" label-for="genreInput">
                <LsSelect
                    v-model="form.genre"
                    id="genreInput"
                    placeholder="Select Genre"
                    :options="genres"
                    :reduce="genre => genre"
                    label="genre"
                />
            </b-form-group>

            <b-form-group label="Tags(3)">
                <VueTagsInput
                    :placeholder="form.tags.length ? '' : 'Tags'"
                    v-model="tag"
                    @tags-changed="handleTagsChange"
                />
            </b-form-group>

            <b-form-row>
                <b-col md="6">
                    <b-form-group label="BPM" label-for="bpmInput">
                        <b-form-input
                            id="bpmInput"
                            v-model="form.bpm"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group label="Key" label-for="keyInput">
                        <LsSelect
                            v-model="form.key"
                            id="keyInput"
                            placeholder="Select"
                            :options="[]"
                            :reduce="key => key.id"
                            label="text"
                        />
                    </b-form-group>
                </b-col>
            </b-form-row>

            <div class="collabs-table">
                <header class="t-row">
                    <div class="t-col">
                        Collaborator
                    </div>
                    <div class="t-col">
                        Profit %
                    </div>
                    <div class="t-col">
                        Publishing %
                    </div>
                    <div class="t-col"></div>
                </header>
                <ul>
                    <li
                        class="t-row"
                        v-for="(collab, index) in $v.form.collabs.$each.$iter"
                        :key="collab.id"
                    >
                        <div class="t-col">
                            <div class="user-profile">
                                <UserAvatar
                                    :username="collab.$model.user.name"
                                    :src="collab.$model.user.photo"
                                />
                                <span>{{ collab.$model.user.name }}</span>
                                <span v-if="index == 0">(you)</span>
                            </div>
                        </div>
                        <div class="t-col">
                            <b-form-group>
                                <b-form-input
                                    v-model="collab.profitPct.$model"
                                    :state="!collab.profitPct.$error"
                                ></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="t-col">
                            <b-form-group>
                                <b-form-input
                                    v-model="collab.pubPct.$model"
                                    :state="!collab.pubPct.$error"
                                ></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="t-col">
                            <LsIconButton
                                icon="close"
                                v-if="index > 0"
                                @click="handleCollabRemove(index)"
                            />
                        </div>
                    </li>
                </ul>
            </div>
            <ls-button variant="link" @click="showCollabSearchModal = true">
                Add Collaborator
            </ls-button>
        </div>
    </div>
</template>

<script>
import { UserSearchModal, UserInviteModal } from '~/components/Modal'
import { required } from 'vuelidate/lib/validators'
import { appConstants } from '~/constants'
import { mapGetters } from 'vuex'

export default {
    name: 'TrackInfoPane',
    components: {
        UserSearchModal,
        UserInviteModal,
    },
    props: {
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
            showCollabSearchModal: false,
            form: {
                title: null,
                genre: {},
                tags: [],
                bpm: 0,
                collabs: [
                    {
                        profitPct: 100,
                        pubPct: 100,
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
                        profitPct: {
                            required,
                        },
                        pubPct: {
                            required,
                        },
                    },
                },
            },
        }
    },
    created() {
        this.$eventBus.$on('wz.nextClick', this.handleStepNextClick)
    },
    beforeMount() {
        this.form.collabs[0].user = {
            id: this.user.id,
            name: this.user.user_name,
            photo: this.user.photo,
        }
    },
    methods: {
        handleTagsChange(tags) {
            this.form.tags = tags.map(tag => tag.text)
        },
        handleCollabRemove(index) {
            this.form.collabs.splice(index, 1)
        },
        handleCollabAdd(user) {
            const collabs = this.form.collabs
            const alreadyAdded = collabs.find(
                collab => collab.user.id == user.id
            )
            if (alreadyAdded) {
                return
            }
            collabs.push({
                user,
                profitPct: null,
                pubPct: null,
            })
        },
        handleStepNextClick({ currentStep }) {
            if (currentStep !== 'trackInfo') {
                return
            }
            this.$v.form.$touch()
            if (this.$v.form.$invalid) {
                return
            }
            this.$eventBus.$emit('wz.updateForm', {
                trackInfo: this.form,
            })
            this.$eventBus.$emit('wz.goToNext')
        },
    },
}
</script>