import React, { Children } from 'react';
import { Navbar } from '../Components/Navbar.jsx';
import { Footer } from '../Components/Footer.jsx';

export const PageTemplate = ({ children }) => {

    return (
            <div className={`bg-[#cc8111] h-[calc(100vh-5rem)] flex flex-col items-center mt-20 justify-center place-items-center`}>
                <Navbar />
                <div className="flex flex-col h-full bg-gradient-to-b from-[#cc8111] to-black w-full items-center justify-center place-items-center">
                    {children}
                </div>
                <Footer />
            </div>
    );
};