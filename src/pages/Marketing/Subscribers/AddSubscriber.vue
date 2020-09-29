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
                        <b-input-group class="date-input-group">
                            <DatePicker
                                v-model="form.birthday"
                                :min-date="null"
                                :max-date="new Date()"
                            />
                        </b-input-group>
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
                        <TaggerInput
                            v-model="tag"
                            :tags="form.tags"
                            :allTags="allTags"
                            @tags-changed="handleTagsChange"
                        />
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
import moment from 'moment'
export default {
    name: 'AddSubscriber',
    data: () => ({
        saving: false,
        form: {
            name: null,
            email: null,
            birthday: null,
            phone: null,
            tags: [],
        },
        genders: ['', 'Male', 'Female'],
        tag: '',
        tags: '',
    }),
    computed: {
        ...mapGetters({
            user: 'me/user',
            allTags: 'marketing/tags',
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
            tags: {
                required,
            },
        },
    },
    async created() {
        await this.$store.dispatch('marketing/getTags')
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
                birthday: this.form.birthday ? moment(this.form.birthday).format('MM/DD/YYYY') : '',
                tags: this.form.tags.map(({ text }) => text).join(','),
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
        handleTagsChange(tags) {
            this.form.tags = tags
        },
    },
}
</script>
