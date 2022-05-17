import * as React from 'react';
import Header from '../Layouts/Header'
import Footer from '../Layouts/Footer'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { getDistricts, customerStallView, getMarkets, stallCategory} from '../../service/call'
import {  useNavigate  } from 'react-router-dom';
import {  AutoCompleteFieldController } from '../lib/component'
import {  Box,  Container , Button, Typography} from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { SeverityPill } from '../management/components/Invoice/util';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ProductPage from './comp/Product'
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

  function Item(props) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          p: 1,
          m: 1,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
          color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          ...sx,
        }}
        {...other}
      />
    );
  }
  
  Item.propTypes = {
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
      ),
      PropTypes.func,
      PropTypes.object,
    ]),
  };
  
const ExploreMarket = ()=>{
    const [ districtOptions, setDistrictOptions ] = React.useState([]);
    const [stalls, setStalls] = React.useState([])
    const [search, setSearch] = React.useState([])
    const [markets, setMarket] = React.useState([])
    const [stallCategorys, setStallCategory] = React.useState([])
    const navigate = useNavigate();

    //FORM HOOK 

    const {  control,  watch,  formState: { errors } } = useForm({
        shouldUnregister: true
    });

    const districtSelect = watch('district')
    const marketSelect = watch('market')
    const categorySelect = watch('category')

    React.useEffect(()=>{

       
        districts()
        stallView()
        marketList()
        categoryList()
      
    }, []);
  
    
  
  
  
    const districts = async() => {
  
      const response = await getDistricts()
      setDistrictOptions(response.data)
  
    }
    const stallView = async() =>{
        const response = await customerStallView()
        setStalls(response.data)
    }

    const marketList = async() =>{
        const response = await getMarkets()
        
        setMarket(response.data)
    }

    const categoryList = async() =>{

        const response = await stallCategory()
        
        setStallCategory(response.data)
        
    }
   
    const handleSearch = () =>{

        const filteredRows = stalls.filter((row) => {

            return row.stall.toLowerCase().includes(search.toLowerCase());
          });
          setStalls(filteredRows);
        
        
     }

     const shopStall = (stallsv) =>{

        console.log(stallsv)
        navigate('/products', {state:{name:stallsv}})

     }
     
        const setFilter = () =>{

            let datav = districtSelect
            const filteredRows = stalls.filter((row) => {
            
                return row.district.toLowerCase().includes(datav.name.toLowerCase());
            });
            setStalls(filteredRows);
          
            

        }
        const setMarketFilter =  () =>{

          let datav = districtSelect
          // const filteredRows = markets.filter((row) => {
          
          //     return row.market.toLowerCase().includes(datav.name.toLowerCase());
          // });
          // setStalls(filteredRows);

          console.log(datav)

        }

        

        const cancelFilter = () =>{
            stallView()
          
        }
  
      
        const cancelSearch = () =>{
            setSearch("")
            stallView()
           
        }

      
    return(
        <div>
            <Header/>
            <Box margin={5}>
             <h1>Explore Market</h1>
            
             <Box
        sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }}
      >
        <Item > 
                        
                            <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Search by Stall . </InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type='text'
                                            value={search}
                                                onChange={ (e) => setSearch(e.target.value) }
                                            
                                        
                                            endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleSearch}
                                                edge="end"
                                                >
                                                    <SearchIcon/>
                                                </IconButton>
                                                <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={cancelSearch}
                                                >
                                                <CloseIcon/>
                                                </IconButton>
                                            </InputAdornment>
                                            }
                                            label="Search By Stall"
                                        />
                        
                            </FormControl>
                            </Item>
                             <Item sx={{ width: '25ch' }}> 
                                 <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="overline"
                                >
                                Filters:
                                </Typography>
                            <AutoCompleteFieldController
                                    options={districtOptions.map(el => ({...el, label: (el.name )}) )}
                                    //errors={errors.product || null}
                                    control={control}
                                    name="district"
                                    label="Districts"
                                    values={districtSelect}
                                    rules={{ required: "District is Required!" }}
                                    
                                />
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={setFilter}
                                edge="end"
                                >
                                <FilterAltIcon/>
                            </IconButton>
                                <IconButton
                                aria-label="toggle password visibility"
                                  onClick={cancelFilter}
                                            
                            
                                >
                                <CloseIcon/>
                                </IconButton>
                                </Item>
                         
      </Box>
            
          
                 
         <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Stall Code </StyledTableCell>
                <StyledTableCell align="left">Market</StyledTableCell>
                <StyledTableCell align="left">District</StyledTableCell>
                <StyledTableCell align="left">Category</StyledTableCell>
                <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {stalls.map((stall,index) => (
                <StyledTableRow >
                <StyledTableCell component="th" scope="row">
                    {stall.stall}
                </StyledTableCell>
                <StyledTableCell align="left">{stall.market}</StyledTableCell>
                <StyledTableCell align="left">{stall.district}</StyledTableCell>
                
                <StyledTableCell align="left"><SeverityPill
                    color={(stall.category === 'Fruits and Vegetables' && 'success')
                    || (stall.category === 'Clothing' && 'warning')
                    || 'warning'}
                  >{stall.category}</SeverityPill></StyledTableCell>
                <StyledTableCell align="left"> <Button color="warning" variant="contained" onClick={()=>shopStall(stall.stall)} ><PreviewIcon/></Button>
 </StyledTableCell>
                
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>
    </Box>
            <Footer/>
        </div>
      
    );

};

export default  ExploreMarket;