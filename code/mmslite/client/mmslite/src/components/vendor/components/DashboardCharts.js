// // install the following dependency:
// // npm i --save chart.js react-chartjs-2
// // source: https://react-chartjs-2.js.org/
// // tutorial: https://www.youtube.com/watch?v=RF57yDglDfE

// import { useState } from "react";
// import React from "react";
// import { Bar, Line, Pie } from "react-chartjs-2";


// // Eventhough this may seem not used, it facilitate the display of charts
// import { Chart as ChartJS } from "chart.js/auto";

// // Sample data
// const UserData = [
//   {
//     id: 1,
//     year: 2016,
//     userGain: 80000,
//     userLost: 823,
//   },
//   {
//     id: 2,
//     year: 2017,
//     userGain: 45677,
//     userLost: 345,
//   },
//   {
//     id: 3,
//     year: 2018,
//     userGain: 78888,
//     userLost: 555,
//   },
//   {
//     id: 4,
//     year: 2019,
//     userGain: 90000,
//     userLost: 4555,
//   },
//   {
//     id: 5,
//     year: 2020,
//     userGain: 4300,
//     userLost: 234,
//   },
// ];

// export function BarChart() {
//   const [userData] = useState({
//     labels: UserData.map((data) => data.year),
//     datasets: [
//       {
//         label: "Users Gained",
//         data: UserData.map((data) => data.userGain),
//         backgroundColor: [
//           "rgba(75,192,192,1)",
//           "#ecf0f1",
//           "#50AF95",
//           "#f3ba2f",
//           "#2a71d0",
//         ],
//         borderColor: "black",
//         borderWidth: 2,
//       },
//     ],
//   });
// return (  
//     <Bar data={userData} />     
// );
// }

// export function LineChart() {
//   const [userData] = useState({
//     labels: UserData.map((data) => data.year),
//     datasets: [
//       {
//         label: "Users Gained",
//         data: UserData.map((data) => data.userGain),
//         backgroundColor: [
//           "rgba(75,192,192,1)",
//           "#ecf0f1",
//           "#50AF95",
//           "#f3ba2f",
//           "#2a71d0",
//         ],
//         borderColor: "black",
//         borderWidth: 2,
//       },
//     ],
//   });
//   return (
//     <Line data={userData} />      
//   );
// }

// export function PieChart() {
//   const [userData] = useState({
//     labels: UserData.map((data) => data.year),
//     datasets: [
//       {
//         label: "Users Gained",
//         data: UserData.map((data) => data.userGain),
//         backgroundColor: [
//           "rgba(75,192,192,1)",
//           "#ecf0f1",
//            "#50AF95",
//           "#f3ba2f",
//           "#2a71d0",
//         ],
//           borderColor: "black",
//           borderWidth: 2,
//         },
//     ],
//   });

//   return (
//     <Pie data={userData} />
//   );
