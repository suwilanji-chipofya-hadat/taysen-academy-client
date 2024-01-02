import Promotions from "../components/Promotions";
import Welcome from "../components/Welcome";
import { useQuery, gql } from '@apollo/client'
import CourseCard from "../components/CourseCard";

const COURSES_QUERY = gql`
query CoursesQuery {
    courses {
      id
      category {
        name
      }
      title
      instructor {
        user {
          firstName
          lastName
        }
      }
    }
}
`

export default function Featured() {
    const {data, error} = useQuery(COURSES_QUERY)    
    
    if(error) {
        return (<p>{error.message}</p>)
    }
    return (
        <div className="py-3">
            <Welcome/>
            <Promotions/>
            <div className="space-y-5">
                {
                    data && data.courses.map((course, i) => (
                        <CourseCard key={i} course={course}/>
                    ))
                }
            </div>
        </div>
    )
}