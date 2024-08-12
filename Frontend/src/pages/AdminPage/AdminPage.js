import { Tab, Nav, Pagination, Modal, Button, Row, Col, Form } from 'react-bootstrap';
import clsx from 'clsx';
import styles from './AdminPage.module.scss';
import avatar from '~/assets/imgs/avatar-default.png';
import { useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import DatePicker from 'react-datepicker';
import { createBookService, getGenresService } from '~/services/bookService';
import ReactQuill from 'react-quill';

const CustomModal = ({ action, showModal, handleCloseModal, data }) => {
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        const fetchGetGenres = async () => {
            try {
                const res = await getGenresService();
                if (res.data) {
                    setGenres(
                        res.data?.map((genre) => ({
                            value: genre?.id,
                            label: genre?.name,
                        })),
                    );
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchGetGenres();
    }, []);

    const formRef = useRef(null);
    const animatedComponents = makeAnimated();

    const [validated, setValidated] = useState(false);

    const [imagePreview, setImagePreview] = useState(null);

    const [bookInfo, setBookInfo] = useState({
        name: '',
        genres: [],
        price: '',
        description: '',
        publicationDate: new Date(),
        totalPageNumber: '',
        remaining: '',
        image: null,
    });

    useEffect(() => {
        if (action === 'update-book') {
            setBookInfo({
                name: data?.name,
                genres: data?.genres,
                price: data?.price,
                description: data?.description,
                publicationDate: data?.publicationDate,
                totalPageNumber: data?.totalPageNumber,
                remaining: data?.remaining,
                image: data?.image,
            });
        }
    }, [action, data]);

    const handleChangeForm = (e) => {
        const { name, value } = e.target;

        setBookInfo({
            ...bookInfo,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImagePreview(reader.result);
                const formData = new FormData();
                formData.append('file', reader.result);
                console.log(formData);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        try {
            const form = formRef.current;
            if (form.checkValidity() === false) {
                setValidated(true);
            } else {
                await createBookService({
                    ...bookInfo,
                    image: null,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header style={{ fontSize: '1.6rem' }} closeButton>
                <Modal.Title style={{ fontSize: '2.6rem' }}>
                    {action === 'create-book' ? 'Thêm sách' : 'Sửa sách'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form ref={formRef} noValidate validated={validated}>
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column sm="2">
                            Tên sách
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control name="name" value={bookInfo.name} onChange={handleChangeForm} required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column sm="2">
                            Tác giả
                        </Form.Label>
                        <Col sm="10" className="fz-16">
                            <Select
                                components={animatedComponents}
                                options={genres}
                                isMulti={true}
                                closeMenuOnSelect={false}
                                required
                                onChange={(e) =>
                                    handleChangeForm({
                                        target: {
                                            name: 'authors',
                                            value: e.map((item) => item.value),
                                        },
                                    })
                                }
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column sm="2">
                            Thể loại
                        </Form.Label>
                        <Col sm="10" className="fz-16">
                            <Select
                                components={animatedComponents}
                                options={genres}
                                isMulti={true}
                                closeMenuOnSelect={false}
                                required
                                onChange={(e) =>
                                    handleChangeForm({
                                        target: {
                                            name: 'genres',
                                            value: e.map((item) => item.value),
                                        },
                                    })
                                }
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column sm="2">
                            Giá
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control name="price" value={bookInfo.price} onChange={handleChangeForm} required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column sm="2">
                            Mô tả
                        </Form.Label>
                        <Col sm="10">
                            <ReactQuill
                                value={bookInfo.description}
                                onChange={(content) =>
                                    handleChangeForm({
                                        target: {
                                            name: 'description',
                                            value: content,
                                        },
                                    })
                                }
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column sm="2">
                            Ngày xuất bản
                        </Form.Label>
                        <Col sm="10">
                            <DatePicker
                                className="fz-16"
                                dateFormat="dd/MM/yyyy"
                                selected={bookInfo.publicationDate}
                                onChange={(date) =>
                                    handleChangeForm({
                                        target: {
                                            name: 'publicationDate',
                                            value: date,
                                        },
                                    })
                                }
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column sm="2">
                            Tổng số trang
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                name="totalPageNumber"
                                value={bookInfo.totalPageNumber}
                                onChange={handleChangeForm}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column sm="2">
                            Số lượng còn
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                name="remaining"
                                value={bookInfo.remaining}
                                onChange={handleChangeForm}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Ảnh bìa
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="file" required name="image" onChange={handleFileChange} />
                            {imagePreview && (
                                <div>
                                    <img
                                        src={imagePreview}
                                        alt="Uploaded Preview"
                                        style={{
                                            width: '39rem',
                                            height: 'auto',
                                            marginTop: '1.6rem',
                                        }}
                                    />
                                </div>
                            )}
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="fz-16" variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button className="fz-16" variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const AdminPage = () => {
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

    const bookList = [
        {
            id: 'abc',
            name: 'The Great Gatsby',
            genres: 'Fiction',
            price: '$10.99',
            description: 'A classic novel of the Roaring Twenties.',
            publicationDate: 'April 10, 1925',
            totalPageNumber: '180',
            rated: '4.5/5',
            remaining: 20,
            image: avatar,
        },
        {
            id: 'def',
            name: 'The Gôd',
            genres: 'Fiction',
            price: '$10.99',
            description: 'A classic novel of the Roaring Twenties.',
            publicationDate: 'April 10, 1925',
            totalPageNumber: '180',
            rated: '4.5/5',
            remaining: 20,
            image: avatar,
        },
    ];

    const [currentPageUser, setCurrentPageUser] = useState(1);
    const [showUserList, setShowUserList] = useState(userList.slice(0, 3));

    const handleChangePage = (i) => {
        setCurrentPageUser(i);
        setShowUserList(userList.slice((i - 1) * 3, (i - 1) * 3 + 3));
    };

    const [showModalAddBook, setShowModalAddBook] = useState(false);
    const handleCloseModalAddBook = () => setShowModalAddBook(false);
    const handleShowModalAddBook = () => setShowModalAddBook(true);

    const [currentBookUpdate, setCurrentBookUpdate] = useState(null);
    const [showModalUpdateBook, setShowModalUpdateBook] = useState(false);
    const handleCloseModalUpdateBook = () => setShowModalUpdateBook(false);
    const handleShowModalUpdateBook = (i) => {
        setCurrentBookUpdate(bookList.find((x) => x?.id === i));
        setShowModalUpdateBook(true);
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
                        <div className="d-flex justify-content-between">
                            <input
                                className={clsx('fz-16 form-control mb-3', styles['search-user-input'])}
                                placeholder="Tìm kiếm theo email/số điện thoại"
                            />
                            <CSVLink
                                data={showUserList}
                                headers={headersExportUser}
                                filename="Users-Sale-Book.csv"
                                separator=";"
                            >
                                <button className="btn btn-success fz-16">Export to Excel</button>
                            </CSVLink>
                        </div>
                        <table className={clsx(styles['table-user'])}>
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
                            <button className="btn btn-primary fz-16 mb-3 float-end" onClick={handleShowModalAddBook}>
                                Thêm sách
                            </button>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Genres</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Publication Date</th>
                                    <th>Total Page Number</th>
                                    <th>Rated</th>
                                    <th>Remaining</th>
                                    <th>Image</th>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {bookList?.map((book) => {
                                    return (
                                        <tr key={`book-${book?.id}`}>
                                            <td>{book?.name}</td>
                                            <td>{book?.genres}</td>
                                            <td>{book?.price}</td>
                                            <td>{book?.description}</td>
                                            <td>{book?.publicationDate}</td>
                                            <td>{book?.totalPageNumber}</td>
                                            <td>{book?.rated}</td>
                                            <td>{book?.remaining}</td>
                                            <td>
                                                <img src={book?.image} alt="The Great Gatsby" />
                                            </td>
                                            <td>
                                                <Button
                                                    className="fz-16 me-3"
                                                    variant="warning"
                                                    onClick={() => handleShowModalUpdateBook(book?.id)}
                                                >
                                                    Sửa
                                                </Button>
                                                <Button className="fz-16" variant="danger">
                                                    Xoá
                                                </Button>
                                                <Modal>
                                                    <Modal.Header>
                                                        <Modal.Title style={{ fontSize: '2.6rem' }}>
                                                            Xoá sách
                                                        </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>Bạn có chắc chắn muốn xoá sách</Modal.Body>
                                                    <Modal.Footer>a</Modal.Footer>
                                                </Modal>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {showModalAddBook && (
                            <CustomModal
                                action="create-book"
                                showModal={showModalAddBook}
                                handleCloseModal={handleCloseModalAddBook}
                            />
                        )}
                        {showModalUpdateBook && (
                            <CustomModal
                                action="update-book"
                                showModal={showModalUpdateBook}
                                handleCloseModal={handleCloseModalUpdateBook}
                                data={currentBookUpdate}
                            />
                        )}
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </div>
    );
};

export default AdminPage;
