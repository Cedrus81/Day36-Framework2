const { createRouter, createWebHashHistory } = VueRouter
import bookApp from './views/book-app.cmp.js'
import homePage from './views/home-page.cmp.js'
import aboutPage from './views/about-page.cmp.js'
import bookDetails from './views/book-details.cmp.js'

const routerOptions = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: homePage
        },
        {
            path: '/about',
            component: aboutPage
        },
        {
            path: '/books',
            component: bookApp
        },
        {
            path: '/books/:id',
            component: bookDetails
        },
    ]
}
export const router = createRouter(routerOptions)

