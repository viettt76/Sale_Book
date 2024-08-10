import { useLocation, useParams } from 'react-router-dom';

const Pay = () => {
    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const quantity = queryParams.get('quantity');
    console.log(id, quantity);

    return <div></div>;
};

export default Pay;
