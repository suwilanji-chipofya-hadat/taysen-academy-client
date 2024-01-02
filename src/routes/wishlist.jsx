import { gql, useQuery } from "@apollo/client"
import CourseCard from "../components/CourseCard"

const MY_COURSES_QUERY = gql`
query WishlistQuery {
    myWishlist {
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
export default function Wishlist() {
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
                <p className="text-3xl font-bold text-center">My Wishlist</p>
            </div>
            <div>
                {
                    data && (
                    <>
                        {
                            data.myWishlist.length > 0 ? (
                                <>
                                    {
                                        data.myWishlist.map((item, i) => (
                                            <CourseCard course={item.course} key={i}/>
                                        ))
                                    }
                                </>
                            ) : (
                                <>
                                    <p>Wishlist is Empty</p>
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