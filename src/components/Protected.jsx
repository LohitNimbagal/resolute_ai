import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Protected({ children, authentication = true }) {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const authStatus = true //useSelector(state => state.auth.status)

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate("/login")
        } if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
        setLoading(false)

    }, [authStatus, authentication, navigate])

    return loading ? <p>Loading...</p> : <>{children}</>
}

export default Protected