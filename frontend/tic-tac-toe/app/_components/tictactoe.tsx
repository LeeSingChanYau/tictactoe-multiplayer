import { useState, useEffect, use } from "react";
import { useStompClient, useSubscription } from "react-stomp-hooks";

export default function TicTacToe() {
      const [grid, setGrid] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]);

      const [selected, setSelected] = useState("X");
      const [messages, setMessages] = useState([]);
      const [greeting, setGreeting] = useState<any>("");

      useSubscription('/topic/greetings', (newGreeting) => {setGreeting(JSON.parse(newGreeting .body).content)});
            
      const stompClient = useStompClient();

      const publishMessage = () => {
        if (stompClient) {
          stompClient.publish({
            destination: "/app/hello",
            body: JSON.stringify({ name: "Alan" }),
          });
        }
      }
      

    return(
        <div className="items-center justify-items-center min-h-screen p-8 gap-8 bg-gray-100 sm:p-20">
        {/* The Tic-Tac-Toe Table */}
        <div onClick={publishMessage}> Send message </div>
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