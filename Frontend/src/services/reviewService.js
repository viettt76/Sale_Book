import axios from '~/utils/axios';

export const submitReviewService = ({ date, content, userId, rate, bookId }) => {
    return axios.post('/Review/create', {
        date,
        content,
        userId,
        rate,
        bookId,
    });
};
