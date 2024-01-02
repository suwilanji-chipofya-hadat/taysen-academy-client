import { atom } from 'recoil'

export const courseStateAtom = atom({
    key: "courseState",
    default: {
        courseId: -1,
        lessonState: {
            index: -1,
            lessonId: -1,
            lessonIds: []
        }
    }
})