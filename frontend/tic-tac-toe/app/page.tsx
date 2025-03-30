"use client";

import { StompSessionProvider } from "react-stomp-hooks";
import TicTacToe from "./_components/tictactoe";

export default function Home() {

  return (
    <StompSessionProvider url="http://localhost:8080/gs-guide-websocket">
      <TicTacToe />
    </StompSessionProvider>
  );
}
