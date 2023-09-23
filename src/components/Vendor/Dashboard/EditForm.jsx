import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
} from "@mui/material";

const EditForm = ({ rowData, open, onClose, onSave }) => {
  const [editedData, setEditedData] = useState(rowData);

  const handleFieldChange = (field, value) => {
    setEditedData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Row</DialogTitle>
      <DialogContent>
        {Object.keys(rowData).map((field) => (
          <TextField
            key={field}
            label={field}
            variant="outlined"
            value={editedData[field]}
            onChange={(e) => handleFieldChange(field, e.target.value)}
            fullWidth
            margin="normal"
          />
        ))}
        <div className="flex gap-3">
        <Button variant="contained" onClick={() => onSave(editedData)} color="primary">
          Save
        </Button>
        <Button variant="outlined" onClick={onClose} color="secondary">
          Cancel
        </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditForm;
