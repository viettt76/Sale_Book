import { useEffect, useState } from 'react';
import clsx from 'clsx';
import avatar from '~/assets/imgs/avatar-default.png';
import Book from '../Book';
import styles from './SearchByCategory.module.scss';
import { getGenresService } from '~/services/bookService';

const SearchByCategory = () => {
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        const fetchGetGenres = async () => {
            try {
                const res = await getGenresService();
                setGenres(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchGetGenres();
    }, []);

    const bookList = [
        {
            id: 'abc',
            name: 'The Great Gatsby',
            genres: [1],
            price: '$10.99',
            description: 'A classic novel of the Roaring Twenties.',
            publicationDate: 'April 10, 1925',
            totalPageNumber: '180',
            rated: '4.5/5',
            remaining: '20',
            image: avatar,
        },
        {
            id: 'def',
            name: 'The Gôd',
            genres: [2],
            price: '$10.99',
            description: 'A classic novel of the Roaring Twenties.',
            publicationDate: 'April 10, 1925',
            totalPageNumber: '180',
            rated: '4.5/5',
            remaining: '20',
            image: avatar,
        },
        {
            id: 'a',
            name: 'A',
            genres: [4],
            price: '$10.99',
            description: 'A classic novel of the Roaring Twenties.',
            publicationDate: 'April 10, 1925',
            totalPageNumber: '180',
            rated: '4.5/5',
            remaining: '20',
            image: avatar,
        },
        {
            id: 'b',
            name: 'B',
            genres: [1, 2],
            price: '$10.99',
            description: 'A classic novel of the Roaring Twenties.',
            publicationDate: 'April 10, 1925',
            totalPageNumber: '180',
            rated: '4.5/5',
            remaining: '20',
            image: avatar,
        },
        {
            id: 'c',
            name: 'AC',
            genres: [1, 3],
            price: '$10.99',
            description: 'A classic novel of the Roaring Twenties.',
            publicationDate: 'April 10, 1925',
            totalPageNumber: '180',
            rated: '4.5/5',
            remaining: '20',
            image: avatar,
        },
        {
            id: 'd',
            name: 'D',
            genres: [2, 3, 4],
            price: '$10.99',
            description: 'A classic novel of the Roaring Twenties.',
            publicationDate: 'April 10, 1925',
            totalPageNumber: '180',
            rated: '4.5/5',
            remaining: '20',
            image: avatar,
        },
    ];

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState(bookList);

    const handleCheckboxChange = (genresId) => {
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(genresId)
                ? prevSelected.filter((id) => id !== genresId)
                : [...prevSelected, genresId],
        );
    };

    const handleSearch = () => {
        setFilteredBooks(
            bookList.filter((book) => selectedCategories.every((genresId) => book.genres.includes(genresId))),
        );
    };

    return (
        <div className={clsx(styles['search-container'])}>
            <div className={clsx(styles['category-selector'])}>
                <h3>Chọn thể loại:</h3>
                {genres.map((genre) => (
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
                    {filteredBooks.map((book) => (
                        <div key={book.id} className={clsx(styles['book'])}>
                            <Book
                                bookId={book.id}
                                img={book.image}
                                name={book.name}
                                authorId={book.authorId}
                                imgAuthor={book.imgAuthor}
                                nameAuthor={book.nameAuthor}
                                time={book.time}
                                price={book.price}
                            />
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchByCategory;
