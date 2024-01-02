import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { courseStateAtom } from "../recoil/atom/courseStateAtom"


export default function CourseCard(props) {
    const [_, setCourseState] = useRecoilState(courseStateAtom)
    const navigate = useNavigate()
    const handleClick = () => {
        setCourseState((prevCourseState) => ({
            ...prevCourseState,
            courseId: props.course.id,
            lessonState: {
                ...prevCourseState.lessonState,
            }
        }));
        navigate("/course")
    }
    return (
        <div className="flex cursor-pointer w-full p-2 border rounded-lg my-2 border-gray-700" onClick={handleClick}>
            <div>
                <img src="/header.png" className="h-[70px]"/>
            </div>
            <div>
                <p className="text-lg text-white">{props.course.title}</p>
                <p className="text-sm font-semibold ">{props.course.instructor.user.firstName} {props.course.instructor.user.lastName}</p>
            </div>
        </div>
    )
}