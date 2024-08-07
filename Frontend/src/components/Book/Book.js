import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './Book.module.scss';
import { formatPrice } from '~/utils/commonUtils';

const Book = ({ bookId, img, name, authorId, imgAuthor, nameAuthor, time, price }) => {
    console.log(price);
    return (
        <div className={clsx(styles['wrapper'])}>
            <img className={clsx(styles['img'])} src={img} alt={name} />
            <p className={clsx(styles['name'])}>{name}</p>
            <div className={clsx(styles['author-time'])}>
                <Link to={`/teacher/${authorId}`} className={clsx(styles['author-info'])}>
                    <img className={clsx(styles['img-author'])} src={imgAuthor} alt={nameAuthor} />
                    <span className={clsx(styles['name-author'])}>{nameAuthor}</span>
                </Link>
                <div className={clsx(styles['time'])}>{time}</div>
            </div>
            <div className={clsx(styles['price-actions'])}>
                <span className={clsx(styles['price'])}>{formatPrice(price, 'VND')}</span>
                <Link to={`/book/${bookId}`} className={clsx(styles['button'], styles['button-manage'])}>
                    Xem chi tiết {'>'}
                </Link>
            </div>
        </div>
    );
};

export default Book;
