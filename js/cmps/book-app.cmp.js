import { bookService } from '../services/book-service.js'
import bookFilters from './book-filters.cmp.js'
import bookList from './book-list.cmp.js'
import bookDetails from './book-details.cmp.js'

export default {
    template: `
        <main>
        <div class="main-screen" 
        @click="isScreen = !isScreen" 
        :class="screenStyle">
        </div>

        <book-filters @filtered="setFilter" />
        
        <--! following v-if was put on comment to work with github -->
        <--! v-if="books" -->
        <book-list 
        :books="booksToShow" 
        @selected="selectBook" />
        
        <book-details 
        :class="screenStyle"
        :book="selectedBook" />
        </main>
        `,
    data() {
        return {
            isScreen: false,
            selectedBook: '',
            filters: { text: '', price: Infinity },
            books: null
        }
    },
    created() {
        this.books = bookService.query()
    },
    methods: {
        setFilter(newFilter) {
            this.filters = newFilter
        },
        selectBook(book) {
            this.selectedBook = book
            this.isScreen = true
        }
    },
    computed: {
        booksToShow() {
            const regex = new RegExp(this.filters.text, 'i')
            return this.books.filter(book => (book.listPrice.amount < this.filters.price && regex.test(book.title)))
        },
        screenStyle() {
            return { on: this.isScreen === true }
        },
    },
    components: {
        bookFilters,
        bookList,
        bookDetails
    }
}
