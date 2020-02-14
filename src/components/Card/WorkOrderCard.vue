<template>
    <div class="card work-order-card my-3">
        <div class="card-body text-center p-4">
            <h3 class="card-title">{{ order.name }}</h3>
            <div class="card-subtitle m-4 text-muted">{{ order.description }}</div>
            <div class="card-text m-4">
                <div class="d-flex" v-if="worker">
                    <div class="p-2 flex-shrink-1">
                        <img :src="worker.image" class="worker-image img-fluid rounded-circle" />
                    </div>
                    <div class="p-2 w-100 text-left d-flex flex-column justify-content-center">
                        <p class="font-weight-bold mb-1">{{ worker.name }}</p>
                        <p class="mb-1">{{ worker.companyName }}</p>
                        <p class="mb-1">{{ worker.email }}</p>
                    </div>
                </div>
                <loading-indicator :loading="!worker"></loading-indicator>
            </div>
            <div class="card-text text-right">{{ (order.deadline * 1000) | customizeDate('L LT') }}</div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { LoadingIndicator } from '~/components/Loading'

export default {
    name: 'WorkOrderCard',
    components: {
        LoadingIndicator,
    },
    props: {
        order: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters({ getWorker: 'workers/worker' }),
        worker() {
            const { workerId } = this.order
            const worker = this.getWorker(workerId)
            if (worker) {
                return worker
            } else {
                this.$store.dispatch('workers/loadWorderDetails', { workerId })
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.work-order-card {
    flex: 1;
    @include border-radius(3px);
}
</style>
