import { useContext, useState } from 'react';
import React from 'react';
import { NavLink, useNavigate,Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import profile from '../assets/profile.png'
import dropdown_icon from '../assets/dropdown_icon.svg'
import menu_icon from '../assets/menu_icon.svg'

function Navbar() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const { token, setToken, userData } = useContext(AppContext);

    const logout = () => {
        setToken(false);
        localStorage.removeItem('token');
        navigate('/')
    };

    return (
        <nav className='flex justify-between items-center py-4 mb-5 border-b border-gray-400'>
            <div className='ml-10 cursor-pointer' onClick={() => navigate('/')}> 
                <h1 className='text-3xl font-bold'><span className='text-primary'>Park</span><span>Ease</span></h1>
                <p className='text-[15px]'>Smart Parking System</p>
            </div>

            <ul className='hidden md:flex items-center gap-5 font-semibold'>
                <NavLink to='/'>
                <p>Home</p>
                <hr className='border-none outline-none h-1 bg-primary w-full m-auto hidden'/>
                </NavLink>

                <NavLink to='/services'>
                <p>Services</p>
                <hr className='border-none outline-none h-1 bg-primary w-full m-auto hidden'/>
                </NavLink>

                <NavLink to='/about'>
                <p>About</p>
                <hr className='border-none outline-none h-1 bg-primary w-full m-auto hidden'/>
                </NavLink>

                <NavLink to='/contact-us'>
                <p>Contact Us</p>
                <hr className='border-none outline-none h-1 bg-primary w-full m-auto hidden'/>
                </NavLink>
            </ul>

            <div className='flex items-center gap-4 mr-5'>
              
                {token && userData ? (
                    <div className='flex items-center gap-2 cursor-pointer group relative'>
                        <img src={profile} className='w-8 rounded-full' alt='User' />
                        <img src={dropdown_icon} className='w-2.5' alt='Dropdown' />
                        <div className='absolute top-0 right-0 pt-12 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                <p onClick={() => navigate('/my-bookings')} className='hover:text-black cursor-pointer'>My Bookings</p>
                                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Link to='/login'>
                        <button className='bg-primary text-white px-4 py-2 rounded-md font-bold'>Login</button>
                    </Link>
                )}
                
                <img onClick={() => setShowMenu(true)} src={menu_icon} alt='Menu' className='w-6 md:hidden' />
            </div>

            {/* Mobile Menu */}
            <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                <div className='flex items-center justify-between px-5 py-6'>
                    {/* <img src={assets.logo} alt='Logo' className='w-36' /> */}
                    {/* <img className='w-7 cursor-pointer' src={assets.cross_icon} alt='Close' onClick={() => setShowMenu(false)} /> */}
                </div>
                <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                    <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
                    <NavLink onClick={() => setShowMenu(false)} to='/services'><p className='px-4 py-2 rounded inline-block'>Services</p></NavLink>
                    <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>About</p></NavLink>
                    <NavLink onClick={() => setShowMenu(false)} to='/contact-us'><p className='px-4 py-2 rounded inline-block'>Contact Us</p></NavLink>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
