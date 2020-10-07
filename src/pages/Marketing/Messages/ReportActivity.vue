<template>
    <div class="report-activity">
        <h5 class="activity-title">
            Subscribers activity for
            <a href="#">
                {{ message.reply_to }}
            </a>
        </h5>
        <div class="activity-container">
            <div v-for="(item, index) in dateActivities" :key="index">
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
                            <span v-if="activity.type.trim().toLowerCase() === 'click'">
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
    props: {
        message: {
            type: Object,
        },
        activities: {
            type: Object,
        },
    },
    computed: {
        dateActivities() {
            let temps = []
            for (const [key, value] of Object.entries(this.activities)) {
                temps.push({
                    value: key,
                    text: value,
                })
            }
            temps.sort((a, b) => (a.value > b.value ? 1 : -1))
            let newActivities = []
            let tempData = []
            let prevDate = ''
            temps.forEach(element => {
                const aryDateTime = element.value.split(' ')
                const curDate = aryDateTime[0]
                const curTime = aryDateTime[1]
                if (prevDate && curDate != prevDate )  {
                    newActivities.push({
                        date: prevDate,
                        values: [ ...tempData ],
                    })
                    tempData = Array()
                }
                prevDate = curDate
                const aryData = element.text.split(': ')
                console.log(aryData)
                tempData.push({
                    time: curTime,
                    type: aryData[0],
                    link: aryData.length == 2 ? aryData[1] : '', 
                })
            });
            newActivities.push({
                date: prevDate,
                values: [ ...tempData ],
            })
            console.log(newActivities)
            return newActivities
        }
    }
}
</script>
