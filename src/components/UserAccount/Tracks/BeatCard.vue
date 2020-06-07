<template>
    <div class="Card BeatCard">
        <LsSpinnerMask v-if="processing" />
        <LsIcon class="drag-icon" icon="drag" />
        <div class="Card-media">
            <div class="lock-overlay" v-if="beat.isPrivate"></div>
            <img class="Card-img" :src="beat.coverart" :alt="beat.title" />
        </div>
        <h2 class="Card-title">
            {{ beat.title }}
            <span class="private-badge badge badge-pill" v-if="!beat.isPrivate">
                Private
            </span>
        </h2>
        <div class="file-badges">
            <span
                class="badge badge-pill"
                :class="{ hidden: !badge.show }"
                v-for="(badge, index) in fileBadges"
                :key="index"
            >
                {{ badge.text }}
            </span>
        </div>
        <LsButton
            variant="icon-bg"
            class="trash-btn"
            title="Delete"
            @click="handleDeleteClick"
        />
        <LsButton
            variant="icon-bg"
            class="edit-btn"
            title="Edit"
            @click="handleEditClick"
        />
        <b-dropdown class="actions-menu" variant="icon" dropleft no-caret>
            <template v-slot:button-content>
                <LsIcon icon="dot-menu-v" />
            </template>
            <b-dropdown-item @click="handleEditClick">
                Edit
            </b-dropdown-item>
            <b-dropdown-item @click="handleDeleteClick">
                Delete
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
export default {
    name: 'BeatCard',
    props: {
        beat: {
            type: Object,
        },
    },
    data() {
        return {
            processing: false,
        }
    },
    computed: {
        fileBadges() {
            const badges = [
                { text: 'MP3', show: false },
                { text: 'WAV', show: false },
                { text: 'ZIP', show: false },
            ]
            this.beat.licenses.forEach(({ mp3, wav, trackout_stems }) => {
                if (mp3 === '1') {
                    badges[0].show = true
                }
                if (wav === '1') {
                    badges[1].show = true
                }
                if (trackout_stems === '1') {
                    badges[2].show = true
                }
            })
            badges.sort(function(a, b) {
                return b.show - a.show
            })
            return badges
        },
    },
    methods: {
        handleEditClick() {},
        handleDeleteClick() {
            this.$alert.confirm({
                title: 'Delete beat?',
                message: 'This beat and its data will be permanently deleted.',
                onOk: async () => {
                    this.processing = true
                    const {
                        status,
                        message,
                        error,
                    } = await this.$store.dispatch('me/deleteBeat', {
                        beat: this.beat,
                    })
                    status === 'success'
                        ? this.$toast.success(message)
                        : this.$toast.error(error)
                    this.processing = false
                },
            })
        },
    },
}
</script>