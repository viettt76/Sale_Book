import clsx from 'clsx';
import GroupBooks from '~/components/GroupBooks';
import avatarDefault from '~/assets/imgs/avatar-default.png';
import styles from './Home.module.scss';
import SearchByCategory from '~/components/SearchByCategory';

const Home = () => {
    const groupBooks = [
        {
            id: '1',
            img: avatarDefault,
            name: 'Toán',
            authorId: '1',
            imgAuthor: avatarDefault,
            nameAuthor: 'Việt',
            price: '120000',
        },
        {
            id: '1',
            img: avatarDefault,
            name: 'Văn',
            authorId: '1',
            imgAuthor: avatarDefault,
            nameAuthor: 'Quốc',
            price: '450000',
        },
        {
            id: '1',
            img: avatarDefault,
            name: 'Anh',
            authorId: '1',
            imgAuthor: avatarDefault,
            nameAuthor: 'Việt',
            price: '23000',
        },
        {
            id: '1',
            img: avatarDefault,
            name: 'Địa',
            authorId: '1',
            imgAuthor: avatarDefault,
            nameAuthor: 'Văn',
            price: '56800',
        },
        {
            id: '1',
            img: avatarDefault,
            name: 'Sử',
            authorId: '1',
            imgAuthor: avatarDefault,
            nameAuthor: 'Huyền',
            price: '285000',
        },
        {
            id: '1',
            img: avatarDefault,
            name: 'Lý',
            authorId: '1',
            imgAuthor: avatarDefault,
            nameAuthor: 'Trang',
            price: '257000',
        },
        {
            id: '1',
            img: avatarDefault,
            name: 'Hoá',
            authorId: '1',
            imgAuthor: avatarDefault,
            nameAuthor: 'Long',
            price: '560000',
        },
        {
            id: '1',
            img: avatarDefault,
            name: 'Sinh',
            authorId: '1',
            imgAuthor: avatarDefault,
            nameAuthor: 'Vũ',
            price: '458000',
        },
        {
            id: '1',
            img: avatarDefault,
            name: 'Pháp luật',
            authorId: '1',
            imgAuthor: avatarDefault,
            nameAuthor: 'Linh',
            price: '246000',
        },
    ];

    return (
        <div className={clsx('container', styles['home-wrapper'])}>
            <GroupBooks className={clsx(styles['group-books'])} title="Sách việt nam" groupBooks={groupBooks} />
            <GroupBooks className={clsx(styles['group-books'])} title="Sách nước ngoài" groupBooks={groupBooks} />
            <SearchByCategory />
        </div>
    );
};

export default Home;
