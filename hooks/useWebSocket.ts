import { useRef, useState } from "react";

type UseWebSocketReturn = {
  connect: (url: string) => void;
  disconnect: () => void;
  sendMessage: (message: string) => void;
  isOpen: boolean;
};

export default function useWebSocket(
  onMessage: (message: string) => void,
  onError?: (error: Error) => void,
): UseWebSocketReturn {
  const socket = useRef<WebSocket>();
  const [isOpen, setIsOpen] = useState(false);

  const connect = (url: string) => {
    console.log("connecting to " + url);
    try {
      socket.current = new WebSocket(url);
      socket.current.onmessage = (event) => onMessage(event.data);
      socket.current.onopen = () => setIsOpen(true);
    } catch (err) {
      if (onError) onError(err);
    }
  };

  const disconnect = () => {
    socket.current?.close();
    setIsOpen(false);
  };

  const sendMessage = (message: string) => {
    try {
      socket.current.send(message);
    } catch (err) {
      if (onError) onError(err);
    }
  };

  return { connect, disconnect, sendMessage, isOpen };
}
