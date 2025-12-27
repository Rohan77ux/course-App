import React from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../comman/IconBtn";
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyCourse = () => {
    // Prevent buying if cart is empty
    if (!cart.length) {
      toast.error("Cart is empty");
      return;
    }

    // Correctly extract course IDs
    const courses = cart.map((course) => course._id);
    // console.log("Buying Courses:", courses);

    // Call buyCourse function
    buyCourse(token, courses, user, navigate, dispatch);
  };

  return (
    <div className="mt-8 p-6 bg-richblack-800 rounded-lg border border-richblack-700">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-medium text-richblack-50">Total:</p>
        <p className="text-xl font-bold text-yellow-50">Rs {total}</p>
      </div>
      <IconBtn
        text="Buy Now"
        active={true}
        onClick={handleBuyCourse}
        customClasses="w-full py-2 text-richblack-900 bg-yellow-50 hover:bg-yellow-25 hover:scale-95 transition-all duration-200"
      />
    </div>
  );
}

export default RenderTotalAmount;
