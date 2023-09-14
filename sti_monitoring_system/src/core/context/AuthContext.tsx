import {
    createContext, useContext
} from 'react'
import { LoginProps, ResponseReferencesTypes } from '../types'
import { useApiCallback } from '../hooks/useApi'
import { AxiosResponse } from 'axios'
import { useLoaders } from './LoadingContext'
import { useToastMessage } from './ToastContext'
import { useAccessToken, useReferences, useRefreshToken } from '../hooks/useStore'
import { useNavigate } from 'react-router-dom'
import { Path } from '../../router/path'

const AuthenticationContext = createContext<{
    login(username: string, password: string): void
}>(undefined as any)

export const AuthenticationProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children
}) => {
    const navigate = useNavigate()
    const { setLoading } = useLoaders()
    const { ToastMessage } = useToastMessage()
    const [accessToken, setAccessToken] = useAccessToken()
    const [refreshToken, setRefreshToken] = useRefreshToken()
    const [references, setReferences] = useReferences()
    const loginCb = useApiCallback(
        async (api, args:LoginProps) => await api.auth.loginBeginWork(args)
    )
    const login = async (username: string, password: string) => {
        const loginArgs: LoginProps = {
            username: username,
            password: password
        }
        setLoading(true)
        loginCb.execute(loginArgs)
        .then((response: AxiosResponse | undefined) => {
            if(response?.data == "INVALID_PASSWORD") {
                setLoading(false)
                ToastMessage(
                    "Invalid Password, Please try again.",
                    "top-right",
                    false,
                    true,
                    true,
                    true,
                    undefined,
                    "dark",
                    "error"
                )

            } else if(response?.data == "ACCOUNT_DISABLED") {
                setLoading(false)
                ToastMessage(
                  "Your account is currently lock. Please contact administrator.",
                  "top-right",
                  false,
                  true,
                  true,
                  true,
                  undefined,
                  "dark",
                  "error"
                );
            } else if(response?.data == "ACCOUNT_NOT_FOUND_ON_THIS_SECTION"){
                setLoading(false)
                ToastMessage(
                "No account found associated with that username.",
                "top-right",
                false,
                true,
                true,
                true,
                undefined,
                "dark",
                "error"
                );
            } else {
                setAccessToken(response?.data?.TokenInfo?.token)
                setRefreshToken(response?.data?.TokenInfo?.refreshToken)
                response?.data?.references?.length > 0 && response?.data?.references?.map((data: ResponseReferencesTypes) => {
                    const compressed: ResponseReferencesTypes = {
                        id: data.id,
                        access_level: data.access_level,
                        firstname: data.firstname,
                        middlename: data.middlename,
                        lastname: data.lastname,
                        imgurl: data.imgurl,
                        mobile_number: data.mobile_number,
                        section: data.section,
                        username: data.username
                    }
                    setReferences(compressed)
                })
                // navigate > assigned dashboard
                navigate(Path.dashboard.path)
            }
        })
    }
    return (
        <AuthenticationContext.Provider
        value={{
            login
        }}
        >{children}</AuthenticationContext.Provider>
    )
}

export const useAuthContext = () => {
    if(!AuthenticationContext){
        throw new Error("Authentication Context must be used.")
    }
    return useContext(AuthenticationContext)
}