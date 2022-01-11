import React, {useState} from 'react';

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Collapse, List, ListItem, ListItemText, TextField, Button  } from '@material-ui/core';
import {useFormik} from 'formik'
import * as Yup from 'yup';
import { errorHelper } from 'utils/tools';

const RangeSelect = ({title, initState, handleRange})=> {
    const [open, setOpen] = useState(initState);
    const handleCollapseOpen =()=> setOpen(!open);
    const formik = useFormik({
        initialValues : {
            min: 0, max: 5000
        },
        validationSchema : Yup.object({
            min: Yup.number().min(0, 'The min amount 0'),
            max : Yup.number().max(5000, 'The max amount 5000')
        }),
        onSubmit: (values)=> {
            handleRange([+values.min, +values.max])
            console.log(values);
        }
    })
    
    return(
        <div className="collapse_item_wrapper">
            <List>
                <ListItem onClick={handleCollapseOpen} >
                    <ListItemText
                        primary={title}
                        className="collapse_title"
                    />
                    {open ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                </ListItem>
                <Collapse in={open} timeout="auto">
                    <List component="div" disablePadding>
                        <form className="mt-3" onSubmit={formik.handleSubmit}>
                            <div>
                                <TextField
                                placeholder='$ min'
                                name='min'
                                variant='outlined'
                                {...formik.getFieldProps('min')}
                                {...errorHelper(formik, 'min')}
                                />
                            </div>
                            <div>
                                <TextField
                                placeholder='$ max'
                                name='max'
                                variant='outlined'
                                {...formik.getFieldProps('max')}
                                {...errorHelper(formik, 'max')}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="mt-3"
                                variant="outlined"
                                color="secondary"
                                size="small"
                            >
                                Search
                            </Button>
                        </form>
                    </List>
                </Collapse>
           
            </List>

        </div>
    )
}

export default RangeSelect;