import React from 'react'
import { Breadcrumb } from '../components/Breadcrumbs/BasicBreadCrumbs'
import { useLocation } from 'react-router-dom'


const ProfileDetails: React.FC = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    return (
        <>
            <Breadcrumb pageName='Profile Details' />
            
        </>
    )
}

export default ProfileDetails