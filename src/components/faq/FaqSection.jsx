import React, { useState } from 'react';
import { FAQ_DATA } from '../../data/faqData';

export default function FaqSection() {
  const [openId, setOpenId] = useState('faq-1');

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="section-header">
          <div className="section-pill">Foire aux Questions</div>
          <h2 className="section-title">
            Questions fréquentes. <br />
            <span className="highlight">Des réponses franches et claires.</span>
          </h2>
          <p className="section-subtitle">
            Tout ce que tu dois savoir avant de brancher Mon Radar à ton commerce.
          </p>
        </div>

        <div className="faq-container">
          {FAQ_DATA.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button 
                  className="faq-question" 
                  onClick={() => toggleFaq(item.id)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <svg className="faq-icon-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
