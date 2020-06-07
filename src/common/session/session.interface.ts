export interface RegisterAccountReqDetails {
  clientIp: string
  csrfToken: string
}

export enum UserRegisterState {
  unverified = "u",
  verified = "v",
}
