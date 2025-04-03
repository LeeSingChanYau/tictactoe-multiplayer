package com.example.tictactoe;

public class GameState {
    private String[][] board = new String[3][3];
    private String currentPlayer = "X";
    private String winner = null;
    private boolean gameOver = false;

    public synchronized boolean makeMove(int row, int col) {
        if(gameOver || board[row][col] != null) {
            return false;
        }
        board[row][col] = currentPlayer;

        checkGameOver();
        if(!gameOver) {
            currentPlayer = currentPlayer.equals("X") ? "O" : "X";
        }

        return true;
    }

    public synchronized boolean clearBoard() {
        board = new String[3][3];
        currentPlayer = "X";
        winner = null;
        gameOver = false;
        return true;
    }

    private void checkGameOver() {
        for(int i = 0; i < 3; i++) {
            if(same(board[i][0],board[i][1],board[i][2])) {
                winner = board[i][0];
            }
            if(same(board[0][i],board[1][i],board[2][i])) {
                winner = board[0][i];
            }
        }
        if (same(board[0][0],board[1][1],board[2][2])) {
            winner = board[0][0];
        }
        if (same(board[0][2],board[1][1],board[2][0])) {
            winner = board[0][2];
        }
        if (winner != null) {
            gameOver = true;
        }
        else if(isBoardFull()) {
            winner = "Draw";
            gameOver = true;
        }
    }

    private boolean same(String a, String b, String c) {
        return a != null && a.equals(b) && b.equals(c);
    }

    private boolean isBoardFull() {
        for(int i = 0; i < 3; i++) {
            for(int j = 0; j < 3; j++) {
                if(board[i][j] != null) return false;
            }
        }
        return true;
    }

    public String[][] getBoard() {
        return board;
    }

    public void setBoard(String[][] board) {
        this.board = board;
    }

    public String getCurrentPlayer() {
        return currentPlayer;
    }

    public void setCurrentPlayer(String currentPlayer) {
        this.currentPlayer = currentPlayer;
    }

    public String getWinner() {
        return winner;
    }

    public void setWinner(String winner) {
        this.winner = winner;
    }

    public boolean isGameOver() {
        return gameOver;
    }

    public void setGameOver(boolean gameOver) {
        this.gameOver = gameOver;
    }
}
