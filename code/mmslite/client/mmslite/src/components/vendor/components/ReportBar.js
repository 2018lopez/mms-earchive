import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Chart as ChartJS } from "chart.js/auto"
import * as React from 'react'
import { totalExpense } from '../../../service/call';


export default function InvoiceBar() {
    const theme = useTheme();

    const [expenses, setExpense] = React.useState([]);
    //   const [electricity, SetElectricity] = React.useState([])
     
      
      React.useEffect(()=>{
      
      getExpense()
      
    
    }, []);
    
    
    
      const getExpense = async () =>{

        let username = localStorage.getItem('username')
    
      const res = await totalExpense(username)
      setExpense(res)
      
    
    
     }
  
    
  
    const options = {
      animation: false,
      cornerRadius: 20,
      layout: { padding: 0 },
      legend: { display: false },
      maintainAspectRatio: false,
      responsive: true,
      xAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ],
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
          "title":"Light",
            "total": Number(expenses.Electricity)
        },
        {
            "total": Number(expenses.Water)
        },
        {
            "total": Number(expenses.Rental)
        }
    ]

    const data = {
        datasets: [
          {
            backgroundColor: '#3F51B5',
            barPercentage: 0.5,
            barThickness: 12,
            borderRadius: 4,
            categoryPercentage: 0.5,
            data: Res.map(x => x.total),
            label:"Expense",
            maxBarThickness: 80
          }
         
  
        ],
        labels: ['Electricity', 'Water', 'Rental']
      };
  
    return (
      <Card >
        <CardHeader
          
          title="Expenses"
        />
        <Divider />
        <CardContent>
          <Box
            sx={{
              height: 400,
              position: 'relative'
            }}
          >
            <Bar
              data={data}
              options={options}
            />
          </Box>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            endIcon={<ArrowRightIcon fontSize="small" />}
            size="small"
          >
            Overview
          </Button>
        </Box>
      </Card>
    );
  };