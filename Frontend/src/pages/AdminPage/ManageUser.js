import { Pagination } from 'react-bootstrap';
import clsx from 'clsx';
import styles from './AdminPage.module.scss';
import { useState } from 'react';
import { CSVLink } from 'react-csv';

const ManageUser = () => {
    const headersExportUser = [
        { label: 'Username', key: 'username' },
        { label: 'Email', key: 'email' },
        { label: 'Address', key: 'address' },
        { label: 'Phone number', key: 'phoneNumber' },
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
        <>
            <div className="d-flex justify-content-between">
                <input
                    className={clsx('fz-16 form-control mb-3', styles['search-user-input'])}
                    placeholder="Tìm kiếm theo email/số điện thoại"
                />
                <CSVLink data={showUserList} headers={headersExportUser} filename="Users-Sale-Book.csv" separator=";">
                    <button className="btn btn-success fz-16">Export to Excel</button>
                </CSVLink>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Action</th>
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
                                <td>
                                    <button className="btn btn-warning fz-16">Cấm</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Pagination className="d-flex justify-content-center">
                {Array.from({ length: Math.ceil(userList.length / 3) }, (_, i) => (i = i + 1))?.map((i) => {
                    return (
                        <Pagination.Item
                            key={i}
                            className={clsx(styles['page-number'])}
                            active={i === currentPageUser}
                            onClick={() => handleChangePage(i)}
                        >
                            {i}
                        </Pagination.Item>
                    );
                })}
            </Pagination>
        </>
    );
};

export default ManageUser;
