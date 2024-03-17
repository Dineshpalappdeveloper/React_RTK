import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const nav = useNavigate()
    useEffect(() => {
        let token = localStorage.getItem("user")
        if (!token) {
            nav("/login")
        }
    }, [])
    return (
        <div>Dashboard</div>
    )
}

export default Dashboard