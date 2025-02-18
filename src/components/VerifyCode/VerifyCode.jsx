import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { authContext } from "../../context/AuthContextProvider"
import toast from './../../../node_modules/react-hot-toast/src/index';
import * as Yup from 'yup'
import { useFormik } from "formik"
import axios from "axios"

const VerifyCode = () => {

    useEffect(function () {
        if (localStorage.getItem('tkn')) {
            navigate("/")
        }
    }, [])

    const [isLoading, setisLoading] = useState(false)

    const navigate = useNavigate()

    const userInfo = {
        resetCode: "",
    }

    async function verifyResetCode(values) {
        setisLoading(true)
        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
            setisLoading(false)
            navigate("/resetpassword")
        }
        catch (e) {
            toast.error(e.message)
            setisLoading(false)
        }
    }

    const yupValidation = Yup.object().shape(
        {
            resetCode: Yup.string().required('Reset code is required.'),
        }
    )

    const formik = useFormik({
        initialValues: userInfo,
        onSubmit: verifyResetCode,
        validationSchema: yupValidation,
    })

    return (
        <>
            <section>
                <div className='container py-10 mx-auto'>
                    <form onSubmit={formik.handleSubmit} className='w-[60%] mx-auto'>
                        <h1 className='text-3xl font-bold text-green-700 pb-10'>Enter your reset code.</h1>
                        <div className="relative z-0 w-full mb-5 group">
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} type="text" name="resetCode" id="resetCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                            <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Reset code</label>
                        </div>
                        {formik.errors.resetCode && formik.touched.resetCode ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 whitespace-pre" role="alert">
                            <span className="font-medium">{formik.errors.resetCode}</span>
                        </div> : ''}
                        <button type='submit' className="focus:outline-none text-white bg-green-600 hover:bg-green-500 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer transition duration-500">
                        {isLoading ? <div className="threeDotsLoader"></div> : 'Reset'}
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default VerifyCode
