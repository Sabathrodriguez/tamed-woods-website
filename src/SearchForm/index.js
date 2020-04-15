import React from 'react';
import InputWithLabel from '../InputWithLabel/index';
import '../InputWithLabel/InputWithLabel.css';


const SearchForm = ({searchTerm, onSearchInput, onSearchSubmit}) => (
    <div className="mainSearchForm-div">
        <form onSubmit={onSearchSubmit} className="searchForm-div">
            <InputWithLabel id="search" value={searchTerm} isFocused onInputChange={onSearchInput}>
                <strong>search:</strong>
            </InputWithLabel>

            <button type='submit' disabled={!searchTerm}>
                submit
            </button>
        </form>
    </div>
);

export default SearchForm;