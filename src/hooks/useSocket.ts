import { useEffect } from "react";
import { socket } from "../socket";

/**
 * useSocket - A React hook to handle socket.io events
 * @param event - Socket event name
 * @param callback - Function to execute when event is received
 */
export function useSocket(event: string, callback: (...args: any[]) => void) {
  useEffect(() => {
    socket.on(event, callback);

    // Cleanup on unmount
    return () => {
      socket.off(event, callback);
    };
  }, [event, callback]);
}
