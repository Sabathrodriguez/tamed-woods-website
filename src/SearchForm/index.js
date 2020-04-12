import React from 'react';
import InputWithLabel from '../InputWithLabel/index';

const SearchForm = ({searchTerm, onSearchInput, onSearchSubmit}) => (
    <form onSubmit={onSearchSubmit}>
        
        <InputWithLabel id="search" value={searchTerm} isFocused onInputChange={onSearchInput}>
            <strong>search:</strong>
        </InputWithLabel>

        <button type='submit' disabled={!searchTerm}>
            submit
        </button>
    </form>
);

export default SearchForm;