import { gql, useMutation, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import Module from "../components/Module"
import { courseStateAtom } from '../recoil/atom/courseStateAtom'
const ENROLL_TO_COURSE = gql`
mutation CreateEnrollment($course_id: Int!){
    enroll(courseId: $course_id) {
      enrollment {
        id
      }
    }
}
`

const ADD_TO_WISHLIST = gql`
mutation AddToCart($course_id: Int!){
    addToWishlist(courseId: $course_id) {
      cart {
        id
      }
    }
}
`
const ADD_TO_CART = gql`
mutation AddToCart($course_id: Int!){
    addToCart(courseId: $course_id) {
      wishlist {
        id
      }
    }
}
`

const GET_COURSE_QUERY = gql`
query GetCourseQuery($id: Int!) {
    courseById(id: $id) {
      title
      isPaid
      price
      modules {
        title
        description
        index
        lessons {
          id
          index
          title
        }
      }
      instructor {
        specialisation
        user {
          firstName
          lastName
          email
        }
        website
        bio
      }
      category {
        name
      }
      description
      difficulty
      duration
    }
}
`

const CHECK_IS_ENROLLED = gql`
query CheckIsEnrolled($course_id: Int!) {
    enrolled(courseId: $course_id)
  }
`
export default function Course() {
    const [activeTab, setActiveTab] = useState(0)
    const [courseState, setCourseState] = useRecoilState(courseStateAtom)
    const [specialisations, setSpecialisations] = useState([])
    const [enrolled, setEnrolled] = useState(false)
    const [inWishlist, setInWishlist] = useState(false);
    const [inCart, setInCart] = useState(false);
    const {data, error} = useQuery(GET_COURSE_QUERY, {
        variables: {
            id: parseInt(courseState.courseId, 10)
        },
    })
    const {data: isEnrolled} = useQuery(CHECK_IS_ENROLLED, {
        variables: {
            course_id: parseInt(courseState.courseId, 10)
        },
    })
    useEffect(() => {
        console.log(isEnrolled)
        if(isEnrolled) {
            setEnrolled(isEnrolled.enrolled)
        }
    }, [isEnrolled])
    const [addToCart] = useMutation(ADD_TO_CART, {
        variables: {
            course_id: parseInt(courseState.courseId, 10)
        },
        onCompleted: () => {
            setInCart(true);
        },
        onError: (error) => {
            if(error.message === `(1062, "Duplicate entry '2-1' for key 'school_wishlist.unique_user_course_in_wishlist'")`) {
                setInCart(true);
            }
        }
    })
    const [enroll] = useMutation(ENROLL_TO_COURSE, {
        variables: {
            course_id: parseInt(courseState.courseId, 10)
        },
    })
    const [addToWishlist] = useMutation(ENROLL_TO_COURSE, {
        variables: {
            course_id: parseInt(courseState.courseId, 10)
        },
        onCompleted: () => {
            setInWishlist(true);
        },
        onError: (error) => {
            console.log(error.message)
            if(error.message === `(1062, "Duplicate entry '2-1' for key 'school_enrollment.unique_user_course_enrollment'")`) {
                setInWishlist(true);
            }
        }
    })
    useEffect(() => {
        const extractLessonIds = (modules) => {
            let lessonIds = [];
          
            modules && modules.forEach((module) => {
              module.lessons.forEach((lesson) => {
                lessonIds.push(lesson.id);
              });
          
              // If there are nested modules, recursively extract lesson IDs
              if (module.modules && module.modules.length > 0) {
                lessonIds = lessonIds.concat(extractLessonIds(module.modules));
              }
            });
          
            return lessonIds;
        };
        if(data) {
            setCourseState((prev) => ({
                courseId: courseState.courseId,
                lessonState: {
                    index: 0,
                    lessonIds: extractLessonIds(data && data.courseById.modules),
                    lessonId: 0,
                }
            }))
            const s = data.courseById.instructor.specialisation
            setSpecialisations(s.split(','))
        }
    }, [data])
    if(error) {
        return (
            <div>
                <p>{error.message}</p>
            </div>
        )
    }

    const handleEnroll = () => {
        enroll()
        setEnrolled(true)
    }
    const handleBuyCourse = () => {
        enroll()
        setEnrolled(true)
    }

    return (
        <>
        {data && (
            <div className="mb-[200px]">
            <div className="flex justify-center">
                <img src="/header.png" className="w-full md:max-w-xl"/>
            </div>
            <div className="">
                <p className="text-lg font-semibold text-center">{data && data.courseById.title}</p>
                <div className="flex space-x-2 items-center justify-center">
                    <p className="text-xl font-semibold">Instructor: </p>
                    <p className="text-lg font-semibold text-blue-400">{data && `${data.courseById.instructor.user.firstName} ${data.courseById.instructor.user.lastName}`}</p>
                </div>
                {
                    !enrolled && (
                <div className="w-full max-w-lg space-y-3 mx-auto">
                            <button className="bg-purple-700 w-full max-w-lg py-1 rounded-md font-bold text-lg" onClick={()=> {
                        if(data.courseById.isPaid) {
                            handleBuyCourse()
                        } else {
                            handleEnroll()
                        }
                    }}>{data.courseById.isPaid ? (<span>Buy now (K{data.courseById.price})</span>): 'Enroll now'} </button>
                    <div className="flex space-x-5">
                        <button className={`p-2 font-bold text-white border-2 border-white w-full ${inCart && 'text-gray-300 border-gray-300'}`} onClick={()=> addToCart()} disabled={inCart}>Add to cart</button>
                        <button className="p-2 font-bold text-white border-2 border-white w-full"onClick={()=> addToWishlist()} disabled={inWishlist}>Add to wishlist</button>
                    </div>
                </div>
        )}
            </div>
            <div className="flex items-center justify-around p-3">
                <button className={`${activeTab === 0 && "bg-gray-700"}p-2 px-5 rounded-xl text-lg font-bold`} onClick = {() => setActiveTab(0)}>Lectures</button>
                <button className={`${activeTab === 1 && "bg-gray-700"}p-2 px-5 rounded-xl text-lg font-bold`} onClick = {() => setActiveTab(1)}>Details</button>
            </div>
            {
                activeTab === 0 ? (
                    <>
                        <div className="space-y-4">
                            {
                                data && data.courseById.modules.map((module, i) => (
                                    <Module module={module} key={i}/>
                                ))
                            }
                        </div>
                    </>
                ) : (
                    <>
                        <div className="space-y-3">
                            <p className="font-semibold text-gray-100">{data.courseById.description}</p>
                        </div>
                        <div className="space-y-3">
                            <p className="font-semibold text-lg">Category: {data.courseById.category.name}</p>
                            <p className="font-semibold text-lg">Difficulty: {data.courseById.difficulty}</p>
                            <p className="font-semibold text-lg">Expected Duration: {data.courseById.duration}</p>
                        </div>
                        <div className="space-y-3">
                            <p className="font-semibold text-lg">Instructor Details</p>
                            <div className="border border-gray-800 rounded-lg p-1">
                            <p className="font-semibold text-lg">Name: {data && `${data.courseById.instructor.user.firstName} ${data.courseById.instructor.user.lastName}`}</p>
                            <div className="">
                            <p className="text-lg font-semibold my-2">Specialisations</p>
                            <div className="w-full whitespace-wrap">
                            {specialisations.map(s => (
                                <div className="inline-block px-3 py-1 bg-gray-800 rounded-md m-1">
                                    <p>{s}</p>
                                </div>
                            ))}
                            </div>
                            </div>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
        )}
        </>
    )
}