import axios from "axios"
import LocalStorageService from "./local-storage.service"

const localStorageService = new LocalStorageService()

export default class AuthService {
  signUp = (formData: { email: string, password: string }) => {
    return axios.post("/api/sign-up", {
      ...formData
    })
  }

  singIn = (formData: { email: string, password: string }) => {
    return axios.post("/api/sign-in", {
      ...formData
    }).then((response: any) => {
      localStorageService.setItem("app_auth", {
        ...response.data,
        expiresAt: new Date(new Date().getTime() + (3550 * 1000)).getTime()
      })
    }).catch((err: any) => {
      throw err
    })
  }

  logOut = () => {
    const authValues: any = localStorageService.getItem("app_auth")
    if (authValues && authValues["access_token"]) {
      return axios.post(`${process.env.GATSBY_NETLIFY_IDENTITY_URL}/logout`, {}, {
        headers: {
          Authorization: `Bearer ${authValues["access_token"]}`
        }
      }).then(() => {
        this.clearSessionData()
      }).catch(() => {
        this.clearSessionData()
      })
    }
  }

  refreshToken = async (): Promise<string> => {
    const authValues: any = localStorageService.getItem("app_auth")
    if (authValues && authValues.access_token && authValues.refresh_token && authValues.expiresAt && new Date().getTime() < authValues.expiresAt) {
      return authValues.access_token;
    }
    if (authValues && authValues.access_token &&  authValues.refresh_token && authValues.expiresAt && new Date().getTime() > authValues.expiresAt) {
      axios.post(`${process.env.GATSBY_NETLIFY_IDENTITY_URL}/token?grant_type=refresh_token&refresh_token=${authValues.refresh_token}`).then((response: any) => {
        localStorageService.setItem("app_auth", {
          ...response.data,
          expiresAt: new Date(new Date().getTime() + (3550 * 1000)).getTime()
        })
        return response.data.access_token
      }).catch(() => {
        this.clearSessionData()
      })
    }
    this.clearSessionData()
    return null
  }
  
  getToken = (): string => {
    const authValues: any = localStorageService.getItem("app_auth")
    if (authValues && authValues.access_token) {
      return authValues.access_token;
    } else {
      this.clearSessionData()
    }
  }

  isLoggedIn = () => {
    return !!localStorage.getItem("app_auth")
  }
  
  clearSessionData = () => {
    if (typeof window !== "undefined") {
      localStorageService.removeItem("app_auth")
      window.location.reload()
    }
  }
}