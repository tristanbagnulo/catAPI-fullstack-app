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
          <select value={selectedOption} onChange={handleSelect} style={{ fontSize: '20px' }}>
          <option value="">Select an option</option>
          {dropdownOptions.map((dropdownOption, index) => (
            <option key={index} value={dropdownOption} style={{ fontSize: '20px' }}>
              {dropdownOption}
            </option>
          ))}
        </select>
      }
    </div>
  );
};
  
export default Dropdown;
  