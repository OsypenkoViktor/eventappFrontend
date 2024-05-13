// Context.js
import React, { createContext, useContext, useState, ReactNode } from "react";
import { IEvent, IEventsContext, IEventsProviderProps } from "./types";

const EventsContext = createContext<IEventsContext | null>(null);

export const EventsProvider = ({ children }: IEventsProviderProps) => {
  const [events, setEvents] = useState<IEvent[] | null>(null);
  return (
    <EventsContext.Provider value={{ events, setEvents }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext)!;
