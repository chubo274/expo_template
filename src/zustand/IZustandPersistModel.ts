import { LANGUAGES, ModeTheme } from "constants/enum";

export interface ISessionStorage {
  token?: string;
  refreshToken?: string;
  expiresAt?: string
}

export interface ZustandPersistModel {
  Token?: ISessionStorage,
  
  // local without api
  Localization?: LANGUAGES
  ThemeApp?: ModeTheme
  cacheVersion?: string
  router?: {
    isOnboard?: boolean
  }
}