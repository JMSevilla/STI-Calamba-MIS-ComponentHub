export type ToastContextSetup = {
    ToastMessage: (
        message: string,
        position: any,
        hideProgressBar: boolean,
        closeOnClick: boolean,
        pauseOnHover: boolean,
        draggable: boolean,
        progress?: any,
        theme?: any,
        type?: any
    ) => void
}

export type AccountSetupProps = {
    email: string | undefined
    username: string | undefined
    password: string | undefined
    firstname: string | undefined
    middlename: string | undefined
    lastname: string | undefined
    mobileNumber: string | undefined
    imgurl: string | undefined
    status: number
    verified: number
    access_level: number
    section: number
}

export type ToastProps = {
    position: any
    autoClose: any
    hideProgressBar: any
    newestOnTop: any
    closeOnClick: any
    rtl: any
    pauseOnFocusLoss: any
    draggable: any
    pauseOnHover: any
    theme: any
}


export type CooldownsEntity = {
    resendCount: number
    cooldown: number
}

export const cooldownsToBeMigrated: CooldownsEntity = {
    resendCount: 3,
    cooldown: 5000
}