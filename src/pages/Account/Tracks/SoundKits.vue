<template>
    <div>
        <h1>Sound Kits</h1>
        <ls-button :to="{ name: 'accountSoundKitAdd' }"
            >Add Sound Kit</ls-button
        >

        <base-card v-for="sk in soundKits" :key="sk.id" :title="sk.title">
            <p>Price: {{ sk.price }}</p>
            <p>Description: {{ sk.description }}</p>
            <p>Genre: {{ sk.genre_id }}</p>
            <p>Public: {{ sk.public }}</p>
            <p>Scheduled: {{ sk.scheduled }}</p>
            <p>Date: {{ sk.date }}</p>
            <p>Time: {{ sk.time }}</p>
            <img :src="sk.image" v-if="sk.image" width="45" />
        </base-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'SoundKits',
    data() {
        return {
            loading: false,
            sortedSoundKits: [],
        }
    },
    computed: {
        ...mapGetters({
            soundKits: 'me/soundKits',
        }),
    },
    created() {
        this.loading = true
        this.$store.dispatch('me/loadSoundKits')
        this.loading = false
    },
}
</script>
