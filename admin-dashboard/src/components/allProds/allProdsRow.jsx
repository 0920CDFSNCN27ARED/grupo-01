import React from "react";

function allProdsRow(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.description}</td>
      <td>{props.price}</td>
      <td>
        <ul>
          {props.categories.map((category, i) => {
            return <li key={category + i}>{category}</li>;
          })}
        </ul>
      </td>
      <td>
        <ul>
          {props.colors.map((color, i) => {
            return (
              <li key={color + i}>
                <span className={`text-${color.classText}`}>{color.color}</span>
              </li>
            );
          })}
        </ul>
       
      </td>
      <td>{props.stock}</td>
    </tr>
  );
}

export default allProdsRow;
