import axios, { AxiosPromise, isAxiosError } from "axios"

interface Param {
  email: string
  password: string
}

export const createUser = async ({
  email,
  password,
}: Param): AxiosPromise<{ message?: string }> => {
  return await axios
    .post("/api/v1/user", { email, password })
    .then((res) => res.data)
    .catch((err) => {
      if (isAxiosError(err)) {
        return err.response
      } else {
        return err
      }
    })
}
