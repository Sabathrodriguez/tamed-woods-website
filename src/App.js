import React from 'react';
import './App.css';
import InputWithLabel from './InputWithLabel/index';
import List from './List/index';
import Services from './resources/services.json';
import styledComponents from 'styled-components';
import SearchForm from './SearchForm/index';

const Div = styledComponents

const servicesFromJson = Services;

const getAsyncServices = () => {
  return new Promise(resolve => resolve({data: {services: servicesFromJson}}));
}

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);
  return [value, setValue];
};

const App = () => {

  //TESTING STUFF----------------------------



  //-----------------------------------------

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', '');

  const [isLoading, setIsLoading] = React.useState(false);

  const [isError, setIsError] = React.useState(false);

  React.useEffect( () => {
    setIsLoading(true);

    getAsyncServices().then(result => {
      setIsLoading(false);
    }).catch(() => setIsError(true));
  }, []);

  React.useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const searchedServices = Services.filter(service => {
    return (
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="main_div">

      <div className="div_1">
        <h1>Tamed Woods</h1>
        <SearchForm searchTerm={searchTerm} onSearchInput={handleSearch} OnSearchSubmit={handleSearch} />
      </div>

      <div className="div_2">

      </div>

      <div className="div_3">

      </div>

      <div className="div_4">

      </div>

    </div>
  );
};

export default App;
