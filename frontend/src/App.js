import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { StarRating } from "./StarRating";


function App() {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [breedData, setBreedData] = useState({});
  const [lookupBreed, setLookupBreed] = useState('');
  const [catImageURL, setCatImageURL] = useState('');
  const [breedDescription, setBreedDescription] = useState('');
  const [ratingData, setRatingData] = useState({});
  // const [idNamePairs, setIdNamePairs] = useState([]);

  console.log("Rating Data length:", Object.keys(ratingData).length);

  const requestRandomCatImage = async (breedId) => {
    fetch(`http://localhost:3000/catImage?breedId=${breedId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCatImageURL(data[0].url)
        console.log("Cat Image URL: ", data[0].url);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const getBreedId = (selectedBreedName) => {
    if (selectedBreedName && selectedBreedName !== ''){
      const breedId = breedData.find(obj => obj.name === selectedBreedName).id;
      return breedId;
    }
  }

  const getSingleBreedData = (selectedBreedName) => {
    if (selectedBreedName && selectedBreedName !== ''){
      const singleBreedDataObject = breedData.find(obj => obj.name === selectedBreedName);
      console.log("Single Breed Data Object All of it: ", singleBreedDataObject);
      setBreedDescription(singleBreedDataObject.description)
      const stringDescriptorsLocal = {
        "Temperament": singleBreedDataObject.temperament,
        "Origin": singleBreedDataObject.origin,
        "Life Span": singleBreedDataObject.life_span,
      }
      const ratingDataLocal = {
        "Adaptability": singleBreedDataObject.adaptability,
        "Affection Level": singleBreedDataObject.affection_level,
        "Child Friendly": singleBreedDataObject.child_friendly,
        "Grooming": singleBreedDataObject.grooming,
        "Intelligence": singleBreedDataObject.intelligence,
        "Health Issues": singleBreedDataObject.health_issues,
        "Social Needs": singleBreedDataObject.social_needs,
        "Stranger Friendly": singleBreedDataObject.stranger_friendly,
      };
      setRatingData(ratingDataLocal);
    }
  }

  useEffect(() => {
    if (breedDescription !== ''){
      console.log("Breed Desc. in useEffect: ", breedDescription);
    }
  }, [breedDescription])

  const handleBreedSelected = (selectedBreed) => {
    if (selectedBreed && selectedBreed !== ''){
      // setLookupBreed(selectedBreed)
      console.log("Selected Breed: ", selectedBreed);
      const breedId = getBreedId(selectedBreed);
      getSingleBreedData(selectedBreed);
      requestRandomCatImage(breedId);
    }
  }
 

  const handleScreenLoad = async () => {
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
    handleScreenLoad();
    console.log("CLICK HANDLED!!!");
  }, []);

  // Set dropdown options after breedData updated.
  useEffect(() => {
    if (breedData && breedData.length > 0) {
      const temp = breedData.map(obj => obj.name);
      setDropdownOptions(temp);
    }
  }, [breedData]);

  useEffect(() => {
    if (dropdownOptions.length > 0)
    console.log("Dropdown Options in logging useEffect: ", dropdownOptions);
  }, [dropdownOptions]);

  const intValue = 2;


  return (
    <div className="App">
      {dropdownOptions.length > 0 && <Dropdown 
        dropdownOptions={dropdownOptions} 
        handleBreedSelected={handleBreedSelected}
      />}
      <img 
        src={catImageURL}
        alt="Random Cat Image"
        style={{ maxWidth: '500px' }}
      />
      <div>
        {Object.keys(ratingData).length > 0 && 
          Object.entries(ratingData).map(([key, value]) => (
          <StarRating feature={key} score={value}/>
        ))}
      </div>
      
    </div>
  );
}

export default App;
