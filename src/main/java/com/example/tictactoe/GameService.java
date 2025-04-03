package com.example.tictactoe;
import org.springframework.stereotype.Service;

@Service
public class GameService {
    private final GameState gameState = new GameState();

    public synchronized GameState makeMove(int row, int col) {
        gameState.makeMove(row, col);
        return gameState;
    }

    public synchronized GameState clearBoard() {
        gameState.clearBoard();
        return gameState;
    }

    public GameState getGameState() {
        return gameState;
    }
}
