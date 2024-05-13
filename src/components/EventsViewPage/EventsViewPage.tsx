import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  IEventPageDataResponse,
  IParticipant,
  IReistrationsPerWeek,
} from "../../helpers/types";
import useParticipantSearch from "../../helpers/useParticipantSearch";
import ParticipantCard from "./ParticipantCard";
import { Input } from "antd";
import ChartComponent from "./ChartComponent";

const EventsViewPage = () => {
  const [participants, setParticipants] = useState<IParticipant[] | null>(null);
  const [registrationsPeerWeek, setRegistrationsPerWeek] = useState<
    IReistrationsPerWeek[] | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState();
  const { eventId } = useParams();
  const searchResults = useParticipantSearch(participants, searchQuery);
  useEffect(() => {
    getEventParticipants();
  }, []);

  async function getEventParticipants() {
    await axios
      .get<IEventPageDataResponse>(
        process.env.REACT_APP_BASE_API_URL! + "/events/participants",
        {
          params: {
            eventId: eventId,
          },
        }
      )
      .then((response) => {
        setParticipants(response.data.participants);
        setRegistrationsPerWeek(response.data.registrationsPerWeek);
        console.log(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  return (
    <>
      <Input
        placeholder="search by email or name"
        style={{ width: "500px" }}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      <h1>Participants list</h1>
      <div style={participantsContStyle}>
        {searchResults?.map((participant) => (
          <ParticipantCard key={participant.id} participant={participant} />
        ))}
      </div>
      <ChartComponent registrationsPerWeek={registrationsPeerWeek} />
    </>
  );
};

const participantsContStyle: React.CSSProperties = {
  backgroundColor: "#85dcb0",
  height: "40vh",
  padding: "25px",
  width: "100%",
  borderRadius: 10,
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  gap: "20px",
  alignItems: "center",
  overflowY: "auto",
};

export default EventsViewPage;
