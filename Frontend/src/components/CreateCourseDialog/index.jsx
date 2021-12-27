import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { BASE_URL } from "../../common/constants";

import jwtDecode from 'jwt-decode';

import { useFormik } from 'formik';

export const DAYS_OF_THE_WEEK_CHOICES = [
  { label: 'Monday', value: 1 },
  { label: 'Tuesday', value: 2 },
  { label: 'Wednesday', value: 3 },
  { label: 'Thursday', value: 4 },
  { label: 'Friday', value: 5 },
  { label: 'Saturday', value: 6 },
  { label: 'Sunday', value: 7 }
];

const CreateCourseDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialValues = {
    name: '',
    description: '',
    start: "",
    end: "",
    dayOfWeek: 1
  }

  const handleSubmit = (values) => {
    console.log("Submitting");

    fetch(`${BASE_URL}/create-course`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...values}),
    })
      .then(r => r.json())
      .then(result => {
        if (result.error) {
          return alert(result.message);
        }

        try {
          const payload = jwtDecode(result.token);
          // setUser(payload);
        } catch (e) {
          return alert(e.message);
        }
      })
      .catch(alert);
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  });


  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create new course
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Create new course</DialogTitle>
        <DialogContent>
        <Stack spacing={2}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            onChange={formik.handleChange}
             variant="outlined"
          />
          <TextField
            multiline
            rows={4}
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            onChange={formik.handleChange}
             variant="outlined"
          />
          <TextField
            fullWidth
            label="Start *"
            type="time"
            name="start"
            value={formik.values.start_time}
            onChange={formik.handleChange}
            InputLabelProps={{
              shrink: true
            }}
        />
          <TextField
              fullWidth
              label="End *"
              type="time"
              name="end"
              value={formik.values.start_time}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true
              }}
          />
          <FormControl fullWidth>
            <InputLabel
              shrink
              id="dayOfWeek"
              sx={{ backgroundColor: 'white', paddingX: '5px' }}
            >Choose day</InputLabel>
            <Select
              id="dayOfWeek"
              name="dayOfWeek"
              value={formik.values.dayOfWeek}
              onChange={formik.handleChange}
            >
            {DAYS_OF_THE_WEEK_CHOICES.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </MenuItem>))}
              </Select>
            </FormControl>
          </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default CreateCourseDialog;
