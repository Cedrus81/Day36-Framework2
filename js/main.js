const { createApp } = Vue
import bookApp from './cmps/book-app.cmp.js'
import appHeader from './cmps/app-header.js'
const options = {
    template: `<app-header />
    <book-app />
    `,
    components: {
        bookApp,
        appHeader
    }
}


createApp(options)
    .mount('#app')