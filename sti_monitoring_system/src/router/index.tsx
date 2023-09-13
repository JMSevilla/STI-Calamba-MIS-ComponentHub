import React, { Suspense, lazy, useEffect, useState, startTransition } from 'react'
import {
    Navigate,
    Route, Routes, useNavigate
} from 'react-router-dom'
import { Login, AccountSetup, OtpEntryPage } from '../pages'
import { Path } from './path'

import routes from './path'
import DashboardLayout from '../components/Layout/DashboardLayout'
import { useAccessToken } from '../core/hooks/useStore'

function App() {
    const [accessToken, setAccessToken] = useAccessToken()
    const navigate = useNavigate()
    useEffect(() => {
        if(!accessToken){
            navigate(Path.login.path)
        } else {
            navigate(Path.dashboard.path)
        }
    }, [accessToken, navigate])
    return (
        <>
            <Routes>
                    <Route 
                        path={Path.accountsetup.path}
                        element={<AccountSetup />}
                    />
                    <Route 
                        path={Path.otp_entry_page.path}
                        element={<OtpEntryPage />}
                    />
                    <Route 
                        index
                        path={Path.login.path}
                        element={<Login />}
                    />
                    <Route path={Path.dashboard.path} element={<DashboardLayout />}>
                        {routes.map(( { path, component: Component }) => (
                            <Route 
                                path={path}
                                element={
                                    <Component />
                                }
                            />
                        ))}
                    </Route>
            </Routes>
        </>
    )
}

export default App