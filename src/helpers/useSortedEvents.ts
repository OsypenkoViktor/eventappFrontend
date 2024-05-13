import { useState } from "react";
import { IEvent, SortBy } from "./types";

const useSortedEvents = (
  events: IEvent[] | null,
  sortBy: SortBy | undefined
) => {
  if (events && sortBy) {
    switch (sortBy) {
      case SortBy.title:
        return events.slice().sort((a, b) => a.title.localeCompare(b.title));
      case SortBy.eventDate:
        return events
          .slice()
          .sort((a, b) => a.eventdate.localeCompare(b.eventdate));
      case SortBy.organizer:
        return events
          .slice()
          .sort((a, b) => a.organizer.localeCompare(b.organizer));
      default:
        break;
    }
  }

  return events;
};

export default useSortedEvents;
