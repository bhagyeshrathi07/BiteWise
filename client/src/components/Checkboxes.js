import { Checkbox } from '@mui/material';
import * as React from 'react';
import './Checkboxes.css';

const Checkboxes = () => {
  const [checkedOne, setCheckedOne] = React.useState(false);

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };

  return (
    <div>
      <Checkbox
        label="Value 1"
        value={checkedOne}
        onChange={handleChangeOne}
      />
    </div>
  );
};

export default Checkboxes;