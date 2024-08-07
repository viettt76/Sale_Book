import Header from '~/containers/Header';

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="d-flex justify-content-between">{children}</div>
        </div>
    );
};

export default DefaultLayout;
