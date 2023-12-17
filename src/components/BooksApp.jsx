import { useState } from 'react';
import axios from 'axios';

const BooksApp = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [showResults, setShowResults] = useState(false);
  
    const API_URL = 'https://www.googleapis.com/books/v1/volumes';
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.get(`${API_URL}?q=${query}`);
        setBooks(response.data.items || []);
        setShowResults(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  return (
 <div className="app">
      <h1>Google Books Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
        />
        <button type="submit">Search</button>
      </form>

      {showResults && books.length > 0 && (
        <div className="book-list">
          {books.map((book) => (
            <div className="book-card" key={book.id}>
              <img
                src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                alt={book.volumeInfo.title}
              />
              <h3>{book.volumeInfo.title}</h3>
              <p>Author: {book.volumeInfo.authors?.join(', ') || 'Unknown'}</p>
              <button>Detail</button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
export default BooksApp;
