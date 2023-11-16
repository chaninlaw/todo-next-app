// import { NextResponse } from "next/server"

// export const getSuccess = <T>(data: T) =>
//   new NextResponse(JSON.stringify({ data }), { status: 200 })

// export const getFail = (message: string) =>
//   new NextResponse(JSON.stringify({ message }), { status: 400 })

// export const postSuccess = <T>(data: T) =>
//   new NextResponse(JSON.stringify({ data }), { status: 200, url: "/app" })

// export const postFail = (message: string) =>
//   new NextResponse(JSON.stringify({ message }), { status: 400 })

// export const putSuccess = <T>(data: T) =>
//   new NextResponse(JSON.stringify({ data }), { status: 200 })

// export const putFail = (message: string) =>
//   new NextResponse(JSON.stringify({ message }), { status: 400 })

// export const patchSuccess = <T>(data: T) =>
//   new NextResponse(JSON.stringify({ data }), { status: 200 })

// export const patchFail = (message: string) =>
//   new NextResponse(JSON.stringify({ message }), { status: 400 })

// export const deleteSuccess = (message?: string) =>
//   new NextResponse(JSON.stringify(message ? null : { message }), {
//     status: 204,
//   })

// export const deleteFail = (message: string) =>
//   new NextResponse(JSON.stringify({ message }), { status: 400 })

// export const serverError = (error: unknown) => {
//   if (process.env.NODE_ENV === "production") {
//     new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
//       status: 500,
//     })
//   } else {
//     console.error({ error })

//     if (error instanceof Error)
//       new NextResponse(JSON.stringify({ error }), { status: 500 })
//     else
//       new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
//         status: 500,
//       })
//   }
// }
