import { gql, useQuery } from "@apollo/client"
import CourseCard from "../components/CourseCard"

const MY_COURSES_QUERY = gql`
query MyCoursesQuery {
    myCart {
      course {
        id
        title
        instructor {
            user {
                username
                firstName
                lastName
            }
        }
      }
    }
}
`
export default function Cart() {
    const {data, error} = useQuery(MY_COURSES_QUERY)
    if(error) {
        return (
            <div>
                <p>{error.message}</p>
            </div>
        )
    }
    return (
        <div className="p-2 space-y-7">
            <div>
                <p className="text-3xl font-bold text-center">My Cart</p>
            </div>
            <div>
                {
                    data && (
                    <>
                        {
                            data.myCart.length > 0 ? (
                                <>
                                    {
                                        data.myCart.map((item, i) => (
                                            <CourseCard course={item.course} key={i}/>
                                        ))
                                    }
                                </>
                            ) : (
                                <>
                                    <p>Cart Is Empty</p>
                                </>
                            )
                        }
                    </>
                )
                }
            </div>
        </div>
    )
}