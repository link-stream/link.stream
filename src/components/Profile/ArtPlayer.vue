<template>
    <b-container class="art-player">
        <div class="player-progress">
            <div class="current-progress" style="width:30%"></div>
        </div>
        <div class="player-container">
            <div class="img-thumb">
                <img :src="curItem.img" />
            </div>
            <div class="control-container">
                <div class="art-info">
                    <div class="title">
                        {{ curItem.title }}
                    </div>
                    <div class="art-user">
                        {{ curItem.username }}
                    </div>
                </div>
                <div class="center-control d-none d-md-block">
                    <IconButton 
                        class="btn-back"
                        icon="player-back"
                    />
                    <IconButton 
                        class="btn-pause"
                        icon="player-pause"
                    />
                    <IconButton 
                        class="btn-next"
                        icon="player-next"
                    />
                </div>
                <div class="right-control">
                    <IconButton 
                        class="btn-volume d-none d-md-block"
                        icon="volume"
                    />
                    <b-dropdown class="actions-menu" variant="icon" dropleft no-caret>
                        <template v-slot:button-content>
                            <Icon icon="dot-menu-v-w" />
                        </template>
                    </b-dropdown>
                    <IconButton 
                        class="btn-pause d-md-none"
                        icon="player-pause"
                    />
                </div>
            </div>
        </div>
    </b-container>
</template>
<script>
import { appConstants } from '~/constants'
export default {
    name: 'ArtPlayer',
    data: () => ({
        curItem: {
            img: appConstants.defaultCoverArt,
            title: 'Beat Title',
            username: 'producername', 
        },
    })
}
</script>