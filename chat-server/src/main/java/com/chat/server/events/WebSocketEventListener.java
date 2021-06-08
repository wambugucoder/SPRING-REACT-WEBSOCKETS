package com.chat.server.events;

import com.chat.server.request.ChatRequest;
import com.chat.server.request.MessageType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListener {

    private static final Logger logger= LoggerFactory.getLogger(WebSocketEventListener.class);

    @Autowired
   private SimpMessageSendingOperations simpMessageSendingOperations;

    @EventListener
    public void ListenForWebSocketConnection(SessionConnectedEvent event){
     logger.info("Received A New WebSocket Connection");
    }

    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event){
        StompHeaderAccessor headerAccessor=StompHeaderAccessor.wrap(event.getMessage());
        String username= (String) headerAccessor.getSessionAttributes().get("username");
        if(username !=null){
            logger.info("User Disconnected: "+ username);
            ChatRequest chatRequest=new ChatRequest();
            chatRequest.setMessageType(MessageType.LEAVE);
            chatRequest.setSender(username);
            simpMessageSendingOperations.convertAndSend("/topic/public",chatRequest);
        }

    }
}
