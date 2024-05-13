import React from "react";
import { Input } from "antd";

const SearchBar = ({
  setSearchString,
}: {
  setSearchString: (searchStr: string) => void;
}) => {
  return (
    <div>
      <Input
        placeholder="input search text"
        style={{ width: 200, margin: "20px" }}
        onChange={(e) => {
          setSearchString(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
