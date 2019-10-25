import React from "react";

const SearchInput = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="form-control"
      name="query"
      value={value}
      placeholder="search..."
      style={{ marginBottom: "20px" }}
      onChange={e => onChange(e.target.value)}
    />
  );
};
export default SearchInput;
