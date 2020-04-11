import React from 'react';

const List = ({list}) => (
    list.map(item => (
      <Item key={item.objectID} item={item}/>
    ))
  );
  
  const Item = ({item}) => {
  
    return (
      <div>
        <span>{item.name}, {item.cost}</span>
      </div>
    );
  };

  export default List;