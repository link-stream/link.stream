<template>
    <div class="report-activity">
        <h5 class="activity-title">
            Subscribers activity for
            <a href="#">
                {{ 'alyssa@link.stream' }}
            </a>
        </h5>
        <div class="activity-container">
            <div v-for="(item, index) in activities" :key="index">
                <div class="date-title">
                    {{ item.date }}
                </div>
                <div
                    v-for="(activity, subIndex) in item.values"
                    :key="`activity-${subIndex}`"
                    class="activity-item"
                >
                    <b-row>
                        <b-col cols="4">
                            {{ activity.time }}
                        </b-col>
                        <b-col cols="8">
                            <span class="text-capitalize">
                                {{ activity.type }}
                            </span>
                            <span v-if="activity.type === 'click'">
                                :
                                <a :href="activity.link">
                                    {{ activity.link }}
                                </a>
                            </span>
                        </b-col>
                    </b-row>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ReportActivity',
    data: () => ({
        laoding: false,
        activities: [
            {
                date: '05/23/2020',
                values: [
                    {
                        time: '5:01pm',
                        type: 'open',
                    },
                    {
                        time: '5:01pm',
                        type: 'open',
                    },
                    {
                        time: '5:01pm',
                        type: 'open',
                    },
                    {
                        time: '5:01pm',
                        type: 'open',
                    },
                ],
            },
            {
                date: '05/24/2020',
                values: [
                    {
                        time: '6:32am',
                        type: 'open',
                    },
                    {
                        time: '6:32am',
                        type: 'open',
                    },
                    {
                        time: '6:32am',
                        type: 'open',
                    },
                    {
                        time: '6:32am',
                        type: 'click',
                        link:
                            'https://link.stream/producername/beats/track-title-1',
                    },
                    {
                        time: '6:32am',
                        type: 'open',
                    },
                ],
            },
        ],
    }),
}
</script>
