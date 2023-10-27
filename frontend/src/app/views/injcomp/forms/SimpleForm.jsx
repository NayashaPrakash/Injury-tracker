import React, { useState, useContext } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { Button, FormControlLabel, Grid, Icon, Radio, RadioGroup, styled } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Span } from 'app/components/Typography';
import ImgBody from './ImageBody.png';
import dayjs from 'dayjs';
import { saveFormDataToMongoDB } from './api';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import AuthContext from 'app/contexts/AuthContext';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const MergedForm = () => {
  const { user } = useContext(AuthContext);
  const [state, setState] = useState({
    username: '',
    email: '',
    date: dayjs(),
    time: dayjs(),
    mobile: '',
    gender: '',
    selectedParts: [],
    inputValues: {}
  });

  const [submitted, setSubmitted] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handlePartClick = (partName) => {
    if (!state.selectedParts.includes(partName)) {
      setState((prevState) => ({
        selectedParts: [...prevState.selectedParts, partName],
        inputValues: {
          ...prevState.inputValues,
          [partName]: ''
        }
      }));
    }
  };

  const handleInputChange = (partName, event) => {
    const newInputValues = { ...state.inputValues };
    newInputValues[partName] = event.target.value;
    setState({ ...state, inputValues: newInputValues });
  };

  const handleClearAll = () => {
    setState({
      username: '',
      email: '',
      date: dayjs(),
      time: dayjs(),
      mobile: '',
      gender: '',
      selectedParts: [],
      inputValues: {}
    });
    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = { ...state, userId: user._id };
    saveFormDataToMongoDB(formData);
    setSubmitted(true);
    setFormSubmitted(true);
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleDateChange = (date) => setState({ ...state, date });
  const handleTimeChange = (time) => setState({ ...state, time });
  const { username, firstName, mobile, gender, date, time, email } = state;

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        {formSubmitted ? (
          <div>
            <h3>Form Submitted</h3>
            <Button color="primary" variant="contained" onClick={() => setFormSubmitted(false)}>
              <Icon>navigate_before</Icon>
              <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Go Back</Span>
            </Button>
          </div>
        ) : (
          <div>
            <h3>Select injured body parts and enter details:</h3>
            <div style={{ position: 'relative' }}>
              <img src={ImgBody} alt="Human Body" useMap="#image_map" />
              <map name="image_map">
                <area
                  alt="head"
                  title="head"
                  href="#"
                  coords="239,14,336,82"
                  shape="rect"
                  onClick={() => handlePartClick('Head')}
                />
                <area
                  alt="chest"
                  title="chest"
                  href="#"
                  coords="187,224,380,327"
                  shape="rect"
                  onClick={() => handlePartClick('Chest')}
                />
                <area
                  alt="stomach"
                  title="stomach"
                  href="#"
                  coords="194,336,379,496"
                  shape="rect"
                  onClick={() => handlePartClick('Stomach')}
                />
                <area
                  alt="left-leg"
                  title="left-leg"
                  href="#"
                  coords="171,586,263,1009"
                  shape="rect"
                  onClick={() => handlePartClick('Left Leg')}
                />
                <area
                  alt="right-leg"
                  title="right-leg"
                  href="#"
                  coords="294,586,397,1007"
                  shape="rect"
                  onClick={() => handlePartClick('Right Leg')}
                />
                <area
                  alt="hind-left-leg"
                  title="hind-left-leg"
                  href="#"
                  coords="811,594,893,1053"
                  shape="rect"
                  onClick={() => handlePartClick('Hind Left Leg')}
                />
                <area
                  alt="hind-right-leg"
                  title="hind-right-leg"
                  href="#"
                  coords="928,592,1024,1054"
                  shape="rect"
                  onClick={() => handlePartClick('Hind Right Leg')}
                />
                <area
                  alt="right-hand"
                  title="right-hand"
                  href="#"
                  coords="425,298,552,658"
                  shape="rect"
                  onClick={() => handlePartClick('Right Hand')}
                />
                <area
                  alt="left-hand"
                  title="left-hand"
                  href="#"
                  coords="61,288,153,622"
                  shape="rect"
                  onClick={() => handlePartClick('Left Hand')}
                />
                <area
                  alt="back"
                  title="back"
                  href="#"
                  coords="812,221,1017,451"
                  shape="rect"
                  onClick={() => handlePartClick('Back')}
                />
              </map>
              {state.selectedParts.length > 0 && (
                <div>
                  <p>You selected:</p>
                  {state.selectedParts.map((partName) => (
                    <div key={partName}>
                      <p>{partName}</p>
                      <input
                        type="text"
                        value={state.inputValues[partName]}
                        onChange={(event) => handleInputChange(partName, event)}
                        placeholder={`Enter details.`}
                      />
                      <br />
                    </div>
                  ))}
                  <br />
                  <br />
                  <button onClick={handleClearAll}>Clear All</button>
                </div>
              )}
            </div>
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  type="text"
                  name="username"
                  id="standard-basic"
                  value={username || ''}
                  onChange={handleChange}
                  errorMessages={['this field is required']}
                  label="Reporter Name (Min length 1, Max length 26)"
                  validators={['required', 'minStringLength: 1', 'maxStringLength: 26']}
                />

                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  value={email || ''}
                  onChange={handleChange}
                  validators={['required', 'isEmail']}
                  errorMessages={['this field is required', 'email is not valid']}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={date}
                    onChange={handleDateChange}
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        label="Date picker"
                        id="mui-pickers-date"
                        validators={['required', 'Please enter date.']}
                        sx={{ mb: 2, width: '100%' }}
                      />
                    )}
                  />

                  <h1></h1>
                  <TimePicker
                    value={time}
                    onChange={handleTimeChange}
                    ampm={true}
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        label="Time picker"
                        id="mui-pickers-time"
                        validators={['required', 'Please enter time.']}
                        sx={{ mb: 2, width: '100%' }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  type="text"
                  name="mobile"
                  value={mobile || ''}
                  label="Relevant Contact Nubmer"
                  onChange={handleChange}
                  validators={['required', 'minStringLength: 10', 'maxStringLength: 10']}
                  errorMessages={['this field is required']}
                />

                <h3>Victim's Gender: </h3>
                <RadioGroup
                  row
                  name="gender"
                  sx={{ mb: 2 }}
                  value={gender || ''}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Male"
                    label="Male"
                    labelPlacement="end"
                    control={<Radio color="secondary" />}
                  />

                  <FormControlLabel
                    value="Female"
                    label="Female"
                    labelPlacement="end"
                    control={<Radio color="secondary" />}
                  />

                  <FormControlLabel
                    value="Others"
                    label="Others"
                    labelPlacement="end"
                    control={<Radio color="secondary" />}
                  />
                </RadioGroup>
              </Grid>
            </Grid>

            <h1></h1>
            <Button color="primary" variant="contained" type="submit">
              <Icon>send</Icon>
              <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
            </Button>
          </div>
        )}
      </ValidatorForm>
    </div>
  );
};

export default MergedForm;
