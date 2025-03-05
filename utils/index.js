const saveInLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}