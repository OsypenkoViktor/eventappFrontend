import { Select } from "antd";
import React from "react";
import { SortBy } from "../../helpers/types";

const SortSelect = ({
  refreshSortingType,
}: {
  refreshSortingType: (type: SortBy) => void;
}) => {
  const options = [
    { value: SortBy.title, label: <span>Sort by event title</span> },
    { value: SortBy.eventDate, label: <span>Sort by event date</span> },
    { value: SortBy.organizer, label: <span>Sort by event organizer</span> },
  ];

  return (
    <Select
      options={options}
      style={{ width: "300px" }}
      placeholder="Choose sorting type"
      onChange={(value) => {
        console.log(value);
        refreshSortingType(value);
      }}
    />
  );
};

export default SortSelect;
