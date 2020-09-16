<template>
    <div class="page page-edit-message">
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
                    Add an individual subscriber to your list. Need to add several at once? Use our
                    <a href="#" class="font-weight-bold">
                        Import
                    </a>
                    tool instead.
                </div>
            </div>
        </header>
        <main class="page-body">
            <b-form-group label="Name">
                <b-form-input v-model="form.name">
                </b-form-input>
            </b-form-group>
            <b-form-group label="Email">
                <b-form-input type="email" v-model="form.email">
                </b-form-input>
            </b-form-group>
            
            <spinner-button
                :loading="saving"
                @click="handleAddClick"
            >
                Add Subscriber
            </spinner-button>
        </main>
    </div>
</template>
<script>
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
        }
    }),
    methods: {
        async handleAddClick() {},
    },
}
</script>
