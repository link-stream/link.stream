<template>
    <div class="page page-sk">
        <header class="page-header">
            <div class="left-col">
                <h1 class="page-title">Your Sound Kits</h1>
                <div class="page-preview">
                    <span class="text-light">{{ baseUrl }}/</span>
                    <span>{{ user.url }}/kits</span>
                    <b-link
                        class="btn btn-outline-light btn-xs rounded-pill"
                        :to="{
                            name: 'profileSoundKits',
                            params: { url: user.url },
                        }"
                        target="_blank"
                    >
                        Preview
                    </b-link>
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
            <div class="page-empty" v-if="!loading && !sortableList.length">
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
                    Add a Kit
                </basic-button>
            </div>
            <Container
                class="soundkit-draggable"
                v-else
                drag-handle-selector=".card-drag-icon"
                @drop="handleReorder"
            >
                <Draggable v-for="kit in sortableList" :key="kit.id">
                    <SoundKitCard :kit="kit" />
                </Draggable>
            </Container>
        </main>
    </div>
</template>

<script>
import SoundKitCard from '~/components/Account/Tracks/SoundKits/SoundKitCard'
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
            sortableList: [],
            baseUrl: ''
        }
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
            kits: 'me/soundKits',
        }),
    },
    watch: {
        kits: {
            immediate: true,
            handler(newValue) {
                this.sortableList = [...newValue]
            },
        },
    },
    async created() {
        const getUrl = window.location
        this.baseUrl = getUrl.host
        this.loading = true
        await this.$store.dispatch('me/loadSoundKits')
        this.loading = false
    },
    methods: {
        handleReorder(dropResult) {
            const { removedIndex: oldIndex, addedIndex: newIndex } = dropResult
            const list = [...this.sortableList]
            const item = list[oldIndex]
            list.splice(oldIndex, 1)
            list.splice(newIndex, 0, item)
            const sorts = list.map(({ id }, index) => {
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
