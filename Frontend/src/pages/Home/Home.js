import clsx from 'clsx';
import GroupBooks from '~/components/GroupBooks';
import styles from './Home.module.scss';
import SearchByCategory from '~/components/SearchByCategory';
import { useEffect, useState } from 'react';
import { getBookPagingService } from '~/services/bookService';

const Home = () => {
    const [groupBooks, setGroupBooks] = useState([]);

    useEffect(() => {
        const fetchGetBookMostReviews = async () => {
            try {
                const getTotalCount = await getBookPagingService({ pageNumber: 1, pageSize: 1, sortBy: 'rate' });
                const totalCount = getTotalCount?.data?.totalCount;
                const res = await getBookPagingService({ pageNumber: 1, pageSize: totalCount, sortBy: 'rate' });
                setGroupBooks(
                    res?.data?.datas
                        ?.slice(-15)
                        .reverse()
                        ?.map((book) => {
                            return {
                                id: book?.id,
                                img: book?.image,
                                name: book?.title,
                                nameAuthor: book?.author?.map((a) => a.fullName).join(', '),
                                price: book?.price,
                                rated: book?.rate,
                            };
                        }),
                );
            } catch (error) {
                console.log(error);
            }
        };
        fetchGetBookMostReviews();
    }, []);
    return (
        <div className={clsx('container', styles['home-wrapper'])}>
            <GroupBooks className={clsx(styles['group-books'])} title="Sách nổi bật" groupBooks={groupBooks} />
            <SearchByCategory />
        </div>
    );
};

export default Home;
