<template>
    <div class="review-subscribers">
        <p>
            <span class="font-weight-bold">{{ cntContacts }}</span>
            contacts will be added to your "Hydro Kitty" audience.
        </p>
        <br />
        <p>
            <span>
                - Imported from:
            </span>
            <span>
                {{ result.type === 'file' ? 'File upload' : 'Spreadsheet' }}
            </span>
        </p>
        <p>
            <span>
                - Email marketing status:
            </span>
            <span class="text-capitalize">
                {{ result.status }}
            </span>
        </p>
        <p>
            <span>
                - Update existing contacts:
            </span>
            <span class="text-capitalize">
                {{ result.updated }}
            </span>
        </p>
        <p>
            <span>
                - Tagged:
            </span>
            <span class="tetx-capitalize">
                {{ result.tagged }}
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
        cntContacts: 4,
        result: {
            type: 'file',
            status: 'subscribed',
            updated: 'no',
            tagged: 'none',
        },
        saving: false,
    }),
    computed: {
        ...mapGetters({
            user: 'me/user',
            importSubscribers: 'marketing/importSubscribers',
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
            const params = {
                user_id: this.user.id,
                list: JSON.stringify(this.importSubscribers)
            }
            const { status, message, error } = await this.$store.dispatch('marketing/importSubscribers', params)
            if (status === 'success') {
                this.$toast.success(message)
            } else {
                this.$toast.error(error)
            }
        }
    }
}
</script>
