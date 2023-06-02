import { useEffect, useState } from "react";
import Dropdown from "./components/Dropdown";
import StarRating  from "./components/StarRating";
import CatIcon from './images/cat-icon.png'


function App() {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [breedData, setBreedData] = useState({});
  const [selectedBreedName, setSelectedBreedName] = useState('');
  const [catImageURL, setCatImageURL] = useState('');
  const [catImageURLs, setCatImageURLs] = useState('');
  const [breedDescription, setBreedDescription] = useState('');
  const [ratingData, setRatingData] = useState({});
  const [stringDescriptors, setStringDescriptors] = useState({});

  console.log("Rating Data length:", Object.keys(ratingData).length);

  const requestSingleCatImage = async (breedId) => {
    fetch(`https://catapi-full-stack-app-node.onrender.com/catImage?breedId=${breedId}`)
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
  const requestTenCatImages = async (breedId) => {
    fetch(`https://catapi-full-stack-app-node.onrender.com/catImages?breedId=${breedId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCatImageURLs(data.map(item => item.url));
        console.log("Cat Image URLs: ", data.map(item => item.url));
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
      setStringDescriptors(stringDescriptorsLocal)
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
      console.log("Selected Breed: ", selectedBreed);
      setSelectedBreedName(selectedBreed);
      const breedId = getBreedId(selectedBreed);
      getSingleBreedData(selectedBreed);
      requestSingleCatImage(breedId);
      requestTenCatImages(breedId);
    }
  }
 

  const handleScreenLoad = async () => {
      fetch(`https://catapi-full-stack-app-node.onrender.com/breedsList`)
        .then(response => response.json())
        .then(data => {
          console.log("Data: ", data);
          setBreedData(data);
          console.log("Breed Data: ", breedData);
        })
        .catch(error => {
          console.log(error);
        });
  }

  useEffect(() => {
    handleScreenLoad();
    console.log("CLICK HANDLED!!!");
     // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return(
    <div className="App container mx-auto px-4">
      <header style={{ backgroundColor: 'lightblue', padding: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img 
            src={CatIcon} 
            alt="Cat Bazaar Logo" 
            style={{maxWidth: '50px'}}>
          </img>
          <h1 className="text-blue-900 text-3xl">Cat Bazaar</h1>
        </div>
      </header>
      <span className="flex flex-col sm:flex-row sm:items-center sm:gap-10 bg-gray-200 my-2 py-1">
        <h1 className="order-0 sm:order-0 text-xl font-bold">Cat Lookup</h1>
        {dropdownOptions.length > 0 && 
          <div className="order-1 sm:order-1">
            <Dropdown 
              dropdownOptions={dropdownOptions} 
              handleBreedSelected={handleBreedSelected}
            />
          </div>
          
        }
      </span>
      { selectedBreedName !== '' && 
        <div>
          <div>
            {/* flex flex-col gap-4 sm:flex-row */}
            <div className={"flex flex-wrap gap-4 lg:flex-nowrap"} >
              <div>
                <img 
                  src={catImageURL}
                  alt="Random Cat"
                  style={{ 
                    maxHeight: '300px', 
                    maxWidth: '300px', 
                    margin: '10px',
                    borderRadius: '10px'
                  }}
                />
              </div>
              {selectedBreedName !== '' && breedDescription !== '' && 
                <div className="flex-grow">
                  <div className="flex flex-col justify-start h-full">
                    <h1 className="font-bold text-3xl">{selectedBreedName}</h1>
                    <h2 className="font-bold">Description</h2>
                    <p>{breedDescription}</p>
                  </div>
                </div> 
              }
              <div className="flex-grow">
                {
                  Object.keys(stringDescriptors).length > 0 &&
                    Object.entries(stringDescriptors).map(([key, value]) => (
                      <div className="flex flex-col justify-center">
                        <div className="font-bold text-lg">{key}</div>
                        <div className="text-base">{value}</div>
                      </div>
                    ))
                }
              </div>
              <div className="flex-grow min-w-0 flex-shrink-0 w-100" >
                {Object.keys(ratingData).length > 0 && 
                  Object.entries(ratingData).map(([key, value]) => (
                  <StarRating feature={key} score={value}/>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold">More images of the {selectedBreedName}</div>
            <div className="flex items-center">
              <div className="flex flex-wrap gap-4">
                {catImageURLs.length > 0 && catImageURLs.map((url, index) => (
                  <img
                    key={index}
                    src={url} 
                    alt={`Cat ${index + 1}`} 
                    style={{
                      maxHeight: '200px',
                      margin: '10px',
                      borderRadius: '10px'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
