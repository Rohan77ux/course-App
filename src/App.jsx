import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./component/comman/Navbar";
import OpenRoute from "./component/core/Auth/OpenRoute";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/AboutUs";
import ContectUs from "./pages/ContectUs";
import MyProfile from "./component/core/DashBoard/MyProfile";
import ProtectedRoute from "./component/core/Auth/ProtectedRoute";
import Error from "./pages/Error";
import Setting from "./component/core/DashBoard/Settings";
import EnrolledCourses from "./component/core/DashBoard/EnrolledCourses";
import Wishlist from "./component/core/DashBoard/WishList";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import AllCourses from "./component/core/DashBoard/AllCourses";
import MyCourses from "./component/core/DashBoard/MyCourses";
import AddCourse from "./component/core/DashBoard/AddCourse";
import EditCourse from "./component/core/DashBoard/EditCourse/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./component/core/CourseDetails/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./component/core/ViewCourse/VideoDetails";
import Instructor from "./component/core/DashBoard/InstructorDashboard/Instructor";
function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route path="about" element={<About />} />
        <Route path="contact" element={<ContectUs />} />

        <Route
          element={
            <ProtectedRoute>
              {" "}
              <DashBoard />{" "}
            </ProtectedRoute>
          }
        >
          <Route
            path="dashboard/my-profile"
            element={
              <ProtectedRoute>
                {" "}
                <MyProfile />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/settings"
            element={
              <ProtectedRoute>
                {" "}
                <Setting />{" "}
              </ProtectedRoute>
            }
          />
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="dashboard/wishlist"
                element={
                  <ProtectedRoute>
                    {" "}
                    <Wishlist />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="dashboard/cart"
                element={
                  <ProtectedRoute>
                    {" "}
                    <Wishlist />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="dashboard/enrolled-courses"
                element={
                  <ProtectedRoute>
                    {" "}
                    <EnrolledCourses />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="dashboard/all-courses"
                element={
                  <ProtectedRoute>
                    {" "}
                    <AllCourses />{" "}
                  </ProtectedRoute>
                }
              />
            </>
          )}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route
                path="dashboard/my-courses"
                element={
                  <ProtectedRoute>
                    {" "}
                    <MyCourses />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="dashboard/add-course"
                element={
                  <ProtectedRoute>
                    {" "}
                    <AddCourse />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="dashboard/edit-course/:courseId"
                element={
                  <ProtectedRoute>
                    {" "}
                    <EditCourse />{" "}
                  </ProtectedRoute>
                }
              />
            </>
          )}
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <ViewCourse />
            </ProtectedRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              ></Route>
            </>
          )}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              ></Route>
            </>
          )}
        </Route>

        <Route path="*" element={<Error />}></Route>
      </Routes>
    </div>
  );
}

export default App;
