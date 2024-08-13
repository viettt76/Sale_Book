import Slider from 'react-slick';
import clsx from 'clsx';
import Book from '~/components/Book';
import styles from './GroupBooks.module.scss';

const GroupBooks = ({ title, groupBooks }) => {
    const slidesToShow = 5;
    const settings = {
        dots: true,
        adaptiveHeight: true,
        lazyLoad: 'ondemand',
        infinite: false,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div
            className={clsx(
                groupBooks?.length <= slidesToShow ? 'slick-track-number-of-slide-less-slides-to-show' : '',
                styles['wrapper'],
            )}
        >
            <h3 className={clsx(styles['title'])}>{title}</h3>
            <Slider {...settings}>
                {groupBooks?.map((book, index) => {
                    return (
                        <div key={`book-${index}`}>
                            <Book
                                bookId={book?.id}
                                img={book?.img}
                                name={book?.name}
                                authorId={book?.authorId}
                                imgAuthor={book?.imgAuthor}
                                nameAuthor={book?.nameAuthor}
                                time={book?.time}
                                price={book?.price}
                            />
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};

export default GroupBooks;
