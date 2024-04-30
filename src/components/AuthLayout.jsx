import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../api';

function AuthLayout() {
    useEffect(() => {
        const isUserExist = useSelector(state => state.authSlice.auth.status)

        if (!isUserExist) {
            getCurrentUser()
                .then(res => {
                })
                .catch(err => console.error(err))
        }
    }, [])
    return (
        <>
        </>
    )
}

export default AuthLayout