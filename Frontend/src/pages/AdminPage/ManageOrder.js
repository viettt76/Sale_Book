import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Button, Modal, Pagination, Form, Col, Row } from 'react-bootstrap';
import {
    createGenreService,
    deleteGenreService,
    getGenrePagingService,
    updateGenreService,
} from '~/services/genreService';
import styles from './AdminPage.module.scss';
import Loading from '~/components/Loading';
import { adminGetAllOrdersService } from '~/services/orderService';

const ManageOrder = () => {
    const [loading, setLoading] = useState(false);

    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const pageSize = 5;

    const fetchGetOrders = async () => {
        try {
            setLoading(true);
            const res = await adminGetAllOrdersService();
            console.log(res);
            // setTotalPage(res?.data?.totalPage);
            // setOrders(
            //     res?.data?.datas?.map((genre) => ({
            //         id: genre?.id,
            //         name: genre?.name,
            //     })),
            // );
            // setLoading(false);

            // {
            //     "id": 1,
            //     "userId": "48771cd6-eb49-4518-a55f-c27bf1bb1513",
            //     "userName": "hoangquocviet@gmail.com",
            //     "userEmail": "hoangquocviet@gmail.com",
            //     "userPhoneNumber": "0909123457",
            //     "totalAmount": 200000,
            //     "status": 3,
            //     "voucherId": 0,
            //     "voucherPercent": 0,
            //     "date": "2022-12-06T00:00:00",
            //     "orderItems": [
            //         {
            //             "id": 1,
            //             "orderId": 1,
            //             "bookId": 1,
            //             "bookName": "Doraemon Movie Story Màu - Tân Nobita và lịch sử khai phá vũ trụ",
            //             "bookImage": "https://bit.ly/46G92Jk",
            //             "bookPrice": 31500,
            //             "isReviewed": false,
            //             "quantity": 13
            //         }
            //     ]
            // }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchGetOrders();
    }, [currentPage]);

    const handleChangePage = (i) => {
        setCurrentPage(i);
    };

    // Update genre
    const [showModalUpdateGenre, setShowModalUpdateGenre] = useState(false);
    const handleCloseModalUpdateGenre = () => setShowModalUpdateGenre(false);
    const handleShowModalUpdateGenre = (id, name) => {
        setGenreUpdateInfo({
            id,
            name: name,
        });
        setShowModalUpdateGenre(true);
    };

    const [genreUpdateInfo, setGenreUpdateInfo] = useState({
        id: '',
        name: '',
    });

    const handleSubmitUpdateGenre = async () => {
        try {
            await updateGenreService(genreUpdateInfo);
            fetchGetOrders();
        } catch (error) {
            console.log(error);
        } finally {
            handleCloseModalUpdateGenre();
        }
    };

    return (
        <>
            <div className="w-100 d-flex justify-content-center">
                <table className="w-100">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={2}>
                                    <Loading className="mt-3 mb-3" />
                                </td>
                            </tr>
                        ) : (
                            orders?.map((genre) => {
                                return (
                                    <tr key={`genre-${genre?.id}`}>
                                        <td>{genre?.name}</td>
                                        <td>
                                            <Button
                                                className="fz-16 me-3"
                                                variant="warning"
                                                onClick={() => handleShowModalUpdateGenre(genre?.id, genre?.name)}
                                            >
                                                Sửa
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
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

            <Modal show={showModalUpdateGenre} onHide={handleCloseModalUpdateGenre}>
                <Modal.Header>
                    <Modal.Title>Sửa thể loại</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="1">
                                Tên
                            </Form.Label>
                            <Col sm="11">
                                <Form.Control
                                    value={genreUpdateInfo?.name}
                                    onChange={(e) =>
                                        setGenreUpdateInfo({
                                            ...genreUpdateInfo,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="fz-16" variant="warning" onClick={handleCloseModalUpdateGenre}>
                        Huỷ
                    </Button>
                    <Button className="fz-16" variant="danger" onClick={handleSubmitUpdateGenre}>
                        Cập nhật
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ManageOrder;
