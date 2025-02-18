import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";

const CategorySlider = () => {

    const { data } = useQuery('categories', getAllCategory, { refetchInterval: 60000 })

    async function getAllCategory() {
        return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className='absolute cursor-pointer left-[47.5%] top-[105%]'
                style={{ ...style, }}
                onClick={onClick}
            ><i className="fa-solid fa-chevron-left text-2xl text-green-700"></i></div>
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className='absolute cursor-pointer left-[52.5%] top-[105%]'
                style={{ ...style, }}
                onClick={onClick}
            ><i className="fa-solid fa-chevron-right text-2xl text-green-700"></i></div>
        );
    }

    let settings = {
        prevArrow: <SampleNextArrow />,
        nextArrow: <SamplePrevArrow />,
        dots: false,
        infinite: true,
        draggable: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 957,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 755,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
        ]
    };
    return (
        <>
            <div className="slider-container mb-7 mx-auto max-w-7xl">
                <Slider {...settings}>
                    {data ? data.data.data.map(function (category, idx) {
                        return (
                            <div key={idx} className='oveflow-hidden w-[100px] focus:outline-0'>
                                <img src={category.image} alt="Category Image" className='w-full h-[250px]' />
                                <h1 className='text-gray-900 text-2xl font-normal'>{category.name}</h1>
                            </div>
                        )
                    }) : ''}

                </Slider>
            </div>
        </>
    )
}

export default CategorySlider
