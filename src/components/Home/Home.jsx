import axios from "axios"
import { useQuery } from "react-query";
import HomeSlider from './../HomeSlider/HomeSlider';
import CategorySlider from './../CategorySlider/CategorySlider';
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from './../../context/CartContextProvider';
import { WishListContext } from "../../context/WishListContextProvider";


const Home = () => {

  const { products, addProductToWishList } = useContext(WishListContext)

  let favourites = new Array(products.data)

  async function getAllProducts() {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  const { isLoading, error, data, isFetching } = useQuery('products', getAllProducts, { refetchInterval: 60000 })

  const [loading, setLoading] = useState(false)
  const { addProductToCart } = useContext(CartContext)
  async function addToCart(id) {
    setLoading(true)
    const res = await addProductToCart(id);
    if (res.status == 'success') {
      setLoading(false)
    } else {
      toast.error("ERROR")
      setLoading(false)
    }
  }

  return (
    <>
      <section className=''>
        <HomeSlider />
        <CategorySlider />
        <div className='flex flex-wrap justify-center max-w-7xl mx-auto'>
          {data ? data.data.data.map(function (product, idx) {
            return (
              <div key={idx} className='group overflow-hidden h-fit transition cursor-pointer duration-500 rounded-lg py-5 w-[100%] md:w-[45%] lg:w-[20%] mx-[10px] mt-[20px] hover:shadow-[0px_1px_10px_rgb(0,166,62)]'>
                <Link to={`/productdetails/${product.id}`}>
                  <img src={product.imageCover} alt="product cover image" className='rounded-lg w-full' />
                  <p className='text-green-500 px-5 mb-3 mt-1'>{product.category.name}</p>
                  <h2 className='px-5 font-semibold '>{product.title}</h2>
                  <div className='px-5 flex justify-between items-center mb-2'>
                    <span>{product.price} EGP</span>
                    <span><i className="fa-solid fa-star text-yellow-500"></i> {product.ratingsAverage}</span>
                  </div>
                </Link>
                <div className='px-5 flex justify-between items-center'>
                  <button onClick={function () { addToCart(product.id) }} type="button" className="flex justify-center cursor-pointer transition duration-500 text-white bg-green-600 hover:bg-green-500 font-medium rounded-lg text-sm w-5/8 py-2 mr-2 focus:outline-none relative translate-y-50 group-hover:translate-y-0 ">
                    {loading ? <div className="threeDotsLoader"></div> : 'Add To Cart'}
                  </button>
                  <button onClick={function () { addProductToWishList(product.id) }} type="button" className="flex justify-center cursor-pointer transition duration-500 text-white bg-blue-600 hover:bg-blue-500 font-medium rounded-lg text-sm w-3/8 py-2 mr-2 focus:outline-none relative translate-y-50 group-hover:translate-y-0 ">
                    Wishlist
                  </button>
                  {favourites[0] ? favourites[0].map(function (item, index) {
                    if (item.id.includes(product.id)) {
                      return <i className={`fa-solid fa-heart text-3xl text-red-600 hover:text-red-800 transition duration-500`}></i>
                    }
                  }) : console.log('no123')}
                </div>
              </div>
            )
          }) : <div className='h-[90vh] flex flex-col items-cente'>
            <div className='threeDotsLoader2'></div>
          </div>}
        </div>
      </section >
    </>
  )
}

export default Home
