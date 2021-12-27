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

import {datetime} from '../../utils/datetime'

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

const UpdateCourseDialog = ({course, open, onClose}) => {
  const initialValues = {
    name: course.name,
    description: course.description,
    start: "12:30:00", // test
    end: "14:00:00",
    dayOfWeek: 1
  }

  const handleSubmit = (values) => {
    console.log("Submitting");

    fetch(`${BASE_URL}/update-course`, {
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
      <Dialog open={open} onClose={onClose} fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Update course</DialogTitle>
        <DialogContent>
        <Stack spacing={2}>
          <TextField
            autoFocus
            value={formik.values.name}
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
            value={formik.values.description}
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
            value={formik.values.start}
            label="Start *"
            type="time"
            name="start"
            value={formik.values.start}
            onChange={formik.handleChange}
            InputLabelProps={{
              shrink: true
            }}
        />
          <TextField
              fullWidth
              value={formik.values.end}
              label="End *"
              type="time"
              name="end"
              value={formik.values.end}
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
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </Dialog>
  );
}

export default UpdateCourseDialog;
