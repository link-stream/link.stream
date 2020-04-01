<template>
    <fragment>
        <slot></slot>
        <b-modal id="modalbasic" ref="modalbasic" title="Upload Image" size="lg" hide-footer>
            <div class="wizard wizard-default">
                <FormWizard :top-nav-disabled="true">
                    <Tab name="Step 1" desc="Choose image" :selected="true">
                        <div class="wizard-basic-step m-4">
                            <FileDropify :key="banner" />
                        </div>
                    </Tab>
                    <Tab name="Step 2" desc="Crop image">
                        <div class="wizard-basic-step">
                            <p>Wizard Content 2</p>
                        </div>
                    </Tab>
                    <Tab name="Step 3" desc="Upload image">
                        <div class="wizard-basic-step">
                            <p>Wizard Content 3</p>
                        </div>
                    </Tab>
                    <Tab type="done">
                        <div class="wizard-basic-step text-center">
                            <h2 class="mb-2">Thank you</h2>
                            <p>Wizard Content 3</p>
                        </div>
                    </Tab>
                </FormWizard>
            </div>
            <template slot="modal-footer"></template>
        </b-modal>
    </fragment>
</template>

<script>
import { Tab, FormWizard } from '~/components/Form/Wizard'
import { FileDropify } from '~/components/Uploader'

export default {
    name: 'ImageUploader',
    components: {
        Tab,
        FormWizard,
        FileDropify,
    },
}
</script>