import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import PropTypes from "prop-types";
import styled from "styled-components";

const CaptivityStatusRadioGroup = (props) => {
  return (
    <div>
      <FormControlStyled>
        <FormLabel id="demo-row-radio-buttons-group-label">
          Captivity Status
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={props.value}
          onChange={props.onChange}
          row
        >
          <FormControlLabel
            value="captive"
            control={<Radio />}
            label="Captive"
          />
          <FormControlLabel value="wild" control={<Radio />} label="Wild" />
        </RadioGroup>
      </FormControlStyled>
    </div>
  );
};

const FormControlStyled = styled(FormControl)`
  align-items: center;
`;

CaptivityStatusRadioGroup.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default CaptivityStatusRadioGroup;
