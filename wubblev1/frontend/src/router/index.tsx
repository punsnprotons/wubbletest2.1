import { Suspense } from 'react';
import { createBrowserRouter, Outlet, useRouteError } from "react-router-dom"
import SignUp from '../pages/SignUp/SignUp';
import MainLayout from '../layouts/MainLayout';
import SignIn from '../pages/SignIn/SignIn';
import AboutUs from '../pages/AboutUs/AboutUs';
import Contact from '../pages/Contact/Contact';
import GenreGeneration from '../pages/GenreGeneration/GenreGeneration';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword'
import NewPassword from '../pages/NewPassword/NewPassword'
import ProfileSetting from '../pages/Settings/ProfileSetting';
import ProtectedLayout from '../layouts/ProtectedLayout';
import MyMusic from '../pages/MyMusic/MyMusic';
import Waitlist from '../pages/Waitlist/Waitlist';
import Artist from '../pages/MyMusic/Artist';
import Creation from '../pages/Lyrics/Creation';

const HeaderLayout = () => (
    <Suspense>
        <Outlet />
    </Suspense>
)

function ErrorBoundary() {
    let error = useRouteError();
    console.error(error);

    // Uncaught ReferenceError: path is not defined
    return <div style={{ color: 'white' }}>Error!</div>;
}

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <HeaderLayout />,
            errorElement: <ErrorBoundary />,
            children: [
                {
                    path: "/",
                    element: <ProtectedLayout>
                        <MyMusic />
                    </ProtectedLayout>
                },
                {
                    path: "/sign-up",
                    element: <MainLayout>
                        <SignUp />
                    </MainLayout>
                },
                {
                    path: "/sign-in",
                    element: <MainLayout>
                        <SignIn />
                    </MainLayout>
                },
                {
                    path: "/about-us",
                    element: <MainLayout>
                        <AboutUs />
                    </MainLayout>
                },
                {
                    path: "/contact",
                    element: <MainLayout>
                        <Contact />
                    </MainLayout>
                },
                {
                    path: "/song-creation",
                    element: <ProtectedLayout>
                        <GenreGeneration />
                    </ProtectedLayout>

                },
                {
                    path: "/song-creation/result",
                    element: <ProtectedLayout>
                        <GenreGeneration />
                    </ProtectedLayout>

                },
                {
                    path: "/my-music",
                    element: <ProtectedLayout>
                        <MyMusic />
                    </ProtectedLayout>

                },
                {
                    path: "/forgot-password",
                    element:
                        <MainLayout>
                            <ForgotPassword />
                        </MainLayout>
                },
                {
                    path: "/forgot-password/:token/edit",
                    element:
                        <MainLayout>
                            <NewPassword />
                        </MainLayout>
                },
                {
                    path: "/profile-setting",
                    element:
                        <ProtectedLayout>
                            <ProfileSetting />
                        </ProtectedLayout>
                },
                {
                    path: "/wait-list",
                    element: <ProtectedLayout>
                        <Waitlist />
                    </ProtectedLayout>
                },
                {
                    path: "/artist-selection",
                    element: <ProtectedLayout>
                        <Artist />
                    </ProtectedLayout>
                },
                {
                    path: "/lyric-creation",
                    element: <ProtectedLayout>
                        <Creation />
                    </ProtectedLayout>
                },
                {
                    path: "/lyric-creation/result",
                    element: <ProtectedLayout>
                        <Creation />
                    </ProtectedLayout>
                },
            ]
        }
    ]
)