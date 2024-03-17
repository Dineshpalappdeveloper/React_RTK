import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/user/Login'
import Users from '../components/user/Users'
import Register from '../components/user/Register'
import Dashboard from '../components/user/Dashboard'

const RoutesAll = () => {
    return (
        <div>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Users />} />
                <Route path='/register' element={<Register />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        </div>
    )
}

export default RoutesAll