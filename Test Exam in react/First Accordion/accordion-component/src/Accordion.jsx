import React, { useState, useRef } from 'react';
import './Accordion.css';

function Accordion  () {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRef = useRef([]);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex ==index ? null : index);
  };

  return (
    <div className="accordion-container">
      <h2> React Interview Accordion Question </h2>
      <div className="accordion">
        {accordionData.map((item, index) => (
          <div
            key={index}
            className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
          >
            <button
              className="accordion-header"
              onClick={() => toggleAccordion(index)}
            >
              <span className="accordion-title">{item.title}</span>
              <span className="accordion-icon">+</span>


            </button>
            <div
              className="accordion-content"
              ref={(el) => (contentRef.current[index] = el)}
              style={{
                maxHeight: activeIndex === index ? `${contentRef.current[index]?.scrollHeight}px` : '0',
                paddingBottom: activeIndex === index ? '16px' : '0',
              }}
            >
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const accordionData = [
  {
    
    title: "What is Modern Accordion?",
    content: "An accordion is a vertically stacked list of items, each with a header that can be clicked to expand or collapse its content."
  },
  {
    title: "How does it work?",
    content: "Accordion sections can expand or collapse to show or hide content, helping reduce visual clutter."
  },
  {
    title: "Why use an Accordion?",
    content: "It allows users to consume content in small chunks, making it easier to navigate and more user-friendly."
  }
];

export default Accordion;