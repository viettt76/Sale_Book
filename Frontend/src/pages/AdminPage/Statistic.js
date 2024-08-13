import { useState, useEffect } from 'react';
import { Form, Table, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const Statistic = () => {
    const [filterType, setFilterType] = useState('day');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const start = moment(startDate).format('DD-MM-YYYY');
                const end = moment(endDate).format('DD-MM-YYYY');

                // const response = await axios.get('/api/statistics', {
                //     params: {
                //         filterType,
                //         startDate: start,
                //         endDate: end,
                //     },
                // });

                // setStatistics(response.data.statistics);

                setStatistics([
                    {
                        date: '11-04-2024',
                        booksSold: 28,
                        revenue: 5000000,
                    },
                ]);
            } catch (error) {
                console.error('Failed to fetch statistics:', error);
            }
        };

        fetchStatistics();
    }, [filterType, startDate, endDate]);

    const handleFilterTypeChange = (event) => {
        const value = event.target.value;
        setFilterType(value);

        switch (value) {
            case 'day':
                setStartDate(new Date());
                setEndDate(new Date());
                break;
            case 'week':
                setStartDate(moment().startOf('week').toDate());
                setEndDate(moment().endOf('week').toDate());
                break;
            case 'month':
                setStartDate(moment().startOf('month').toDate());
                setEndDate(moment().endOf('month').toDate());
                break;
            case 'year':
                setStartDate(moment().startOf('year').toDate());
                setEndDate(moment().endOf('year').toDate());
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <h2>Thống kê</h2>
            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        Lọc theo
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control as="select" value={filterType} onChange={handleFilterTypeChange}>
                            <option value="day">Theo ngày</option>
                            <option value="week">Theo tuần</option>
                            <option value="month">Theo tháng</option>
                            <option value="year">Theo năm</option>
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        Ngày bắt đầu
                    </Form.Label>
                    <Col sm={10}>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="dd-MM-yyyy"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        Ngày kết thúc
                    </Form.Label>
                    <Col sm={10}>
                        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} dateFormat="dd-MM-yyyy" />
                    </Col>
                </Form.Group>
            </Form>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Ngày</th>
                        <th>Số lượng sách bán</th>
                        <th>Doanh thu (VND)</th>
                    </tr>
                </thead>
                <tbody>
                    {statistics?.map((stat, index) => (
                        <tr key={index}>
                            <td>{stat.date}</td>
                            <td>{stat.booksSold}</td>
                            <td>{stat.revenue}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Statistic;
