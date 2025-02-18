import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { authContext } from "../../context/AuthContextProvider"
import toast from './../../../node_modules/react-hot-toast/src/index';
import * as Yup from 'yup'
import { useFormik } from "formik"
import axios from "axios"

const ResetPassword = () => {

    useEffect(function () {
        if (localStorage.getItem('tkn')) {
            navigate("/")
        }
    }, [])

    const [isLoading, setisLoading] = useState(false)

    const navigate = useNavigate()

    const userInfo = {
        email: "",
        newPassword: ""
    }

    async function createNewPassword(values) {
        setisLoading(true)
        try {
            const { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
            toast.success('Your info has been successfully updated.')
            setisLoading(false)
            navigate("/login")
        }
        catch (e) {
            toast.error(e.message)
            setisLoading(false)
        }
    }

    const yupValidation = Yup.object().shape(
        {
            email: Yup.string().required("Email is required.").email("The Email you have entered is not valid, please enter a valid Email."),
            newPassword: Yup.string().required("Password is required.").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,30}$/, "Password must contain at least one capital letter,\none small letter,\nand one number.\nAnd password's length must be between 6-30 characters long."),
        }
    )

    const formik = useFormik({
        initialValues: userInfo,
        onSubmit: createNewPassword,
        validationSchema: yupValidation,
    })

    return (
        <>
            <section>
                <div className='container py-10 mx-auto'>
                    <form onSubmit={formik.handleSubmit} className='w-[60%] mx-auto'>
                        <h1 className='text-3xl font-bold text-green-700 pb-10'>Enter your new info</h1>
                        <div className="relative z-0 w-full mb-5 group">
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                        </div>
                        {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 whitespace-pre" role="alert">
                            <span className="font-medium">{formik.errors.email}</span>
                        </div> : ''}
                        <div className="relative z-0 w-full mb-5 group">
                            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} type="password" name="newPassword" id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                            <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Password</label>
                        </div>
                        {formik.errors.newPassword && formik.touched.newPassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 whitespace-pre" role="alert">
                            <span className="font-medium">{formik.errors.newPassword}</span>
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

export default ResetPassword
