import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import axios from "axios"
import Slider from "react-slick";
import { useContext, useState } from "react";
import { CartContext } from './../../context/CartContextProvider';
import toast from './../../../node_modules/react-hot-toast/src/index';
import { WishListContext } from "../../context/WishListContextProvider";


const ProductDetails = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const { addProductToCart } = useContext(CartContext)

    const { products, addProductToWishList } = useContext(WishListContext)

    let favourites = new Array(products.data)

    async function addToCart() {
        setLoading(true)
        const res = await addProductToCart(id);
        if (res.status == 'success') {
            toast.success('Product has been added to cart.')
            setLoading(false)

        } else {
            toast.error("ERROR")
            setLoading(false)
        }
    }

    const { data, isLoading } = useQuery(`productDetails${id}`, getProductDetails, { refetchInterval: 60000 })
    async function getProductDetails() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    }

    return (
        <>
            <section>
                <div className="slider-container max-w-7xl mx-auto">
                    {data ? <div className='flex flex-wrap justify-center items-center md:w-[80%] mx-auto mb-20'>
                        <Slider {...settings} className='w-[80%] md:w-1/3'>
                            {data.data.data.images.map(function (image, idx) {
                                return (
                                    <div key={idx} className='focus:outline-0'>
                                        <img src={image} alt="slider image" />
                                    </div>
                                )
                            })}

                        </Slider>
                        <div className='md:w-2/3'>
                            <h2 className='px-5 font-semibold text-4xl mb-5'>{data.data.data.title}</h2>
                            <h2 className='px-5 font-medium mb-6 whitespace-pre-line'>{data.data.data.description}</h2>
                            <div className='px-5 flex justify-between items-center mb-5'>
                                <span>{data.data.data.price} EGP</span>
                                <span><i className="fa-solid fa-star text-yellow-500"></i> {data.data.data.ratingsAverage}</span>
                            </div>
                            <div className='px-5 flex justify-between items-center'>
                                <button onClick={addToCart} type="button" className="flex justify-center cursor-pointer transition duration-500 text-white bg-green-600 hover:bg-green-500 font-medium rounded-lg text-sm w-5/8 py-2 mr-2 focus:outline-none relative ">
                                    {loading ? <div className="threeDotsLoader"></div> : 'Add'}
                                </button>
                                <button onClick={function () { addProductToWishList(data.data.data.id) }} type="button" className="flex justify-center cursor-pointer transition duration-500 text-white bg-blue-600 hover:bg-blue-500 font-medium rounded-lg text-sm w-2/8 py-2 mr-2 focus:outline-none relative">
                                    Wishlist
                                </button>
                                {favourites[0] ? favourites[0].map(function (item, index) {
                                    if (item.id.includes(data.data.data.id)) {
                                        return <i className={`fa-solid fa-heart text-3xl text-red-600 hover:text-red-800 transition duration-500`}></i>
                                    }
                                }) : console.log('no123')}
                            </div>
                        </div>
                    </div> : ''}
                </div>
            </section>
        </>
    )
}

export default ProductDetails