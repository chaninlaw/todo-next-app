import { create } from "zustand"
import { Slice } from "./slices"

type Store = Slice.BearSlice

export const useBoundStore = create<Store>((...args) => ({
  ...Slice.createBearSlice(...args),
}))
