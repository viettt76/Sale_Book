import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Book from '../Book';
import styles from './SearchByCategory.module.scss';
import { getBookPagingService } from '~/services/bookService';
import { getAllGenresService } from '~/services/genreService';
import { Pagination } from 'react-bootstrap';

const SearchByCategory = () => {
    const componentRef = useRef(null);
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        const fetchGetGenres = async () => {
            try {
                const res = await getAllGenresService();
                setGenres(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchGetGenres();
    }, []);

    const [bookList, setBookList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState(bookList);

    useEffect(() => {
        const fetchGetAllBook = async () => {
            try {
                const res = await getBookPagingService({
                    pageNumber: currentPage,
                    pageSize: 8,
                    genres: selectedCategories,
                });
                if (res?.data?.datas) {
                    setTotalPages(res.data?.totalPage);
                    if (!isFirstLoad && componentRef.current) {
                        const componentTop = componentRef.current.getBoundingClientRect().top + window.scrollY;
                        window.scrollTo({
                            top: componentTop - 90,
                            behavior: 'smooth',
                        });
                    }
                    const data = res.data.datas;
                    const clone = data?.map((book) => {
                        return {
                            id: book?.id,
                            name: book?.title,
                            genres: book?.bookGroupId,
                            price: book?.price,
                            description: book?.description,
                            publicationDate: book?.publishedAt,
                            totalPageNumber: book?.totalPageNumber,
                            rated: book?.rate,
                            remaining: book?.remaining,
                            image: book?.image,
                            authors: book?.author?.map((a) => a?.fullName).join(', '),
                        };
                    });
                    setBookList(clone);
                    setFilteredBooks(clone);

                    setIsFirstLoad(false);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchGetAllBook();
    }, [currentPage]);

    const handleCheckboxChange = (genresId) => {
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(genresId)
                ? prevSelected.filter((id) => id !== genresId)
                : [...prevSelected, genresId],
        );
    };

    const handleSearch = () => {
        // const data =
        //     selectedCategories?.length > 0
        //         ? bookList.filter((book) => selectedCategories.some((genresId) => genresId === book.genres))
        //         : bookList;
        // setFilteredBooks(data);
        // setCurrentPage(1);
        // setTotalPages(Math.ceil(data?.length / 8));
    };

    const handleChangePage = (i) => {
        setCurrentPage(i);
    };

    return (
        <div ref={componentRef} className={clsx(styles['search-container'])}>
            <div className={clsx(styles['category-selector'])}>
                <h3>Chọn thể loại:</h3>
                {genres?.map((genre) => (
                    <div key={genre.id} className="mb-2">
                        <input
                            type="checkbox"
                            id={`category-${genre.id}`}
                            checked={selectedCategories.includes(genre.id)}
                            onChange={() => handleCheckboxChange(genre.id)}
                            className="me-1"
                        />
                        <label htmlFor={`category-${genre.id}`}>{genre.name}</label>
                    </div>
                ))}
                <button className="btn btn-primary fz-16 mt-1" onClick={handleSearch}>
                    Tìm Kiếm
                </button>
            </div>
            <div className={clsx(styles['book-list-wrapper'])}>
                <h2>Danh Sách Sách</h2>
                <ul className={clsx(styles['book-list'])}>
                    {filteredBooks?.map((book) => (
                        <div key={book.id} className={clsx(styles['book'])}>
                            <Book
                                bookId={book.id}
                                img={book.image}
                                name={book.name}
                                nameAuthor={book.authors}
                                price={book.price}
                                rated={book?.rated}
                            />
                        </div>
                    ))}
                </ul>
                <Pagination className="d-flex justify-content-center">
                    {Array.from({ length: totalPages }, (_, i) => (i = i + 1))?.map((i) => {
                        return (
                            <Pagination.Item
                                key={i}
                                className={clsx(styles['page-number'])}
                                active={i === currentPage}
                                onClick={() => handleChangePage(i)}
                            >
                                {i}
                            </Pagination.Item>
                        );
                    })}
                </Pagination>
            </div>
        </div>
    );
};

export default SearchByCategory;
