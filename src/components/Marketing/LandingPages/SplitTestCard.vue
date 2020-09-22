<template>
    <div class="Card SplitTestCard">
        <div class="item-body">
            <b-row>
                <b-col cols="12" sm="5" class="d-flex">
                    <div class="icon-container d-none d-sm-block">
                        <font-awesome-icon
                            :icon="['far', 'file-alt']"
                            class="h3"
                        />
                    </div>
                    <div class="text-content">
                        <h4 class="item-title">
                            {{ page.title }}
                        </h4>
                        <small class="item-subtitle">
                            <span class="message-datetime">
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
                <b-col cols="12" sm="4">
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
        <basic-button
            class="btn-use"
            variant="outline-black"
            size="md"
            @click="handleUseClick"
        >
            Use This Page
        </basic-button>
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
    },
    methods: {
        handleEditClick() {},
        handleUseClick() {},
    },
}
</script>
