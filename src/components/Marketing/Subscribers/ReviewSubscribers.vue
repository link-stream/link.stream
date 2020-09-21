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
    </div>
</template>
<script>
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
    }),
}
</script>
