import React from 'react';
import InputWithLabel from '../InputWithLabel/index';
import '../InputWithLabel/InputWithLabel.css';


const SearchForm = ({searchTerm, onSearchInput, onSearchSubmit}) => (
    <form onSubmit={onSearchSubmit} className="test-form">
        
        <InputWithLabel id="search" value={searchTerm} isFocused onInputChange={onSearchInput}>
            <strong>search:</strong>
        </InputWithLabel>

        <button type='submit' disabled={!searchTerm}>
            submit
        </button>
    </form>
);

export default SearchForm;