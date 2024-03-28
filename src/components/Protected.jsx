import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../appwrite/useAuth';

function Protected({ children, authentication = true }) {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const status = useAuth(state => state.status)

    useEffect(() => {
        if (authentication && status !== authentication) {
            navigate("/login")
        } if (!authentication && status !== authentication) {
            navigate("/")
        }
        setLoading(false)

    }, [status, authentication, navigate])

    return loading ? <p>Loading...</p> : <>{children}</>
}

export default Protected