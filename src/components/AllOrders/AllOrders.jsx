import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { useQuery } from "react-query"
import someimg from "./../../assets/someimg.jpeg"


const AllOrders = () => {

    const { id } = jwtDecode(localStorage.getItem('tkn'))

    const { data } = useQuery("allOrders", getAllOrders)

    async function getAllOrders() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    }

    console.log(data)

    return (
        <>
            <section className='md:p-20'>
                <div className='p-10 max-w-7xl mx-auto bg-[rgb(248,249,250)]'>
                    {data ? data.data.map(function (order, idx) {
                        return <div key={idx    }>
                            <h1>Total Order Price: {order.totalOrderPrice} EGP</h1>
                            <h1>Payment Method: {order.paymentMethodType}</h1>
                            <div className='flex flex-wrap justify-center items-center mt-5'>
                                {order.cartItems? order.cartItems.map(function(product, idx){
                                    return <img src={product.product.imageCover} alt="Product Image" className='w-1/4 md:w-1/5' />
                                }) : ''}
                            </div>
                            <hr className='border-0.1 border-gray-300 my-10'></hr>
                        </div>
                    }) : <h1 className='text-5xl text-center'>No Orders Yet</h1>}
                </div>
            </section>
        </>
    )
}

export default AllOrders
