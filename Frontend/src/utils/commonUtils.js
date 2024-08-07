// import { Buffer } from 'buffer';

export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

// export const convertBufferToBase64 = (buffer = '') => {
//     if (buffer) {
//         return new Buffer(buffer, 'base64').toString('binary');
//     } else {
//         return '';
//     }
// };

export const formatPrice = (price, style) => {
    switch (style) {
        case 'VND':
            return Number(price)?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
        case 'USD':
            return Number(price)?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        default:
            return Number(price);
    }
};

export const secondsConvertHoursAndMinutesAndSeconds = (seconds) => {
    const h = (seconds - (seconds % 3600)) / 3600;
    const m = (seconds - h * 3600 - ((seconds - h * 3600) % 60)) / 60;
    const s = seconds % 60;
    return { h, m, s };
};
