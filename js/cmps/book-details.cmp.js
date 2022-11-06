import longText from './long-text.cmp.js'

export default {
    props: ['book'],
    template: `
    <div class="modal flex column align-center">
        <img :src="book.thumbnail" alt="" />
        <h1>{{ book.title }} // By {{formattedAuthors}}</h1>
        <h2>{{ setLevel }}</h2>
        <h2>{{ setAge }}</h2>
        <p>
            <long-text 
            v-if="book.description" 
            :text="book.description"/>
        </p>
        <h2 :class="priceLevel">{{ formattedPrice }}</h2>
    </div>`,
    computed: {
        formattedAuthors() {
            if (this.book.authors) {
                return this.book.authors.join(', ')

            }
        },
        setLevel() {
            if (this.book.level > 500) return 'Long Reading'
            return this.book.level > 200 ? 'Short Reading' : 'Decent Reading'
        },
        setAge() {
            const age = new Date().getFullYear() - this.book.publishedDate
            if (age > 10) return 'Veteran Book'
            if (age < 1) return 'New in store!'
        },
        formattedPrice() {
            if (this.book.listPrice) {
                let price = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: this.book.listPrice.currencyCode,
                })
                return price.format(this.book.listPrice.amount)
            }
        },
        priceLevel() {
            if (this.book.listPrice)
                return { expensive: this.book.listPrice.amount > 150, cheap: this.book.listPrice.amount < 20 }
        }
    },
    components: {
        longText
    }
}
