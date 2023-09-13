

export const config = {
    get value() {
        return {
            DEV_URL: process.env.REACT_APP_PUBLIC_BASEURL,
            TOKEN: '34a89f9063bb49a59d2525220b677e25'
        }
    }
}