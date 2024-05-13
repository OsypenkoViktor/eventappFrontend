import { ReactNode } from "react";

export interface IResponseCommonData {
  createdAt: string;
  updatedAt: string;
  id: number;
}

export interface IParticipant extends IResponseCommonData {
  fullname: string;
  birth: string;
  email: string;
  eventId: number;
  source: string;
}

export interface IEvent extends IResponseCommonData {
  title: string;
  description: string;
  eventdate: string;
  organizer: string;
  participants: IParticipant[];
}

export interface IGetEventsResponse {
  totalPages: number;
  events: IEvent[];
}

export enum SortBy {
  title = "title",
  eventDate = "eventDate",
  organizer = "organizer",
}

export interface IEventsContext {
  events: IEvent[] | null;
  setEvents: React.Dispatch<React.SetStateAction<IEvent[] | null>>;
}

export interface IEventsProviderProps {
  children: ReactNode;
}

export interface IReistrationsPerWeek {
  registrationCount: number;
  registrationDate: Date;
}

export interface IEventPageDataResponse {
  participants: IParticipant[];
  registrationsPerWeek: IReistrationsPerWeek[];
}
