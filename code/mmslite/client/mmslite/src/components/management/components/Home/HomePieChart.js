import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto"
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import {  invTotalPaidPending} from '../../../../service/call';
import * as React from 'react'
import PaidIcon from '@mui/icons-material/Paid';
import PendingActionsIcon from '@mui/icons-material/PendingActions';


export default function InvoiceChart(){
  const theme = useTheme();
  const [invoices, setInvoice] = React.useState([])
 
  
  React.useEffect(()=>{
  
  getInvoiceStatus()
  
 
}, []);



 

 const getInvoiceStatus = async () =>{
   
    const res = await invTotalPaidPending()
    console.log(res.data[0])
    setInvoice(res.data[0])
    
 }


  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const Res = [
      {
        "title":"Paid",
          "total": Number(invoices.Paid)
      },
      {
          "total": Number(invoices.Pending)
      },
     
  ]
  
  const data = {
      
    datasets: [
      {
        data: Res.map(x => x.total),
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['Paid', 'Pending' ]
  };

  

  
  const devices = [
    {
      title: 'Paid',
      icon: PaidIcon,

      value:Number(invoices.Paid),
      color: '#3F51B5'
    },
    {
      title: 'Pending',
      value: Number(invoices.Pending),
      icon: PendingActionsIcon,
      color: '#E53935'
    }
    
  ];

  return (
    <Card >
      <CardHeader title="Invoices" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
                
              </Typography>
             
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};