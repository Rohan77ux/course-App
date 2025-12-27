import React, { useCallback, useEffect, useState } from "react";
import { getAllCourses } from "../../../services/operations/profileAPI";
import { Link } from "react-router-dom";
import GetAvgRating from "../../../utils/avgRating";
import RatingStars from "../../comman/RatingStars";

function AllCourses() {
  const [allCourses, setAllCourses] = useState([]);

  const getAllCoursesData = useCallback(async () => {
    try {
      const response = await getAllCourses();
      if (Array.isArray(response)) {
        setAllCourses(response);
      } else {
        setAllCourses([]);
      }
      // console.log("response getAllCourses:-", response);
    } catch (error) {
      // console.log("Unable to Fetch All Courses.");
      setAllCourses([]);
    }
  }, []);

  useEffect(() => {
    getAllCoursesData();
  }, [getAllCoursesData]);





  return (
    <div className="w-full space-y-8 p-5 md:p-10">
      <h2 className="text-2xl md:text-3xl font-bold text-richblack-5">
        All Courses
      </h2>

      {allCourses.length === 0 ? (
        <p className="text-center text-lg text-richblack-200">
          No Courses Found.
        </p>
      ) : (
        <div className="w-full overflow-x-auto rounded-lg border border-richblack-700">
          <table className="w-full text-left border-collapse text-sm md:text-base">
            <thead className="bg-richblack-800 text-richblack-300 uppercase font-semibold">
              <tr className="grid grid-cols-12 gap-2 px-4 py-2">
                <th className="col-span-2">Course</th>
                <th className="col-span-5">Details</th>
                <th className="col-span-1 text-center">Status</th>
                <th className="col-span-1 text-center">Price</th>
                <th className="col-span-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-richblack-100 divide-y divide-richblack-700">
              {allCourses.map((course, index) => (
                <tr
                  key={course._id || index}
                  className="grid grid-cols-12 items-center gap-2 px-4 py-4 hover:bg-richblack-900 transition"
                >
                  {/* Thumbnail */}
                  <td className="col-span-2 flex justify-center items-center">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="w-32 h-20 object-cover rounded-md"
                    />
                  </td>

                  {/* Course Info */}
                  <td className="col-span-5">
                    <h3 className="font-semibold text-richblack-5 text-base md:text-lg">
                      {course.courseName}
                    </h3>
                    <p className="text-richblack-200 text-sm truncate">
                      {course.courseDescription}
                    </p>
                    <p className="text-richblack-300 text-sm">
                      Instructor:{" "}
                      <span className="text-richblack-5 font-medium">
                        {course?.instructor?.firstName}{" "}
                        {course?.instructor?.lastName}
                      </span>
                    </p>
                    <p className="text-yellow-100 text-sm">

                      Rating: {" "}
                      
                    </p>
                    <p className="text-sm text-richblack-300">
                      Students Enrolled: {course.studentsEnrolled.length}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="col-span-1 text-center">
                    <p className="inline-block px-2 py-1 bg-pure-greys-400 text-yellow-25 text-xs font-semibold rounded-full">
                      {course.status}
                    </p>
                  </td>

                  {/* Price */}
                  <td className="col-span-1 text-center text-yellow-25 font-semibold">
                    ₹{course.price}
                  </td>

                  {/* Actions */}
                  <td className="col-span-2 flex items-center justify-center gap-4">

                    <Link
                      to={`/courses/${course._id}`}
                      className="text-richblack-100 hover:underline text-sm"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllCourses;
