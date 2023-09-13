
type PathProps = {
    path: string
}

type RouteProps = {
    login : PathProps
    accountsetup: PathProps
    otp_entry_page: PathProps
}

export const Path: RouteProps = {
    login: { path: "/" },
    accountsetup: { path: '/account-setup' },
    otp_entry_page: { path: '/otp-entry-page'}
}