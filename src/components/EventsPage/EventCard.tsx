import { Card, Typography, Space } from "antd";
import type { IEvent } from "../../helpers/types";
import React from "react";
import { Link } from "react-router-dom";
import "./cardMedia.css";

interface IEventCardProps {
  event: IEvent;
}

const { Text } = Typography;

const EventCard: React.FC<IEventCardProps> = ({ event }) => {
  const cardStyle: React.CSSProperties = {
    width: "350px",
    height: "400px",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
  };
  return (
    <Card title={event.title} style={cardStyle} id="card">
      <div style={{ marginBottom: "20px", height: "100px" }}>
        {event.description}
      </div>

      <Text mark>Organizer - {event.organizer}</Text>
      <br />
      <Text type="secondary">Event date - {event.eventdate}</Text>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "100px",
          paddingTop: "40px",
        }}
      >
        <Link to={"/events/register/" + event.id}>Register</Link>
        <Link to={"/events/participants/" + event.id}>View</Link>
      </div>
    </Card>
  );
};

export default EventCard;
