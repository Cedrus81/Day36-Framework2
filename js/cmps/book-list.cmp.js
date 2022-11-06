export default {
    props: ['books'],
    template: `
        <ul class="book-list">
            <li class="book-preview"
             v-for="book in books"
             @click="selected(book)">
                <img :src="book.thumbnail" alt="" />
                <h2>{{book.title}}</h2>
            </li>
        </ul>
    `,
    methods: {
        selected(book) {
            this.$emit('selected', book)
        }
    }
}