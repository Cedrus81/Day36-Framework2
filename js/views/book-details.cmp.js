import longText from '../cmps/long-text.cmp.js'
import addReview from '../cmps/add-review.cmp.js'
import reviewList from '../cmps/review-list.cmp.js'

import { bookService } from '../services/book-service.js';
import { eventBus } from "../services/event-bus.service.js"

export default {
    template: `
    <main class="book-details" >
        <div class="details-container flex wrap space-between alig" v-if="book">
            <div class="book-info flex column"> 
                <h1 class="book-title">{{ book.title }}</h1>
                <h1>// By {{formattedAuthors}}</h1>
                <h2>{{ setLevel }}</h2>
                <h2>{{ setAge }}</h2>

                <long-text 
                v-if="book.description" 
                :text="book.description"
                    :maxLength="100"
                    />

                <h2 :class="priceLevel">{{ formattedPrice }}</h2>
            </div>
            <img :src="book.thumbnail" alt="" />
            <add-review @reviewed="addReview" />
            <review-list 
            v-if="book.reviews"
            :reviews="book.reviews" 
            @reviewDeleted="reviewDeleted"/>
        </div>
    </main> `,
    data() {
        return {
            book: null,
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
        },
    },
    methods: {
        reviewDeleted(idx) {
            bookService.deleteReview(this.book.id, idx).then(book => {
                this.book = book
                eventBus.emit("user-msg", { txt: `${this.book.title}'s review has been deleted`, type: 'error' });
            })
        },
        addReview(review) {
            bookService.addReview(this.book.id, review).then(book => {
                this.book = book
                eventBus.emit("user-msg", { txt: `${this.book.title}'s review has been added`, type: 'success' });
            })
        }
    },
    components: {
        longText,
        addReview,
        reviewList
    },
}

