import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Book from '~/components/Book';
import { searchBookByNameOrAuthor } from '~/services/bookService';
import styles from './SearchResult.module.scss';

const SearchResult = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get('keyword');

    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        const fetchSearchBookByNameOrAuthor = async () => {
            try {
                const res = await searchBookByNameOrAuthor(keyword);
                setSearchResult(res?.data?.datas);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSearchBookByNameOrAuthor();
    }, [keyword]);

    return (
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
    );
};

export default SearchResult;
