import { atom } from 'recoil'

export const searchQueryAtom = atom({
    key: "searchQueryState",
    default: {
        query: "",
        search: false
    }
})