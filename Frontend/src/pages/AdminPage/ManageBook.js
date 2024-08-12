import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import avatar from '~/assets/imgs/avatar-default.png';
import { useEffect, useRef, useState } from 'react';
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

const ManageBook = () => {
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

    const [genreList, setGenreList] = useState([]);
    useEffect(() => {
        const fetchGetGenres = async () => {
            try {
                const res = await getGenresService();
                setGenreList(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchGetGenres();
    }, []);

    // Create book
    const [showModalAddBook, setShowModalAddBook] = useState(false);
    const handleCloseModalAddBook = () => setShowModalAddBook(false);
    const handleShowModalAddBook = () => setShowModalAddBook(true);

    // Update book
    const [currentBookUpdate, setCurrentBookUpdate] = useState(null);
    const [showModalUpdateBook, setShowModalUpdateBook] = useState(false);
    const handleCloseModalUpdateBook = () => setShowModalUpdateBook(false);
    const handleShowModalUpdateBook = (i) => {
        setCurrentBookUpdate(bookList.find((x) => x?.id === i));
        setShowModalUpdateBook(true);
    };

    // Delete book
    const [showModalDeleteBook, setShowModalDeleteBook] = useState(false);
    const [bookInfoDelete, setBookInfoDelete] = useState({
        id: '',
        name: '',
    });
    const handleShowModalDeleteBook = (bookId, bookName) => {
        setShowModalDeleteBook(true);
        setBookInfoDelete({
            id: bookId,
            name: bookName,
        });
    };
    const handleCloseModalDeleteBook = () => setShowModalDeleteBook(false);

    return (
        <>
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
                        <th>Action</th>
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
                                    <Button
                                        className="fz-16"
                                        variant="danger"
                                        onClick={() => handleShowModalDeleteBook(book?.id, book?.name)}
                                    >
                                        Xoá
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                    <Modal show={showModalDeleteBook} onHide={handleCloseModalDeleteBook}>
                        <Modal.Header className="fz-16" closeButton>
                            <Modal.Title style={{ fontSize: '2.6rem' }}>Xoá sác</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="fz-16">Bạn có chắc muốn xoá sách {bookInfoDelete?.name}</Modal.Body>
                        <Modal.Footer>
                            <Button className="fz-16" variant="warning" onClick={handleCloseModalDeleteBook}>
                                Huỷ
                            </Button>
                            <Button className="fz-16" variant="danger">
                                Có
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </tbody>
            </table>
            {/* <Pagination className="d-flex justify-content-center">
                            {Array.from({ length: Math.ceil(bookList.length / 3) }, (_, i) => (i = i + 1))?.map((i) => {
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
                        </Pagination> */}
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
        </>
    );
};

export default ManageBook;
