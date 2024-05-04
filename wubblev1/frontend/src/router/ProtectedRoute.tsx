import React, { useState, useEffect } from 'react'
import { useVerifySessionQuery, useGetMeMutation } from '../api/auth/authRest'
import { Navigate, useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {

    const navigate = useNavigate()
    const [isDone, setDone] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)

    const getSession = useVerifySessionQuery(null, { refetchOnMountOrArgChange: true })

    const [getMe] = useGetMeMutation()

    useEffect(() => {
        if (getSession.status === 'fulfilled' && getSession.data) {
            let role = getSession.data.role
            getUser(role)
        }

        if (getSession.status === 'rejected' && !getSession.data) {
            navigate('/sign-in')
        }

    }, [getSession])

    const getUser = async (role: string) => {
        try {
            if (role === 'admin') {
                await getMe(null)
            }

            setAuthenticated(true)
            setDone(true)
        } catch (e) {
            setDone(true)
        }
    }

    if (isDone) {
        if (authenticated) {
            return (
                <>{props.children}</>
            )
        } else {
            return <Navigate to='/sign-in' />
        }
    }
    return <></>
}

export default ProtectedRoute