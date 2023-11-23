import React, { createContext, useEffect, useState } from 'react';
import { getCamilanCategory, getDetailProduct, getDrinkCategory, getFoodCategory, getProducts, getClothesCategory, getElectronicCategory, getIndomieTag, getSweetTag, getChocolateTag, getStyleTag } from '../service/productservice';
import { useParams } from 'react-router-dom';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const { _id } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts((data) => {
      setProducts(data);
    });
  }, []);
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    if (_id) {
      getDetailProduct(_id, (data) => {
        setDetail(data);
      });
    }
  }, [_id]);

  // category
  const [drink, setDrink] = useState([]);
  useEffect(() => {
    getDrinkCategory((data) => {
      setDrink(data);
    });
  }, []);
  const [food, setFood] = useState([]);
  useEffect(() => {
    getFoodCategory((data) => {
      setFood(data);
    });
  }, []);
  const [clothes, setClothes] = useState([]);
  useEffect(() => {
    getClothesCategory((data) => {
      setClothes(data);
    });
  }, []);
  const [electronic, setElectronic] = useState([]);
  useEffect(() => {
    getElectronicCategory((data) => {
      setElectronic(data);
    });
  }, []);
  const [camilan, setCamilan] = useState([]);
  useEffect(() => {
    getCamilanCategory((data) => {
      setCamilan(data);
    });
  }, []);

  // tag
  const [indomie, setIndomie] = useState([]);
  useEffect(() => {
    getIndomieTag((data) => {
      setIndomie(data);
    });
  }, []);
  const [sweet, setSweet] = useState([]);
  useEffect(() => {
    getSweetTag((data) => {
      setSweet(data);
    });
  }, []);
  const [chocolate, setChocolate] = useState([]);
  useEffect(() => {
    getChocolateTag((data) => {
      setChocolate(data);
    });
  }, []);
  const [style, setStyle] = useState([]);
  useEffect(() => {
    getStyleTag((data) => {
      setStyle(data);
    });
  }, []);

  return <ProductContext.Provider value={{ detail, products, drink, food, camilan, clothes, electronic, indomie, chocolate, sweet, style }}>{children}</ProductContext.Provider>;
};

export default ProductProvider;
