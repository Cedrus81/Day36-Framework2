import { utilService } from './util-service.js'
import { storageService } from './async-storage.service.js'

const BOOKS_KEY = 'books'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    addReview,
    deleteReview
}

function query() {
    // return utilService.loadFromStorage(BOOKS_KEY)
    return storageService.query(BOOKS_KEY)
}

function get(bookId) {
    return storageService.get(BOOKS_KEY, bookId)
}

function remove(bookId) {
    // const books = query()
    // const idx = books.findIndex(book => book.id === bookId)
    // books.splice(idx, 1)
    // utilService.saveToStorage(BOOKS_KEY, books)
    return storageService.remove(BOOKS_KEY)
}

function save(book) {
    // book.id = utilService.makeId()
    // const books = query()
    // books.push(book)
    // utilService.saveToStorage(BOOKS_KEY, books)
    // return book
    if (book.id) {
        return storageService.put(BOOKS_KEY, book)
    } else {
        return storageService.post(BOOKS_KEY, book)
    }
}

function getEmptyBook() {
    return { id: '', name: '', price: 0 }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOKS_KEY)
    if (!books || !books.length) {
        fetch('../books.json')
            .catch(console.log)
            .then(res => res.json())
            .then(res => {
                books = res
                utilService.saveToStorage(BOOKS_KEY, books)
            })
    }
}

function addReview(bookId, review) {
    get(bookId)
        .then(book => {
            if (!book.reviews) book.reviews = []
            book.reviews.push(review)
            save(book)
        })
}

function deleteReview(book, idx) {
    book.reviews.splice(idx, 1)
    save(book)
}