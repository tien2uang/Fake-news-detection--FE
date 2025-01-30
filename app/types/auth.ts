export interface User {
  username: string

}

export interface AuthResponse {
  username: string
  access_token: string
}
export interface RealtimeTrigger{
  need_refresh: boolean
}

