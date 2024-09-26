import React, { useState, useCallback, useRef } from 'react';
import Autosuggest from 'react-autosuggest';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch, getSuggestions }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  // Focus input on mount using callback ref
  const setFocusRef = useCallback((node) => {
    if (node) node.focus();
    inputRef.current = node;
  }, []);

  // Handle search functionality
  const handleSearch = useCallback(() => {
    if (query.trim() === '') {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } else {
      setError(false);
      onSearch(query);  // This will now call the backend via the prop
    }
  }, [query, onSearch]);

  // Handle key press (Enter)
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') handleSearch();
  }, [handleSearch]);

  // Handle input change
  const handleChange = useCallback((e, { newValue }) => {
    setQuery(newValue);
    if (error) setError(false);
  }, [error]);

  return (
    <div className={`search-bar ${shake ? 'shake' : ''}`}>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={getSuggestions}  // Suggestions now come from backend
        onSuggestionsClearRequested={() => setSuggestions([])}
        getSuggestionValue={(suggestion) => `${suggestion.name}, ${suggestion.country}`}
        renderSuggestion={(suggestion) => (
          <div className="suggestion-content">
            {suggestion.name}, {suggestion.country}
          </div>
        )}
        inputProps={{
          placeholder: error ? 'Please enter a location' : 'Enter location',
          value: query,
          onChange: handleChange,
          onKeyPress: handleKeyPress,
          ref: setFocusRef,
        }}
        theme={{
          suggestionsContainer: 'react-autosuggest__suggestions-container',
          suggestion: 'react-autosuggest__suggestion',
          suggestionHighlighted: 'react-autosuggest__suggestion--highlighted',
        }}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
