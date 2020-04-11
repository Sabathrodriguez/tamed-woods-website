import React from 'react';
import './App.css';
import InputWithLabel from './InputWithLabel/index';
import List from './List/index';
import Services from './resources/services.json'

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
    <div className="main-div">
      <h1>Tamed Woods</h1>

      <InputWithLabel id="search" value={searchTerm} isFocused onInputChange={handleSearch} search={searchTerm}>
        <strong>Search: </strong>
      </InputWithLabel>

      <hr/>
      {isError && <p>Something went wrong...</p>}
      {isLoading ? (<p>Loading...</p>) : <List list={searchedServices}/> }     

      <h2>contact us at 801-644-6119 for a free quote!</h2>
    </div>
  );
};

export default App;
