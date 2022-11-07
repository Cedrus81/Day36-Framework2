import longText from '../cmps/long-text.cmp.js'
import { bookService } from '../services/book-service.js';
export default {
    template: `
    <section v-if="book" class="modal on flex column align-center">
        <img :src="book.thumbnail" alt="" />
        <h1>{{ book.title }} // By {{formattedAuthors}}</h1>
        <h2>{{ setLevel }}</h2>
        <h2>{{ setAge }}</h2>
        <p>
            <long-text 
            v-if="book.description" 
            :text="book.description"
            :maxLength="100"
            />
        </p>
        <h2 :class="priceLevel">{{ formattedPrice }}</h2>
    </section>`,
    data() {
        return {
            book: null
        }
    },
    created() {
        bookService.get(this.$route.params.id)
            .then(book => this.book = book)
    },
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
                let price = new Intl.NumberFormat('en-IN', {
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
