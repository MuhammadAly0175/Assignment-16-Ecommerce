import { NavLink } from "react-router-dom"
import freshCart from './../../assets/images/freshcart-logo.svg'
import { useContext } from "react"
import { authContext } from "../../context/AuthContextProvider"
import { CartContext } from "../../context/CartContextProvider"


const Navbar = () => {
  const {numOfProducts} = useContext(CartContext)
  const { token, setToken } = useContext(authContext)
  function logOut() {
    setToken(null)
    localStorage.removeItem('tkn')
  }

  return (
    <>
    {}
      {token ? <nav className="fixed w-full bg-gray-100 z-50 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-20 md:p-4 md:justify-between">
          <NavLink to='/' className="flex items-center md:hidden rtl:space-x-reverse" aria-current="page">
            <img src={freshCart} className="h-8" alt="Flowbite Logo" />
          </NavLink>
          <button data-collapse-toggle="navbar-default" type="button" className="cursor-pointer inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="mx-auto hidden w-10/11 md:flex md:justify-between" id="navbar-default">
            <NavLink to='/' className="hidden md:flex items-center space-x-3 rtl:space-x-reverse" aria-current="page">
              <img src={freshCart} className="h-8" alt="Flowbite Logo" />
            </NavLink>
            <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0">
              <li>
                <NavLink to='/' className="transition duration-500 font-normal block py-2 px-3 text-gray-500 rounded-sm md:border-0 hover:text-gray-700 md:p-0" aria-current="page">Home</NavLink>
              </li>
              <li>
                <NavLink to='/cart' className="transition duration-500 font-normal block py-2 px-3 text-gray-500 rounded-sm md:border-0 hover:text-gray-700 md:p-0">Cart</NavLink>
              </li>
              <li>
                <NavLink to='/wishlist' className="transition duration-500 font-normal block py-2 px-3 text-gray-500 rounded-sm md:border-0 hover:text-gray-700 md:p-0">Wish List</NavLink>
              </li>
              <li>
                <NavLink to='/products' className="transition duration-500 font-normal block py-2 px-3 text-gray-500 rounded-sm md:border-0 hover:text-gray-700 md:p-0">Products</NavLink>
              </li>
              <li>
                <NavLink to='/categories' className="transition duration-500 font-normal block py-2 px-3 text-gray-500 rounded-sm md:border-0 hover:text-gray-700 md:p-0">Categories</NavLink>
              </li>
              <li>
                <NavLink to='/brands' className="transition duration-500 font-normal block py-2 px-3 text-gray-500 rounded-sm md:border-0 hover:text-gray-700 md:p-0">Brands</NavLink>
              </li>
              <li>
                <NavLink to='/allorders' className="transition duration-500 font-normal block py-2 px-3 text-gray-500 rounded-sm md:border-0 hover:text-gray-700 md:p-0">Orders</NavLink>
              </li>
            </ul>
            <div className='flex flex-col md:flex-row items-center gap-4'>
              <i className="transition duration-300 text-3xl fa-solid fa-cart-shopping text-gray-600 cursor-pointer hover:text-gray-800 relative">
                <div id='cartQuantity' className='absolute top-[-5px] right-[-5px] text-white rounded text-[12px] py-1 px-2 bg-green-600 font-sans font-semibold'>{numOfProducts}</div>
              </i>
              <NavLink onClick={logOut} to='/login' className="transition block py-2 px-3 text-gray-500 rounded-sm md:border-0 hover:text-gray-700 md:p-0">Log out</NavLink>
            </div>
          </div>
        </div>
      </nav> : <nav className="fixed w-full bg-gray-100 z-50 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-20 md:p-4 md:justify-between">
          <NavLink to='/login' className="flex items-center md:hidden rtl:space-x-reverse" aria-current="page">
            <img src={freshCart} className="h-8" alt="Flowbite Logo" />
          </NavLink>
          <button data-collapse-toggle="navbar-default" type="button" className="cursor-pointer inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="mx-auto hidden w-10/11 md:flex md:justify-between" id="navbar-default">
            <NavLink to='/login' className="hidden md:flex items-center space-x-3 rtl:space-x-reverse" aria-current="page">
              <img src={freshCart} className="h-8" alt="Flowbite Logo" />
            </NavLink>
            <div className='flex flex-col md:flex-row items-center gap-4'>
              <NavLink onClick={logOut} to='/login' className="transition duration-500 block py-2 px-3 text-gray-500 rounded-sm md:border-0 hover:text-gray-700 md:p-0">Log in</NavLink>
              <NavLink to='/register' className="transition duration-500 block py-2 px-3 text-gray-500 rounded-sm md:border-0 hover:text-gray-700 md:p-0">Register</NavLink>
            </div>
          </div>
        </div>
      </nav>}
    </>
  )
}

export default Navbar
