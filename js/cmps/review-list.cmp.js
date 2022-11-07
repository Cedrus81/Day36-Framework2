import { eventBus } from "../services/event-bus.service.js"


export default {
    props: ['reviews'],
    template: `
    <ul class="review-list">
        <h1>This book's reviews</h1>
        <li v-for="(review, idx) in reviews" class="review-card">
            <section class="review-header flex space-between">
            <h1>{{review.name}}</h1>
            <img class="delete-icon" src="../../icons/delete.png" alt="" @click="deleteReview(idx, review.name)" />
            </section>
            <h2>{{ getStars(review) }}</h2>
            <h4>{{review.reviewText}}</h4>
            <h5>Read at: {{review.date}}</h5>
        </li>
    </ul>
    `,
    methods: {
        getStars(review) {
            return '★'.repeat(review.rating)
        },
        deleteReview(idx, name) {
            this.$emit('reviewDeleted', idx)
            eventBus.emit("user-msg", { txt: `${name}'s review has been deleted`, type: 'success' });

        }
    }
}