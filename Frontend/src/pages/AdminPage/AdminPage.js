import { Tab, Nav } from 'react-bootstrap';
import clsx from 'clsx';
import styles from './AdminPage.module.scss';
import ManageUser from './ManageUser';
import ManageBook from './ManageBook';
import ManageAuthor from './ManageAuthor';
import Statistic from './Statistic';
import ManageGenre from './ManageGenre';

const AdminPage = () => {
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
                    <Nav.Item>
                        <Nav.Link style={{ fontSize: '2rem' }} eventKey="manage-author">
                            Management Author
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link style={{ fontSize: '2rem' }} eventKey="manage-genre">
                            Management Genre
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link style={{ fontSize: '2rem' }} eventKey="statistic">
                            Statistic
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content>
                    <Tab.Pane eventKey="manage-user">
                        <ManageUser />
                    </Tab.Pane>
                    <Tab.Pane eventKey="manage-book">
                        <ManageBook />
                    </Tab.Pane>
                    <Tab.Pane eventKey="manage-author">
                        <ManageAuthor />
                    </Tab.Pane>
                    <Tab.Pane eventKey="manage-genre">
                        <ManageGenre />
                    </Tab.Pane>
                    <Tab.Pane eventKey="statistic">
                        <Statistic />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </div>
    );
};

export default AdminPage;
