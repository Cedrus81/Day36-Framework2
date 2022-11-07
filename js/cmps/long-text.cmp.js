export default {
    props: ['text', 'maxLength'],
    template: `
    <p>{{ displayTxt }}</p>
    <button class="read-more" 
    v-if="isTxtLong"
    @click="showFullText"
    >{{ buttonTxt }}</button>
    `,
    data() {
        return {
            isReadMore: false,
        }
    },
    methods: {
        showFullText() {
            this.isReadMore = !this.isReadMore
        },
    },
    computed: {
        displayTxt() {
            if (this.isReadMore || !this.isTxtLong) return this.text
            return this.text.slice(0, this.maxLength) + '...'
        },
        buttonTxt() {
            return this.isReadMore ? 'Less' : 'Read more'
        },
        isTxtLong() {
            return this.text.length > this.maxLength
        }
    },

}
