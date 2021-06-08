package com.chat.server.controller;

import com.chat.server.request.ChatRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class SocketController {

    Logger logger= LoggerFactory.getLogger(SocketController.class);

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatRequest sendMessage(@Payload ChatRequest chatRequest)
    {
        logger.info("Chat"+ chatRequest.getContent());
        return chatRequest;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatRequest addUser(@Payload ChatRequest chatRequest, SimpMessageHeaderAccessor simpMessageHeaderAccessor){

       logger.info("User Joined");
        //ADD USERNAME TO WEBSOCKET CONNECTION
        simpMessageHeaderAccessor.getSessionAttributes().put("user",chatRequest.getSender());
        return chatRequest;

    }
}
