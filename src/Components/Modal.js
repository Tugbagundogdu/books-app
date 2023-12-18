import React, { useState } from 'react';

const Modal = ({ show, item, onClose }) => {
  const [showFullDescription, setShowFullDescription] = useState(false); 

  let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
  let description = item.volumeInfo.description.slice(0, 500); 

  // Tam açıklama gösterilmek istenirse handleReadMoreClick fonksiyonu kullanılır.
  const handleReadMoreClick = () => {
    setShowFullDescription(true);
  };

  // show prop'u false ise null döndürülür, değilse Modal component'i render edilir.
  if (!show) {
    return null;
  }

  return (
    <div className="overlay">
      <div className="overlay-inner">
        <button className="close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <div className="inner-box">
          <img src={thumbnail} alt="" />
          <div className="info">
            <h1>{item.volumeInfo.title}</h1>
            <h3>{item.volumeInfo.authors}</h3>
            <h4>
              {item.volumeInfo.publisher}
              <span>{item.volumeInfo.publishedDate}</span>
            </h4>
            <br />
            <div className="description-wrapper" style={{ maxHeight: '200px', overflowY: 'auto' }}>
          <div className="description">
            {description}
          </div>
          {!showFullDescription && description && description.length >= 200 && (
            <button onClick={handleReadMoreClick}>
              Read More
            </button>
          )}
          {showFullDescription && (
            <div className="description">
              {item.volumeInfo.description}
            </div>
          )}
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
