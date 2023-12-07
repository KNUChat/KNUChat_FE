// Chatlist.tsx
import { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ChatroomBox from "./ChatroomBox";
import { useChatStore } from "../../store/useChatStore";
import Title from "./Title";
import ChatListNav from "./ChatListNav";

const Chatlist: React.FC = () => {
  const { setSelectedRoomId, userId, setRooms, rooms,update,setUpdate,chatstatus } = useChatStore();

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get("http://52.79.37.100:32253/chat/room", {
          params: {
            id: userId,
          },
        });
        setRooms(response.data);
        setUpdate(false);
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
    };
  
    fetchChatRooms();
  }, [userId, setRooms,update,setUpdate]);

  const handleRoomClick = (roomId: number) => {
    setSelectedRoomId(roomId);
  };

  return (
    <ChatlistWrapper>
      <Title text="ChatList" />
      <ChatListNav />
      {rooms.map((room) => (
        (chatstatus && room.roomStatus === 'CHAT_ENDED') ||
        (!chatstatus && room.roomStatus === 'CHAT_PROCEEDING') && (
          <ChatroomBox
            key={room.roomId}
            room={room}
            onClick={() => handleRoomClick(room.roomId)}
          />
        )
      ))}
    </ChatlistWrapper>
  );
};

export default Chatlist;

const ChatlistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right:3px;
  height: 30rem;
  overflow-y: auto;
`;
