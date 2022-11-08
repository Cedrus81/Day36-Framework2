import addBook from '../cmps/book-add.cmp.js'


addBook


export default {
    template: /*html*/`
    <header class="full">
        <nav class="flex wrap space-between">
            <div class="logo flex wrap align-center">
                <h1>Señora-Libros</h1>
                <img class="header-icon" src="./icons/book.png" alt="">
            </div>
            <div class="nav-links flex wrap align-center">
                <router-link to="/">Home</router-link>
                <router-link to="/books">Books</router-link>
                <router-link to="/about">About</router-link>
            </div>
        </nav>
    </header>
    `
}

