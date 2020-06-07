<template>
    <div class="Card InfoCard">
        <div class="Card-title">
            Beat Details
        </div>
        <div class="Card-body">
            <b-form-group label="Title">
                <b-form-input placeholder="Enter a title"></b-form-input>
                <b-form-invalid-feedback>
                    Title can't be blank
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Primary Genre">
                <LsSelect
                    v-model="form.genre"
                    placeholder="Select Genre"
                    :options="[]"
                    :reduce="genre => genre"
                    label="genre"
                />
            </b-form-group>
            <b-form-group label="Tags(3)">
                <VueTagsInput v-model="tag" />
            </b-form-group>
            <b-form-row>
                <b-col md="6">
                    <b-form-group label="BPM">
                        <b-form-input
                            type="number"
                            v-model="form.bpm"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group label="Key">
                        <LsSelect
                            v-model="form.key"
                            placeholder="Select"
                            :options="[]"
                            :reduce="key => key"
                            label="name"
                        />
                    </b-form-group>
                </b-col>
            </b-form-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InfoCard',
    data() {
        return {
            tag: '',
            form: {},
        }
    },
}
</script>