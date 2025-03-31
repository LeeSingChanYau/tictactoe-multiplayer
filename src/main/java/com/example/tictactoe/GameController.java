package com.example.tictactoe;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GameController {
    public final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @MessageMapping("/move")
    @SendTo("/topic/game")
    public GameState handleMove(Move move) {
        return gameService.makeNove(move.getRow(), move.getCol());
    }
}
