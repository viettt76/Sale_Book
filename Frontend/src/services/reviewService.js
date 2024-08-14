import axios from '~/utils/axios';

export const submitReviewService = ({ date, content, userId, rate, bookId }) => {
    return axios.post('/Reviews', {
        date,
        content,
        userId,
        rate,
        bookId,
    });
};
