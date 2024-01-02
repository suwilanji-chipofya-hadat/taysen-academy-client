import { useEffect, useState } from 'react'
import { BsStar, BsSearch, BsPersonCircle, BsHeart } from 'react-icons/bs'
import { GiGraduateCap } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export default function Navbar() {
    const location = useLocation()
    useEffect(() => {
        console.log(location.pathname)
    }, [location])
    return (
        <div className="sticky bottom-0 sm:static w-full bg-black flex justify-around p-3 sm:w-fit sm:flex-col sm:justify-normal sm:space-y-7 sm:pt-11 sm:items-center">
            <Link to={'/'} className={`${location.pathname === "/" && "text-white"} flex flex-col items-center space-y-2`}>
                <BsStar className="text-2xl font-bold"/>
                <p className="text-sm font-semibold">Featured</p>
            </Link>
            <Link to={'/search'} className={`${location.pathname === "/search" && "text-white"} flex flex-col items-center space-y-2`}>
                <BsSearch className="text-2xl font-bold"/>
                <p className="text-sm font-semibold">Search</p>
            </Link>
            <Link to={'/enrollments'} className={`${location.pathname === "/enrollments" && "text-white"} flex flex-col items-center space-y-2`}>
                <GiGraduateCap className="text-2xl font-bold"/>
                <p className="text-sm font-semibold whitespace-nowrap">My Courses</p>
            </Link>
            <Link to={'/wishlist'} className={`${location.pathname === "/wishlist" && "text-white"} flex flex-col items-center space-y-2`}>
                <BsHeart className="text-2xl font-bold"/>
                <p className="text-sm font-semibold whitespace-nowrap">Wishlist</p>
            </Link>
            <Link to={'/account'} className={`${location.pathname === "/account" && "text-white"} flex flex-col items-center space-y-2 sm:absolute sm:bottom-7`}>
                <BsPersonCircle className="text-2xl font-bold"/>
                <p className="text-sm font-semibold">Account</p>
            </Link>
        </div>
    )
}
