import Header from '~/containers/Header';
import Footer from '~/containers/Footer';

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default DefaultLayout;
