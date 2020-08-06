<template>
    <div class="profile-filter">
        <div class="filter-sort">
            
        </div>
    </div>
</template>
<script>
import { appConstants } from '~/constants'
export default {
    name: 'ProfileFilter',
    data: () => ({
        form: {
            sort: 0,
            minBPM: 60,
            maxBPM: 220,
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
        ]
    }),
}
</script>