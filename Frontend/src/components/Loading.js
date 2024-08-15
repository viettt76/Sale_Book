import { Spinner } from 'react-bootstrap';

const Loading = ({ className }) => {
    return (
        <div className={`loading ${className}`}>
            <Spinner animation="border" />
        </div>
    );
};

export default Loading;
