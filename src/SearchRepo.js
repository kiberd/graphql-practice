import React from "react";

import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Hook
const SearchRepo = React.memo(
    (props) => {
        const list = props.list;

        const handleCheckChange = (event) => {
            props.onHandleCheckChange(event.target.name, event.target.checked);
        };

        const handleKeywordChange = (event) => {
            props.onHandleKeywordChange(event.target.value);
        };

        return (
            <>
                <Box sx={{ display: 'flex' }}>

                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                        <TextField label="Repository Name" variant="outlined" onChange={handleKeywordChange} />
                        <FormLabel component="legend">Search Repository</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={list.name} onChange={handleCheckChange} name="name" />
                                }
                                label="Name"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={list.owner} onChange={handleCheckChange} name="owner" />
                                }
                                label="Owner"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={list.homepageUrl} onChange={handleCheckChange} name="homepageUrl" />
                                }
                                label="URL"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={list.description} onChange={handleCheckChange} name="description" />
                                }
                                label="Description"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={list.createdAt} onChange={handleCheckChange} name="createdAt" />
                                }
                                label="Created Date"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={list.diskUsage} onChange={handleCheckChange} name="diskUsage" />
                                }
                                label="DiskUsage"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={list.forkCount} onChange={handleCheckChange} name="forkCount" />
                                }
                                label="ForkCount"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={list.issues} onChange={handleCheckChange} name="issues" />
                                }
                                label="Issues"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={list.assignableUsers} onChange={handleCheckChange} name="assignableUsers" />
                                }
                                label="AssignableUsers"
                            />
                        </FormGroup>
                    </FormControl>
                </Box>
                {/* <Button onClick={handleClick} variant="contained">Search</Button> */}

            </>
        )

    }
)

export default SearchRepo;