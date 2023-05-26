import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";


function App() {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [breedData, setBreedData] = useState({});
  const [lookupBreed, setLookupBreed] = useState('');
  // const [idNamePairs, setIdNamePairs] = useState([]);

  const handleBreedSelected = (selectedBreed) => {
    if (selectedBreed && selectedBreed !== ''){
      setLookupBreed(selectedBreed)
      console.log("Selected Breed: ", selectedBreed);
    }
  }
 

  const handleClick = async () => {
      fetch('http://localhost:3000/breedsList')
        .then(response => response.json())
        .then(data => {
          console.log("Data: ", data);
          setBreedData(data);
          // setDropdownOptions(data.map(obj => obj.name));
          // console.log("Dropdown options: ", dropdownOptions);
          // setIdNamePairs(data.map(obj => ({ id: obj.id, name: obj.name })));
        })
        .catch(error => {
          console.log(error);
        });
  }

  useEffect(() => {
    handleClick();
    console.log("CLICK HANDLED!!!");
  }, []);

  // Set dropdown options after breedData updated.
  useEffect(() => {
    if (breedData && breedData.length > 0) {
      console.log("Breed data in useEffect: ", breedData);
      console.log("Temp value in useEffect: ", breedData.map(obj => obj.name));
      const temp = breedData.map(obj => obj.name);
      console.log("Temp after assignment: ", temp);
      setDropdownOptions(temp);
    }
  }, [breedData]);

  useEffect(() => {
    if (dropdownOptions.length > 0)
    console.log("Dropdown Options in logging useEffect: ", dropdownOptions);
  }, [dropdownOptions]);


  return (
    <div className="App">
      {dropdownOptions.length > 0 && <Dropdown 
        dropdownOptions={dropdownOptions} 
        handleBreedSelected={handleBreedSelected}
      />}
      {/* <button onClick={handleClick}>Get Breeds</button> */}
    </div>
  );
}

export default App;
