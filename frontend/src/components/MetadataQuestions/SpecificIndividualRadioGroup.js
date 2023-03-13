import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import PropTypes from "prop-types";
import styled from "styled-components";

const SpecificIndividualRadioGroup = (props) => {
  return (
    <div>
      <FormControlStyled>
        <FormLabel id="demo-row-radio-buttons-group-label">
          Do you know which specific individual?
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={props.value}
          onChange={props.onChange}
          row
        >
          <FormControlLabel value="true" control={<Radio />} label="Yes" />
          <FormControlLabel value="false" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControlStyled>
    </div>
  );
};

const FormControlStyled = styled(FormControl)`
  align-items: center;
`;

SpecificIndividualRadioGroup.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default SpecificIndividualRadioGroup;
