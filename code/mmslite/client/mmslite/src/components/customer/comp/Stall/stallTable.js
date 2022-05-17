import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CayoTable from './CayoTable'
import CorozalTable from './CorozalTable'
import OrangeTable from './OrangeTable'
import BelizeTable from './BelizeTable'
import StannTable from './StannTable'
import ToledoTable from './ToledoTable'
import Grid from '@mui/material/Grid';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <div>
        
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Corozal" {...a11yProps(0)} />
            <Tab label="Orange Walk" {...a11yProps(1)} />
            <Tab label="Belize" {...a11yProps(2)} />
            <Tab label="Cayo" {...a11yProps(3)} />
            <Tab label="Stann Creek" {...a11yProps(4)} />
            <Tab label="Toledo" {...a11yProps(5)} />
            
            </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
           <CorozalTable/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <OrangeTable/>
        </TabPanel>
        <TabPanel value={value} index={2}>
           <BelizeTable/>
        </TabPanel>
        <TabPanel value={value} index={3}>
           <CayoTable/>
        </TabPanel>
        <TabPanel value={value} index={4}>
           <StannTable/>
        </TabPanel>
        <TabPanel value={value} index={5}>
           <ToledoTable/>
        </TabPanel>
        
        </Box>

    </div>
  );
}