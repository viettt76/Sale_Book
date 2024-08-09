import { Tab, Nav, Pagination } from 'react-bootstrap';
import clsx from 'clsx';
import styles from './AdminPage.module.scss';
import avatar from '~/assets/imgs/avatar-default.png';
import { useState } from 'react';

const AdminPage = () => {
    const bookList = [
        {
            id: 'abc',
            name: 'The Great Gatsby',
            genre: 'Fiction',
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
            name: 'The Great Gatsby',
            genre: 'Fiction',
            price: '$10.99',
            description: 'A classic novel of the Roaring Twenties.',
            publicationDate: 'April 10, 1925',
            totalPageNumber: '180',
            rated: '4.5/5',
            remaining: '20',
            image: avatar,
        },
    ];

    const userList = [
        {
            id: '1',
            username: 'john_doe',
            email: 'john@example.com',
            address: '123 Main St, Springfield',
            phoneNumber: '(123) 456-7890',
        },
        {
            id: '2',
            username: 'jane_smith',
            email: 'jane@example.com',
            address: '456 Oak St, Springfield',
            phoneNumber: '(987) 654-3210',
        },
        {
            id: '3',
            username: 'jane_smith',
            email: 'jane@example.com',
            address: '456 Oak St, Springfield',
            phoneNumber: '(987) 654-3210',
        },
        {
            id: '4',
            username: 'jane_smith',
            email: 'no@example.com',
            address: '456 Oak St, Springfield',
            phoneNumber: '(987) 654-3210',
        },
    ];

    const [currentPageUser, setCurrentPageUser] = useState(1);
    const [showUserList, setShowUserList] = useState(userList.slice(0, 3));

    const handleChangePage = (i) => {
        setCurrentPageUser(i);
        setShowUserList(userList.slice((i - 1) * 3, (i - 1) * 3 + 3));
    };

    return (
        <div className={clsx(styles['header-wrapper'])}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="manage-book">
                <Nav variant="pills" className="mb-3 d-flex justify-content-center ">
                    <Nav.Item>
                        <Nav.Link style={{ fontSize: '2rem' }} eventKey="manage-user">
                            Management User
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link style={{ fontSize: '2rem' }} eventKey="manage-book">
                            Management Book
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content>
                    <Tab.Pane eventKey="manage-user">
                        <input
                            className={clsx('fz-16 form-control mb-3', styles['search-user-input'])}
                            placeholder="Tìm kiếm theo email/số điện thoại"
                        />
                        <table className={clsx(styles['table-user'])}>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Phone Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showUserList?.map((user) => {
                                    return (
                                        <tr key={`user-${user?.id}`}>
                                            <td>{user?.username}</td>
                                            <td>{user?.email}</td>
                                            <td>{user?.address}</td>
                                            <td>{user?.phoneNumber}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <Pagination>
                            {Array.from({ length: Math.ceil(userList.length / 3) }, (_, i) => (i = i + 1))?.map((i) => {
                                return (
                                    <Pagination.Item
                                        key={i}
                                        active={i === currentPageUser}
                                        onClick={() => handleChangePage(i)}
                                    >
                                        {i}
                                    </Pagination.Item>
                                );
                            })}
                        </Pagination>
                    </Tab.Pane>
                    <Tab.Pane eventKey="manage-book">
                        <div>
                            <button className="btn btn-primary fz-16 mb-3 float-end">Thêm sách</button>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Genre</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Publication Date</th>
                                    <th>Total Page Number</th>
                                    <th>Rated</th>
                                    <th>Remaining</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookList?.map((book) => {
                                    return (
                                        <tr key={`book-${book?.id}`}>
                                            <td>{book?.name}</td>
                                            <td>{book?.genre}</td>
                                            <td>{book?.price}</td>
                                            <td>{book?.description}</td>
                                            <td>{book?.publicationDate}</td>
                                            <td>{book?.totalPageNumber}</td>
                                            <td>{book?.rated}</td>
                                            <td>{book?.remaining}</td>
                                            <td>
                                                <img src={book?.image} alt="The Great Gatsby" />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </div>
    );
};

export default AdminPage;
