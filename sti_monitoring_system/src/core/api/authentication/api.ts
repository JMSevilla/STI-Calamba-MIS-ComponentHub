import { AxiosInstance } from 'axios'
import { LoginProps } from '../../types'

export class AuthenticationRequestAPI { 
    constructor(private readonly axios: AxiosInstance) {}
    public loginBeginWork(props: LoginProps){
        return this.axios.post('/v1/accountsservice/account-login', props)
    }
}