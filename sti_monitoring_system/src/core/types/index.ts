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
    course_id?: number
}

export type AccountModeratorProps = {
    email: string | undefined
    username: string | undefined
    password: string | undefined
    firstname: string | undefined
    middlename?: string | undefined
    lastname: string | undefined
    mobileNumber: string | undefined
    section: string
    course_id: string
}

export type AccountStudentProps = {
    email: string | undefined
    username: string | undefined
    password: string | undefined
    firstname: string | undefined
    middlename?: string | undefined
    lastname: string | undefined
    mobileNumber: string | undefined
    section: string
    course_id: string
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

export type LoginProps = {
    username: string | undefined
    password: string | undefined
}

export type ResponseReferencesTypes = {
    id: number
    access_level: number
    firstname: string
    middlename: string | undefined
    lastname: string
    mobile_number: string
    section: number
    username: string
    imgurl: string
    email: string
    verified: number
}

export type SectionProps = {
    section_id: number | undefined
    sectionName: string | undefined
    num_of_students: number
    status: number
    year: string | undefined
    course_id: number | undefined
}

export type ProjectTableProps = {
    data?: any;
    openEdit?: any;
    sx?: any;
    columns: any;
    rowIsCreativeDesign?: boolean;
    loading?: boolean
    pageSize?: number
    page?: number
    handlePageChange?: (params: any) => void
    selectedRows?: any
};

export type CreateTicket = {
    ticketSubject: string | undefined
    priority: string | undefined
    description: string | undefined
    Assignee: string | undefined
    specificAssignee: number
    issue: string | undefined
    IssueStatuses: number
    requester: string | undefined
    pc_number: string | undefined
    comLab: string | undefined
}

export type JitsiServerProps = {
    userId: number | undefined
    userEmail: string | undefined
    userName: string | undefined
    roomName: string | undefined
}

export type ConferenceAuthProps = {
    firstname: string | undefined
    lastname: string | undefined
    access_token: string | undefined
    refresh_token: string | undefined
    accountId: number | undefined
}

export type MeetRoomJoinedProps = {
    accountId: number | undefined
    room_id: string | undefined
    comlabId: string | undefined
    _joinedStatus: number
}

export type MeetingActionsLogger = {
    accountId: number | undefined
    log_message : string
    room_id: string | undefined
}

export type ChangeBasicOrPrimaryDetailsProps = {
    id: number | undefined
    firstname: string | undefined
    lastname : string | undefined
    email: string | undefined
    username: string | undefined
    isAuthorized: boolean
    imgurl: string | undefined
}

export type SecurityAndPasswordProps = {
    id: number | undefined
    currentPassword: string
    newPassword: string
    email: string | undefined
}