import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { courseNavigationAtom } from "../recoil/atom/courseNavigationAtom"
import { courseStateAtom } from "../recoil/atom/courseStateAtom"


export default function Module(props) {
    const navigate = useNavigate()
    const [courseState, setCourseState] = useRecoilState(courseStateAtom)
    const [ids, setCourseNav] = useRecoilState(courseNavigationAtom)

    const handleLessonClick = (id) => {
        setCourseState((prevCourseState) => ({
            ...prevCourseState,
            lessonState: {
                ...prevCourseState.lessonState,
                lessonId: id,
                index: courseState.lessonState.lessonIds.indexOf(`${id}`)
            }
        }));
        navigate("/lesson")
    }
    return (
        <div className="space-y-4">
            <div>
                <p className="text-sm font-bold">{props.module.title}</p>
            </div>
            <div>
                {
                    props.module.lessons.map((lesson, i) => (
                        <div className="flex space-x-5 items-center cursor-pointer" onClick={() => handleLessonClick(lesson.id)} key={i}>
                            <div>
                                <p className="text-sm font-bold">{i + 1}</p>
                            </div>
                            <div className="">
                                <p className="font-bold text-white text-lg">{lesson.title}</p>
                                <p>Article - 11 mins</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}