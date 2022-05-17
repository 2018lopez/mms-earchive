

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Inquiries} from '../../../service/call'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));





export default function CustomizedTables() {

  const [inquiries, setInquiry] = React.useState([]);
  React.useEffect(()=>{

      getInquiries()
   
  }, []);

  
  const getInquiries = async () =>{
    const res = await Inquiries()
    
    setInquiry(res.data)
  }
  

  return (
    <div>
    <h1>Inquiries</h1>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Subject</StyledTableCell>
            <StyledTableCell align="center">Details</StyledTableCell>
            <StyledTableCell align="left">Date</StyledTableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {inquiries.map((inquiry) => (
            <StyledTableRow key={inquiry.id}>
              <StyledTableCell component="th" scope="row">
                {inquiry.name}
              </StyledTableCell>
              <StyledTableCell align="right">{inquiry.subject}</StyledTableCell>
              <StyledTableCell align="center">{inquiry.details}</StyledTableCell>
              
              <StyledTableCell align="left">{inquiry.date}</StyledTableCell>
             
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
