"use client";
import { useState, useEffect } from "react";
import { Client } from '@stomp/stompjs';

export default function Home() {

  const [selected, setSelected] = useState("X");
  const [grid, setGrid] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    // Create and activate the client on mount
    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/gs-guide-websocket",
      debug: (str) => console.log(str),
      onConnect: () => {
        // Subscribe
        stompClient.subscribe("/topic/greetings", (message) => {
          // Assuming the server sends JSON like { content: "Hello" }
          const body = JSON.parse(message.body);
          setGreeting(body.content);
        });
        // Publish a test message
        stompClient.publish({
          destination: "/app/hello",
          body: JSON.stringify({ name: "Alan" }),
        });
      },
    });

    stompClient.activate();

    // Cleanup on unmount
    return () => {
      stompClient.deactivate();
    };
  }, []);


  return (
    <div className="items-center justify-items-center min-h-screen p-8 gap-8 bg-gray-100 sm:p-20">
      {/* The Tic-Tac-Toe Table */}
      <h1 className="text-5xl font-bold text-center">Tic Tac Toe</h1>
      <h2 className="text-3xl font-bold text-center">Greeting: {greeting}</h2>
      <input type="radio" name="player" value="X" onClick={() => setSelected("X")}/> X
      <input type="radio" name="player" value="O" onClick={() => setSelected("O")}/> O
      <table className="border-collapse border-4 border-black bg-white text-4xl">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border-4 border-black w-16 h-16 text-center cursor-pointer"
                  onClick={() => {
                    if (cell === "") {
                      const newGrid = [...grid];
                      newGrid[rowIndex][cellIndex] = selected;
                      setGrid(newGrid);
                    }
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
