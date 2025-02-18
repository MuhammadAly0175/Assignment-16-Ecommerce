import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import toast from './../../../node_modules/react-hot-toast/src/index';
import { useContext, useState } from 'react';
import { CartContext } from './../../context/CartContextProvider';


const CheckOut = () => {

    const { cartId, setProducts, setNumOfProducts } = useContext(CartContext)

    const [isLoading, setisLoading] = useState(false)

    const userInfo = {
        details: "",
        phone: "",
        city: ""
    }

    async function onlineOrder(values) {
        setisLoading(true)
        const x = {
            shippingAddress: values
        }
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, x,
                {
                    headers: {
                        token: localStorage.getItem('tkn')
                    },
                    params: {
                        url: "http://localhost:5173"
                    }
                })
            setisLoading(false)
            window.open(data.session.url)
        }
        catch (e) {
            setisLoading(false)
            console.log(e)
        }
    }

    const yupValidation = Yup.object().shape(
        {
            details: Yup.string().required("Details is required.").matches(/^(?=.*[A-Za-z0-1]).{3,1000}$/, "Details must contain at least 3 letters."),
            phone: Yup.string().required("Phone number is required.").matches(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/, "Please enter a valid Egyptian phone number."),
            city: Yup.string().required("City is required."),
        }
    )

    const formik = useFormik({
        initialValues: userInfo,
        onSubmit: onlineOrder,
        validationSchema: yupValidation,
    })
    return (
        <>
            <section>
                <div className='py-10 mx-auto max-w-7xl mx-auto'>
                    <form onSubmit={formik.handleSubmit} className='w-[90%] md:w-[60%] mx-auto'>
                        <div className="relative z-0 w-full mb-5 group">
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                            <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
                        </div>
                        {formik.errors.details && formik.touched.details ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 whitespace-pre" role="alert">
                            <span className="font-medium">{formik.errors.details}</span>
                        </div> : ''}
                        <div className="relative z-0 w-full mb-5 group">
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
                        </div>
                        {formik.errors.phone && formik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 whitespace-pre" role="alert">
                            <span className="font-medium">{formik.errors.phone}</span>
                        </div> : ''}
                        <div className="relative z-0 w-full mb-5 group">
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                            <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
                        </div>
                        {formik.errors.city && formik.touched.city ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 whitespace-pre" role="alert">
                            <span className="font-medium">{formik.errors.city}</span>
                        </div> : ''}

                        <button onClick={onlineOrder} type='submit' className="flex justify-center w-full focus:outline-none text-white bg-green-600 hover:bg-green-500 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer transition duration-500">
                            {isLoading ? <div className="threeDotsLoader"></div> : 'Check Out'}
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default CheckOut
