import CourseCard from "./CourseCard";


export default function Section({title, courses}) {
    return (
        <div className="space-y-2">
            <div className="flex flex-col items-center">
                <p className="text-2xl text-white font-bold text-center">{title}</p>
            </div>
            <div className="flex overflow-x-scroll w-full scrollbar-hide">
                {
                    courses.map((course, i) => <CourseCard course={course} key={i}/>)
                }
            </div>
        </div>
    )
}