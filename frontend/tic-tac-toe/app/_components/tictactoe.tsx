import { useState, useEffect, use } from 'react';
import { useStompClient, useSubscription } from 'react-stomp-hooks';

export default function TicTacToe() {
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);

  const [selected, setSelected] = useState('X');
  const [messages, setMessages] = useState([]);
  const [greeting, setGreeting] = useState<any>('');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  useSubscription('/topic/greetings', (newGreeting) => {
    setGreeting(JSON.parse(newGreeting.body).content);
  });

  useSubscription('/topic/game', (message) => {
    const gameState = JSON.parse(message.body);
    setBoard(gameState.board);
    setSelected(gameState.currentPlayer);
    setGameOver(gameState.gameOver);
    setWinner(gameState.winner);
  });

  const stompClient = useStompClient();

  const publishMessage = () => {
    if (stompClient) {
      stompClient.publish({
        destination: '/app/hello',
        body: JSON.stringify({ name: 'Alan' }),
      });
    }
  };

  const publishClearBoard = () => {
    if (stompClient) {
      stompClient.publish({
        destination: '/app/clearBoard',
      });
    }
  };

  const publishMove = (row: Number, col: Number) => {
    if (stompClient) {
      stompClient.publish({
        destination: '/app/move',
        body: JSON.stringify({ row, col }),
      });
    }
  };

  return (
    <div className="items-center justify-items-center min-h-screen p-8 gap-8 bg-gray-100 sm:p-20">
      {/* The Tic-Tac-Toe Table */}
      <button
        onClick={publishMessage}
        className="px-4 py-2 bg-blue-599 text-white font-bold rounded-lg border-2 border-blue-700 bg-blue-600 hover:bg-blue-400 cursor-pointer m-10"
      >
        {' '}
        Connect{' '}
      </button>
      <button
        onClick={publishClearBoard}
        className="px-4 py-2 bg-blue-599 text-white font-bold rounded-lg border-2 border-blue-700 bg-blue-600 hover:bg-blue-400 cursor-pointer m-10"
      >
        {' '}
        Restart Game{' '}
      </button>
      <h1 className="text-5xl font-bold text-center">Tic Tac Toe</h1>
      <h2 className="text-3xl font-bold text-center">Greeting: {greeting}</h2>
      <input
        type="radio"
        name="player"
        value="X"
        onClick={() => setSelected('X')}
      />{' '}
      X
      <input
        type="radio"
        name="player"
        value="O"
        onClick={() => setSelected('O')}
      />{' '}
      O
      <table className="border-collapse border-4 border-black bg-white text-4xl">
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  className="border-4 border-black w-16 h-16 text-center cursor-pointer"
                  onClick={() => publishMove(rowIndex, colIndex)}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {winner == 'draw' && <h1>It's a draw!</h1>}
      {winner != 'draw' && winner != null && <h1>The winner is {winner}!</h1>}
    </div>
  );
}
