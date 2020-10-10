<template>
    <div class="editor">
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
            <div class="menubar">
                <span v-for="actionName in activeButtons" :key="actionName">
                    <button
                        v-if="actionName === 'bold'"
                        class="menubar__button"
                        :class="{ 'is-active': isActive.bold() }"
                        @click="commands.bold"
                        type="button"
                    >
                        <icon name="bold" />
                    </button>
                    <button
                        v-if="actionName === 'italic'"
                        class="menubar__button"
                        :class="{ 'is-active': isActive.italic() }"
                        @click="commands.italic"
                        type="button"
                    >
                        <icon name="italic" />
                    </button>

                    <button
                        v-if="actionName === 'underline'"
                        class="menubar__button"
                        :class="{ 'is-active': isActive.underline() }"
                        @click="commands.underline"
                        type="button"
                    >
                        <icon name="underline" />
                    </button>

                    <button
                        v-if="actionName === 'bullet_list'"
                        class="menubar__button"
                        :class="{ 'is-active': isActive.bullet_list() }"
                        @click="commands.bullet_list"
                        type="button"
                    >
                        <icon name="ul" />
                    </button>
                    <button
                        v-if="actionName === 'link'"
                        class="menubar__button"
                        :class="{ 'is-active': isActive.link() }"
                        @click="commands.link"
                        type="button"
                        id="btn-tooltip-link"
                    >
                        <icon name="link" />
                    </button>
                    <b-tooltip target="btn-tooltip-link" triggers="hover">
                        Please select the text first.
                    </b-tooltip>
                </span>
            </div>
        </editor-menu-bar>
        <editor-menu-bubble class="menububble" @hide="hideLinkMenu" v-slot="{ commands, isActive, getMarkAttrs, menu }" :editor="editor">
            <div
                class="menububble"
                :class="{ 'is-active': menu.isActive }"
                :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
            >

                <form class="menububble__form" v-if="linkMenuIsActive" @submit.prevent="setLinkUrl(commands.link, linkUrl)">
                    <input class="menububble__input" type="text" v-model="linkUrl" placeholder="https://" ref="linkInput" @keydown.esc="hideLinkMenu"/>
                    <button class="menububble__button" @click="setLinkUrl(commands.link, null)" type="button">
                        <icon name="remove" />
                    </button>
                </form>

                <template v-else>
                    <button
                        class="menububble__button"
                        @click="showLinkMenu(getMarkAttrs('link'))"
                        :class="{ 'is-active': isActive.link() }"
                    >
                        <span class="menububble__text">{{ isActive.link() ? 'Update Link' : 'Add Link'}}</span>
                        <icon name="link_white" />
                    </button>
                </template>
            </div>
            
        </editor-menu-bubble>
        <editor-content class="editor__content" :editor="editor" />
    </div>
</template>

<script>
import Icon from './Icon'
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap'
import { BulletList, ListItem, Bold, Italic, Link, Underline } from 'tiptap-extensions'

export default {
    name: 'Editor',
    components: {
        EditorContent,
        EditorMenuBar,
        EditorMenuBubble,
        Icon,
    },
    props: {
        initialContent: {
            type: String,
            default: '<em>editable text</em>',
        },
        activeButtons: {
            type: Array,
            validator: function(list) {
                for (let el of list) {
                    if (
                        [
                            'bold',
                            'italic',
                            'underline',
                            'bullet_list',
                            'link',
                        ].indexOf(el) === -1
                    ) {
                        return -1
                    }
                }
                return 1
            },
            default: () => ['bold', 'italic'],
        },
    },
    data: () => ({
        html: '',
        json: '',
        editor: null,
        linkUrl: null,
        linkMenuIsActive: false,
    }),
    beforeDestroy() {
        this.editor.destroy()
    },
    created() {
        this.editor = new Editor({
            extensions: [
                new BulletList(),
                new ListItem(),
                new Link(),
                new Bold(),
                new Italic(),
                new Underline(),
            ],
            content: this.initialContent,
        }),
        this.html = this.editor.getHTML()
        this.json = this.editor.getJSON()

        this.editor.on('update', () => {
            this.html = this.editor.getHTML()
            this.json = this.editor.getJSON()
            this.$emit('update', this.html)
        })

        this.$parent.$on('clearEditor', this.clear)
    },
    methods: {
        clear() {
            this.editor.clearContent()
        },
        showLinkMenu(attrs) {
            this.linkUrl = attrs.href
            this.linkMenuIsActive = true
            this.$nextTick(() => {
                this.$refs.linkInput.focus()
            })
        },
        hideLinkMenu() {
            this.linkUrl = null
            this.linkMenuIsActive = false
        },
        setLinkUrl(command, url) {
            command({ href: url })
            this.hideLinkMenu()
        },
    },
}
</script>

<style lang="sass">
@import '@/assets/scss/vendor/tiptap/sass/main.scss'
</style>
