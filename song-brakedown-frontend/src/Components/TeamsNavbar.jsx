import React from 'react';
import { RiArrowDownSLine } from "react-icons/ri";

export const TeamsNavbar = () => {
    let Links = [
        {name: 'Overview', link: '/Overview'},
        {name: 'Library', link: '/Library'},
        {name: 'Events', link: '/Events'},
    ];

    return (
        <>
        <div className='hidden h-28 md:h-auto md:flex flex-col md:flex-row items-center justify-center place-items-center gap-0 md:gap-2  p-2 md:p-4 px-4 bg-black w-full z-30 top-20 fixed'>
            <div className='flex gap-2 mx-4 md:m-0 text-nowrap text-white text-xl font-bold border p-1 md:p-2 rounded-sm '>
                Team Name
                <RiArrowDownSLine className='text-3xl'/>  
            </div>
            <ul className={`flex items-center  justify-center md:justify-normal place-items-center w-full`}>
                {
                    Links.map(link => (
                    <li key={link.name} className='m-3 md:m-4 flex items-center justify-center place-items-center my-1 md:my-0 text-white text-xl font-bold'>
                        <a href={link.link} className={`p-2 rounded-md ${location.pathname === link.link ? 'bg-gradient-to-b from-[#cc8111]/0 from-70% to-white to-100% text-white' : 'text-white'}`}>
                            {link.name}
                        </a>
                    </li>))
                }
            </ul>
        </div>

        <div className='md:hidden h-14 md:h-auto flex flex-col md:flex-row items-center justify-center place-items-center gap-0 md:gap-2  p-2 md:p-4 px-4 bg-black w-full z-30 top-20 fixed'>
            <div className='flex gap-2 mx-4 md:m-0 text-nowrap text-white text-xl font-bold border p-1 md:p-2 rounded-sm '>
                Team Name
                <RiArrowDownSLine className='text-3xl'/>  
            </div>
        </div>

        <div className='md:hidden h-14 md:h-auto flex flex-col md:flex-row border-t border-stone-700 items-center justify-center place-items-center gap-0 md:gap-2  p-2 md:p-4 px-4 bg-black w-full z-30 bottom-0 fixed'>
            <ul className={`flex items-center  justify-center md:justify-normal place-items-center w-full`}>
                {
                    Links.map(link => (
                    <li key={link.name} className='m-3 md:m-4 flex items-center justify-center place-items-center my-1 md:my-0 text-white text-xl font-bold'>
                        <a href={link.link} className={`p-2 rounded-md ${location.pathname === link.link ? 'bg-gradient-to-b from-[#cc8111]/0 from-70% to-white to-100% text-white' : 'text-white'}`}>
                            {link.name}
                        </a>
                    </li>))
                }
            </ul>
        </div>
        </>
    )
}