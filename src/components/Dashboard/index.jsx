// import React, { useEffect, useMemo, useState } from 'react';
// import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
// import Wrapper from './style';

// const Dashboard = () => { 
//   const userData = useMemo(() => ({
//     "Current Year": [
//       { month: 'Jan', totalUsers: 150, totalConnections: 90, eventRegistered: 100 },
//       { month: 'Feb', totalUsers: 200, totalConnections: 140, eventRegistered: 150 },
//       { month: 'Mar', totalUsers: 250, totalConnections: 180, eventRegistered: 200 },
//       { month: 'Apr', totalUsers: 230, totalConnections: 160, eventRegistered: 180 },
//       { month: 'May', totalUsers: 270, totalConnections: 200, eventRegistered: 220 },
//       { month: 'Jun', totalUsers: 320, totalConnections: 280, eventRegistered: 300 },
//       { month: 'Jul', totalUsers: 300, totalConnections: 260, eventRegistered: 280 },
//       { month: 'Aug', totalUsers: 370, totalConnections: 320, eventRegistered: 350 },
//       { month: 'Sep', totalUsers: 420, totalConnections: 370, eventRegistered: 400 },
//       { month: 'Oct', totalUsers: 450, totalConnections: 400, eventRegistered: 420 },
//       { month: 'Nov', totalUsers: 480, totalConnections: 430, eventRegistered: 450 },
//       { month: 'Dec', totalUsers: 490, totalConnections: 460, eventRegistered: 480 }
//     ],
//     "Previous Year": [
//       { month: 'Jan', totalUsers: 130, totalConnections: 80, eventRegistered: 90 },
//       { month: 'Feb', totalUsers: 180, totalConnections: 120, eventRegistered: 130 },
//       { month: 'Mar', totalUsers: 210, totalConnections: 150, eventRegistered: 170 },
//       { month: 'Apr', totalUsers: 190, totalConnections: 130, eventRegistered: 140 },
//       { month: 'May', totalUsers: 240, totalConnections: 170, eventRegistered: 190 },
//       { month: 'Jun', totalUsers: 280, totalConnections: 230, eventRegistered: 250 },
//       { month: 'Jul', totalUsers: 260, totalConnections: 210, eventRegistered: 230 },
//       { month: 'Aug', totalUsers: 330, totalConnections: 280, eventRegistered: 310 },
//       { month: 'Sep', totalUsers: 390, totalConnections: 330, eventRegistered: 370 },
//       { month: 'Oct', totalUsers: 420, totalConnections: 350, eventRegistered: 390 },
//       { month: 'Nov', totalUsers: 450, totalConnections: 400, eventRegistered: 420 },
//       { month: 'Dec', totalUsers: 470, totalConnections: 420, eventRegistered: 450 }
//     ]
//   }), []);

//   const [selectedYear, setSelectedYear] = useState('Current Year');
//   const [totals, setTotals] = useState({
//     totalUsers: 0,
//     totalConnections: 0,
//     totalEvents: 0
//   });

//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth * 0.8,
//     height: window.innerHeight * 0.4
//   });

//   useEffect(() => {
//     const data = userData[selectedYear];
//     const totalUsers = data.reduce((sum, item) => sum + item.totalUsers, 0);
//     const totalConnections = data.reduce((sum, item) => sum + item.totalConnections, 0);
//     const totalEvents = data.reduce((sum, item) => sum + item.eventRegistered, 0);

//     setTotals({
//       totalUsers,
//       totalConnections,
//       totalEvents
//     });
//   }, [userData, selectedYear]);

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth * 0.8,
//         height: window.innerHeight * 0.4
//       });
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);


//   return (
//     <Wrapper>
//       <div className='dashboard'>
//         <h1>Dashboard</h1>
//       </div>
//       <div className='container'>
//         <div className='totalUsers'>
//           <h2>Total Users</h2>
//           <h1>{totals.totalUsers}</h1>
//         </div>
//         <div className='eventRegisteredUsers'>
//           <h2>Event Registered</h2>
//           <h1>{totals.totalEvents}</h1>
//         </div>
//         <div className='totalConnections'>
//           <h2>Total Connections</h2>
//           <h1>{totals.totalConnections}</h1>
//         </div>
//       </div>
//       <div className='graph'>
//         {/* Filter Section */}
//         <div className="button">
//           <button
//             onClick={() => setSelectedYear('Current Year')}
//             style={{
//               padding: '5px 10px',
//               marginRight: '5px',
//               backgroundColor: selectedYear === 'Current Year' ? '#4CAF50' : '#f0f0f0'
//             }}
//           >
//             Current Year
//           </button>

//           <button
//             onClick={() => setSelectedYear('Previous Year')}
//             style={{
//               padding: '5px 10px',
//               backgroundColor: selectedYear === 'Previous Year' ? '#4CAF50' : '#f0f0f0'
//             }}
//           >
//             Previous Year
//           </button>
//         </div>
//         <div className='chart'>
//           {/* Line Chart Section */}
//           <LineChart
//             width={windowSize.width}  
//             height={windowSize.height}  
//             data={userData[selectedYear]}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis domain={[0, 500]} tickCount={11} />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="totalUsers" stroke="#6f42c1" strokeWidth={2} />
//             <Line type="monotone" dataKey="totalConnections" stroke="#007bff" strokeWidth={2} />
//             <Line type="monotone" dataKey="eventRegistered" stroke="#28a745" strokeWidth={2} />
//           </LineChart>
//         </div>
//       </div>
//     </Wrapper>
//   )
// }

// export default Dashboard


import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import Wrapper from './style';
import axios from 'axios';

const Dashboard = () => {
  const [selectedYearType, setSelectedYearType] = useState(); // 'current' or 'previous'
  const [chartData, setChartData] = useState([]);
  const [totals, setTotals] = useState({
    totalUsers: 0,
    totalConnections: 0,
    totalEvents: 0
  });

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth * 0.8,
    height: window.innerHeight * 0.4
  });

  // Function to get the correct year dynamically
  const getDisplayYear = () => {
    const currentYear = new Date().getFullYear();
    return selectedYearType === 'current' ? currentYear : currentYear - 1;
  };

  // Fetch Data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const year = getDisplayYear();

        const usersRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/count?year=${selectedYearType}`);
        const eventsRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/events/count?year=${selectedYearType}`);
        const connectionsRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/connections/count?year=${selectedYearType}`);

        const usersData = usersRes.data.data.map(item => ({
          month: getMonthName(item.month),
          totalUsers: item.total_users
        }));

        const eventsData = eventsRes.data.data.map(item => ({
          month: getMonthName(item.month),
          eventRegistered: item.total_events
        }));

        const connectionsData = connectionsRes.data.data.map(item => ({
          month: getMonthName(item.month),
          totalConnections: item.total_connections
        }));

        // Merge data based on month
        const mergedData = mergeData(usersData, eventsData, connectionsData);

        // Compute totals
        const totalUsers = usersData.reduce((sum, item) => sum + (item.totalUsers || 0), 0);
        const totalEvents = eventsData.reduce((sum, item) => sum + (item.eventRegistered || 0), 0);
        const totalConnections = connectionsData.reduce((sum, item) => sum + (item.totalConnections || 0), 0);

        setChartData(mergedData);
        setTotals({ totalUsers, totalEvents, totalConnections });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedYearType]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.4
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to map month number to name
  const getMonthName = (monthNum) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[monthNum - 1] || "";
  };

  // Function to merge data
  const mergeData = (users, events, connections) => {
    const merged = {};
    
    [...users, ...events, ...connections].forEach(item => {
      if (!merged[item.month]) {
        merged[item.month] = { month: item.month };
      }
      merged[item.month] = { ...merged[item.month], ...item };
    });

    return Object.values(merged);
  };

  return (
    <Wrapper>
      <div className='dashboard'>
        <h1>Dashboard</h1>
      </div>
      <div className='container'>
        <div className='totalUsers'>
          <h2>Total Users</h2>
          <h1>{totals.totalUsers}</h1>
        </div>
        <div className='eventRegisteredUsers'>
          <h2>Event Registered</h2>
          <h1>{totals.totalEvents}</h1>
        </div>
        <div className='totalConnections'>
          <h2>Total Connections</h2>
          <h1>{totals.totalConnections}</h1>
        </div>
      </div>
      <div className='graph'>
        {/* Filter Section */}
        <div className="button">
          <button
            onClick={() => setSelectedYearType('current')}
            style={{
              padding: '5px 10px',
              marginRight: '5px',
              backgroundColor: selectedYearType === 'current' ? '#4CAF50' : '#f0f0f0'
            }}
          >
            Current Year
          </button>

          <button
            onClick={() => setSelectedYearType('previous')}
            style={{
              padding: '5px 10px',
              backgroundColor: selectedYearType === 'previous' ? '#4CAF50' : '#f0f0f0'
            }}
          >
            Previous Year
          </button>
        </div>
        <div className='chart'>
          {/* Line Chart Section */}
          <LineChart width={windowSize.width} height={windowSize.height} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 500]} tickCount={11} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalUsers" name="Total Users" stroke="#6f42c1" strokeWidth={2} />
            <Line type="monotone" dataKey="totalConnections" name="Total Connection" stroke="#007bff" strokeWidth={2} />
            <Line type="monotone" dataKey="eventRegistered" name="Event Registered" stroke="#28a745" strokeWidth={2} />
          </LineChart>
        </div>
      </div>
    </Wrapper>
  );
};

export default Dashboard; 