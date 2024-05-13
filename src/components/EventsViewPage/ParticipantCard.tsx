import React from "react";
import { Card } from "antd";
import { IParticipant } from "../../helpers/types";

interface ICardProps {
  participant: IParticipant;
}

const ParticipantCard: React.FC<ICardProps> = ({ participant }) => {
  return (
    <Card title={participant.fullname} style={{ width: "300px" }}>
      {participant.email}
    </Card>
  );
};

export default ParticipantCard;
