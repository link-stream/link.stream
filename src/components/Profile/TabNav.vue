<template>
    <div class="tabnav-container">
        <div class="tabnav d-flex">
            <SearchInput
                v-if="isSearchable"
                pill
                color="black"
                v-model="searchString"
                placeholder="Search by tag or title"
                direction="right"
                class="search-form d-none d-md-block"
                @keyupEnter="searchDataByTag"
            />
            <ul class="mx-auto">
                <li v-if="isSearchable">
                    <b-icon-search
                        class="d-md-none"
                        @click="isSearchBox = !isSearchBox"
                    />
                </li>
                <li
                    v-for="tab in tabs"
                    :key="tab.to"
                    :class="{ active: $route.name === tab.to }"
                >
                    <router-link :to="{ name: tab.to }">
                        {{ tab.title }}
                    </router-link>
                </li>
            </ul>
            <basic-button
                v-if="curRouteName != 'profileAbout'"
                variant="outline-light"
                size="sm"
                class="btn-filter"
                @click="isShowFilter = !isShowFilter"
            >
                <img src="@/assets/img/ico/filter-list.svg" class="mr-2" />
                Filters
            </basic-button>
            <ProfileFilter
                v-if="isShowFilter"
                @apply-filter="searchFilter"
                @close-filter="isShowFilter = false"
            />
        </div>
        <SearchInput
            v-if="isSearchBox"
            pill
            color="black"
            v-model="searchString"
            placeholder="Search by tag or title"
            direction="right"
            class="search-form d-md-none"
            @keyupEnter="searchDataByTag"
        />
    </div>
</template>

<script>
import ProfileFilter from './Filter'
export default {
    name: 'TabNav',
    components: {
        ProfileFilter,
    },
    data() {
        return {
            tabs: [
                { title: 'Beats', to: 'profileBeats' },
                { title: 'Sound Kits', to: 'profileSoundKits' },
                { title: 'Videos', to: 'profileVideos' },
                { title: 'Links', to: 'profileLinks' },
                { title: 'About', to: 'profileAbout' },
            ],
            searchString: '',
            isShowFilter: false,
            isSearchBox: false,
        }
    },
    computed: {
        curRouteName() {
            return this.$route.name
        },
        isSearchable() {
            return this.curRouteName !== 'profileAbout'
        },
    },
    methods: {
        searchFilter(filter) {
            this.isShowFilter = false
            this.searchData(filter)
        },
        searchDataByTag() {
            const params = {
                tag: this.searchString,
            }
            this.searchData(params)
        },
        async searchData(params) {
            switch (this.curRouteName) {
                case 'profileBeats':
                    await this.$store.dispatch(
                        'profile/getProfileBeats',
                        params
                    )
                    break
                case 'profileSoundKits':
                    await this.$store.dispatch(
                        'profile/getProfileKits',
                        params
                    )
                    break
                case 'profileVideos':
                    await this.$store.dispatch(
                        'profile/getProfileVideos',
                        params
                    )
                    break
                case 'profileLinks':
                    await this.$store.dispatch(
                        'profile/getProfileLinks',
                        params
                    )
            }
        },
    },
}
</script>
