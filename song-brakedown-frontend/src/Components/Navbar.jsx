import React from 'react';
import { useState, useEffect } from "react";
import { BiCamera } from "react-icons/bi";
import { BiUserCircle } from "react-icons/bi";
import { FaBars } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";



export const Navbar = () => {


    let Links = [
        {name: 'Home', link: '/'},
        {name: 'Tutorials', link: '/Tutorials'},
        {name: 'Contact', link: '/Contact'},
        {name: 'Teams', link: '/Library'},
    ];

    let [isOpen, setisOpen] = useState(false);

    const [isSmallScreen, setIsMdScreen] = useState(window.innerWidth < 1024); 

    const handleResize = () => {
        setIsMdScreen(window.innerWidth < 1024);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    if (isSmallScreen) {
        Links.push({name: 'Profile', link: '/Profile'});
    }
    
    return (
        <div className='flex h-20 lg:flex-rowgap-4 p-4 px-5 items-center justify-center place-items-center bg-[#cc8111] w-full z-40 top-0 fixed'>

                <div className='grow lg:grow-0 text-white text-5xl'><a href="/"><BiCamera/></a></div>

                <div onClick={() => setisOpen(!isOpen)} className='cursor-pointer lg:hidden'>
                    {
                        isOpen ? <FaXmark className='text-white text-4xl'/> : <FaBars className='text-white text-4xl'/>
                    }
                </div>

                <ul className={`items-center justify-center place-items-center absolute bg-[#cc8111] lg:flex lg:grow lg:items-center lg:static w-full ${isOpen ? 'bg-opacity-70 top-20 h-screen backdrop-blur-sm '  : 'hidden'}`}>
                    {
                        Links.map(link => (
                            <li key={link.name} className='m-10 flex items-center justify-center place-items-center my-5 lg:my-0 text-white text-2xl font-bold'>
                                <a href={link.link} className={`p-2 rounded-md ${location.pathname === link.link ? 'bg-gradient-to-b from-[#cc8111]/0 from-70% to-white to-100% text-white' : 'text-white'}`}>
                                    {link.name}
                                </a>
                            </li>))
                    }
                </ul>
                <a href="/Profile"><div className='hidden lg:block text-white text-5xl'><BiUserCircle/></div></a>
        </div>
    )
}