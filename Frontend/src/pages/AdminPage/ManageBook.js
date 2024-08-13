import { Modal, Button, Row, Col, Form, Pagination } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import DatePicker from 'react-datepicker';
import { createBookService, deleteBookService, getBookPagingService } from '~/services/bookService';
import { getAllGenresService } from '~/services/genreService';
import { getAllAuthorsService } from '~/services/authorService';
import ReactQuill from 'react-quill';
import clsx from 'clsx';
import styles from './AdminPage.module.scss';
import moment from 'moment';
import customToastify from '~/utils/customToastify';
import axios from 'axios';

const CustomModal = ({ action, showModal, handleCloseModal, data }) => {
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        const fetchGetGenres = async () => {
            try {
                const res = await getAllGenresService();
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

    const [authors, setAuthors] = useState([]);
    useEffect(() => {
        const fetchGetAuthors = async () => {
            try {
                const res = await getAllAuthorsService();
                if (res.data) {
                    setAuthors(
                        res.data?.map((author) => ({
                            value: author?.id,
                            label: author?.fullName,
                        })),
                    );
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchGetAuthors();
    }, []);

    const formRef = useRef(null);
    const animatedComponents = makeAnimated();

    const [validated, setValidated] = useState(false);

    const [fileUpload, setFileUpload] = useState(null);

    const [bookInfo, setBookInfo] = useState({
        name: '',
        genres: '',
        price: '',
        author: [],
        description: '',
        publicationDate: new Date(),
        totalPageNumber: '',
        remaining: '',
        image: 'null',
    });

    useEffect(() => {
        if (action === 'update-book') {
            setBookInfo({
                name: data?.name,
                genres: data?.genres,
                price: data?.price,
                author: data?.authorName,
                description: data?.description,
                publicationDate: moment(data?.publicationDate).format('DD/MM/YYYY'),
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
            setFileUpload(file);
            const reader = new FileReader();

            reader.onloadend = () => {
                setBookInfo({
                    ...bookInfo,
                    image: reader.result,
                });
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
                let formData = new FormData();

                formData.append('api_key', import.meta.env.VITE_CLOUDINARY_KEY);
                formData.append('file', fileUpload);
                formData.append('public_id', `file_${Date.now()}`);
                formData.append('timestamp', (Date.now() / 1000) | 0);
                formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

                axios
                    .post(import.meta.env.VITE_CLOUDINARY_URL, formData)
                    .then((result) => {
                        console.log(result);
                        setBookInfo({
                            ...bookInfo,
                            image: result.data.secure_url,
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                await createBookService({
                    ...bookInfo,
                    image: null,
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            handleCloseModal();
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
                    {/* <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column sm="2">
                            Tác giả
                        </Form.Label>
                        <Col sm="10" className="fz-16">
                            <Select
                                components={animatedComponents}
                                options={authors}
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
                    </Form.Group> */}
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column sm="2">
                            Thể loại
                        </Form.Label>
                        <Col sm="10" className="fz-16">
                            <Form.Select name="genres" value={`${bookInfo?.genres}`} onChange={handleChangeForm}>
                                {genres.map((genre) => {
                                    return (
                                        <option value={genre?.value} key={`genre-${genre?.value}`}>
                                            {genre?.label}
                                        </option>
                                    );
                                })}
                            </Form.Select>
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
                                    setBookInfo((prev) => ({
                                        ...prev,
                                        description: content,
                                    }))
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
                            <Form.Control type="file" name="image" onChange={handleFileChange} />
                            {bookInfo?.image && (
                                <div>
                                    <img
                                        src={bookInfo?.image}
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
    const [bookList, setBookList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const pageSize = 5;

    const fetchGetBookPaging = async () => {
        try {
            const res = await getBookPagingService({ pageNumber: currentPage, pageSize: pageSize });
            setTotalPage(res.data?.totalPage);
            setBookList(
                res?.data?.datas?.map((book) => {
                    return {
                        id: book?.id,
                        name: book?.title,
                        genres: book?.bookGroupId,
                        genresName: book?.bookGroupName,
                        price: book?.price,
                        description: book?.description,
                        publicationDate: book?.publishedAt,
                        totalPageNumber: book?.totalPageNumber,
                        rated: book?.rate,
                        remaining: book?.remaining,
                        image: book?.image,
                        authorName: book?.authorName,
                    };
                }),
            );
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchGetBookPaging();
    }, [currentPage]);

    const [genreList, setGenreList] = useState([]);

    useEffect(() => {
        const fetchGetGenres = async () => {
            try {
                const res = await getAllGenresService();
                setGenreList(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchGetGenres();
    }, []);

    const handleChangePage = (i) => {
        setCurrentPage(i);
    };

    // Create book
    const [showModalAddBook, setShowModalAddBook] = useState(false);
    const handleCloseModalAddBook = () => setShowModalAddBook(false);
    const handleShowModalAddBook = () => setShowModalAddBook(true);

    // Update book
    const [currentBookUpdate, setCurrentBookUpdate] = useState(null);
    const [showModalUpdateBook, setShowModalUpdateBook] = useState(false);
    const handleCloseModalUpdateBook = () => setShowModalUpdateBook(false);
    const handleShowModalUpdateBook = (bookId) => {
        setCurrentBookUpdate(bookList.find((x) => x?.id === bookId));
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
    const handleDeleteBook = async (bookId) => {
        try {
            await deleteBookService(bookId);
            fetchGetBookPaging();
            customToastify.success('Xoá sách thành công');
        } catch (error) {
            console.log(error);
        } finally {
            setShowModalDeleteBook(false);
        }
    };

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
                                <td>{book?.genresName}</td>
                                <td>{book?.price}</td>
                                <td>{book?.description}</td>
                                <td>{moment(book?.publicationDate).format('DD/MM/YYYY')}</td>
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
                                        className="fz-16 mt-3"
                                        variant="danger"
                                        onClick={() => handleShowModalDeleteBook(book?.id, book?.name)}
                                    >
                                        Xoá
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Pagination className="d-flex justify-content-center">
                {Array.from({ length: totalPage }, (_, i) => (i = i + 1))?.map((i) => {
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
            <Modal show={showModalDeleteBook} onHide={handleCloseModalDeleteBook}>
                <Modal.Header className="fz-16" closeButton>
                    <Modal.Title style={{ fontSize: '2.6rem' }}>Xoá sác</Modal.Title>
                </Modal.Header>
                <Modal.Body className="fz-16">Bạn có chắc muốn xoá sách {bookInfoDelete?.name}</Modal.Body>
                <Modal.Footer>
                    <Button className="fz-16" variant="warning" onClick={handleCloseModalDeleteBook}>
                        Huỷ
                    </Button>
                    <Button className="fz-16" variant="danger" onClick={() => handleDeleteBook(bookInfoDelete?.id)}>
                        Có
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ManageBook;
