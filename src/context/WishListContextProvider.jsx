import { createContext, useContext, useEffect, useState } from 'react';
import { authContext } from './AuthContextProvider';
import axios from 'axios';
import toast from './../../node_modules/react-hot-toast/src/index';

export const WishListContext = createContext()

const WishListContextProvider = ({ children }) => {
    const { token } = useContext(authContext)

    const [products, setProducts] = useState([])

    async function getWishList() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            })
            if (data) {
                setProducts(data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function addProductToWishList(id) {
        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
                productId: id
            }, {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            })
            toast.success('Product has been added to your wishlist.')
            getWishList()
            return data
        } catch (e) {
            console.log(e.message)
        }
    }

    async function deleteFromWishList(id) {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            })
            getWishList()
            toast.success('Product was successfully removed from your wish list.')
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(function () {
        if (token) {
            getWishList()
        }
    }, [token])

    return (
        <>
            <WishListContext.Provider value={{ products, deleteFromWishList, addProductToWishList }}>
                {children}
            </WishListContext.Provider >
        </>
    )
}

export default WishListContextProvider
