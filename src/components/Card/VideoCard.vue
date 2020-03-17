<template>
    <b-card no-body class="video-card" v-resize="onResizeYoutubeContainer">
        <font-awesome-icon :icon="['fas', 'arrows-alt']" class="dragable-selector" />
        <div class="video-details">
            <div class="video-container ml-4">
                <div class="youtubue-container" ref="youtubue-container">
                    <youtube
                        :video-id="$youtube.getIdFromUrl(video.url)"
                        :width="player.width"
                        :height="player.height"
                    ></youtube>
                </div>
                <div class="video-actions d-flex d-sm-none">
                    <b-button pill variant="light" @click="onEditVideo">
                        <font-awesome-icon :icon="['fas', 'pen']" />
                    </b-button>
                    <b-button pill variant="light" @click="onDeleteVideo" class="d-none">
                        <font-awesome-icon :icon="['fas', 'trash']" />
                    </b-button>
                </div>
            </div>
            <div class="video-content mx-4">
                <h2>{{ video.title }}</h2>
                <div class="video-content-box d-none">
                    <ToggleButton
                        :value="status"
                        color="#fec113"
                        :width="43"
                        :height="26"
                        :margin="2"
                        @change="onChangeVideoStatus"
                    />
                    <font-awesome-icon :icon="['far', 'clock']" size="lg" class="mx-2" />
                    <font-awesome-icon :icon="['fas', 'chart-bar']" size="lg" />
                    <span class="text-black small mx-1">1,350,483 streams</span>
                </div>
            </div>
        </div>
        <div class="video-actions d-none d-sm-block">
            <b-button pill variant="light" @click="onEditVideo">
                <font-awesome-icon :icon="['fas', 'pen']" size="lg" />
            </b-button>
            <b-button pill variant="light" @click="onDeleteVideo" class="d-none">
                <font-awesome-icon :icon="['fas', 'trash']" size="lg" />
            </b-button>
        </div>
    </b-card>
</template>

<script>
import resize from 'vue-resize-directive'
import { ToggleButton } from 'vue-js-toggle-button'

export default {
    name: 'VideoCard',
    directives: {
        resize,
    },
    components: {
        ToggleButton,
    },
    props: {
        video: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            player: {
                width: '125px',
                height: '70px',
            },
        }
    },
    computed: {
        status() {
            return parseInt(this.video.status_id) === 1
        },
    },
    methods: {
        // Resize
        onResizeYoutubeContainer() {
            this.player.width = this.$refs['youtubue-container'].clientWidth + 'px'
            this.player.height = this.$refs['youtubue-container'].clientWidth * 0.5625 + 'px'
        },
        onChangeVideoStatus(state) {
            console.log('status has changed to ', state)
        },
        onEditVideo() {},
        onDeleteVideo() {},
    },
}
</script>

<style lang="scss">
.video-card {
    display: flex;
    flex-direction: row !important;
    align-items: center;
    max-width: 672px;
    margin: $spacer 0;
    padding: $spacer;
    border: none;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.22);
    @include border-radius(4px);

    .dragable-selector {
        cursor: move;
    }

    .video-details {
        display: flex;
        flex: 1;

        .video-container {
            .youtubue-container {
                width: 125px;
            }
        }

        .video-content {
            display: flex;
            flex-direction: column;
            justify-content: center;

            h2 {
                font-size: $font-size-base;
                font-weight: $font-weight-bold;
            }
        }

        @include media-breakpoint-down(xs) {
            flex-direction: column;

            .video-container {
                display: flex;
                margin-bottom: 0.5 * $spacer;

                .youtubue-container {
                    flex: 1;
                    margin-right: 0.5 * $spacer;
                }

                .video-actions {
                    display: flex;
                    flex-direction: column;

                    button {
                        width: 40px;
                        height: 40px;
                    }

                    button + button {
                        margin-top: 10px;
                    }
                }
            }

            .video-content {
                margin-right: 0 !important;
            }
        }
    }

    .video-actions {
        button {
            width: 50px;
            height: 50px;
        }
    }

    svg {
        color: $black;
    }
}
</style>
