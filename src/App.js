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
        <ul className="servicesList">
          {Services.map(el => (
            <li>{el.name}</li>
          ))}
        </ul>
        <div className="slideContainer">
            <div className="imageContainer">
              {/* link to create slider
              https://www.google.com/search?q=how+to+create+an+image+slide+in+css&rlz=1C5CHFA_enUS881US886&oq=how+to+create+an+image+slide+in+css&aqs=chrome..69i57j0l7.104085j0j7&sourceid=chrome&ie=UTF-8#kpvalbx=_Y9mXXo3kEpC5tAbAmYGAAw36
               */}
              <img src="https://www.fillmurray.com/500/400"/>
            </div>
        </div>
      </div>

      <div className="div_3">

      </div>

      <div className="div_4">

      </div>

    </div>
  );
};

export default App;
