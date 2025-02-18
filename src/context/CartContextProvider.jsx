import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { authContext } from './AuthContextProvider';
import toast from './../../node_modules/react-hot-toast/src/index';

export const CartContext = createContext()

const CartContextProvider = ({ children }) => {
    const { token } = useContext(authContext)
    const [products, setProducts] = useState([])
    const [numOfProducts, setNumOfProducts] = useState(<i className="fa-solid fa-spinner fa-spin-pulse text-xs"></i>)
    const [totalPrice, setTotalPrice] = useState(<i className="fa-solid fa-spinner fa-spin-pulse text-xs"></i>)
    const [loadingCount, setLoadingCount] = useState(false)
    const [clearingCart, setclearingCart] = useState(false)
    const [cartId, setCartId] = useState(null)


    async function getCart() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            })
            setProducts(data.data.products)
            setNumOfProducts(data.numOfCartItems)
            setTotalPrice(data.data.totalCartPrice)
            setLoadingCount(false)
            setclearingCart(false)
            if(data){
                if(data.data){
                    setCartId(data.data._id)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function addProductToCart(id) {
        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
                productId: id
            }, {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            })
            toast.success('Product has been added to your cart.')
            getCart()
            return data
        } catch (e) {
            console.log(e.message)
        }
    }

    async function updateCount(id, count) {
        setLoadingCount(true)
        try {
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                count: count
            },
                {
                    headers: {
                        token: localStorage.getItem('tkn')
                    }
                }
            )
            getCart()
        } catch (e) {
            console.log(e)
        }
    }

    async function removeProduct(id) {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            })
            getCart()
            toast.success('Product was successfully removed from your cart.')
        } catch (e) {
            console.log(e)
        }
    }

    async function clearCart() {
        setclearingCart(true)
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            })
            getCart()
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(function () {
        if (token) {
            getCart()
        }
    }, [token])

    return (
        <>
            <CartContext.Provider value={
                {
                    addProductToCart,
                    products,
                    numOfProducts,
                    totalPrice,
                    updateCount,
                    loadingCount,
                    removeProduct,
                    clearCart,
                    clearingCart,
                    cartId,
                    setProducts,
                    setNumOfProducts,
                }
            }>
                {children}
            </CartContext.Provider>
        </>
    )
}

export default CartContextProvider
