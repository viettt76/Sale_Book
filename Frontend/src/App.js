import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import routes, { adminRoutes } from '~/routes';
import DefaultLayout from '~/layouts/DefaultLayout';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPersonalInfoService } from './services/userServices';
import * as actions from '~/redux/actions';
import { useDispatch } from 'react-redux';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

function FetchUserInfo() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchGetPersonalInfo = async () => {
            try {
                const res = await getPersonalInfoService();
                dispatch(
                    actions.saveUserInfo({
                        username: res?.data?.userName,
                        email: res?.data?.email,
                        role: res?.data?.role,
                        phoneNumber: res?.data?.phoneNumber,
                        address: res?.data?.address,
                    }),
                );
            } catch (error) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        if (location.pathname !== '/login') {
            fetchGetPersonalInfo();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <FetchUserInfo />
            <Routes>
                {routes.map((route, index) => {
                    const Page = route.element;
                    let Layout = DefaultLayout;
                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = React.Fragment;
                    }
                    return (
                        <Route
                            key={`route-${index}`}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        ></Route>
                    );
                })}
                {adminRoutes.map((route, index) => {
                    const Page = route.element;
                    let Layout = DefaultLayout;
                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = React.Fragment;
                    }
                    return (
                        <Route
                            key={`route-${index}`}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        ></Route>
                    );
                })}
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;

// import { useState } from 'react';
// import axios from 'axios';

// function ImageUpload() {
//     const [image, setImage] = useState(null);
//     const [url, setUrl] = useState('');
//     // Xử lý khi chọn file ảnh
//     const handleImageChange = (e) => {
//         setImage(e.target.files[0]);
//     };

//     // Hàm upload ảnh lên Cloudinary
//     const handleUpload = async () => {
//         let formData = new FormData();
//         formData.append('api_key', import.meta.env.VITE_CLOUDINARY_KEY);
//         formData.append('file', image);
//         formData.append('public_id', `file_${Date.now()}`);
//         formData.append('timestamp', (Date.now() / 1000) | 0);
//         formData.append('upload_preset', 'ml_default');

//         axios
//             .post(import.meta.env.VITE_CLOUDINARY_URL, formData)
//             .then((result) => {
//                 console.log(result);
//                 setUrl(result.data.secure_url);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });

//         // try {
//         //     const response = await axios.post(
//         //         ``, // Thay 'your_cloud_name' bằng Cloud Name của bạn
//         //         formData,
//         //     );
//         //     setUrl(response.data.secure_url); // Lưu URL của ảnh vừa upload
//         // } catch (error) {
//         //     console.error('Error uploading image:', error);
//         // }
//     };

//     return (
//         <div>
//             <input type="file" onChange={handleImageChange} />
//             <button onClick={handleUpload}>Upload Image</button>
//             {url && <img src={url} alt="Uploaded Image" />}
//         </div>
//     );
// }

// export default ImageUpload;
