const { createApp } = Vue
const { createRouter, createWebHashHistory } = VueRouter

import bookApp from './views/book-app.cmp.js'
import appHeader from './cmps/app-header.js'
import homePage from './views/home-page.cmp.js'
import aboutPage from './views/about-page.cmp.js'
import bookDetails from './views/book-details.cmp.js'

const options = {
    template: `<app-header />
    <router-view />
    `,
    components: {
        bookApp,
        appHeader
    }
}

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
        // {
        //     path: '/books/edit/:id?',
        //     component: bookEdit
        // },
    ]
}

const app = createApp(options)
const router = createRouter(routerOptions)
app.use(router)
app.mount('#app')