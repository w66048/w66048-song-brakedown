import React from 'react';
import { Navbar } from '../Components/Navbar.jsx';
import { Footer } from '../Components/Footer.jsx';
import { TeamsNavbar } from '../Components/TeamsNavbar.jsx';

export const TeamsPageTemplate = ({ children }) => {

    return (
            <div className={`bg-[#cc8111] h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] flex flex-col items-center mt-[8.5rem] md:mt-40  mb-14 md:mb-0 justify-center place-items-center`}>
                <Navbar />
                <TeamsNavbar />
                <div className="flex flex-col h-full bg-gradient-to-b from-[#cc8111] to-black w-full items-center justify-center place-items-center">
                    {children}
                </div>
            </div>
    );
};