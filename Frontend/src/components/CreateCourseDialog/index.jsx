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

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useFormik } from 'formik';

const CreateCourseDialog = ({onSubmit}) => {
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
    startTime: "",
    endTime: "",
    dayOfWeek: 1
  }

  const handleSubmit = (values) => {
    console.log("Submitting", values);
    // Create course
    fetch(`${BASE_URL}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify({...values}),
    })
      .then(r => r.json())
      .then(result => {
        console.log('Course created', result);

        toast.configure();
        toast('Course created successfully!',{position: toast.POSITION.TOP_RIGHT});

        setOpen(false);
        onSubmit();
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
            name="startTime"
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
              name="endTime"
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
