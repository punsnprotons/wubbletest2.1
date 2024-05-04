import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar';
import { getCurrentDimension } from '../constants';
import MobileNavbar from '../components/navbar/MobileNavbar/MobileNavbar';
import Footer from '../components/footer/Footer';
import ProtectedRoute from '../router/ProtectedRoute';
import MobileMenu from '../components/MobileMenu/MobileMenu';

type ProtectedLayoutProps = {
    children: React.ReactNode;
};

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {

    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension())
        }
        window.addEventListener('resize', updateDimension);

        return (() => {
            window.removeEventListener('resize', updateDimension);
        })
    }, [screenSize])

    return (
        <ProtectedRoute>
            <Box
                className="bg-2"
                sx={{
                    position: 'relative',
                    overflowX: 'hidden',
                    // border: '1px solid red',
                    overflowY: 'scroll'
                }}
            >
                {screenSize.width > 768 ?
                    <Navbar />
                    // <></>
                    :
                    <>
                        <MobileMenu />
                        <MobileNavbar />
                    </>
                }
                <>{children}</>
                <Footer />
            </Box>
        </ProtectedRoute>
    )
}

export default ProtectedLayout