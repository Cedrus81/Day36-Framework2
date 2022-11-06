export default {
    props: ['text'],
    template: `
    <p>{{shownText}}</p>
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
    created() {
        this.showButton = false
        this.cutText
    },
    computed: {

        cutText() {
            if (this.text.length > 100) {
                console.log(this.text.length)
                this.showButton = true
                this.shownText = this.text.substring(0, 100) + '...'
            }
            else this.shownText = this.text
            console.log(this.shownText)
        },
    },
    methods: {
        showFullText() {
            this.showButton = false
            this.shownText = this.text
        },
    }

}
