<template>
    <div class="page page-add-subscriber">
        <nav class="page-nav">
            <basic-button
                class="back-btn"
                variant="text"
                :to="{ name: 'subscribers' }"
            >
                <i class="ico ico-back"></i>
                <span>Subscribers</span>
            </basic-button>
        </nav>
        <header class="page-header">
            <div class="left-col">
                <h1 class="page-title">
                    Add a subscriber
                </h1>
                <div class="description">
                    Add an individual subscriber to your list. Need to add
                    several at once? Use our
                    <router-link
                        class="font-weight-bold"
                        :to="{
                            name: 'importSubscribers',
                        }"
                    >
                        Import
                    </router-link>
                    tool instead.
                </div>
            </div>
        </header>
        <main class="page-body">
            <b-row>
                <b-col cols="12" lg="8">
                    <b-form-group label="Name">
                        <b-form-input
                            v-model="$v.form.name.$model"
                            placeholder="Name"
                            :state="!$v.form.name.$error"
                        >
                        </b-form-input>
                        <b-form-invalid-feedback>
                            <template v-if="!$v.form.name.required">
                                Enter a name
                            </template>
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Email">
                        <b-form-input
                            type="email"
                            v-model="$v.form.email.$model"
                            placeholder="Email"
                            :state="!$v.form.email.$error"
                        >
                        </b-form-input>
                        <b-form-invalid-feedback>
                            <template v-if="!$v.form.email.required">
                                Enter an email
                            </template>
                            <template v-else-if="!$v.form.email.email">
                                Enter a valid email
                            </template>
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Birthday" class="birthday-group">
                        <b-form-input
                            v-model="$v.form.month.$model"
                            placeholder="MM"
                            :state="!$v.form.month.$error"
                            class="txt-month"
                        >
                        </b-form-input>
                        <span class="separator">/</span>
                        <b-form-input
                            v-model="$v.form.day.$model"
                            placeholder="DD"
                            :state="!$v.form.day.$error"
                            class="txt-day"
                        >
                        </b-form-input>
                    </b-form-group>
                    <b-form-group label="Phone">
                        <b-form-input
                            v-model="$v.form.phone.$model"
                            placeholder="Phone"
                            :state="!$v.form.phone.$error"
                        >
                        </b-form-input>
                        <b-form-invalid-feedback>
                            <template v-if="!$v.form.phone.required">
                                Enter a phone number
                            </template>
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Tags">
                        <b-form-input
                            v-model="$v.form.tags.$model"
                            placeholder="Add or create a tag"
                        >
                        </b-form-input>
                        <template v-slot:description>
                            <p class="mb-0 text-black">
                                tags can help you label this subscriber with how
                                they signed up to your list.
                            </p>
                            <p class="mb-0 text-black">
                                Example: "website" or "tradeshow"
                            </p>
                        </template>
                    </b-form-group>
                </b-col>
            </b-row>
            <div class="subscriber-description">
                <p class="font-weight-bold mb-0">
                    Only add subscribers that gave you permission.
                </p>
                Purchased email lists, co-registered subscribers and any other
                people who did not give you their permission directly can not be
                emailed with LinkStream.
            </div>
            <spinner-button :loading="saving" @click="handleAddClick">
                Add Subscriber
            </spinner-button>
        </main>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
export default {
    name: 'AddSubscriber',
    data: () => ({
        saving: false,
        form: {
            name: null,
            email: null,
            day: null,
            month: null,
            phone: null,
            tags: null,
        },
    }),
    computed: {
        ...mapGetters({
            user: 'me/user',
        }),
    },
    validations: {
        form: {
            name: {
                required,
            },
            email: {
                required,
                email,
            },
            phone: {
                required,
            },
            day: {
                required,
            },
            month: {
                required,
            },
            tags: {
                required,
            },
        },
    },
    created() {
        console.log(this.user)
    },
    methods: {
        async handleAddClick() {
            this.$v.form.$touch()
            if (this.$v.form.$invalid) {
                return
            }
            this.saving = true
            const params = {
                user_id: this.user.id,
                email: this.form.email,
                phone: this.form.phone,
                name: this.form.name,
                birthday: this.form.month + '/' + this.form.day,
                tags: this.form.tags,
            }
            const { status, message, error } = await this.$store.dispatch(
                'marketing/insertSubscriber',
                params
            )
            if (status === 'success') {
                this.$toast.success(message)
            } else {
                this.$toast.error(error)
            }
            this.saving = false
            this.$router.push({
                name: 'subscribers',
            })
        },
    },
}
</script>
