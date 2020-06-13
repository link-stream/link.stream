export const collabsProfitFormMixin = {
    methods: {
        handleCollabRemoveClick(index) {
            const { collabs } = this.form
            collabs.splice(index, 1)
            const subCollabs = collabs.slice(1)
            const subCollabsTotalProfit = subCollabs.reduce((acc, collab) => {
                return acc + Number(collab.profit)
            }, 0)
            const subCollabsTotalPublishing = subCollabs.reduce(
                (acc, collab) => {
                    return acc + Number(collab.publishing)
                },
                0
            )
            const mainCollab = collabs[0]
            mainCollab.profit = 100 - subCollabsTotalProfit
            mainCollab.publishing = 100 - subCollabsTotalPublishing
        },
        handleCollabAdd(user) {
            const { collabs } = this.form
            const alreadyAdded = collabs.find(c => c.user.id == user.id)
            if (alreadyAdded) {
                return
            }
            collabs.push({
                user,
                profit: 0,
                publishing: 0,
            })
        },
        handleCollabProfitInput(changedCollab, evt) {
            const { collabs } = this.form
            const subCollabs = collabs.slice(1)
            const mainCollab = collabs[0]
            let newValue = Number(evt.target.value)
            newValue = isNaN(newValue) ? 0 : Math.abs(newValue)

            const subCollabsNewTotal = subCollabs.reduce((acc, collab) => {
                return collab.user.id == changedCollab.user.id
                    ? acc + newValue
                    : acc + Number(collab.profit)
            }, 0)

            if (subCollabsNewTotal > 100) {
                changedCollab.profit = 0
                this.$toast.error(
                    'Main collaborator profit share cannot be less than 0%.'
                )
            } else {
                changedCollab.profit = newValue || ''
            }

            const subCollabsTotal = subCollabs.reduce((acc, collab) => {
                return acc + Number(collab.profit)
            }, 0)

            mainCollab.profit = 100 - subCollabsTotal
        },
        handleCollabPublishingInput(changedCollab, evt) {
            const { collabs } = this.form
            const subCollabs = collabs.slice(1)
            const mainCollab = collabs[0]
            let newValue = Number(evt.target.value)
            newValue = isNaN(newValue) ? 0 : Math.abs(newValue)

            const subCollabsNewTotal = subCollabs.reduce((acc, collab) => {
                return collab.user.id == changedCollab.user.id
                    ? acc + newValue
                    : acc + Number(collab.publishing)
            }, 0)

            if (subCollabsNewTotal > 100) {
                changedCollab.publishing = 0
                this.$toast.error(
                    'Main collaborator publishing share cannot be less than 0%.'
                )
            } else {
                changedCollab.publishing = newValue || ''
            }

            const subCollabsTotal = subCollabs.reduce((acc, collab) => {
                return acc + Number(collab.publishing)
            }, 0)

            mainCollab.publishing = 100 - subCollabsTotal
        },
    },
}
