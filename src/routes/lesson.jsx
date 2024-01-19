import { gql, useQuery } from "@apollo/client"
import { useEffect } from "react"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import { useRecoilState } from "recoil"
import { courseStateAtom } from "../recoil/atom/courseStateAtom"

const GET_LESSON_QUERY = gql`
query GetLessonQuery($id: Int!) {
    lessonById(id: $id) {
      content
      id
      index
      title
    }
  }
`
export default function Lesson() {
    const [courseState, setCourseState] = useRecoilState(courseStateAtom)
    const { data, error} = useQuery(GET_LESSON_QUERY, {
        variables: {
            id: parseInt(courseState.lessonState.lessonId, 10)
        }
    })
    const previousLesson = () => {
        const { index, lessonIds } = courseState.lessonState;

        if (index > 0) {
            const newIndex = index - 1;
            const newLessonId = lessonIds[newIndex];

            setCourseState((prevCourseState) => ({
                ...prevCourseState,
                lessonState: {
                    ...prevCourseState.lessonState,
                    index: newIndex,
                    lessonId: newLessonId
                }
            }));
        } else {
            console.log("This is the first lesson.");
        }
    };
    const nextLesson = () => {
        const { index, lessonIds } = courseState.lessonState;

        if (index < lessonIds.length - 1) {
            const newIndex = index + 1;
            const newLessonId = lessonIds[newIndex];

            setCourseState((prevCourseState) => ({
                ...prevCourseState,
                lessonState: {
                    ...prevCourseState.lessonState,
                    index: newIndex,
                    lessonId: newLessonId
                }
            }));
        } else {
            console.log("This is the last lesson.");
        }
    };
    if(error) {
        return (
            <div>
                <p>{error.message}</p>
            </div>
        )
    }
    return (
        <div className="w-full h-full pb-[150px]">
            {
                data && (
                    <div className="w-full h-full flex flex-col justify-between">
                        <div>
                            <div>
                                <p className="text-center text-3xl font-bold">{data.lessonById.title}</p>
                            </div>
                            <div dangerouslySetInnerHTML={{__html: data.lessonById.content}}></div>
                        </div>
                        <div className="flex justify-between w-full px-5 sticky bottom-0">
                            <button onClick={previousLesson}><BsChevronLeft className="font-bold text-3xl text-blue-600"/></button>
                            <button onClick={nextLesson}><BsChevronRight className="font-bold text-3xl text-blue-600"/></button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
