import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar';
import { getCurrentDimension } from '../constants';
import MobileNavbar from '../components/navbar/MobileNavbar/MobileNavbar';
import Footer from '../components/footer/Footer';

type MainLayoutProps = {
    children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {

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
        <Box
            sx={{
                position: 'relative',
            }}
        >
            {screenSize.width > 768 ?
                <Navbar />
                :
                <MobileNavbar />
            }
            <>{children}</>
            <Footer />
        </Box>
    )
}

export default MainLayout