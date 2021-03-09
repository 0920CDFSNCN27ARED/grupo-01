import React from "react";
import AllProdsRow from "./allProdsRow";

function AllProdsInDb() {
  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <div className="table-responsive">
          <table
            className="table table-bordered"
            id="dataTable"
            width="100%"
            cellspacing="0"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Categories</th>
                <th>Colors</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Categories</th>
                <th>Colors</th>
                <th>Stock</th>
              </tr>
            </tfoot>
            <tbody>
              <AllProdsRow
                name="Tiger Nison"
                description="System Architect"
                price="$320.800"
                categories={["Category 01", "Category 02", "Category 03"]}
                colors={[
                  { color: "Red", classText: "danger" },
                  { color: "Blue", classText: "primary" },
                  { color: "Green", classText: "success" },
                ]}
                stock="245"
              />
              <AllProdsRow
                name="Jane Doe"
                description="Fulstack Developer"
                price="$320.800"
                categories={["Category 01", "Category 02", "Category 03"]}
                colors={[
                  { color: "Red", classText: "danger" },
                  { color: "Blue", classText: "primary" },
                  { color: "Green", classText: "success" },
                ]}
                stock="245"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default AllProdsInDb;
