import axios from "axios";
import { useQuery } from "react-query";

const Brands = () => {
  
  const { data } = useQuery('brands', getAllBrands, { refetchInterval: 60000 })

  async function getAllBrands() {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }

  return (
    <>
      <section>
        <h1 className='text-5xl font-bold text-green-700 text-center py-10'>Brands</h1>
        <div className='py-7 flex flex-wrap justify-center max-w-7xl gap-5 mx-auto px-7 md:px-0'>
          {data ? data.data.data.map(function (category, idx) {
            return (
              <div key={idx} className='oveflow-hidden w-[100%] md:w-1/5 focus:outline-0 rounded-lg border-1 border-gray-300 hover:shadow-[0px_1px_10px_rgb(0,166,62)] transition duration-500'>
                <img src={category.image} alt="Category Image" className='w-full h-[200px]' />
                <h1 className='my-5 text-3xl text-center text-green-700 font-semibold'>{category.name}</h1>
              </div>
            )
          }) : ''}
        </div>
      </section>
    </>
  )
}

export default Brands
