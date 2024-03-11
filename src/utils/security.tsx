import Crypto from 'crypto-js';

export const encryptData = (data: any, key: any, type?: any) => {
    let encrypted;
    if (typeof data === 'object') {
        const jsonString = JSON.stringify(data);
        encrypted = Crypto.AES.encrypt(jsonString, import.meta.env.VITE_SECRET_KEY).toString();
    } else {
        encrypted = Crypto.AES.encrypt(data.toString(), import.meta.env.VITE_SECRET_KEY).toString();
    }

    if (type === "object") {
        localStorage.setItem(key, encrypted);
    } else {
        localStorage.setItem(key, encrypted);
    }
}


export const decryptData = (key: any, type: any) => {
    const data = localStorage.getItem(key);
    if (!data) {
        console.error('No data found for the specified key.');
        return null;
    }
    
    try {
        const decryptedData = Crypto.AES.decrypt(data, import.meta.env.VITE_SECRET_KEY).toString(Crypto.enc.Utf8);
        if (type === "object") {
            return JSON.parse(decryptedData);
        } else {
            return decryptedData;
        }
    } catch (error) {
        console.error('Error decrypting data:', error);
        return null;
    }
}
