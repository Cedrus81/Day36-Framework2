export default {
    template: /*html*/`
    <div class="filters-container">
            <h2>Search Filters:</h2>

            <div class="form-group input-box">
                <input type="text"
                @input="filter"
                v-model="newFilter.text"
                required/>
                <span>Title</span>
            </div>
            <div class="form-group input-box">
                <input type="number"
                @input="filter"
                v-model="newFilter.price" 
                required/>
                <span>Price</span>
            </div>
        </div>
        `,
    data() {
        return {
            newFilter: { text: '', price: Infinity }
        }
    },
    methods: {
        filter() {
            this.newFilter.price = this.newFilter.price || Infinity;
            this.$emit('filtered', { text: this.newFilter.text, price: this.newFilter.price })
        }
    }
}