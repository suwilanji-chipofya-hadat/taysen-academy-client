import { atom } from "recoil";


export const courseNavigationAtom = atom({
    key: "courseNavigationState",
    default: {
        index: 0,
        items: []
    }
})