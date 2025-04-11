import React, { useState } from 'react';
import './Accordion.css';

const data = [
  {
    question: 'What is React?',
    answer: 'React is a JavaScript library for building user interfaces.'
  },
  {
    question: 'What is a component?',
    answer: 'A component is a reusable piece of UI in React.'
  },
  {
    question: 'What is JSX?',
    answer: 'JSX is a syntax extension that lets you write HTML inside JavaScript.'
  }
];

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="accordion-container">
      <h2>FAQs</h2>
      {data.map((item, index) => (
        <div key={index} className="accordion-item">
          <div
            className={`question ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleIndex(index)}
          >
            {item.question}
          </div>
          {activeIndex === index && (
            <div className="answer">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
