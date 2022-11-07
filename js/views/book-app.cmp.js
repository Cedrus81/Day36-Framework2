import { bookService } from '../services/book-service.js'
import { eventBus } from '../services/event-bus.service.js'


import bookFilters from '../cmps/book-filters.cmp.js'
import bookList from '../cmps/book-list.cmp.js'
// import bookDetails from './book-details.cmp.js'

export default {
    template: `
        <main>

        <book-filters @filtered="setFilter" />

        <book-list
        v-if="books"
        :books="booksToShow" 
        @selected="selectBook" />
        </main>
        `,
    data() {
        return {
            selectedBook: '',
            filterBy: null,
            books: null
        }
    },
    created() {
        bookService.query()
            .then(books => {
                this.books = books
            })
    },
    methods: {
        setFilter(newFilter) {
            this.filterBy = newFilter
        },
        selectBook(book) {
            this.selectedBook = book
            // this.isScreen = true
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books
            const regex = new RegExp(this.filterBy.text, 'i')
            return this.books.filter(book => (book.listPrice.amount < this.filterBy.price && regex.test(book.title)))
        },
        // screenStyle() {
        //     return { on: this.isScreen === true }
        // },
    },
    components: {
        bookFilters,
        bookList,
    }
}
