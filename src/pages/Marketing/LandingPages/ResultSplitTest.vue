<template>
    <div class="page page-result-split-test">
        <nav class="page-nav">
            <basic-button
                class="back-btn"
                variant="text"
                :to="{ name: 'landingPages' }"
            >
                <i class="ico ico-back"></i>
                <span>Landing Pages</span>
            </basic-button>
        </nav>
        <header class="page-header">
            <div class="left-col">
                <h1 class="page-title">
                    Placeholder Split Test Title
                </h1>
                <div class="page-preview">
                    <span class="text-light">link.stream/</span>
                    <span>{{ user.user_name }}/placeholder-split-test-title</span>
                    <basic-button variant="outline-light" size="xs">
                        View
                    </basic-button>
                </div>
            </div>
            <div class="right-col">
                <div class="viz-toggle">
                    <span class="toggle-label">
                        {{ statusRunning ? 'Running' : 'Not Running' }}
                    </span>
                    <TogglerButton v-model="statusRunning" />
                </div>
            </div>
        </header>
        <main class="page-body">
            <div class="main-result">
                <h4 class="title">
                    <span class="font-weight-bold">Created:</span>
                    Sat, May 23, 2020 1:10 pm
                </h4>
                <b-row>
                    <b-col cols="6" md="3">
                        <div class="recipient-container">
                            <div class="recipient-status">
                                <h2 class="number">5</h2>
                                <p class="description">
                                    Total Visits
                                </p>
                            </div>
                        </div>
                    </b-col>
                    <b-col cols="6" md="3">
                        <div class="recipient-container">
                            <div class="recipient-status">
                                <h2 class="number">4</h2>
                                <p class="description">
                                    Unique Visits
                                </p>
                            </div>
                        </div>
                    </b-col>
                    <b-col cols="6" md="3">
                        <div class="recipient-container">
                            <div class="recipient-status">
                                <h2 class="number">0</h2>
                                <p class="description">
                                    Conversions
                                </p>
                            </div>
                        </div>
                    </b-col>
                    <b-col cols="6" md="3">
                        <div class="recipient-container">
                            <div class="recipient-status">
                                <h2 class="number">0%</h2>
                                <p class="description">
                                    Coonversion Rate
                                </p>
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </div>
            <div class="variation-performance">
                <h4 class="title">
                    Variation performance
                    <b-form-row>
                        <b-col>
                        </b-col>
                    </b-form-row>
                </h4>
            </div>
        </main>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'ResultSplitTest',
    data: () => ({
        statusRunning: true,
    }),
    computed: {
        ...mapGetters({
            user: 'me/user',
        }),
    },
    methods: {},
}
</script>
