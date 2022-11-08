import { bookService } from '../services/book-service.js'

{/* <datalist v-if="newBooks" id="bookSearch">
            <option v-for="(book, index) in newBooks" 
            :value="{title: book.volumeInfo.title, id: book.id}"
            @click="newQuery"
            > Click the icon add this book to the list! </option>
            </datalist> */}
export default {
    template:/*html*/ `
        <div class="form-group input-box book-add-container">
            <input type="text"
            v-model="title"
            @input="newQuery"
            @click="toggleDropdown"
            required/>
            <span>Add a book!</span>
            <div class="dropdown-menu"  :class="dropdown" v-if="newBooks && title">
                <div class="dropdown-item" 
                v-for="(book, index) in newBooks" 
                @click="selectBook(book)"
                >{{ book.volumeInfo.title }}</div>
            </div>
        </div>
        <button @click="saveBook">Add!</button>
    `,
    data() {
        return {
            isDropDown: false,
            title: '',
            newBooks: null,
            selectedBook: null,
        }
    },
    methods: {
        toggleDropdown() {
            this.isDropDown = !this.isDropDown
        },
        newQuery() {
            bookService.queryNewBooks(this.title)
                .then(books => {
                    this.newBooks = books.items
                })
        },
        selectBook(book) {
            this.selectedBook = book
            this.title = book.volumeInfo.title
            this.toggleDropdown()
        },
        saveBook() {
            console.log('saving')
            const book = this.formatBook(this.selectedBook)
            if (book.id)
                bookService.save(book)
        },
        formatBook(book) {
            let { title, subtitle, authors, description, language, pageCount, categories, publishedDate, imageLinks } = book.volumeInfo
            publishedDate = +publishedDate.slice(0, 4)
            let thumbnail = imageLinks.thumbnail
            this.resetInput()
            return {
                title,
                subtitle,
                authors,
                description,
                language,
                pageCount,
                categories,
                publishedDate,
                thumbnail,
                listPrice: bookService.createListPrice()
            }
        },
        resetInput() {
            this.title = ''
            this.selectedBook = null
        },
    },
    computed: {
        dropdown() {
            return { active: this.isDropDown }
        },
    }
}