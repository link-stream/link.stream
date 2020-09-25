<template>
    <VueTagsInput
        class="TaggerInput"
        v-model="tag"
        :separators="[';', ',']"
        :add-on-key="[13, ',', ';']"
        :placeholder="tags.length ? '' : 'Tags'"
        :tags="tags"
        @tags-changed="handleTagsChange"
        :autocomplete-items="filteredItems"
    />
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input'

export default {
    name: 'TaggerInput',
    components: {
        VueTagsInput,
    },
    props: {
        value: {
            type: String,
            required: true,
        },
        tags: {
            type: Array,
            default: () => [],
        },
        allTags: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            tag: this.value,
        }
    },
    computed: {
        filteredItems() {
            return this.allTags.filter(i => {
                return (
                    i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1
                )
            })
        },
    },
    methods: {
        handleTagsChange(value) {
            this.$emit('tags-changed', value)
        },
    },
}
</script>
