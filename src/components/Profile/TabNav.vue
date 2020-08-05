<template>
    <div class="tabnav d-flex">
        <SearchInput
            pill
            color="black"
            v-model="searchString"
            placeholder="Search by tag"
            direction="right"
            class="search-form d-none d-sm-block"
        />
        <ul class="mx-auto">
            <li>
                <b-icon-search />
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
            variant="outline-light" 
            size="sm"
            class="btn-filter d-none d-sm-block"
        >
            <img src="@/assets/img/ico/filter-list.svg" class="mr-2" />
            Filters
        </basic-button>
    </div>
</template>

<script>
export default {
    name: 'TabNav',
    data() {
        return {
            tabs: [
                { title: 'Beats', to: 'profileBeats' },
                { title: 'Sound Kits', to: 'profileSoundKits' },
                { title: 'Videos', to: 'profileVideos' },
                { title: 'Links', to: 'profileLinks' },
                { title: 'About', to: 'profileAbout' },
            ],
            searchString: ''
        }
    },
}
</script>