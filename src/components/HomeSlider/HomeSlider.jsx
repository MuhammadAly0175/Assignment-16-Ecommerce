import Slider from "react-slick";
import sliderImg3 from './../../assets/images/slider-image-3.jpeg'
import sliderImg2 from './../../assets/images/slider-image-2.jpeg'
import groceryBannerImg1 from './../../assets/images/grocery-banner-2.jpeg'
import groceryBannerImg2 from './../../assets/images/grocery-banner.png'


const HomeSlider = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <>
            <section className='py-7 mb-5 max-w-7xl mx-auto'>
                <div className='flex flex-wrap max-w-[90%] mx-auto justify-center items-center flex-col md:flex-row'>
                    <div className='w-[100%] md:w-2/3 md:h-[20em] [@media(min-width:1010px)]:h-[25em] [@media(min-width:1175px)]:h-[30em] overflow-hidden'>
                        <div className="slider-container h-fit">
                            <Slider {...settings}>
                                <div className='focus:outline-0'>
                                    <img src={sliderImg3} alt="slider image 3" className='aspect-3/2' />
                                </div>
                                <div className='focus:outline-0'>
                                    <img src={sliderImg2} alt="slider image 2" className='aspect-3/2' />
                                </div>
                            </Slider>
                        </div>
                    </div>
                    <div className='w-[100%] md:w-1/3 md:h-[20em] [@media(min-width:1010px)]:h-[25em] [@media(min-width:1175px)]:h-[30em] overflow-hidden'>
                        <img src={groceryBannerImg1} alt="grocery Banner Iamge 1" className='w-full h-[50%] mb-2 md:mb-0' />
                        <img src={groceryBannerImg2} alt="grocery Banner Iamge 2" className='w-full h-[50%]' />
                    </div>
                </div>

            </section>
        </>
    )
}

export default HomeSlider