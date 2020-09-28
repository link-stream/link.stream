<template>
    <div class="review-match">
        <div class="column-status" v-if="successCols > 0">
            <font-awesome-icon
                class="success-icon"
                :icon="['fas', 'check-circle']"
            />
            <span class="text">
                <span class="font-weight-bold">
                    {{ successCols }}
                </span>
                columns successfully imported
            </span>
        </div>
        <div class="column-status" v-if="errorCols > 0">
            <font-awesome-icon
                class="error-icon"
                :icon="['fas', 'exclamation-circle']"
            />
            <span class="text">
                <span class="font-weight-bold">
                    {{ errorCols }}
                </span>
                column not be imported. Scroll through columns to review and
                match.
            </span>
        </div>
        <div class="Card MatchCard">
            <div class="item-body">
                <div
                    v-for="(data, index) in colsData"
                    :key="`col-${index}`"
                    class="one-column"
                    :class="{
                        error: !data.matchTitle,
                    }"
                >
                    <b-form-group>
                        <template v-slot:label>
                            <div class="custom-label">
                                <span class="text-capitalize">
                                    {{ data.title }}
                                </span>
                                <font-awesome-icon
                                    v-if="!data.matchTitle"
                                    class="error-icon"
                                    :icon="['fas', 'exclamation-circle']"
                                />
                            </div>
                        </template>
                        <BasicSelect
                            v-model="data.matchTitle"
                            :options="realCols"
                            placeholder="Select a label to match"
                            :reduce="col => col.value"
                            label="text"
                            @input="fixSubscribers(data)"
                        />
                    </b-form-group>
                    <div
                        v-for="(item, subIndex) in data.data"
                        :key="`item-${subIndex}`"
                        class="data-item"
                    >
                        {{ item }}
                    </div>
                </div>
            </div>
        </div>
        <footer class="page-footer">
            <spinner-button class="btn-next" @click="handleNextClick">
                Next
            </spinner-button>
        </footer>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'ReviewMatch',
    data: () => ({
        realCols: [
            {
                value: 'email',
                text: 'Email',
            },
            {
                value: 'name',
                text: 'Name',
            },
            {
                value: 'phone',
                text: 'Phone',
            },
            {
                value: 'birthday',
                text: 'Birthday',
            },
            {
                value: 'tags',
                text: 'Tags',
            },
        ],
        colsData: [],
    }),
    computed: {
        ...mapGetters({
            importSubscribers: 'marketing/importSubscribers',
            importData: 'marketing/importData',
        }),
        successCols() {
            return this.colsData.filter(({ matchTitle }) => !!matchTitle).length
        },
        errorCols() {
            return this.colsData.filter(({ matchTitle }) => !matchTitle).length
        },
    },
    created() {
        this.checkMatch()
    },
    methods: {
        checkMatch() {
            const that = this
            this.colsData = []
            this.importSubscribers.forEach(item => {
                for (const [key, value] of Object.entries(item)) {
                    const findIndex = that.colsData.findIndex(({ title }) => title.toLowerCase() === key.toLowerCase())
                    if (findIndex > -1) {
                        that.colsData[findIndex].data.push(value)
                    } else {
                        const findRealIndex = that.realCols.findIndex(
                            ({ value }) => value === key.toLowerCase()
                        )
                        that.colsData.push({
                            title: key,
                            matchTitle: findRealIndex > -1 ? that.realCols[findRealIndex].value : '',
                            data: [value],
                        })
                    }
                }
            })
        },
        fixSubscribers(data) {
            if (!data.matchTitle) {
                this.$toast.error('Please select the correct column!')
                return
            }
            const matchedColumn = this.colsData.filter(({ matchTitle }) => matchTitle === data.matchTitle)
            if (matchedColumn && matchedColumn.length > 1) {
                this.$toast.error('The current column already exist. please select another column!')
                return
            }
        },
        async handleNextClick() {
            if (this.errorCols > 0 ) {
                this.$toast.error('Please fix the mismatched columns!')
                return
            }
            let fixedSubscribers = []
            this.colsData.forEach((item, index) => {
                if (index === 0) {
                    for(let k = 0; k < item.data.length; k++) {
                        fixedSubscribers.push({})
                    }
                }
                item.data.forEach((value, subIndex) => {
                    fixedSubscribers[subIndex][item.matchTitle] = value
                })
            })
            const subscribers = fixedSubscribers.map(item => {
                return {
                    ...item,
                    email_status: this.importData.emailStatus,
                    sms_status: this.importData.smsStatus,
                }
            })
            await this.$store.dispatch(
                'marketing/setImportSubscribers',
                subscribers
            )
            this.$emit('next')
        },
    },
}
</script>
