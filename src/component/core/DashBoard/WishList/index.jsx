import React from "react";
import { useSelector } from "react-redux";
import RenderCartCourse from "./RenderCartCourse";
import RenderTotalAmount from "./RenderTotalAmount";

function Cart() {
  const { total, totalItem } = useSelector((state) => state.cart);

  return (
    <div className="flex flex-col w-full">
      <div className="text-3xl text-richblack-50">Your Cart</div>
      {totalItem === 0 ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          Your cart is empty.
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          <p className="text-richblack-300 mb-4">{totalItem} Courses in cart</p>
          <div className="space-y-6">
            <RenderCartCourse />
            <RenderTotalAmount />
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;