import { utilService } from './util-service.js'
import { storageService } from './async-storage.service.js'
import gBooks from '../../books.json' assert {type: 'json'}
import gNewBooks from '../../sample-call.json' assert {type: 'json'}
const API_KEY = 'AIzaSyD5Ji4oUkcS9YNeQ_nlEuTedQG6ZZVKsww'
const BOOKS_KEY = 'books'
const NEW_BOOKS_KEY = 'new'
_createBooks()
_loadNewBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    addReview,
    deleteReview,
    queryNewBooks,
    createListPrice
}

function query() {
    // return utilService.loadFromStorage(BOOKS_KEY)
    return storageService.query(BOOKS_KEY)
}

function queryNewBooks(title) {
    // return storageService.query(NEW_BOOKS_KEY)
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}+intitle:keyes&key=${API_KEY}`)
        .then(list => list.json())
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
        books = gBooks
        utilService.saveToStorage(BOOKS_KEY, books)

    }
}

function _loadNewBooks() {
    let newBooks = utilService.loadFromStorage(NEW_BOOKS_KEY)
    if (!newBooks || !newBooks.length) {
        newBooks = gNewBooks.items
        utilService.saveToStorage(NEW_BOOKS_KEY, newBooks)
    }
}


function addReview(bookId, review) {
    return get(bookId)
        .then(book => {
            if (!book.reviews) book.reviews = []
            book.reviews.push(review)
            return save(book)
        })
}

function deleteReview(bookId, idx) {
    return get(bookId)
        .then(book => {
            book.reviews.splice(idx, 1)
            return save(book)
        })
}


function createListPrice() {
    let number = utilService.getRandomInt(250, 1)
    return {
        amount: number,
        currencyCode: utilService.getRandomCurrency(),
        isOnSale: number % 2 === 0 ? true : false,
    }
} 