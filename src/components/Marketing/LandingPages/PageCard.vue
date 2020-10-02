<template>
    <div class="Card PageCard">
        <div class="item-body">
            <b-row>
                <b-col cols="12" sm="6" class="d-flex">
                    <div class="icon-container d-none d-sm-block">
                        <font-awesome-icon
                            v-if="page.type === 'Split Test'"
                            :icon="['fas', 'vial']"
                            class="h3"
                        />
                        <font-awesome-icon
                            v-else-if="page.type === 'Page'"
                            :icon="['far', 'file-alt']"
                            class="h3"
                        />
                    </div>
                    <div class="text-content">
                        <h4 class="item-title">
                            {{ page.title }}
                        </h4>
                        <small class="item-subtitle">
                            <span class="message-type">
                                {{ page.type }}&nbsp;&middot;&nbsp;
                            </span>
                            <span class="message-datetime">
                                {{ page.created_at | fullDateTime }}
                            </span>
                        </small>
                    </div>
                </b-col>
                <b-col cols="12" sm="2">
                    <div class="page-status" :class="page.status">
                        {{ page.status }}
                    </div>
                </b-col>
                <b-col
                    v-if="page.type === 'Page' && page.status !== 'draft'"
                    cols="12"
                    sm="4"
                >
                    <b-row class="mx-0">
                        <b-col class="px-0">
                            <div class="number-value">
                                {{ page.conversion }}%
                            </div>
                            <div class="number-title">
                                Conversion Rate
                            </div>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </div>
        <BasicButton
            v-if="page.type === 'Split Test' || page.status === 'draft'"
            variant="icon"
            title="Edit"
            class="card-edit-btn"
            size="sm"
            @click="handleEditClick"
        />
        <b-dropdown v-else class="actions-menu" variant="icon" right no-caret>
            <template v-slot:button-content>
                <Icon icon="dot-menu-h" />
            </template>
            <b-dropdown-item @click="handleViewReportClick">
                View Report
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
export default {
    name: 'PageCard',
    props: {
        page: {
            type: Object,
            required: true,
        },
    },
    methods: {
        handleEditClick() {},
        handleViewReportClick() {
            this.$router.push({
                name: 'resultSplitTest',
            })
        },
    },
}
</script>
