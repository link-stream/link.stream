<template>
    <div class="page page-sk">
        <header class="page-header">
            <div class="col-left">
                <h1 class="page-title">Your Sound Kits</h1>
                <div class="page-preview">
                    <span class="text-light">link.stream/</span>
                    <span>{{ user.user_name }}/kits</span>
                    <ls-button
                        variant="outline-light"
                        size="xs"
                        :to="{
                            name: 'userSoundKits',
                            params: { username: user.user_name },
                        }"
                    >
                        Preview
                    </ls-button>
                </div>
            </div>
            <div class="col-right">
                <ls-button :to="{ name: 'accountSoundKitAdd' }">
                    Add New Kit
                </ls-button>
            </div>
        </header>
        <main class="page-body">
            <div class="page-spinner" v-if="loading">
                <LsSpinner />
            </div>
            <div class="page-empty" v-if="!loading && !sortableKits.length">
                <div class="col-text">
                    Your Sound Kits will appear here.
                </div>
                <div class="col-link">
                    <ls-button
                        variant="link"
                        :to="{
                            name: 'accountSoundKitAdd',
                        }"
                    >
                        Add a kit
                    </ls-button>
                </div>
            </div>
            <Container
                v-else
                drag-handle-selector=".drag-icon"
                @drop="handleReorder"
            >
                <Draggable v-for="kit in sortableKits" :key="kit.id">
                    <SoundKitCard :soundKit="kit" />
                </Draggable>
            </Container>
        </main>
    </div>
</template>

<script>
import { SoundKitCard } from '~/components/Account/Tracks'
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
        handleReorder() {
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
