export default {
    props: ['text'],
    template: `
    <p>{{ cutText }}</p>
    <button class="read-more" 
    v-if="showButton"
    @click="showFullText"
    >Read more</button>
    `,
    data() {
        return {
            showButton: false,
            shownText: ''
        }
    },
    computed: {
        cutText() {
            if (this.text.length > 100) {
                this.showButton = true
                this.shownText = this.text.slice(0, 100) + '...'
            }
            else this.shownText = this.text
            return shownText
        },
        showFullText() {
            this.showButton = false
            this.shownText = this.text
        },

    }
}
