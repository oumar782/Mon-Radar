import React, { useState, useEffect, useRef } from 'react';

export default function WhatsAppPhone({ messages, isTyping, onSendMessage, quickQuestions }) {
  const [inputText, setInputText] = useState('');
  const chatBodyRef = useRef(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleSuggestionClick = (question) => {
    onSendMessage(question);
  };

  const todayLabel = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  return (
    <div className="phone-mockup-wrapper">
      <div className="phone-device">
        {/* Dynamic Island / Speaker */}
        <div className="phone-notch"></div>

        <div className="wa-screen">
          {/* WhatsApp Header */}
          <div className="wa-app-header">
            <div className="wa-contact-info">
              <div className="wa-avatar">MR</div>
              <div className="wa-names">
                <h4>Mon Radar</h4>
                <div className="wa-status">
                  <span className="pulse-dot" style={{ width: 6, height: 6 }}></span>
                  <span>En ligne</span>
                </div>
              </div>
            </div>

            <div className="wa-header-icons">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="wa-chat-body" ref={chatBodyRef}>
            <div className="wa-date-pill">
              {todayLabel.charAt(0).toUpperCase() + todayLabel.slice(1)}
            </div>

            {messages.map((msg) => (
              <div key={msg.id} className={`wa-bubble ${msg.sender === 'bot' ? 'incoming' : 'outgoing'}`}>
                <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>
                <div className="wa-bubble-meta">
                  <span>{msg.time}</span>
                  {msg.sender === 'user' && <span className="wa-checks">✓✓</span>}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="wa-typing-indicator" aria-label="Mon Radar est en train d'écrire">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>

          {/* Quick Suggestions */}
          {quickQuestions && quickQuestions.length > 0 && (
            <div className="wa-suggestions">
              {quickQuestions.map((qObj, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="suggestion-chip"
                  onClick={() => handleSuggestionClick(qObj.q)}
                >
                  {qObj.q}
                </button>
              ))}
            </div>
          )}

          {/* WhatsApp Input */}
          <form className="wa-input-area" onSubmit={handleSubmit}>
            <input
              type="text"
              className="wa-input-field"
              placeholder="Poser une question à Mon Radar..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" className="wa-send-btn" aria-label="Envoyer le message">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
