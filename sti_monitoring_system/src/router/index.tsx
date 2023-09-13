import React from 'react'
import {
    Route, Routes
} from 'react-router-dom'
import { Login, AccountSetup, OtpEntryPage } from '../pages'
import { Path } from './path'

export default () => (
    <Routes>
          <Route 
                path={Path.login.path}
                element={<Login />}
            />
            <Route 
                path={Path.accountsetup.path}
                element={<AccountSetup />}
            />
            <Route 
                path={Path.otp_entry_page.path}
                element={<OtpEntryPage />}
            />
    </Routes>
)