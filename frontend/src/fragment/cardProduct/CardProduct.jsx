import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { CartContext } from '../../contexts/CartContext';
import Skeleton from '../../components/Skeleton';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { FaCartPlus } from 'react-icons/fa';

const Product = ({ search }) => {
  const navigate = useNavigate();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Set the number of products per page

  useEffect(() => {
    getLoggedIn();
  }, [getLoggedIn]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products
    .filter((item) => {
      return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search);
    })
    .slice(indexOfFirstProduct, indexOfLastProduct);

  const handleAddToCart = (product) => {
    if (loggedIn) {
      addToCart(product, product._id);
    } else {
      navigate('/login');
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {currentProducts.length === 0 && <p className="text-center text-red-500">Sorry, the item you are looking for is not available.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.length === 0
          ? // Skeleton loading when data is not available
            Array.from({ length: productsPerPage }).map((_, index) => (
              <div key={index} className={`m-3 flex flex-col h-[400px] ${index < productsPerPage - 1 ? 'mb-10' : ''}`}>
                <Skeleton width="300px" height="300px" />
                <Skeleton width="100%" height="20px" className="my-2" />
                <Skeleton width="100%" height="20px" className="my-2" />
                <Skeleton width="80%" height="40px" className="mx-auto my-2" />
              </div>
            ))
          : // Render actual data
            currentProducts.map((product, index) => (
              <div key={product._id} className={`mx-3 flex flex-col h-[400px] ${index < currentProducts.length - 1 ? 'mb-10' : ''}`}>
                <div className="w-[300px] h-[300px] rounded-[50px] rounded border border-slate-300">
                  <div className="w-[200px] h-[250px] items- mt-4 justify-center mx-auto flex">
                    <div className="items-center justify-center flex">
                      <Link to={`/product/${product._id}`}>
                        <img className="hover:scale-110 transition duration-300 rounded rounded-lg" src={`http://localhost:5000/${product.image_url}`} alt={product.name} />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="text-center text-xl text-semibold">{product.name}</div>
                <div className="text-center text-xl text-semibold">Rp.{product.price}</div>
                <button className="bg-blue-500 py-2 mx-auto text-white rounded rounded-lg flex mx-auto w-[80%] mt-1 mb-1 justify-center px-1 items-center hover:bg-blue-800 transition duration-300" onClick={() => handleAddToCart(product)}>
                  <FaCartPlus className="mr-2" />
                  add to cart
                </button>
              </div>
            ))}
      </div>

      <div className="flex justify-center items-center mt-4">
        {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => index + 1).map((pageNumber) => (
          <button key={pageNumber} onClick={() => paginate(pageNumber)} className={`mx-1 px-3 py-1 border text-black ${currentPage === pageNumber ? 'bg-gray-300' : 'bg-white'}`}>
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Product;
