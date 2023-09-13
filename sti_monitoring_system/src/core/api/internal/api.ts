import { AxiosInstance } from 'axios'
import { AccountSetupProps } from '../../types'

export class InternalRequestAPI {
    constructor(private readonly axios: AxiosInstance) {}
    public AccountSetupFindAnyUsers() {
        return this.axios.get('/v1/accountsservice/find-any-accounts')
    }
    public accountSetupCreation(props : AccountSetupProps){
        return this.axios.post<AccountSetupProps>('/v1/accountsservice/account-creation-activation', props)
    }
    public checkResentCode(email: string | undefined){
        return this.axios.get(`/v1/verificationservice/check-resend-code/${email}`)
    }
    public resendNewVerificationCode(props: {
        type: string, email: string | undefined
    }){
        return this.axios.post(`/v1/verificationservice/resend-verification-code/${props.type}/account/${props.email}`)
    }
    public checkPrimaryDetails(props: {
        email: string | undefined, username: string | undefined
    }){
        return this.axios.get(`/v1/accountsservice/map-primary-check/${props.email}/${props.username}`)
    }
    public codeEntry(props: {
        code: number,
        email: string | undefined,
        type: string
    }){
        return this.axios.post(`/v1/verificationservice/code-entry/${props.code}/account/${props.email}/type/${props.type}`)
    }
}