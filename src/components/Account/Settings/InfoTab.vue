<template>
    <div class="tab InfoTab">
        <h2 class="section-title">Account Info</h2>
        <div class="tab-body">
            <b-form class="main-info">
                <b-form-group label="Username">
                    <b-form-input
                        v-model="$v.form.user_name.$model"
                        placeholder="Username"
                        :state="!$v.form.user_name.$error"
                    ></b-form-input>
                    <b-form-invalid-feedback>
                        <template v-if="!$v.form.user_name.required">
                            Enter a user name.
                        </template>
                        <template v-else-if="!$v.form.user_name.minLength">
                            The user name must have at least 5 letters.
                        </template>
                        <template v-else-if="!$v.form.user_name.uniqueUsername">
                            The user name exists, pick a new one.
                        </template>
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Display Name">
                    <b-form-input
                        v-model="$v.form.display_name.$model"
                        placeholder="Display Name"
                        :state="!$v.form.display_name.$error"
                    ></b-form-input>
                    <b-form-invalid-feedback>
                        <template v-if="!$v.form.display_name.required">
                            Enter a display name.
                        </template>
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Email">
                    <b-form-input
                        v-model="$v.form.email.$model"
                        type="email"
                        placeholder="Email"
                        :state="!$v.form.email.$error"
                    ></b-form-input>
                    <b-form-invalid-feedback>
                        <template v-if="!$v.form.email.required">
                            Enter a email.
                        </template>
                        <template v-else-if="!$v.form.email.email">
                            Enter a vaild email.
                        </template>
                        <template v-else-if="!$v.form.email.uniqueEmail">
                            The current email exists, pick a new one.
                        </template>
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Country">
                    <BasicSelect
                        v-model="form.country"
                        :options="allCountries"
                        :reduce="country => country.code"
                        label="country"
                    />
                </b-form-group>
                <b-form-group label="Time Zone">
                    <BasicSelect
                        v-model="form.timezone"
                        :options="timezones"
                        :reduce="timezone => timezone.id"
                        label="zone"
                        placeholder="Select Time Zone"
                    />
                </b-form-group>
                <b-form-group label="Current Password">
                    <b-form-input
                        v-model="form.current_password"
                        placeholder="Current Password"
                        autocomplete="new-password"
                        type="password"
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="New Password">
                    <b-form-input
                        v-model="$v.form.password.$model"
                        placeholder="New Password"
                        type="password"
                        :state="!$v.form.password.$error"
                    ></b-form-input>
                    <b-form-invalid-feedback>
                        <template v-if="!$v.form.password.required">
                            Enter a password.
                        </template>
                        <template v-else-if="!$v.form.password.minLength">
                            Password must have at least 8 letters.
                        </template>
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Confirm Password">
                    <b-form-input
                        v-model="$v.form.confirm_password.$model"
                        placeholder="Confirm Password"
                        type="password"
                        :state="!$v.form.confirm_password.$error"
                    ></b-form-input>
                    <b-form-invalid-feedback>
                        <template
                            v-if="!$v.form.confirm_password.sameAsPassword"
                        >
                            Password must be identical.
                        </template>
                    </b-form-invalid-feedback>
                </b-form-group>
            </b-form>
            <h2 class="section-title">Connected Accounts</h2>
            <div class="social-accounts border-top">
                <ul>
                    <li class="list-item list-item-fb">
                        <i class="fab fa-facebook"></i>
                        <span class="username">
                            {{ social.facebook || 'Facebook' }}
                        </span>
                        <IconButton
                            v-if="social.facebook"
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
                    <li class="list-item">
                        <img src="@/assets/img/ico/social-soundcloud.svg" />
                        <span class="username">
                            {{ social.soundcloud || 'SoundCloud' }}
                        </span>
                        <IconButton
                            v-if="social.soundcloud"
                            icon="trash-sm"
                            class="disconnect-btn"
                            @click="handleSoundcloudDisconnect"
                        />
                        <basic-button
                            v-else
                            variant="link"
                            class="connect-btn"
                            @click="handleSoundcloudConnect"
                        >
                            Connect
                        </basic-button>
                    </li>
                </ul>
            </div>
            <footer class="page-footer border-top">
                <basic-button
                    class="cancel-btn"
                    variant="secondary"
                    size="md"
                    :disabled="saving"
                    @click="handleCancelClick"
                >
                    Cancel
                </basic-button>
                <spinner-button
                    size="md"
                    :loading="saving"
                    @click="handleSaveClick"
                    class="float-right d-none d-md-block"
                >
                    Save Changes
                </spinner-button>
                <spinner-button
                    size="md"
                    :loading="saving"
                    @click="handleSaveClick"
                    class="float-right d-md-none"
                >
                    Save
                </spinner-button>
            </footer>
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { appConstants } from '~/constants'
import { mapGetters } from 'vuex'
import {
    required,
    requiredIf,
    email,
    minLength,
    sameAs,
} from 'vuelidate/lib/validators'
import { api } from '~/services'
const iso3311a2 = require('iso-3166-1-alpha-2')

firebase.initializeApp(appConstants.firebaseConfig)
const fbProvider = new firebase.auth.FacebookAuthProvider()
const twitterProvider = new firebase.auth.TwitterAuthProvider()

export default {
    name: 'InfoTab',
    data() {
        return {
            form: {
                user_name: '',
                display_name: '',
                email: '',
                timezone: '',
                country: '',
                current_password: '',
                password: '',
                confirm_password: '',
                facebook: '',
                twitter: '',
            },
            social: {
                facebook: false,
                twitter: false,
                instagram: false,
                soundcloud: false,
            },
            saving: false,
            allCountries: [],
        }
    },
    computed: {
        ...mapGetters({
            userInfo: 'me/user',
            timezones: 'common/timezones',
        }),
    },
    validations: {
        form: {
            user_name: {
                required,
                minLength: minLength(5),
                uniqueUsername(value) {
                    return (
                        value === this.userInfo.user_name ||
                        this.availabilityValidator('username', value)
                    )
                },
            },
            display_name: {
                required,
            },
            email: {
                required,
                email,
                uniqueEmail(value) {
                    return (
                        value === this.userInfo.email ||
                        this.availabilityValidator('email', value)
                    )
                },
            },
            password: {
                required: requiredIf(function() {
                    return this.form.current_password
                }),
                minLength: minLength(8),
            },
            confirm_password: {
                sameAsPassword: sameAs('password'),
            },
        },
    },
    async created() {
        this.resetForm()
        await this.$store.dispatch('common/loadTimezones')
        this.getAllCountries()
    },
    methods: {
        getAllCountries() {
            this.allCountries = []
            const countries = iso3311a2.getData()
            for (const [key, value] of Object.entries(countries)) {
                this.allCountries.push({
                    code: key,
                    country: value,
                })
            }
        },
        async availabilityValidator(field, value) {
            if (!value) {
                return true
            }
            const { status } = await api.users.getAvailability({
                type: field,
                value,
            })
            return status === 'success'
        },
        handleFbConnect() {
            firebase
                .auth()
                .signInWithPopup(fbProvider)
                .then(({ credential, user }) => {
                    this.social.facebook = user.displayName
                    this.$alert.ok(
                        `<strong>Access token:</strong> ${credential.accessToken}`,
                        { title: 'Connected!' }
                    )
                    this.form.facebook = credential.accessToken
                })
                .catch(() => {
                    this.$alert.oops()
                })
        },
        handleFbDisconnect() {
            this.social.facebook = false
            this.form.facebook = ''
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
                    this.form.twitter = `${credential.accessToken}@${credential.secret}`
                })
                .catch(() => {
                    this.$alert.oops()
                })
        },
        handleTwitterDisconnect() {
            this.social.twitter = false
            this.form.twitter = ''
        },
        handleSoundcloudConnect() {},
        handleSoundcloudDisconnect() {
            this.social.soundcloud = false
        },
        async handleSaveClick() {
            this.$v.form.$touch()
            if (this.$v.form.$invalid) {
                return
            }
            this.saving = true
            const {
                user_name,
                display_name,
                email,
                timezone,
                country,
                current_password,
                password,
                facebook,
                twitter,
            } = this.form
            const params = {
                user_name,
                display_name,
                email,
                timezone,
                country,
                current_password,
                password,
                facebook,
                twitter,
            }
            const { status, error } = await this.$store.dispatch(
                'me/updateUser',
                {
                    id: this.userInfo.id,
                    params,
                }
            )
            if (status === 'success') {
                this.$toast.success(
                    'Your account has been updated successfully.'
                )
            } else {
                this.$toast.error(error)
            }
            this.form.password = ''
            this.form.current_password = ''
            this.form.confirm_password = ''
            this.saving = false
        },
        handleCancelClick() {
            this.resetForm()
        },
        async resetForm() {
            this.form = {
                ...this.userInfo,
                current_password: '',
                password: '',
                confirm_password: '',
            }
            this.social.facebook = false
            if (this.userInfo.facebook) {
                this.social.facebook = 'Connecting...'
                let facebook_credential = await firebase.auth.FacebookAuthProvider.credential(
                    this.userInfo.facebook
                )
                await firebase
                    .auth()
                    .signInWithCredential(facebook_credential)
                    .then(({ user }) => {
                        this.social.facebook = user.displayName
                    })
                    .catch(error => {
                        this.social.facebook = 'Failed'
                        console.log('error', error)
                    })
            }
            this.social.twitter = false
            if (this.userInfo.twitter) {
                this.social.twitter = 'Connecting'
                let credential_info = this.userInfo.twitter.split('@')
                let twitter_credential = await firebase.auth.TwitterAuthProvider.credential(
                    credential_info[0],
                    credential_info[1]
                )
                await firebase
                    .auth()
                    .signInWithCredential(twitter_credential)
                    .then(({ user }) => {
                        this.social.twitter = user.displayName
                    })
                    .catch(error => {
                        this.social.twitter = 'Failed'
                        console.log('error', error)
                    })
            }
        },
    },
}
</script>
