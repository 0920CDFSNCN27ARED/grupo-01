import React from "react";

function CategoryItem(props) {
  return (
    <div className="row">
      <div className="col-lg-6 mb-4">
        <div className="card bg-info text-white shadow">
          {props.categoryNmbr.map((nmbr, i) => (
            <div key={nmbr + i} className="card-body">
              {nmbr}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryItem;
