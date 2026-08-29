"use client";

import DeleteFoodModal from "@/componets/owner/food/delete/DeleteFood";
import React, { useState } from "react";

const page = () => {
  const [foodId, setFoodId] = useState("");
  const [foodName, setFoodName] = useState("");

  const handleClose = () => {
    setFoodId("");
    setFoodName("");
  };

  return (
    <div>
      <DeleteFoodModal
        foodId={foodId}
        foodName={foodName}
        onClose={handleClose}
      />
    </div>
  );
};

export default page;
