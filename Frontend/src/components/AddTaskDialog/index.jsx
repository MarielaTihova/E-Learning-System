import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { BASE_URL } from "../../common/constants";

import { useFormik } from 'formik';
import {datetime} from '../../utils/datetime';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTaskDialog = ({onSubmit, courseId}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialValues = {
    description: '',
    available_from: datetime().format("YYYY-MM-DDTHH:mm"),
    available_to: datetime().add(30, "minutes").format("YYYY-MM-DDTHH:mm"),
  }

  const handleSubmit = (values) => {
    console.log("Submitting", values);
    // Create course
    fetch(`${BASE_URL}/courses/${courseId}/tasks/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify({...values}),
    })
      .then(r => r.json())
      .then(result => {
        console.log('Task created', result);
        toast.configure();
        toast('Task created successfully!',{position: toast.POSITION.TOP_RIGHT});

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
        Add new task
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Add new task</DialogTitle>
        <DialogContent>
        <Stack spacing={2}>
          <TextField
            multiline
            rows={4}
            margin="dense"
            id="description"
            label="Question"
            type="text"
            fullWidth
            onChange={formik.handleChange}
             variant="outlined"
          />
          <TextField
            fullWidth
            label="Available from *"
            type="datetime-local"
            name="available_from"
            id="available_from"
            value={formik.values.available_from}
            onChange={formik.handleChange}
            InputLabelProps={{
              shrink: true
            }}
        />
          <TextField
              fullWidth
              label="Available to *"
              type="datetime-local"
              id="available_to"
              name="available_to"
              value={formik.values.available_to}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true
              }}
          />
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

export default AddTaskDialog;
