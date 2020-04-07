import React from 'react';
import './App.css';

const initialServices = [
  {
    name: "lawn maintenance",
    cost: "$35 (variable rate)",
    objectID: 0
  },
  {
    name: "tree pruning",
    cost: "$45 per tree (variable rate)",
    objectID: 1
  },
  {
    name: "shrub trimming",
    cost: "$80 (variable rate)",
    objectID: 2
  }
]

const getAsyncServices = () => {
  return new Promise(resolve => resolve({data: {services: initialServices}}));
}

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);
  return [value, setValue];
};

const App = () => {

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', '');

  const [services, setServices] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);

  const [isError, setIsError] = React.useState(false);

  React.useEffect( () => {
    setIsLoading(true);

    getAsyncServices().then(result => {
      setServices(result.data.services);
      setIsLoading(false);
    }).catch(() => setIsError(true));
  }, []);

  const handleRemoveService = item => {
    const newServices = services.filter(
      service => item.objectID !== service.objectID
    );
    setServices(newServices);
  }

  React.useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const searchedServices = services.filter(service => {
    return (
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <h1>Tamed Woods</h1>

      <InputWithLabel id="search" value={searchTerm} isFocused onInputChange={handleSearch} search={searchTerm}>
        <strong>enchilada: </strong>
      </InputWithLabel>

      <hr/>
      {isError && <p>Something went wrong...</p>}
      {isLoading ? (<p>Loading...</p>) : <List list={searchedServices} onRemoveItem={handleRemoveService}/> }     
    </div>
  );
};

const InputWithLabel = ({id, value, type="text", onInputChange, isFocused, children}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <div>
      <label htmlFor={id}>{children}</label> &nbsp;
      <input ref={inputRef} id={id} type={type} value={value} autoFocus={isFocused} onChange={onInputChange}/>
    </div>
  );
}

const List = ({list, onRemoveItem}) => (
  list.map(item => (
    <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem}/>
  ))
);

const Item = ({item, onRemoveItem}) => {
  const handleRemoveItem = () => {
    onRemoveItem(item);
  }

  return (
    <div>
      <span>{item.name}, {item.cost}</span>
      <span><button type="button" onClick={() => handleRemoveItem(item)}>Dismiss</button></span>
    </div>
  );
};

export default App;
