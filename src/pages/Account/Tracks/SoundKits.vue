<template>
    <div class="page page-sk">
        <header class="page-header">
            <div class="left-col">
                <h1 class="page-title">Your Sound Kits</h1>
                <div class="page-preview">
                    <span class="text-light">link.stream/</span>
                    <span>{{ user.user_name }}/kits</span>
                    <basic-button
                        variant="outline-light"
                        size="xs"
                        :to="{
                            name: 'userSoundKits',
                            params: { username: user.user_name },
                        }"
                    >
                        Preview
                    </basic-button>
                </div>
            </div>
            <div class="right-col">
                <basic-button :to="{ name: 'accountSoundKitAdd' }">
                    Add New Kit
                </basic-button>
            </div>
        </header>
        <main class="page-body">
            <LoadingSpinner class="page-loader" v-if="loading" />
            <div class="page-empty" v-if="!loading && !sortableKits.length">
                <div class="empty-text">
                    Your Sound Kits will appear here.
                </div>
                <basic-button
                    class="empty-link"
                    variant="link"
                    :to="{
                        name: 'accountSoundKitAdd',
                    }"
                >
                    Add a kit
                </basic-button>
            </div>
            <Container
                v-else
                drag-handle-selector=".card-drag-icon"
                @drop="handleReorder"
            >
                <Draggable v-for="kit in sortableKits" :key="kit.id">
                    <SoundKitCard :kit="kit" />
                </Draggable>
            </Container>
        </main>
    </div>
</template>

<script>
import { SoundKitCard } from '~/components/Account/Tracks/SoundKits'
import { Container, Draggable } from 'vue-smooth-dnd'
import { mapGetters } from 'vuex'

export default {
    name: 'SoundKits',
    components: {
        SoundKitCard,
        Container,
        Draggable,
    },
    data() {
        return {
            loading: false,
            sortableKits: [],
        }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
            kits: 'me/soundKits',
        }),
    },
    watch: {
        kits(newValue) {
            this.sortableKits = [...newValue]
        },
    },
    async created() {
        this.loading = true
        await this.$store.dispatch('me/loadSoundKits')
        this.loading = false
    },
    methods: {
        handleReorder(dropResult) {
            const { removedIndex: oldIndex, addedIndex: newIndex } = dropResult
            const kit = this.sortableKits[oldIndex]
            this.sortableKits.splice(oldIndex, 1)
            this.sortableKits.splice(newIndex, 0, kit)
            const sorts = this.sortableKits.map(({ id }, index) => {
                return {
                    id,
                    sort: (index + 1).toString(),
                }
            })
            this.$store.dispatch('me/reorderSoundKit', {
                oldIndex,
                newIndex,
                sorts,
            })
        },
    },
}
</script>
