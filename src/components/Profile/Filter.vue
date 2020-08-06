<template>
    <div class="profile-filter">
        <div class="filter-item">
            <p class="font-weight-bold">Sort</p>
            <b-form-radio-group 
                v-model="form.sort"
                :options="sortItems"
                value-field="id"
                text-field="title"
            />
        </div>
        <div class="filter-item">
            <p class="font-weight-bold">Filter by BPM Range</p>
            <vue-slider 
                v-model="form.bpm"
                :min="0"
                :max="1000"
            />
            <div class="slider-range-input">
                <b-form-input
                    v-model="form.bpm[0]"
                />
                <div class="range-dash">-</div>
                <b-form-input
                    v-model="form.bpm[1]"
                />
            </div>
        </div>
        <div class="filter-item">
            <p class="font-weight-bold">Type</p>
            <b-form-checkbox-group
                v-model="form.type"
            >
                <b-form-checkbox value="11">
                    Beats
                </b-form-checkbox>
                <b-form-checkbox value="12">
                    Beat Packs
                </b-form-checkbox>
            </b-form-checkbox-group>
        </div>
        <div class="filter-item">
            <p class="font-weight-bold">Genre</p>
            <b-form-checkbox 
                v-model="allSelected"
                @change="toggleAll"
            >
                All genres
            </b-form-checkbox>
            <b-form-checkbox-group
                v-model="selected"
                :options="genreList"
                value-field="id"
                text-field="genre"
            />
            <basic-button variant="link">
                More
            </basic-button>
        </div>
        <footer class="page-footer">
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
export default {
    name: 'ProfileFilter',
    data: () => ({
        form: {
            sort: 0,
            bpm: [60, 220],
            type: [],
            genre: [],
        },
        genreList: [
            {
                id: 1,
                genre: 'Hip Hop',
            },
            {
                id: 2,
                genre: 'Pop',
            },
            {
                id: 3,
                genre: 'R & B',
            }
        ],
        sortItems: appConstants.sortItems,
        allSelected: false,
        selected: [],
    }),
    watch: {
        selected(newVal) {
            if (newVal.length === this.genreList.length) {
                this.allSelected = true
            } else {
                this.allSelected = false
            }
        },
    },
    methods: {
        toggleAll(checked) {
            this.selected = checked ? this.genreList.map(({id}) => id) : []
        },
        handleResetClick() {
            this.form = {
                sort: 0,
                bpm: [60, 220],
                type: [],
                genre: [],
            },
            this.selected = []
        },
        handleApplyClick() {
            this.form.genre = this.selected
            this.$emit('apply-filter', {...this.form})
        }
    }
}
</script>