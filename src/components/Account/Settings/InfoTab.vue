<template>
    <div class="tab InfoTab">
        <h2 class="section-title">Account Info</h2>
        <div class="tab-body">
            <form>
                <b-form-group label="Username">
                    <b-form-input
                        v-model="form.username"
                        placeholder="Username"
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="Display Name">
                    <b-form-input
                        v-model="form.display_name"
                        placeholder="Display Name"
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="Email">
                    <b-form-input
                        v-model="form.email"
                        type="email"
                        placeholder="Email"
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="Time Zone">
                    <BasicSelect placeholder="Select Time Zone" />
                </b-form-group>
                <b-form-group label="Current Password">
                    <b-form-input
                        v-model="form.currentPassword"
                        placeholder="Current Password"
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="New Password">
                    <b-form-input
                        v-model="form.newPassword"
                        placeholder="New Password"
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="Confirm Password">
                    <b-form-input
                        v-model="form.confirmPassword"
                        placeholder="Confirm Password"
                    ></b-form-input>
                </b-form-group>
            </form>
            <h2 class="section-title">Connected Accounts</h2>
            <div class="social-accounts">
                <ul>
                    <li class="list-item list-item-fb">
                        <i class="fab fa-facebook"></i>
                        <span class="username">
                            {{ social.fb || 'Facebook' }}
                        </span>
                        <IconButton
                            v-if="social.fb"
                            icon="trash-sm"
                            class="disconnect-btn"
                            @click="handleFbDisconnect"
                        />
                        <basic-button
                            v-else
                            variant="link"
                            class="connect-btn"
                            @click="handleFbConnect"
                        >
                            Connect
                        </basic-button>
                    </li>
                    <li class="list-item list-item-twitter">
                        <i class="fab fa-twitter"></i>
                        <span class="username">
                            {{ social.twitter || 'Twitter' }}
                        </span>
                        <IconButton
                            v-if="social.twitter"
                            icon="trash-sm"
                            class="disconnect-btn"
                            @click="handleTwitterDisconnect"
                        />
                        <basic-button
                            v-else
                            variant="link"
                            class="connect-btn"
                            @click="handleTwitterConnect"
                        >
                            Connect
                        </basic-button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import { appConstants } from '~/constants'

firebase.initializeApp(appConstants.firebaseConfig)
const fbProvider = new firebase.auth.FacebookAuthProvider()
const twitterProvider = new firebase.auth.TwitterAuthProvider()

export default {
    name: 'InfoTab',
    data() {
        return {
            form: {},
            social: {
                fb: false,
                twitter: false,
            },
        }
    },
    methods: {
        handleFbConnect() {
            firebase
                .auth()
                .signInWithPopup(fbProvider)
                .then(({ credential, user }) => {
                    this.social.fb = user.displayName
                    this.$alert.ok(
                        `<strong>Access token:</strong> ${credential.accessToken}`,
                        { title: 'Connected!' }
                    )
                })
                .catch(() => {
                    this.$alert.oops()
                })
        },
        handleFbDisconnect() {
            this.social.fb = false
        },
        handleTwitterConnect() {
            firebase
                .auth()
                .signInWithPopup(twitterProvider)
                .then(({ credential, user }) => {
                    this.social.twitter = user.displayName
                    this.$alert.ok(
                        `<strong>Access token:</strong> ${credential.accessToken}`,
                        { title: 'Connected!' }
                    )
                })
                .catch(() => {
                    this.$alert.oops()
                })
        },
        handleTwitterDisconnect() {
            this.social.twitter = false
        },
    },
}
</script>
