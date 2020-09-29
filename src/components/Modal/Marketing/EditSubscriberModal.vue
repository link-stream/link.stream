<template>
    <b-modal
        modal-class="EditSubscriberModal"
        centered
        v-model="open"
        size="lg"
    >
        <template v-slot:modal-header>
            <BasicButton variant="icon" class="modal-close" @click="close" />
            <h4 class="title">Edit Subscriber</h4>
        </template>
        <template v-slot:default>
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
            <b-form-row>
                <b-col cols="12" sm="6">
                    <b-form-group label="Birthday" class="birthday-group">
                        <b-input-group class="date-input-group">
                            <DatePicker
                                v-model="form.birthday"
                                :min-date="null"
                                :max-date="new Date()"
                            />
                        </b-input-group>
                    </b-form-group>
                </b-col>
                <b-col cols="12" sm="6">
                    <b-form-group label="Gender">
                        <BasicSelect
                            v-model="form.gender"
                            placeholder="Select Gender"
                            :options="genders"
                        />
                    </b-form-group>
                </b-col>
            </b-form-row>
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
            </b-form-group>
        </template>
        <template v-slot:modal-footer>
            <div class="right-col">
                <basic-button
                    class="action-btn cancel-btn text-black"
                    variant="link"
                    @click="close"
                >
                    Cancel
                </basic-button>
                <spinner-button
                    class="action-btn"
                    :loading="saving"
                    @click="handleUpdateClick"
                >
                    Update
                </spinner-button>
            </div>
        </template>
    </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import moment from 'moment'
export default {
    name: 'EditSubscriberModal',
    data: () => ({
        open: false,
        saving: false,
        form: {
            name: null,
            email: null,
            birthday: null,
            phone: null,
            gender: null,
            tags: [],
        },
        genders: ['', 'Male', 'Female'],
        tag: '',
    }),
    computed: {
        ...mapGetters({
            allTags: 'marketing/tags',
            subscriber: 'marketing/currentSubscriber',
        }),
    },
    watch: {
        subscriber(value) {
            console.log(value)
            this.form = {
                ...value,
                tags: value.tags
                    ? value.tags.split(',').map(tag => ({
                          text: tag.trim(),
                          value: tag.trim(),
                      }))
                    : [],
                birthday: value.birthday ? new Date(value.birthday) : null,
            }
        },
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
        this.$bus.$on('modal.editSubscriber.open', this.handleOpen)
        this.$bus.$on('modal.editSubscriber.close', this.handleClose)
    },
    methods: {
        close() {
            this.open = false
        },
        handleClose() {
            this.open = false
        },
        handleOpen() {
            this.open = true
        },
        async handleUpdateClick() {
            this.$v.form.$touch()
            if (this.$v.form.$invalid) {
                return
            }
            this.saving = true
            const params = {
                ...this.subscriber,
                email: this.form.email,
                phone: this.form.phone,
                name: this.form.name,
                birthday: this.form.birthday
                    ? moment(this.form.birthday).format('MM/DD/YYYY')
                    : '',
                tags: this.form.tags.map(({ text }) => text).join(','),
                gender: this.form.gender ? this.form.gender : '',
            }
            const { status, message, error } = await this.$store.dispatch(
                'marketing/updateSubscriber',
                {
                    id: this.subscriber.id,
                    params: params,
                }
            )
            status === 'success'
                ? this.$toast.success(message)
                : this.$toast.error(error)
            this.saving = false
            this.close()
        },
        handleTagsChange(tags) {
            this.form.tags = tags
        },
    },
}
</script>
