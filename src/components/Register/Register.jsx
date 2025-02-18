import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import toast from './../../../node_modules/react-hot-toast/src/index';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  useEffect(function () {
    if (localStorage.getItem('tkn')) {
      navigate("/")
    }
  }, [])

  const [isLoading, setisLoading] = useState(false)

  const navigate = useNavigate()

  const userInfo = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: ""
  }

  async function signup(values) {
    setisLoading(true)
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      toast.success(data.message)
      setisLoading(false)
      navigate("/login")
    }
    catch (e) {
      toast.error(e.response.data.message)
      setisLoading(false)
    }
  }

  const yupValidation = Yup.object().shape(
    {
      name: Yup.string().required("Name is required.").matches(/^(?=.*[A-Za-z]).{3,30}$/, "Name must contain at least 3 letters and at most 30 letters.\nAnd it can't contain numbers."),
      email: Yup.string().required("Email is required.").email("The Email you have entered is not valid, please enter a valid Email."),
      password: Yup.string().required("Password is required.").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,30}$/, "Password must contain at least one capital letter,\none small letter,\nand one number.\nAnd password's length must be between 6-30 characters long."),
      rePassword: Yup.string().required("Re-password is required.").oneOf([Yup.ref("password")], "Passwords don't match."),
      phone: Yup.string().required("Phone number is required.").matches(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/, "Please enter a valid Egyptian phone number.")
    }
  )

  const formik = useFormik({
    initialValues: userInfo,
    onSubmit: signup,
    validationSchema: yupValidation,
  })

  return (
    <section>
      <div className='py-10 mx-auto'>
        <h1 className='text-5xl font-bold text-green-700 text-center pb-10'>Register Now</h1>

        <form onSubmit={formik.handleSubmit} className='w-[90%] md:w-[60%] mx-auto'>
          <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
          </div>
          {formik.errors.name && formik.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 whitespace-pre" role="alert">
            <span className="font-medium">{formik.errors.name}</span>
          </div> : ''}
          <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
          </div>
          {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 whitespace-pre" role="alert">
            <span className="font-medium">{formik.errors.email}</span>
          </div> : ''}
          <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          </div>
          {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 whitespace-pre" role="alert">
            <span className="font-medium">{formik.errors.password}</span>
          </div> : ''}
          <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Re-password</label>
          </div>
          {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 whitespace-pre" role="alert">
            <span className="font-medium">{formik.errors.rePassword}</span>
          </div> : ''}
          <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
          </div>
          {formik.errors.phone && formik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 whitespace-pre" role="alert">
            <span className="font-medium">{formik.errors.phone}</span>
          </div> : ''}
          <button type='submit' className="focus:outline-none text-white bg-green-600 hover:bg-green-500 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer transition duration-500">
            {isLoading ? <div className="threeDotsLoader"></div> : 'Register'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Register
