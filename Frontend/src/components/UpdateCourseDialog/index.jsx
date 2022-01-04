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

import { BASE_URL, DAYS_OF_THE_WEEK_CHOICES } from "../../common/constants";

import { datetime } from '../../utils/datetime';

import jwtDecode from 'jwt-decode';

import { useFormik } from 'formik';

const UpdateCourseDialog = ({ course, open, onClose, onSubmit }) => {
  const initialValues = {
    id: course.id,
    name: course.name,
    description: course.description,
    startTime: course.startTime,// "12:30:00", // test
    endTime: course.endTime, // "14:00:00",
    dayOfWeek: course.dayOfWeek
  }

  const handleSubmit = (values) => {
    console.log("Updating", values);
    // Update course
    fetch(`${BASE_URL}/courses/${initialValues.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify({...values}),
    })
      .then(r => r.json())
      .then(result => {
        console.log('Course updated', result);
        onSubmit()
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
              value={formik.values.startTime}
              label="Start *"
              type="time"
              name="startTime"
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              fullWidth
              value={formik.values.endTime}
              label="End *"
              type="time"
              name="endTime"
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
          <Button type="submit">Update</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default UpdateCourseDialog;
