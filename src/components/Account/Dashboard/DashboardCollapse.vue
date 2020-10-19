<template>
    <div>
        <b-card no-body class="DashboardCardCollapse">
            <b-list-group flush>
                <b-list-group-item class="group-item">
                    <b-card class="card-item" v-if="visible_card1" @click="handleCard1">
                        <b-card-title class="d-flex align-items-center card-title">
                            <b-img v-if="beat" src="@/assets/img/ico/check-circle-solid.svg"></b-img>
                            <h3 class="ml-2">Add your first beat</h3>
                        </b-card-title>
                        <b-card-text :class="[!beat ? cardText2 : cardText]">
                            Get started selling your sound by adding a beat to
                            your store!
                        </b-card-text>
                        <font-awesome-icon
                            :icon="['fas', 'chevron-down']"
                            class="chevron-down"
                            v-if="!beat"
                        />
                    </b-card>
                    <b-card no-body class="hidden-card" v-else>
                        <div class="d-md-flex">
                            <div>
                                <b-card-title class="card-title">Add your first beat</b-card-title>
                                <b-card-text class="card-text">
                                    Get started selling your sound by adding a
                                    beat to your store!
                                </b-card-text>
                                <basic-button
                                    class="btn-card"
                                    :to="{ name: 'accountBeatAdd' }"
                                >Add a Beat</basic-button>
                            </div>
                            <b-img fluid class="img-card" src="@/assets/img/dashboard/addBeat.jpg" />
                        </div>
                    </b-card>
                </b-list-group-item>
                <b-list-group-item class="group-item">
                    <b-card class="card-item" v-if="visible_card2" @click="handleCard2">
                        <b-card-title class="d-flex align-items-center card-title">
                            <b-img v-if="store" src="@/assets/img/ico/check-circle-solid.svg"></b-img>
                            <h3 class="ml-2">Customize your store</h3>
                        </b-card-title>
                        <b-card-text :class="[!store ? cardText2 : cardText]">
                            Change the appearance of your store, update profile
                            image, etc.
                        </b-card-text>
                        <font-awesome-icon
                            :icon="['fas', 'chevron-down']"
                            class="chevron-down"
                            v-if="!store"
                        />
                    </b-card>
                    <b-card no-body class="hidden-card" v-else>
                        <div class="d-md-flex">
                            <div>
                                <b-card-title class="card-title">Customize your store</b-card-title>
                                <b-card-text class="card-text">
                                    Change the appearance of your store, update
                                    profile image and let everyone know more
                                    about you and your music.
                                </b-card-text>
                                <basic-button
                                    class="btn-card"
                                    :to="{ name: 'accountProfileEdit' }"
                                >Customize Store</basic-button>
                            </div>
                            <b-img
                                fluid
                                class="img-card mt-2"
                                src="@/assets/img/dashboard/customize.jpg"
                            />
                        </div>
                    </b-card>
                </b-list-group-item>
                <b-list-group-item class="group-item">
                    <b-card class="card-item" v-if="visible_card3" @click="handleCard3">
                        <b-card-title class="d-flex align-items-center card-title">
                            <b-img v-if="campaign" src="@/assets/img/ico/check-circle-solid.svg"></b-img>
                            <h3 class="ml-2">Market your music</h3>
                        </b-card-title>
                        <b-card-text
                            :class="[!campaign ? cardText2 : cardText]"
                        >Get the word out with marketing tools</b-card-text>
                        <font-awesome-icon
                            :icon="['fas', 'chevron-down']"
                            class="chevron-down"
                            v-if="!campaign"
                        />
                    </b-card>
                    <b-card no-body class="hidden-card" v-else>
                        <div class="d-md-flex">
                            <div>
                                <b-card-title class="card-title">Market your music</b-card-title>
                                <b-card-text class="card-text">
                                    Change the appearance of your store, update
                                    profile image and let everyone know more
                                    about you.
                                </b-card-text>
                                <basic-button
                                    class="btn-card"
                                    :to="{ name: 'marketingMessages' }"
                                >Start a Campaign</basic-button>
                            </div>
                            <b-img fluid class="img-card" src="@/assets/img/dashboard/market.jpg" />
                        </div>
                    </b-card>
                </b-list-group-item>
            </b-list-group>
        </b-card>
    </div>
</template>

<script>
export default {
    name: 'DashboardCollapse',
    props: {
        beat: {
            type: Boolean,
        },
        store: {
            type: Boolean,
        },
        campaign: {
            type: Boolean,
        },
    },
    data() {
        return {
            visible_card1: true,
            visible_card2: true,
            visible_card3: true,
            cardText2: 'card-text2',
            cardText: 'card-text',
        }
    },
    methods: {
        handleCard1() {
            if (!this.beat) {
                this.visible_card1 = false
                this.visible_card2 = true
                this.visible_card3 = true
            }
        },
        handleCard2() {
            if (!this.store) {
                this.visible_card1 = true
                this.visible_card2 = false
                this.visible_card3 = true
            }
        },
        handleCard3() {
            if (!this.campaign) {
                this.visible_card1 = true
                this.visible_card2 = true
                this.visible_card3 = false
            }
        },
    },
}
</script>
