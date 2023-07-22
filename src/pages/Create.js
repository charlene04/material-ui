import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles'
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';

const useStyle = makeStyles({
  field: {
    marginTop: '20px!important',
    marginBottom: '20px!important',
    display: 'block!important'
  }
})

function Create() {
  const [details, setDetails] = useState({ title: '', body: '', category: ''});
  const [error, setError] = useState({
    titleError: false,
    bodyError: false
  });

  let classes = useStyle();
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault();
    
    setError({ bodyError: details.body === '', titleError: details.title === ''})
    
    if (details.title && details.body) {
      fetch('http://localhost:8000/notes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(details)
        }).then(() => history.push('/'));
    }
  }

  function handleOnChange(target) {
    let { name, value } = target;
    setDetails({ ...details, [name]: value });
  }

  return (
    <>
      <Typography
        variant="h3"
        color="textSecondary"
        gutterBottom
        align="center"
      >
        Create a New Note
      </Typography>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => handleOnChange(e.target)}
          name="title"
          className={classes.field}
          label="Enter the title"
          color="primary"
          variant="outlined"
          fullWidth
          required
          error={error.titleError}
        />
        <TextField
          onChange={(e) => handleOnChange(e.target)}
          name="body"
          className={classes.field}
          label="Enter Description"
          color="primary"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          required
          error={error.bodyError}
        />
        <FormControl className={classes.field}>
          <FormLabel id="demo-radio-buttons-group-label">Note Category</FormLabel>
          <RadioGroup
            onChange={(e) => handleOnChange(e.target)}
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="work"
            name="category"
          >
            <FormControlLabel value="reminder" control={<Radio />} label="Reminder" />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        <Button
          label="Submit"
          type="Submit"
          variant="contained"
          color="primary"
          endIcon={<AccessibleForwardIcon/>}
        >
          Submit
        </Button>
      </form>
    </>
  )
}

export default Create;
