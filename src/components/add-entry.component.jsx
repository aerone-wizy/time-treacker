import React, { useState } from "react";

import { createNewEntry } from "../firebase";

// import AccessTimeIcon from "@material-ui/icons/AccessTime";
// import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// import IconButton from "@material-ui/core/IconButton";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  formField: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  entryField: {
    marginTop: theme.spacing(1),
    minWidth: 230,
  },
  form: {
    display: "flex",
    justifyContent: "space-between",
  },
  flexItem: {
    display: "flex",
    flexWrap: "nowrap",
  },
  option: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(1.5),
    margin: theme.spacing(1),
  },
}));

const AddEntry = ({ email }) => {
  const classes = useStyles();
  const [entry, setEntry] = useState("");
  const [project, setProject] = useState("");
  const [timeFrom, setTimeFrom] = useState(moment().format("hh:mm"));
  const [timeTo, setTimeTo] = useState(moment().format("hh:mm"));
  const [duration, setDuration] = useState(
    moment("00:00:00", "HH:mm:ss").format("HH:mm:ss")
  );
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  const handleSubmit = async (event) => {
    event.preventDefault();

    createNewEntry(email, entry, project, timeFrom, timeTo, date);

    setEntry("");
    setTimeFrom(moment().format("hh:mm"));
    setTimeTo(moment().format("hh:mm"));
    setDate(moment().format("YYYY-MM-DD"));
    setDuration(moment("00:00:00", "HH:mm:ss").format("HH:mm:ss"));
    setProject("");
  };

  const handleChange = (event) => {
    const value = event.target.value;

    switch (event.target.name) {
      case "entry":
        setEntry(value);
        break;
      case "project":
        setProject(value);
        break;
      case "timeFrom":
        setTimeFrom(value);
        break;
      case "timeTo":
        setTimeTo(value);
        break;
      case "duration":
        setDuration(value);
        break;
      case "date":
        setDate(value);
        break;
      default:
        break;
    }
  };

  const computeDuration = () => {
    console.log(duration);
    console.log(timeTo);
    const totalTimeTo = moment(timeTo, "hh:mm");
    console.log(totalTimeTo.add(moment(duration, "HH:mm:ss")));
    // setTimeTo(timeTo.add(moment(duration, "HH:mm:ss")));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.flexItem}>
          <TextField
            name="entry"
            label="What have you worked on?"
            type="text"
            size="small"
            value={entry}
            onChange={handleChange}
            className={classes.entryField}
            variant="outlined"
          />
          <FormControl
            variant="outlined"
            size="small"
            className={classes.formField}
          >
            <InputLabel id="select-project">Project</InputLabel>
            <Select
              labelId="select-project"
              name="project"
              label="Project"
              value={project}
              onChange={handleChange}
            >
              <MenuItem value="WizyEMM">WizyEMM</MenuItem>
              <MenuItem value="WizyVision">WizyVision</MenuItem>
              <MenuItem value="FormWorkflow">FormWorkflow</MenuItem>
              <MenuItem value="GoWizApp">GoWizApp</MenuItem>
              <MenuItem value="Add">Add New Project</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className={classes.flexItem}>
          <TextField
            name="timeFrom"
            label="From"
            type="time"
            size="small"
            value={timeFrom}
            onChange={handleChange}
            className={classes.formField}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="timeTo"
            label="To"
            type="time"
            size="small"
            value={timeTo}
            onChange={handleChange}
            className={classes.formField}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="date"
            label="Date"
            type="date"
            size="small"
            value={date}
            onChange={handleChange}
            className={classes.formField}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="duration"
            label="Duration"
            type="text"
            size="small"
            value={duration}
            onChange={handleChange}
            onBlur={computeDuration}
            className={classes.formField}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            className={classes.formField}
            size="medium"
            variant="contained"
            color="primary"
            type="submit"
          >
            ADD
          </Button>
        </div>

        {
          // 	<div className={classes.option}>
          //   <IconButton size="small">
          //     <AccessTimeIcon />
          //   </IconButton>
          //   <IconButton size="small">
          //     <FormatListBulletedIcon />
          //   </IconButton>
          // </div>
        }
      </form>
    </div>
  );
};

export default AddEntry;
