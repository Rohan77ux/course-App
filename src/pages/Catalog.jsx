import React, { useEffect, useState } from 'react'
import Footer from '../component/comman/footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector'
import { categories } from '../services/api'
import getCatalogaPageData from '../services/operations/getCatalogaPageData'
import CourseSlider from '../component/core/Catalog/CourseSlider'
import Course_Card from '../component/core/Catalog/Course_Card'

function Catalog() {
    const { catalogName } = useParams()
   // console.log(catalogName);
    const [catalogPageData, setCatalogPageData] = useState(null)
    const [categoryId, setCategoryId] = useState("")
    const [activeTab, setActiveTab] = useState("MostPopular")

    const getCategoryDetails = async () => {
        try {
            const res = await getCatalogaPageData(categoryId)
            setCatalogPageData(res)
        } catch (error) {
           console.log(error)
        }
    }

    const getCategories = async () => {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        const category_id = res?.data?.data?.filter(
            (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]?._id
        setCategoryId(category_id)
    }

    useEffect(() => {
        getCategories()
    }, [catalogName])

    useEffect(() => {
        if (categoryId) {
            getCategoryDetails()
        }
    }, [categoryId])


    return (
        <div className='bg-richblack-900 text-richblack-5 min-h-screen mt-20'>
            {/* Hero Section */}
            <div className='bg-richblack-800'>
                <div className='mx-auto w-11/12 max-w-maxContent py-8'>
                    {/* Breadcrumbs */}
                    <div className='flex items-center gap-2 text-sm text-richblack-300 mb-4'>
                        <span>Home</span>
                        <span>/</span>
                        <span>Catalog</span>
                        <span>/</span>
                        <span className='text-yellow-50'>
                            {catalogPageData?.data?.selectedCategory?.name}
                        </span>
                    </div>

                    {/* Category Title and Description */}
                    <div className='mb-8'>
                        <h1 className='text-3xl font-bold text-richblack-5 mb-2'>
                            {catalogPageData?.data?.selectedCategory?.name}
                        </h1>
                        <p className='text-richblack-200 max-w-3xl'>
                            {catalogPageData?.data?.selectedCategory?.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='mx-auto w-11/12 max-w-maxContent py-12 border-box'>
                {/* Section 1: Featured Courses */}
                <section className='mb-16 border-box'>
                    <div className='flex flex-col md:flex-row justify-between items-start md:items-center border-box mb-8 gap-4'>
                        <h2 className='text-2xl font-bold'>
                            Courses to get you started
                        </h2>
                        <div className='flex bg-richblack-800 rounded-full p-1'>
                            <button
                                className={`px-4 py-2 rounded-full transition-all duration-200 ${
                                    activeTab === "MostPopular"
                                        ? " text-yellow-50 border-b-richblack-900 border-t-richblack-900 border-2"
                                        : "text-richblack-200 border-none"
                                }`}
                                onClick={() => setActiveTab("MostPopular")}
                            >
                                Most Popular
                            </button>
                            <button
                                className={`px-4 py-2 rounded-full transition-all duration-200 ${
                                    activeTab === "New"
                                        ? "text-yellow-50 border-l-richblack-900 outline-none border-r-richblack-900 border-2"
                                        : "text-richblack-200 border-none"
                                }`}
                                onClick={() => setActiveTab("New")}
                            >
                                New
                            </button>
                        </div>
                    </div>
                    <CourseSlider
                        Courses={catalogPageData?.data?.courses}
                    />
                </section>

                {/* Section 2: Courses in Other Category */}
                <section className='mb-16'>
                    
                    <h2 className='text-2xl font-bold mb-8'>
                        Courses in Other Category
                    </h2> 
                    {/* {console.log("coursedadadda:-",catalogPageData?.data)} */}
                    <CourseSlider
                        Courses={catalogPageData?.data?.differentCourses}
                    />
                </section>



                {/* Section 2: Top Courses in Category */}
                {/* <section className='mb-16'>
                    
                    
                    
                     <h2 className='text-2xl font-bold mb-8'>
                        Top courses in{' '}
                        <span className='text-yellow-50'>
                            {catalogPageData?.data?.selectedCategory?.name}
                        </span>
                    </h2> 
                    <CourseSlider
                        Courses={catalogPageData?.data?.differentCategory?.courses}
                    />
                </section> */}

                {/* Section 3: Frequently Bought */}
                <section className='mb-16'>
                    <h2 className='text-2xl font-bold mb-8'>Frequently Bought</h2>
                    <div className='py-8'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                            {catalogPageData?.data?.mostSellingCourses
                                ?.slice(0, 4)
                                .map((course, index) => (
                                    <Course_Card
                                        course={course}
                                        key={index}
                                        Height={'h-[300px]'}
                                    />
                                ))}
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    )
}

export default Catalog