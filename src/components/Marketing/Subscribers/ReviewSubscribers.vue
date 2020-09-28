<template>
    <div class="review-subscribers">
        <p>
            <span class="font-weight-bold">{{ importSubscribers.length }}</span>
            contacts will be added to your audience.
        </p>
        <br />
        <p>
            <span>
                - Imported from:
            </span>
            <span>
                {{ importData.importType }}
            </span>
        </p>
        <p>
            <span>
                - Email marketing status:
            </span>
            <span class="text-capitalize">
                {{ importData.emailStatus }}
            </span>
        </p>
        <footer class="page-footer">
            <basic-button
                variant="secondary"
                class="btn-prev"
                :disabled="saving"
                @click="handleCancelClick"
            >
                Cancel
            </basic-button>
            <spinner-button
                class="btn-next"
                :loading="saving"
                @click="handleImportClick"
            >
                Complete Import
            </spinner-button>
        </footer>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'ReviewSubscribers',
    data: () => ({
        saving: false,
    }),
    computed: {
        ...mapGetters({
            user: 'me/user',
            importSubscribers: 'marketing/importSubscribers',
            importData: 'marketing/importData',
        }),
    },
    methods: {
        async handleCancelClick() {
            await this.$store.dispatch('marketing/setImportSubscribers', {})
            this.$router.push({
                name: 'addSubscriber',
            })
        },
        async handleImportClick() {
            this.saving = true
            const params = {
                user_id: this.user.id,
                list: JSON.stringify(this.importSubscribers),
            }
            const { status, message, error } = await this.$store.dispatch(
                'marketing/importSubscribers',
                params
            )
            this.saving = false
            if (status === 'success') {
                this.$toast.success(message)
            } else {
                this.$toast.error(error)
            }
        },
    },
}
</script>
