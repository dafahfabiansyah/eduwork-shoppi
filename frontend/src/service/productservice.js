import axios from 'axios';

export const getProducts = (callback) => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/api/product`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getDrinkCategory = (callback) => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/api/product/?category=drink`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getFoodCategory = (callback) => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/api/product/?category=food`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getCamilanCategory = (callback) => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/api/product/?category=snack`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getClothesCategory = (callback) => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/api/product/?category=clothes`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getElectronicCategory = (callback) => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/api/product/?category=electronic`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getIndomieTag = (callback) => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/api/product?tag=indomie`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getSweetTag = (callback) => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/api/product?tag=sweet`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getChocolateTag = (callback) => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/api/product?tag=chocolate`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getStyleTag = (callback) => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/api/product?tag=style`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
//
//
//
// untuk memanggil react router DOM
export const getDetailProduct = (_id, callback) => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/api/product/${_id}`)
    .then((res) => {
      console.log('Detail Product:', data);
      callback(res.data);
    })
    .catch((err) => {
      console.log('Kesalahan dari server:', err);
    });
};
