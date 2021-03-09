import React from "react";
import CategoryItems from "./category-items.jsx";

function CategoryCard() {
  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Categories in Data Base
          </h6>
        </div>
        <div className="card-body">
          <CategoryItems categoryNmbr={["01", "02", "03", "04", "05", "06"]} />
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
