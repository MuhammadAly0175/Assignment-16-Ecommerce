
import { Outlet } from 'react-router-dom';
import Navbar from './../Navbar/Navbar';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className={'[@media(max-width:382px)]:pt-[104px] pt-[72px] md:pt-[64px]'} > </div>
      <Outlet />
      <footer className='py-7'>
      </footer>
    </>
  )
}

export default Layout
