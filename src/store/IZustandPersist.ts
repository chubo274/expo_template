export interface IToken {
  token?: string;
  refreshToken?: string;
  expiresAt?: string
}

export interface IZustandPersist {
  Token?: IToken,
}