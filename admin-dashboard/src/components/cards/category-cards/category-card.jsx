import React from "react";
import CategoryItems from "./category-items.jsx"


function CategoryCard() {
  return (
    <div class="col-lg-6 mb-4">
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">
            Categories in Data Base
          </h6>
        </div>
        <div class="card-body">
          <CategoryItems />
          <CategoryItems />
          <CategoryItems />
          <CategoryItems />
          <CategoryItems />
          <CategoryItems />
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;