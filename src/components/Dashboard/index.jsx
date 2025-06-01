// import React, { useEffect, useState } from 'react';
// import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
// import Wrapper from './style';
// import axios from '../AxiosInstance';

// const Dashboard = () => {
//   const [selectedYearType, setSelectedYearType] = useState(); // 'current' or 'previous'
//   const [chartData, setChartData] = useState([]);
//   const [totals, setTotals] = useState({
//     totalUsers: 0,
//     totalConnections: 0,
//     totalEvents: 0
//   });

//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth * 0.8,
//     height: window.innerHeight * 0.4
//   });

//   // Function to get the correct year dynamically
//   const getDisplayYear = () => {
//     const currentYear = new Date().getFullYear();
//     return selectedYearType === 'current' ? currentYear : currentYear - 1;
//   };

//   // Fetch Data from API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const year = getDisplayYear();

//         const usersRes = await axios.get(`/users/count?year=${selectedYearType}`);
//         const eventsRes = await axios.get(`/events/count?year=${selectedYearType}`);
//         const connectionsRes = await axios.get(`/connections/count?year=${selectedYearType}`);

//         const usersData = usersRes.data.data.map(item => ({
//           month: getMonthName(item.month),
//           totalUsers: item.total_users
//         }));

//         const eventsData = eventsRes.data.data.map(item => ({
//           month: getMonthName(item.month),
//           eventRegistered: item.total_events
//         }));

//         const connectionsData = connectionsRes.data.data.map(item => ({
//           month: getMonthName(item.month),
//           totalConnections: item.total_connections
//         }));

//         // Merge data based on month
//         const mergedData = mergeData(usersData, eventsData, connectionsData);

//         // Compute totals
//         const totalUsers = usersData.reduce((sum, item) => sum + (item.totalUsers || 0), 0);
//         const totalEvents = eventsData.reduce((sum, item) => sum + (item.eventRegistered || 0), 0);
//         const totalConnections = connectionsData.reduce((sum, item) => sum + (item.totalConnections || 0), 0);

//         setChartData(mergedData);
//         setTotals({ totalUsers, totalEvents, totalConnections });
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [selectedYearType]);

//   // Handle window resize
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

//   // Function to map month number to name
//   const getMonthName = (monthNum) => {
//     const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     return monthNames[monthNum - 1] || "";
//   };

//   // Function to merge data
//   const mergeData = (users, events, connections) => {
//     const merged = {};

//     [...users, ...events, ...connections].forEach(item => {
//       if (!merged[item.month]) {
//         merged[item.month] = { month: item.month };
//       }
//       merged[item.month] = { ...merged[item.month], ...item };
//     });

//     return Object.values(merged);
//   };

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
//             onClick={() => setSelectedYearType('current')}
//             style={{
//               padding: '5px 10px',
//               marginRight: '5px',
//               backgroundColor: selectedYearType === 'current' ? '#4CAF50' : '#f0f0f0'
//             }}
//           >
//             Current Year
//           </button>

//           <button
//             onClick={() => setSelectedYearType('previous')}
//             style={{
//               padding: '5px 10px',
//               backgroundColor: selectedYearType === 'previous' ? '#4CAF50' : '#f0f0f0'
//             }}
//           >
//             Previous Year
//           </button>
//         </div>
//         <div className='chart'>
//           {/* Line Chart Section */}
//           <LineChart width={windowSize.width} height={windowSize.height} data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis domain={[0, 500]} tickCount={11} />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="totalUsers" name="Total Users" stroke="#6f42c1" strokeWidth={2} />
//             <Line type="monotone" dataKey="totalConnections" name="Total Connection" stroke="#007bff" strokeWidth={2} />
//             <Line type="monotone" dataKey="eventRegistered" name="Event Registered" stroke="#28a745" strokeWidth={2} />
//           </LineChart>
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default Dashboard; 
import axios from '../AxiosInstance';
import { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import Wrapper from './style';
import LoadingScreen from "../loading";  // <-- Added import

const Dashboard = () => {
  const [selectedYearType, setSelectedYearType] = useState('current'); // 'current' or 'previous'
  const [chartData, setChartData] = useState([]);
  const [totals, setTotals] = useState({
    totalUsers: 0,
    totalConnections: 0,
    totalEvents: 0
  });
  const [loading, setLoading] = useState(true); // <-- Added loading state

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth * 0.8,
    height: window.innerHeight * 0.4
  });


  // Fetch Data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // <-- start loading
      try {
        const usersRes = await axios.get(`/users/count?year=${selectedYearType}`);
        const eventsRes = await axios.get(`/events/count?year=${selectedYearType}`);
        const connectionsRes = await axios.get(`/connections/count?year=${selectedYearType}`);

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
      } finally {
        setLoading(false); // <-- end loading
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

  if (loading) return <LoadingScreen />; // <-- Show loading screen while loading

  return (
    <Wrapper>
      <div className='dashboard'>
        <h1>Dashboard</h1>
      </div>
      <div className='outer-container'>
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
      </div>
    </Wrapper>
  );
};

export default Dashboard;
