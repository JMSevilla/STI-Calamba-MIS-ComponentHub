import { ResponseReferencesTypes } from "../types";
import { useLocalStorage } from "./useLocalStorage";

export const useAccessToken = () => useLocalStorage<string | undefined>('AT', undefined)
export const useRefreshToken = () => useLocalStorage<string | undefined>('RT', undefined)
export const useReferences = () => useLocalStorage<ResponseReferencesTypes | undefined>('RF', undefined)