import React, {useState} from 'react';

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Collapse, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from '@material-ui/core';


const CollapseCheckBox = ({title, initState, list, handleFilters})=> {
    const [open, setOpen] = useState(initState);
    const [checked, setChecked] = useState([]);


    const handleCollapseOpen =()=> setOpen(!open);

    const handleToggle =(value)=> {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if(currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        handleFilters(newChecked);

    };
    
    const renderList =()=> (
        list? list.map((value)=> (
            <ListItem key={value._id}>
               <ListItemText primary={value.name} />
               <ListItemSecondaryAction>
                   <Checkbox 
                        color="primary" 
                        onChange={()=> handleToggle(value._id)}
                        checked={checked.indexOf(value._id) !== -1 }
                        />
               </ListItemSecondaryAction>
            </ListItem>
        )) : null
    )
    
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
                    {renderList()}
                        
                    </List>
                </Collapse>
           
            </List>

        </div>
    )
}

export default CollapseCheckBox;