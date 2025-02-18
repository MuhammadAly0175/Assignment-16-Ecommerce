import { useContext } from 'react'
import { CartContext } from './../../context/CartContextProvider';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { products, numOfProducts, totalPrice, updateCount, loadingCount, removeProduct, clearCart, clearingCart } = useContext(CartContext)
  return (
    <>
      <section className='md:p-20'>
        <div className='p-10 bg-[rgb(248,249,250)] max-w-7xl mx-auto'>
          {products?.length > 0 ? <div>
            <div className='flex justify-between items-center'>
              <h2 className='text-4xl font-semibold text-gray-800'>Cart Shop</h2>
              <Link to='/checkout'>
                <button type="button" className="transition duration-500 cursor-pointer text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
                  Check Out
                </button>
              </Link>
            </div>
            <div className='flex justify-between items-center mt-10'>
              <h2 className='text-xl font-semibold text-gray-800'>
                Total Price: <span className='text-green-500'>{totalPrice}</span> EGP
              </h2>
              <h2 className='text-xl font-semibold text-gray-800'>
                Number of Products: <span className='text-green-500'>{numOfProducts}</span>
              </h2>
            </div>
          </div> : ''}

          {products ? products.map(function (product, idx) {
            return <div key={idx}>
              <div className='flex flex-col md:flex-row justify-between items-center mt-10'>
                <div className='w-2/3 md:w-2/9'>
                  <img src={product.product.imageCover} alt="Product Image" className='w-full' />
                </div>
                <div className='flex w-7/9 justify-between items-center px-5'>
                  <div>
                    <h1 className='text-wrap max-w-sm mb-3 font-semibold text-lg'>{product.product.title}</h1>
                    <h2 className='mb-5 font-semibold text-gray-900'>{product.price} EGP</h2>
                    <button onClick={function () { removeProduct(product.product._id) }} className='cursor-pointer text-red-500 flex items-center'>
                      <i className="fa-solid fa-trash font-mono mr-1"></i>
                      Remove
                    </button>
                  </div>
                  <div>
                    <button onClick={function () {
                      updateCount(product.product._id, product.count + 1)
                    }} className='cursor-pointer transition duration-300 p-1 rounded-lg w-10 h-10 border-1 border-green-400 hover:border-green-600'>+</button>
                    <span className='mx-5'>{loadingCount ? <i className="fa-solid fa-spinner fa-spin-pulse text-xs"></i> : product.count}</span>
                    <button onClick={function () {
                      updateCount(product.product._id, product.count - 1)
                    }} className='cursor-pointer transition duration-300 p-1 rounded-lg w-10 h-10 border-1 border-red-400 hover:border-red-500'>-</button>
                  </div>
                </div>
              </div>
              <hr className='border-0.1 border-gray-300 my-10'></hr>
            </div>
          }) : <div className='my-10'><div className='threeDotsLoader2'></div></div>}
          {products?.length > 0 ? <div className='w-full block text-center'><button onClick={clearCart} className='cursor-pointer transition duration-300 py-3 px-5 rounded-lg border-1 border-gray-400 hover:border-gray-600'>{clearingCart ? <div className="threeDotsLoader"></div> : 'Clear Cart'}</button></div> : <h1 className='text-5xl text-center'>Your cart is empty</h1>}
        </div>
      </section>
    </>
  )
}

export default Cart
