<template>
    <div class="Card SplitTestCard">
        <div class="item-body">
            <b-row>
                <b-col cols="12" sm="5" class="d-flex">
                    <div class="icon-container d-none d-sm-block">
                        <font-awesome-icon
                            v-if="type !== 'variation'"
                            :icon="['far', 'file-alt']"
                            class="h3"
                        />
                        <div v-else class="icon-char">
                            {{ String.fromCharCode(65 + index) }}
                        </div>
                    </div>
                    <div class="text-content">
                        <h4 class="item-title">
                            {{ page.title }}
                        </h4>
                        <small class="item-subtitle">
                            <span class="page-datetime">
                                {{ page.created_at | fullDateTime }}
                            </span>
                        </small>
                    </div>
                </b-col>
                <b-col cols="12" sm="3">
                    <div class="page-status" :class="page.status">
                        {{ page.status }}
                    </div>
                </b-col>
                <b-col cols="12" sm="4" v-if="type !== 'variation'">
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
        <div v-if="type === 'page'" class="action-page">
            <basic-button
                class="btn-use"
                variant="outline-black"
                size="md"
                @click="handleUseClick"
            >
                Use This Page
            </basic-button>
        </div>
        <div v-else class="action-other">
            <a href="#" @click.prevent="handleCopyClick" class="btn-copy">
                <font-awesome-icon
                    :icon="['far', 'copy']"
                    size="lg"
                />
            </a>
            <b-dropdown class="actions-menu" variant="icon" right no-caret>
                <template v-slot:button-content>
                    <Icon icon="dot-menu-h" />
                </template>
            </b-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SplitTestCard',
    props: {
        page: {
            type: Object,
            required: true,
        },
        type: {
            type: String,
            default: 'page'
        },
        index: {
            type: Number,
            default: 0,
        },
    },
    methods: {
        handleUseClick() {
            this.$emit('select-page', this.page)
        },
        handleCopyClick() {},
    },
}
</script>
