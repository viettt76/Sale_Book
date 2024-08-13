import { Button } from 'react-bootstrap';

const ManageAuthor = () => {
    const authorList = [
        {
            id: '01',
            name: 'văn a',
        },
        {
            id: '02',
            name: 'văn b',
        },
        {
            id: '03',
            name: 'văn c',
        },
        {
            id: '04',
            name: 'văn d',
        },
    ];

    return (
        <>
            <div>
                <button className="btn btn-primary fz-16 mb-3 float-end">Thêm tác giả</button>
            </div>
            <div className="w-100 d-flex justify-content-center">
                <table className="w-100">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authorList?.map((author) => {
                            return (
                                <tr key={`author-${author?.id}`}>
                                    <td>{author?.name}</td>
                                    <td>
                                        <Button className="fz-16 me-3" variant="warning">
                                            Sửa
                                        </Button>
                                        <Button className="fz-16" variant="danger">
                                            Xoá
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ManageAuthor;
