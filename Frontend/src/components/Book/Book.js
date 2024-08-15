import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './Book.module.scss';
import { formatPrice } from '~/utils/commonUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfStroke, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import bookImageDefault from '~/assets/imgs/book-default.jpg';

const Book = ({ bookId, img, name, nameAuthor, price, rated = 0 }) => {
    return (
        <Link to={`/book/${bookId}`} className={clsx(styles['wrapper'])}>
            <img
                className={clsx(styles['img'])}
                src={img || bookImageDefault}
                alt={name}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = bookImageDefault;
                }}
            />
            <p className={clsx(styles['name'])}>{name}</p>
            <div className={clsx(styles['author-time'])}>
                <div className={clsx(styles['author-info'])}>
                    <span className={clsx(styles['name-author'])}>{nameAuthor}</span>
                </div>
            </div>
            <div className={clsx(styles['price-actions'])}>
                <span className={clsx(styles['price'])}>{formatPrice(price, 'VND')}</span>
                <div className={clsx(styles['rated'])}>
                    {[...Array(Math.floor(rated)).keys()]?.map((i) => (
                        <FontAwesomeIcon key={`number-of-rates-${i}`} icon={faStarSolid} />
                    ))}
                    {rated > Math.floor(rated) && <FontAwesomeIcon icon={faStarHalfStroke} />}
                    {[...Array(5 - Math.ceil(rated)).keys()]?.map((i) => (
                        <FontAwesomeIcon key={`number-of-rates-reject-${i}`} icon={faStarRegular} />
                    ))}
                </div>
            </div>
        </Link>
    );
};

export default Book;
