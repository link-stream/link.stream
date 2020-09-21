<template>
    <div class="review-match">
        <div class="column-status">
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
        <div class="column-status">
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
                                <span>
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
    </div>
</template>
<script>
export default {
    name: 'ReviewMatch',
    data: () => ({
        successCols: 4,
        errorCols: 1,
        realCols: [
            {
                value: 'email',
                text: 'Email Address',
            },
            {
                value: 'first_name',
                text: 'First Name',
            },
            {
                value: 'last_name',
                text: 'Last Name',
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
        colsData: [
            {
                title: 'Email Address',
                matchTitle: '',
                data: ['email1@example.com', 'email2@example2.com'],
            },
            {
                title: 'First Name',
                matchTitle: '',
                data: ['John', 'Jane'],
            },
            {
                title: 'Last Name',
                matchTitle: '',
                data: ['Doe', 'Doe'],
            },
            {
                title: 'Number',
                matchTitle: '',
                data: ['(555) 555-5555', '(555) 222-3333'],
            },
            {
                title: 'Birthday',
                matchTitle: '',
                data: ['08/03', '05/29'],
            },
        ],
    }),
    created() {
        this.checkMatch()
    },
    methods: {
        checkMatch() {
            const that = this
            this.colsData.forEach(item => {
                const findIndex = that.realCols.findIndex(
                    ({ text }) => text === item.title
                )
                if (findIndex !== -1) {
                    item.matchTitle = that.realCols[findIndex].text
                }
            })
        },
    },
}
</script>
