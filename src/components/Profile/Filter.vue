<template>
    <div class="profile-filter">
        <div class="filter-item d-md-none filter-top-action">
            <div class="text-center">
                <basic-button size="sm" class="btn-filter" @click="closeFilter">
                    <b-icon-filter scale="1.5" class="mr-2" />
                    Filters
                </basic-button>
            </div>
            <div class="actions">
                <basic-button
                    class="cancel-btn"
                    variant="link"
                    size="sm"
                    @click="handleResetClick"
                >
                    Reset
                </basic-button>
                <basic-button
                    variant="link"
                    size="sm"
                    @click="handleApplyClick"
                    class="float-right"
                >
                    Apply
                </basic-button>
            </div>
        </div>
        <div class="filter-item">
            <p class="font-weight-bold">Sort</p>
            <b-form-radio-group
                v-model="form.sort"
                :options="sortItems"
                value-field="value"
                text-field="title"
            />
        </div>
        <div class="filter-item" v-if="routeName === 'profileBeats'">
            <p class="font-weight-bold">Filter by BPM Range</p>
            <vue-slider v-model="form.bpm" :min="0" :max="1000" class="mb-3" :disabled="!isOnlyBeat" />
            <div class="slider-range-input">
                <b-form-input v-model="form.bpm[0]" :disabled="!isOnlyBeat" />
                <div class="range-dash">-</div>
                <b-form-input v-model="form.bpm[1]" :disabled="!isOnlyBeat" />
            </div>
        </div>
        <div class="filter-item" v-if="routeName === 'profileBeats'">
            <p class="font-weight-bold">Type</p>
            <b-form-checkbox-group v-model="form.type">
                <b-form-checkbox value="beat">
                    Beats
                </b-form-checkbox>
                <b-form-checkbox value="pack">
                    Beat Packs
                </b-form-checkbox>
            </b-form-checkbox-group>
        </div>
        <div class="filter-item" v-if="routeName !='profileLinks'">
            <p class="font-weight-bold">Genre</p>
            <b-form-checkbox v-model="allSelected" @change="toggleAll">
                All genres
            </b-form-checkbox>
            <b-form-checkbox-group
                v-model="selected"
                :options="showGenres"
                value-field="id"
                text-field="genre"
            />
            <basic-button
                v-if="genres.length > 4"
                variant="link"
                @click="isMore = !isMore"
            >
                {{ isMore ? 'Show less' : 'More' }}
            </basic-button>
        </div>
        <footer class="page-footer d-none d-md-block">
            <basic-button
                class="cancel-btn"
                variant="secondary"
                size="sm"
                @click="handleResetClick"
            >
                Reset
            </basic-button>
            <spinner-button
                size="sm"
                @click="handleApplyClick"
                class="float-right"
            >
                Apply
            </spinner-button>
        </footer>
    </div>
</template>
<script>
import { appConstants } from '~/constants'
import { mapGetters } from 'vuex'
export default {
    name: 'ProfileFilter',
    data: () => ({
        form: {
            sort: 'default',
            bpm: [0, 500],
            type: [],
            genre: [],
        },
        // sortItems: appConstants.sortItems,
        allSelected: false,
        selected: [],
        isMore: false,
    }),
    computed: {
        ...mapGetters({
            genres: 'profile/profileGenres',
        }),
        isOnlyBeat() {
            return this.form.type.length === 1 && this.form.type[0] === 'beat'
        },
        showGenres() {
            return this.isMore ? this.genres : this.genres.slice(0, 4)
        },
        routeName() {
            return this.$route.name
        },
        sortItems() {
            if (this.routeName === 'profileBeats' || this.routeName === 'profileSoundKits') {
                return appConstants.sortItems
            } else if (this.routeName === 'profileVideos' || this.routeName === 'profileLinks') {
                return [
                    appConstants.sortItems[0],
                    appConstants.sortItems[2],
                ]
            }
            return []
        },
    },
    watch: {
        selected(newVal) {
            if (newVal.length === this.genres.length) {
                this.allSelected = true
            } else {
                this.allSelected = false
            }
        },
        isOnlyBeat(newVal, oldVal) {
            if (newVal !== oldVal && newVal) {
                this.form.bpm = [0, 500]
            }
        }
    },
    async created() {
        let genreType = null
        switch (this.routeName) {
            case 'profileBeats':
                genreType = 'beats'
                break
            case 'profileSoundKits':
                genreType = 'kits'
                break
            case 'profileVideos':
                genreType = 'videos'
                break
            default:
                genreType = null
        }
        if (genreType) {
            await this.$store.dispatch('profile/getProfileGenres', genreType)
        }
    },
    methods: {
        toggleAll(checked) {
            this.selected = checked ? this.genres.map(({ id }) => id) : []
        },
        handleResetClick() {
            this.form = {
                sort: 0,
                bpm: [0, 500],
                type: [],
                genre: [],
            },
            this.selected = []
        },
        handleApplyClick() {
            const params = {
                sort: this.form.sort,
                bpm_min: this.isOnlyBeat ? this.form.bpm[0] : null,
                bpm_max: this.isOnlyBeat ? this.form.bpm[1] : null,
                type: this.routeName === 'profileBeats' ? this.form.type.join(',') : null,
                genre: this.routeName ==='profileLinks' ? null : this.selected.join(',')
            }
            this.$emit('apply-filter', params)
        },
        closeFilter() {
            this.$emit('close-filter')
        },
    },
}
</script>
