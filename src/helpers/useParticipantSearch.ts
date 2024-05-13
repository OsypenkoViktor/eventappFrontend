import { useState, useEffect } from "react";
import { IParticipant } from "./types";

const useParticipantSearch = (
  participants: IParticipant[] | null,
  sortQuery: string
) => {
  const [searchResult, setSearchResult] = useState<IParticipant[]>([]);
  useEffect(() => {
    if (participants) {
      const lowerCaseQuery = sortQuery.toLowerCase();
      const filtered = participants.filter(
        (participant) =>
          participant.fullname.toLowerCase().includes(lowerCaseQuery) ||
          participant.email.toLowerCase().includes(lowerCaseQuery)
      );
      setSearchResult(filtered);
    } else {
      setSearchResult([]);
    }
  }, [participants, sortQuery]);

  return searchResult;
};

export default useParticipantSearch;
