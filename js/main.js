const { createApp } = Vue
import { router } from './routes.js'

import appHeader from './cmps/app-header.js'
import userMsg from './cmps/user-msg.cmp.js'

const options = {
    template: `<app-header />

    <router-view />
    <user-msg />
    `,
    components: {
        appHeader,
        userMsg,
    }
}



const app = createApp(options)
app.use(router)
app.mount('#app')