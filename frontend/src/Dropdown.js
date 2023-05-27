import React, {useState} from 'react';

const Dropdown = ({dropdownOptions, handleBreedSelected}) => {
    
  const [selectedOption, setSelectedOption] = useState('');
    
  const handleSelect = (event) => {
    setSelectedOption(event.target.value)
    handleBreedSelected(event.target.value);
  };

  return (
    <div>
      {dropdownOptions && dropdownOptions.length > 0 &&
          <select value={selectedOption} onChange={handleSelect}>
          <option value="">Select an option</option>
          {dropdownOptions.map((dropdownOption, index) => (
            <option key={index} value={dropdownOption}>
              {dropdownOption}
            </option>
          ))}
        </select>
      
      }
      
      <p>Selected value: {selectedOption}</p>
    </div>
  );
};
  
export default Dropdown;
  