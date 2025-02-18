import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import toast from './../../../node_modules/react-hot-toast/src/index';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../context/AuthContextProvider';

const Login = () => {

  useEffect(function () {
    if (localStorage.getItem('tkn')) {
      navigate("/")
    }
  }, [])

  const [isLoading, setisLoading] = useState(false)

  const navigate = useNavigate()

  const { setToken } = useContext(authContext)

  const userInfo = {
    email: "",
    password: "",
  }

  async function signin(values) {
    setisLoading(true)
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      localStorage.setItem("tkn", data.token)
      setToken(data.token)
      setisLoading(false)
      navigate("/")
    }
    catch (e) {
      if (e.response.data.message == 'fail') {
        e.response.data.message = 'Incorrect email or password'
      }
      toast.error(e.response.data.message)
      setisLoading(false)
    }
  }

  const yupValidation = Yup.object().shape(
    {
      email: Yup.string(),
      password: Yup.string(),
    }
  )

  const formik = useFormik({
    initialValues: userInfo,
    onSubmit: signin,
    validationSchema: yupValidation,
  })

  return (
    <>
      <section>
        <div className='container py-10 mx-auto'>
          <h1 className='text-5xl font-bold text-green-700 text-center pb-10'>Login Now.</h1>
          <form onSubmit={formik.handleSubmit} className='w-[60%] mx-auto'>
            <div className="relative z-0 w-full mb-5 group">
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="text" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
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
            <button type='submit' className="focus:outline-none text-white bg-green-600 hover:bg-green-500 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer transition duration-500">
              {isLoading ? <div className="threeDotsLoader"></div> : 'Log in'}
            </button>
            <br></br>
            <Link to='/forgotpassword' className='hover:text-green-600 transition duration-300'>Forgot your password?</Link>
          </form>
        </div>
      </section>
    </>
  )
}

export default Login
