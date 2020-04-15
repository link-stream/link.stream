<template>
    <div class="page page-ua-links container-fluid">
        <header class="page__header">
            <h1 class="page__title">Your links</h1>
            <h4 class="page__subtitle">Add, remove, edit &amp; order links anyway you'd like.</h4>
        </header>
        <nav class="page__nav">
            <div class="page__nav__left">
                <span class="preview-url">
                    <span class="preview-url__light">link.stream/</span>
                    {{ user.user_name }}/links
                </span>
                <preview-pill-button
                    :to="{ name: 'userLinks', params: { username: user.user_name }}"
                >Preview</preview-pill-button>
            </div>
            <div class="page__nav__right">
                <basic-button :to="{ name: 'userAccountLinksAdd' }">Add New Link</basic-button>
            </div>
        </nav>
        <main class="page__body"></main>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { BasicButton, PreviewPillButton } from '~/components/Button'

export default {
    name: 'UserAccountLinks',
    components: {
        BasicButton,
        PreviewPillButton,
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
        }),
    },
}
</script>