import { BsCart, BsSearch } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { searchQueryAtom } from '../recoil/atom/searchQueryAtom'
export default function Top() {

    const location = useLocation()
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useRecoilState(searchQueryAtom)
    const handleSearch = (e) => {
        e.preventDefault()
        setSearchQuery(prev => ({
            ...prev,
            search: true
        }))
    }
    const goForward = () => {
        navigate(1)
    }
    const goBack = () => {
        navigate(-1)
    }
    useEffect(() => {
        console.log(location.pathname)
    }, [location])
    return (
        <div className="flex justify-between p-1 space-x-3 items-center sticky top-0 bg-black">
            <div className="w-full">
                {
                    location.pathname === "/search" && (
                        <div className="">
                            <form className="flex p-2" onSubmit={handleSearch}>
                                <button className="bg-gray-800 text-white text-xl p-2 rounded-l-md">
                                    <BsSearch/>
                                </button>
                                <input className="outline-none flex-grow bg-gray-800 rounded-r-md" type={'search'} placeholder={'Search Courses, Institutions, Instructors, e.t.c'} value={searchQuery.query} onChange={(e) => setSearchQuery(prev => ({...searchQuery, query: e.target.value}))}/>
                            </form>
                        </div>
                    )
                }
                {
                    location.pathname !== "/search" && (
                        <div className="">
                            <Link to="/"><img src="/logo.png" className="h-12"/></Link>
                        </div>
                    )
                }
            </div>
            <div>
                <Link to={'/cart'}>
                    <BsCart className="text-2xl"/>
                </Link>
            </div>
        </div>
    )
}