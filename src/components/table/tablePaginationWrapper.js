import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
// import { ICONS } from '../_constants'


import TablePagination from '@material-ui/core/TablePagination';

import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input'

import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';


const TablePaginationWrapper = (props) => {
       return <TablePagination
          rowsPerPageOptions={[20, 100, { label: 'All', value: -1 }]}
          component="div"
          {...props}
          labelRowsPerPage = "每页"
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' },
            native: true,
          }}
          ActionsComponent={TablePaginationActions} />
}


function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;
    const [inputPage, setInputPage] = React.useState(page + 1);

    const lastPage = Math.ceil(count / rowsPerPage);
  
    const handleFirstPageButtonClick = event => {
      onChangePage(event, 0);
    };
  
    const handleBackButtonClick = event => {
      onChangePage(event, page - 1);
    };
  
    const handleNextButtonClick = event => {
      onChangePage(event, page + 1);
    };
  
    const handleLastPageButtonClick = event => {
      onChangePage(event, Math.max(0, lastPage - 1));
    };

    const handleJumpToPage = event => {
      if(event.key==='Enter') {
        const targetPage = Math.max(Math.min(inputPage, lastPage), 1 );
        onChangePage(event, targetPage - 1);
        setInputPage(targetPage);
      }
    }
  

    return (
      <div className={classes.root}>

          <Input type="text"
          value={inputPage} 
          onChange={(e)=>{setInputPage(parseInt(e.target.value) || 1)}}
          onClick={e=>{e.target.select()}}
          onKeyDown={handleJumpToPage}
          inputProps={{
            'aria-label': '页' ,
            style: { width:"2rem",textAlign: "right", padding:"1pt", fontSize:"0.875rem" }
          }}
          /> / {lastPage} 页

        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }

  export default TablePaginationWrapper;
  
  // =========================================styles of material-ui

  
  const useStyles1 = makeStyles(theme => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }));