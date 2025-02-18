import { useContext } from 'react'
import { WishListContext } from '../../context/WishListContextProvider'
import { CartContext } from '../../context/CartContextProvider'

const WishList = () => {

    const { products, deleteFromWishList } = useContext(WishListContext)
    const { addProductToCart } = useContext(CartContext)

    return (
        <>
            <section className='md:p-20'>
                <div className='p-10 max-w-7xl mx-auto bg-[rgb(248,249,250)]'>
                    {products.data?.length > 0? products.data.map(function (product, idx) {
                        return <div key={idx}>
                            <div className='flex flex-col md:flex-row justify-between items-center mt-10'>
                                <div className='w-2/3 md:w-2/9'>
                                    <img src={product.imageCover} alt="Product Image" className='w-full' />
                                </div>
                                <div className='flex w-7/9 justify-between items-center px-5'>
                                    <div>
                                        <h1 className='text-wrap max-w-sm mb-3 font-semibold text-lg'>{product.title}</h1>
                                        <h2 className='mb-5 font-semibold text-gray-900'>{product.price} EGP</h2>
                                        <button onClick={function(){
                                            deleteFromWishList(product.id)
                                        }} className='cursor-pointer text-red-500 flex items-center'>
                                            <i className="fa-solid fa-trash font-mono mr-1"></i>
                                            Remove
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={function () { addProductToCart(product.id); }} className='cursor-pointer transition duration-300 py-2 px-5 rounded-lg border-1 border-green-400 hover:border-green-600'>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                            <hr className='border-0.1 border-gray-300 my-10'></hr>
                        </div>
                    }) : <h1 className='text-5xl text-center'>Your wish list is empty.</h1>}
                </div>
            </section>
        </>
    )
}

export default WishList
