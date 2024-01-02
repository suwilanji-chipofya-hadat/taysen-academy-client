import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { searchQueryAtom } from "../recoil/atom/searchQueryAtom";
import CourseCard from "../components/CourseCard";
const SEARCH_COURSES_QUERY = gql`
query SearchCourseQuery($query: String!) {
  search(query: $query) {
    id
    title
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

`;
export default function Search() {
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryAtom);
  const [courses, setCourses] = useState(null)
  const { data, error} = useQuery(SEARCH_COURSES_QUERY, {
    variables: {
      query: searchQuery.query,
    },
    skip: !searchQuery.search,
  });
  
  useEffect(() => {
    if(data) {
      setSearchQuery(prev => ({
        ...prev,
        search: false,
      }))
      setCourses(data.search)
    }

    return () => {
      setSearchQuery(prev => ({
        ...prev,
        query: '',
      }))
    }
  }, [data])
  return (
    <div className="">
      { courses && (
        <div>
          {
            courses.length > 0 ? (
              <div>
                {
                  courses.map((course,i) => <CourseCard course={course} key={i}/>)
                }
              </div>
            ) : (<div><p>No Results</p></div>)
          }
        </div>
      )}
    </div>
  )
}
