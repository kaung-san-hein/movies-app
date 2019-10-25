import React from "react";

const ListGroup = props => {
  const {
    items,
    valueProperty,
    textProperty,
    selectedItem,
    onItemSelect
  } = props;
  return (
    <div className="list-group">
      {items.map(item => (
        <button
          key={item[valueProperty]}
          className={
            selectedItem === item
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
          }
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </button>
      ))}
    </div>
  );
};

ListGroup.defaultProps = {
  valueProperty: "_id",
  textProperty: "name"
};

export default ListGroup;
