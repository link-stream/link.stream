<template>
    <div class="page page-beats">
        <header class="page-header">
            <div class="col-left">
                <h1 class="page-title">Your beats</h1>
                <div class="page-preview">
                    <span class="text-light">link.stream/</span>
                    <span>{{ user.user_name }}/beats</span>
                    <ls-button
                        variant="outline-light"
                        size="xs"
                        :to="{
                            name: 'userBeats',
                            params: { username: user.user_name },
                        }"
                    >
                        Preview
                    </ls-button>
                </div>
            </div>
            <div class="col-right">
                <ls-button :to="{ name: 'accountBeatAdd' }">
                    Add a Beat
                </ls-button>
            </div>
        </header>
        <main class="page-body">
            <div class="page-spinner" v-if="loading">
                <LsSpinner />
            </div>
            <div class="page-empty" v-if="!loading && !sortableBeats.length">
                <div class="col-text">
                    Your beats will appear here.
                </div>
                <div class="col-link">
                    <ls-button
                        variant="link"
                        :to="{
                            name: 'accountBeatAdd',
                        }"
                    >
                        Add a beat
                    </ls-button>
                </div>
            </div>
            <Container
                v-else
                drag-handle-selector=".drag-icon"
                @drop="handleReorder"
            >
                <Draggable v-for="beat in sortableBeats" :key="beat.id">
                    <BeatCard :beat="beat" />
                </Draggable>
            </Container>
        </main>
    </div>
</template>

<script>
import { BeatCard } from '~/components/Account/Tracks'
import { Container, Draggable } from 'vue-smooth-dnd'
import { mapGetters } from 'vuex'

export default {
    name: 'Beats',
    components: {
        BeatCard,
        Container,
        Draggable,
    },
    data() {
        return {
            loading: false,
            sortableBeats: [],
        }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
            beats: 'me/beats',
        }),
    },
    watch: {
        beats(newValue) {
            this.sortableBeats = [...newValue]
        },
    },
    async created() {
        this.loading = true
        await this.$store.dispatch('me/loadBeats')
        this.loading = false
    },
    methods: {
        handleReorder(dropResult) {
            const { removedIndex: oldIndex, addedIndex: newIndex } = dropResult
            const beat = this.sortableBeats[oldIndex]
            this.sortableBeats.splice(oldIndex, 1)
            this.sortableBeats.splice(newIndex, 0, beat)
            const sorts = this.sortableBeats.map(({ id }, index) => {
                return {
                    id,
                    sort: (index + 1).toString(),
                }
            })
            this.$store.dispatch('me/reorderBeat', {
                oldIndex,
                newIndex,
                sorts,
            })
        },
    },
}
</script>
