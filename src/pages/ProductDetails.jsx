import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import RelatedProducts from '../components/RelatedProducts';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location]);
  const { addToCart } = useContext(CartContext)
  const { id } = useParams()
  // get product data base on the id
  const { data } = useFetch(`/products?populate=*&filters[id][$eq]=${id}`)
  if (!data) {
    return <div className='container mx-auto'>loading...</div>
  }
  // console.log(data);
  const categoryTitle = data[0].attributes.categories.data[0].attributes.title

  return <div className='mb-16 pt-44 lg:pt-[30px] xl:pt-0'>
    <div className="container mx-auto">
      {/* text */}
      <div className='flex flex-col lg:flex-row gap-[30px] mb-[30px]'>
        <div className='flex-1 lg:max-w-[40%] lg:h-[540px] grad rounded-lg flex items-center justify-center'>
          <img className='w-full max-w-[65%]' src={`http://localhost:1337${data[0].attributes.image.data.attributes.url}`} alt="" />
        </div>
        <div className='flex-1 bg-primary p-12 xl:p-20 rounded-lg flex flex-col justify-center'>
          {/* category title  */}
          <div className='uppercase text-accent text-lg font-medium mb-2'>
            {data[0].attributes.categories.data[0].attributes.title} cameras
          </div>
          {/* title */}
          <h2 className='h2 mb-4'>{data[0].attributes.title}</h2>
          {/* description */}
          <p className='mb-12'>{data[0].attributes.description}</p>
          {/* price & button */}
          <div className='flex items-center gap-x-8'>
            {/* prrice */}
            <div className='text-3xl text-accent font-semibold'>${data[0].attributes.price}</div>
            <button
              onClick={() => addToCart(data, id)}
              className='btn btn-accent'>Add to cart</button>
          </div>
        </div>
      </div>
      <RelatedProducts categoryTitle={categoryTitle} />
    </div>

  </div>;
};

export default ProductDetails;
