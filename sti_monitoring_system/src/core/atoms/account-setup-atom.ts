import {atom} from 'jotai'
import { AccountSetupCreation } from '../schema/account-setup'
import { OtpType } from '../schema/otp-entry'

export const AccountSetupAtom = atom<AccountSetupCreation | undefined>(undefined)

export const OtpAtom = atom<OtpType | undefined>(undefined)