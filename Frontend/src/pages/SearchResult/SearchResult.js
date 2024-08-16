import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Book from '~/components/Book';
import { searchBookByNameOrAuthor } from '~/services/bookService';
import styles from './SearchResult.module.scss';
import Loading from '~/components/Loading';

const SearchResult = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get('keyword');
    const [loading, setLoading] = useState(false);

    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        const fetchSearchBookByNameOrAuthor = async () => {
            try {
                setLoading(true);
                const res = await searchBookByNameOrAuthor(keyword);
                console.log(res);
                setSearchResult(res?.data?.datas);
            } catch (error) {
                console.log(error);
                setSearchResult([]);
            } finally {
                setLoading(false);
            }
        };
        fetchSearchBookByNameOrAuthor();
    }, [keyword]);

    return (
        <>
            {loading ? (
                <Loading className="mt-3" />
            ) : searchResult?.length > 0 ? (
                <div className={clsx('d-flex flex-wrap container', styles['search-result-wrapper'])}>
                    {searchResult?.map((book) => {
                        return (
                            <div key={`book-${book?.id}`} className={clsx(styles['book-wrapper'])}>
                                <Book
                                    bookId={book?.id}
                                    img={book?.image}
                                    name={book?.title}
                                    nameAuthor={book?.author?.map((a) => a.fullName).join(', ')}
                                    price={book?.price}
                                    rated={book?.rate}
                                />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="fz-16 text-center mt-3">Không tìm thấy quyển sách nào</div>
            )}
        </>
    );
};

export default SearchResult;
