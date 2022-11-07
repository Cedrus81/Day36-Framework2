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
}

function query() {
    // return utilService.loadFromStorage(BOOKS_KEY)
    return storageService.query(BOOKS_KEY)
}

function get(bookId) {
    return storageService.get(BOOKS_KEY, carId)
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
    // return books
}
///
// function _createBook() {
//     const car = {
//         id: utilService.makeId(),
//         vendor,
//         maxSpeed,
//     }
//     return car
// }
