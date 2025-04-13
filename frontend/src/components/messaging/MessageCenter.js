import React, { useState, useEffect, useRef } from 'react';
import './MessageCenter.css';

const MessageCenter = () => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeConversation, setActiveConversation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const websocket = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchConversations();
    initializeWebSocket();

    return () => {
      if (websocket.current) {
        websocket.current.close();
      }
    };
  }, []);

  const initializeWebSocket = () => {
    const token = localStorage.getItem('token');
    websocket.current = new WebSocket(`ws://localhost:8080?token=${token}`);

    websocket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'new_message' && data.message.conversation_id === activeConversation?.id) {
        setMessages(prev => [...prev, data.message]);
        scrollToBottom();
      }
    };

    websocket.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('Failed to connect to chat server');
    };
  };

  const fetchConversations = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/messages/conversations', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setConversations(data.data.conversations);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load conversations');
      setIsLoading(false);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/messages/conversations/${conversationId}/messages`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setMessages(data.data.messages);
      scrollToBottom();
    } catch (err) {
      setError('Failed to load messages');
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation) return;

    try {
      const response = await fetch(`http://localhost:8080/api/messages/conversations/${activeConversation.id}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ content: newMessage })
      });
      
      if (!response.ok) throw new Error('Failed to send message');
      
      setNewMessage('');
    } catch (err) {
      setError('Failed to send message');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="message-center">
      <div className="conversations-list">
        <h2>Conversations</h2>
        {conversations.map(conversation => (
          <div
            key={conversation.id}
            className={`conversation-item ${activeConversation?.id === conversation.id ? 'active' : ''}`}
            onClick={() => {
              setActiveConversation(conversation);
              fetchMessages(conversation.id);
            }}
          >
            <div className="conversation-avatar">
              {conversation.brand_name?.[0] || conversation.creator_name?.[0] || '?'}
            </div>
            <div className="conversation-info">
              <h3>{conversation.brand_name || conversation.creator_name}</h3>
              <p className="conversation-status">{conversation.status}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="messages-container">
        {activeConversation ? (
          <>
            <div className="messages-header">
              <h2>{activeConversation.brand_name || activeConversation.creator_name}</h2>
            </div>
            <div className="messages-list">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`message-item ${message.sender_id === localStorage.getItem('userId') ? 'sent' : 'received'}`}
                >
                  <div className="message-content">{message.content}</div>
                  <div className="message-time">
                    {new Date(message.created_at).toLocaleTimeString()}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form className="message-input" onSubmit={sendMessage}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button type="submit" disabled={!newMessage.trim()}>Send</button>
            </form>
          </>
        ) : (
          <div className="no-conversation">
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageCenter; 