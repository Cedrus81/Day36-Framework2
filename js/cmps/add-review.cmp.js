
export default {
    template: `
    <form :onsubmit="saveReview">
        <h2>Leave a Review:</h2>
        <div class="rating">
            <img v-for="index in 5" :value="index"
            @click="setRating(index)"
            class="star"
            :src="isFilled(index)" alt="star" />
        </div>

        <div class="form-group input-box">
            <input type="text"
            v-model="name"
            required/>
            <span>Your name</span>
        </div>
        <div class="form-group input-box">
            <input type="date"
            v-model="date" 
            required/>
            <span>Read at:</span>
        </div>

        <div class="form-group input-box">
            <textarea v-model="reviewText" cols="30" rows="10" placeholder="Tell us what you think!" required></textarea>
        </div>
        <button>Submit!</button>
    </form>
    `,
    data() {
        return {
            name: null,
            date: null,
            rating: 5,
            reviewText: '',

        }
    },
    methods: {
        saveReview(e) {
            e.preventDefault();
            const review = {
                name: this.name,
                date: this.date,
                rating: this.rating,
                reviewText: this.reviewText,
            }
            console.log(review)
            this.$emit('reviewed', review)
            this.resetForm()
        },
        resetForm() {
            this.name = null
            this.date = null
            this.rating = 5
            this.reviewText = ''
        },
        setRating(index) {
            this.rating = index;
            console.log(this.rating);
        },
        isFilled(index) {
            return index > this.rating ? '../../icons/star.png' : '../../icons/star-filled.png'
        }
    }
}
