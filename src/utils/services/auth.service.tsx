import axios from "axios"

export const signUp = (formData: {email: string, password: string}) => {
  return axios.post("/api/sign-up", {
    ...formData
  });
}