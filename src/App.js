import React, { useState, useEffect } from 'react';
import './App.css';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';

const App = () => {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  //Prevents ArrayIndexOutOfBound
  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [people, index]);

  //Auto Change Slider
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => clearInterval(slider);
  }, [index])

  return <section>
    <div className='title'>
      <h1><span className='title-design'>/</span>Reviews</h1>
    </div>
    <div className='slider'>
      <div className='flex'>
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;
          let position = 'nextSlide';
          if (personIndex === index) {
            position = 'activeSlide';
          }
          if (personIndex === index - 1 || (index === 0 && personIndex === people.length - 1)) {
            position = 'lastSlide';
          }
          return <div key={id} className='card'>
            <article className={position}>
              <img src={image} alt={name} className='person-img' />
              <h1>{name}</h1>
              <h2>{title}</h2>
              <p>{quote}</p>
              <p className='quote-icon-p'><FaQuoteRight className='quote-icon' /></p>
            </article>
            <button className='left-icon' onClick={() => setIndex(index - 1)}>
              <FiChevronLeft className='icon' />
            </button>
            <button className='right-icon' onClick={() => setIndex(index + 1)}>
              <FiChevronRight className='icon' />
            </button>
          </div>
        })}
      </div>
    </div>
  </section>
}

export default App;