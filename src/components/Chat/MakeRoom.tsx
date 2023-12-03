import React, { useState } from "react";
import styled from "styled-components";

interface MakeRoomProps {}

const MakeRoom: React.FC<MakeRoomProps> = () => {
  const [menteeId, setMenteeId] = useState<number | string>("");
  const [mentorId, setMentorId] = useState<number | string>("");
  const [msg, setMsg] = useState<string>("");

  const handleCreateRoom = async () => {
    try {
      const menteeIdInt = typeof menteeId === "number" ? menteeId : parseInt(menteeId);
      const mentorIdInt = typeof mentorId === "number" ? mentorId : parseInt(mentorId);

      if (isNaN(menteeIdInt) || isNaN(mentorIdInt)) {
        console.error("Invalid menteeId or mentorId");
        return;
      }

      const response = await fetch("http://52.79.37.100:32253/chat/room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          mentee_id: menteeIdInt,
          mentor_id: mentorIdInt,
          msg: msg,
        }),
      });

      if (response.ok) {
        console.log("Chat room created successfully!");
      } else {
        console.error("Failed to create chat room");
      }
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
  };

  return (
    <MakeRoomWrapper>
      <label>
        Mentee ID:
        <input
          type="text"
          value={menteeId}
          onChange={(e) => setMenteeId(e.target.value)}
        />
      </label>
      <label>
        Mentor ID:
        <input
          type="text"
          value={mentorId}
          onChange={(e) => setMentorId(e.target.value)}
        />
      </label>
      <label>
        Message:
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
      </label>
      <button onClick={handleCreateRoom}>Start Chat</button>
    </MakeRoomWrapper>
  );
};

export default MakeRoom;

const MakeRoomWrapper = styled.div`
  display : flex,
  flex-direction : row,
`;