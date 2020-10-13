<template>
    <div class="main-info" v-if="profile">
        <b-row class="m-0">
            <b-col cols="12" class="profile-images-container p-0">
                <div
                    class="banner-container"
                    ref="banner-container"
                    v-resize="onResize"
                >
                    <div class="banner">
                        <img :src="profile.data_banner" />
                    </div>
                </div>
                <div class="avatar-container">
                    <div class="avatar-box">
                        <img
                            v-if="profile.data_image"
                            :src="profile.data_image"
                        />
                        <vue-letter-avatar
                            v-else
                            :name="profile.display_name"
                            size="180"
                            :rounded="true"
                        />
                    </div>
                    <img class="avata-badge" src="@/assets/img/ico/badge.svg" />
                </div>
            </b-col>
        </b-row>
        <b-container class="position-relative">
            <b-row>
                <b-col cols="12" class="action-bar">
                    <basic-button class="d-none d-md-block">
                        Follow
                    </basic-button>
                    <b-dropdown
                        class="actions-menu"
                        variant="icon"
                        right
                        no-caret
                    >
                        <template v-slot:button-content>
                            <Icon icon="dot-menu-v-p" class="mx-3" />
                        </template>
                        <b-dropdown-item>
                            Unfollow
                        </b-dropdown-item>
                        <b-dropdown-item>
                            Copy Artist Link
                        </b-dropdown-item>
                        <b-dropdown-item>
                            Save
                        </b-dropdown-item>
                    </b-dropdown>
                </b-col>
            </b-row>

            <div class="profile-content">
                <b-row>
                    <b-col cols="12" class="profile-info">
                        <h2 class="section-title">
                            {{ profile.display_name }}
                        </h2>
                        <div class="section-subtitle">
                            <span class="mr-3">
                                <span class="font-weight-bold">
                                    {{ profile.followers | thousandNumber }}
                                </span>
                                <span class="ml-1">Followers</span>
                            </span>
                            <span class="mr-3">
                                <span class="font-weight-bold">
                                    {{ profile.plays | thousandNumber }}
                                </span>
                                <span class="ml-1">Plays</span>
                            </span>
                            <span>
                                <span class="font-weight-bold">
                                    {{ profile.beats | thousandNumber }}
                                </span>
                                <span class="ml-1">Beats</span>
                            </span>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="d-md-none btn-follow">
                    <b-col cols="12">
                        <basic-button size="md">
                            Follow
                        </basic-button>
                    </b-col>
                </b-row>
            </div>
        </b-container>
    </div>
</template>
<script>
import resize from 'vue-resize-directive'
import { appConstants } from '~/constants'
import { mapGetters } from 'vuex'
export default {
    name: 'MainInfo',
    directives: {
        resize,
    },
    computed: {
        ...mapGetters({
            profile: 'profile/profile',
        }),
    },
    data: () => ({}),
    methods: {
        // Resize
        onResize() {
            let rate = appConstants.user.publicProfileBannerAspectRatio
            let curWidth = this.$refs['banner-container'].clientWidth
            if (curWidth < 768 && curWidth > 576) {
                rate *= 1.2
            } else if (curWidth <= 576) {
                rate *= 1.4
            }
            this.$refs['banner-container'].style.height = rate * curWidth + 'px'
        },
    },
}
</script>
