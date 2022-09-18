import React, { useEffect, useState } from 'react';

function AnimalShelter() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [seeAnimals, setSeeAnimals] = useState([]);


useEffect(() => {
  fetch(`http://localhost:3000/api/v1/animals`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    } else {
      return response.json()
    }
  })
  .then((jsonifiedResponse) => {
      setSeeAnimals(jsonifiedResponse)
      setIsLoaded(true)
    })
  .catch((error) => {
    setError(error.message)
    setIsLoaded(true)
  });
  }, [])
  if (error) {
    return <h1>Error: {error}</h1>;
  } else if (!isLoaded) {
    return <h1>...Loading...</h1>;
  } else {
    return (
      <React.Fragment>
        <h1>Animal Shelter</h1>
        <ul>
          {seeAnimals.map((animal, index) =>
            <li key={index}>
              <h3>{animal.name}</h3>
              <p>Breed: {animal.breed}</p>
              <p>Sex: {animal.sex}</p>
              <p>Age: {animal.age}</p>
            </li>
          )}
        </ul>
        {/* {seeAnimals[0].name} */}
      </React.Fragment>
    );
  }
}

export default AnimalShelter;