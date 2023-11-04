import { NextResponse } from "next/server"

export const getSuccess = <T>(data: T) =>
  NextResponse.json({ data }, { status: 200 })

export const getFail = (message: string) =>
  NextResponse.json({ message }, { status: 400 })

export const postSuccess = <T>(data: T) =>
  NextResponse.json({ data }, { status: 200 })

export const postFail = (message: string) =>
  NextResponse.json({ message }, { status: 400 })

export const putSuccess = <T>(data: T) =>
  NextResponse.json({ data }, { status: 200 })

export const putFail = (message: string) =>
  NextResponse.json({ message }, { status: 400 })

export const patchSuccess = <T>(data: T) =>
  NextResponse.json({ data }, { status: 200 })

export const patchFail = (message: string) =>
  NextResponse.json({ message }, { status: 400 })

export const deleteSuccess = (message?: string) =>
  NextResponse.json(message ? null : { message }, { status: 204 })

export const deleteFail = (message: string) =>
  NextResponse.json({ message }, { status: 400 })

export const serverError = (error: unknown) => {
  if (process.env.NODE_ENV === "production") {
    NextResponse.json({ error: "Server error" }, { status: 500 })
  } else {
    console.error({ error })

    if (error instanceof Error) NextResponse.json({ error }, { status: 500 })
    else NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
