import React, { useState } from 'react'
import Wrapper from './style'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const Dashboard = () => {
  const userData = [
    {
      name: 'Kiran Choudhary',
      articles: { total: 15, shared: 5, created: 10 },
      videoLinks: { total: 5, shared: 2, created: 3 },
      totalLinks: { total: 30, shared: 12, created: 18 },
      spentTime: 5,
      date: '2025-2-3'
    },
    {
      name: 'Kiran Choudhary',
      articles: { total: 15, shared: 7, created: 8 },
      videoLinks: { total: 5, shared: 3, created: 2 },
      totalLinks: { total: 30, shared: 15, created: 15 },
      spentTime: 4,
      date: '2025-2-4'
    },
    {
      name: 'Kiran Choudhary',
      articles: { total: 15, shared: 6, created: 9 },
      videoLinks: { total: 5, shared: 2, created: 3 },
      totalLinks: { total: 30, shared: 10, created: 20 },
      spentTime: 1,
      date: '2025-2-3'
    },
    {
      name: 'Kiran Choudhary',
      articles: { total: 15, shared: 6, created: 9 },
      videoLinks: { total: 5, shared: 2, created: 3 },
      totalLinks: { total: 30, shared: 10, created: 20 },
      spentTime: 3.5,
      date: '2025-2-3'
    },
    {
      name: 'Kiran Choudhary',
      articles: { total: 15, shared: 6, created: 9 },
      videoLinks: { total: 5, shared: 2, created: 3 },
      totalLinks: { total: 30, shared: 10, created: 20 },
      spentTime: 1.5,
      date: '2025-2-4'
    },
    {
      name: 'Kiran Choudhary',
      articles: { total: 15, shared: 6, created: 9 },
      videoLinks: { total: 5, shared: 2, created: 3 },
      totalLinks: { total: 30, shared: 10, created: 20 },
      spentTime: 2,
      date: '2024-3-13'
    },
    {
      name: 'Kiran Choudhary',
      articles: { total: 15, shared: 6, created: 9 },
      videoLinks: { total: 5, shared: 2, created: 3 },
      totalLinks: { total: 30, shared: 10, created: 20 },
      spentTime: 6,
      date: '2025-1-3'
    },
    {
      name: 'Kiran Choudhary',
      articles: { total: 15, shared: 6, created: 9 },
      videoLinks: { total: 5, shared: 2, created: 3 },
      totalLinks: { total: 30, shared: 10, created: 20 },
      spentTime: 1,
      date: '2025-3-3'
    },
    {
      name: 'Kiran Choudhary',
      articles: { total: 15, shared: 6, created: 9 },
      videoLinks: { total: 5, shared: 2, created: 3 },
      totalLinks: { total: 30, shared: 10, created: 20 },
      spentTime: 4,
      date: '2025-3-3'
    },
    {
      name: 'Kiran Choudhary',
      articles: { total: 15, shared: 6, created: 9 },
      videoLinks: { total: 5, shared: 2, created: 3 },
      totalLinks: { total: 30, shared: 10, created: 20 },
      spentTime: 4,
      date: '2025-2-25'
    },
    {
      name: 'Kiran Choudhary',
      articles: { total: 15, shared: 6, created: 9 },
      videoLinks: { total: 5, shared: 2, created: 3 },
      totalLinks: { total: 30, shared: 10, created: 20 },
      spentTime: 4,
      date: '2025-2-25'
    },
    {
      name: 'Kiran Choudhary',
      articles: { total: 15, shared: 6, created: 9 },
      videoLinks: { total: 5, shared: 2, created: 3 },
      totalLinks: { total: 30, shared: 10, created: 20 },
      spentTime: 4,
      date: '2025-2-25'
    },
    {
      name: 'Kiran Choudhary',
      articles: { total: 15, shared: 6, created: 9 },
      videoLinks: { total: 5, shared: 2, created: 3 },
      totalLinks: { total: 30, shared: 10, created: 20 },
      spentTime: 4,
      date: '2025-2-25'
    },
    {
      name: 'Kiran Choudhary',
      articles: { total: 15, shared: 6, created: 9 },
      videoLinks: { total: 5, shared: 2, created: 3 },
      totalLinks: { total: 30, shared: 10, created: 20 },
      spentTime: 4,
      date: '2025-2-25'
    },
    {
      name: 'Kiran Choudhary',
      articles: { total: 15, shared: 6, created: 9 },
      videoLinks: { total: 5, shared: 2, created: 3 },
      totalLinks: { total: 30, shared: 10, created: 20 },
      spentTime: 4,
      date: '2025-2-25'
    },
    {
      name: 'Kiran Choudhary',
      articles: { total: 15, shared: 6, created: 9 },
      videoLinks: { total: 5, shared: 2, created: 3 },
      totalLinks: { total: 30, shared: 10, created: 20 },
      spentTime: 4,
      date: '2025-2-25'
    },
    {
      name: 'Kiran Choudhary',
      articles: { total: 15, shared: 6, created: 9 },
      videoLinks: { total: 5, shared: 2, created: 3 },
      totalLinks: { total: 30, shared: 10, created: 20 },
      spentTime: 2,
      date: '2025-2-5'
    },
    {
      name: 'Kiran Choudhary',
      articles: { total: 15, shared: 6, created: 9 },
      videoLinks: { total: 5, shared: 2, created: 3 },
      totalLinks: { total: 30, shared: 10, created: 20 },
      spentTime: 1,
      date: '2025-2-10'
    },
    {
      name: 'Kiran Choudhary',
      articles: { total: 15, shared: 6, created: 9 },
      videoLinks: { total: 5, shared: 2, created: 3 },
      totalLinks: { total: 30, shared: 10, created: 20 },
      spentTime: 4,
      date: '2025-2-15'
    },
    {
      name: 'Kiran Choudhary',
      articles: { total: 15, shared: 6, created: 9 },
      videoLinks: { total: 5, shared: 2, created: 3 },
      totalLinks: { total: 30, shared: 10, created: 20 },
      spentTime: 5,
      date: '2025-2-20'
    }
  ]

  const [selectedRange, setSelectedRange] = useState('last month');
  // const [selectedYear, setSelectedYear] = useState("2024");


  const filterDataByDate = () => {
    const today = new Date();
    let startDate;

    if (selectedRange === 'last week') {
      startDate = new Date();
      startDate.setDate(today.getDate() - 7);
    } else if (selectedRange === 'last month') {
      startDate = new Date();
      startDate.setMonth(today.getMonth() - 1);
    } else if (selectedRange === 'last quarter') {
      startDate = new Date();
      startDate.setMonth(today.getMonth() - 3);
    } else if (selectedRange === 'last year') {
      startDate = new Date();
      startDate.setFullYear(today.getFullYear() - 1);
    } else {
      return userData;
    }

    return userData.filter(user => new Date(user.date) >= startDate);
  };

  const aggregatedData = filterDataByDate().reduce((acc, user) => {
    if (!acc[user.date]) {
      acc[user.date] = { date: user.date, spentTime: 0, count: 0 };
    }
    acc[user.date].spentTime += user.spentTime;
    acc[user.date].count++;
    return acc;
  }, {});

  const chartData = Object.values(aggregatedData).map(entry => ({
    date: entry.date,
    spentTime: entry.spentTime / entry.count
  }))

  const totalUsers = userData.length

  const {
    totalArticles, sharedArticles, createdArticles,
    totalVideos, sharedVideos, createdVideos,
    totalAllLinks, sharedAllLinks, createdAllLinks
  } = userData.reduce(
    (acc, user) => {
      acc.totalArticles += user.articles.total;
      acc.sharedArticles += user.articles.shared;
      acc.createdArticles += user.articles.created;

      acc.totalVideos += user.videoLinks.total;
      acc.sharedVideos += user.videoLinks.shared;
      acc.createdVideos += user.videoLinks.created;

      acc.totalAllLinks += user.totalLinks.total;
      acc.sharedAllLinks += user.totalLinks.shared;
      acc.createdAllLinks += user.totalLinks.created;

      return acc;
    },
    {
      totalArticles: 0, sharedArticles: 0, createdArticles: 0,
      totalVideos: 0, sharedVideos: 0, createdVideos: 0,
      totalAllLinks: 0, sharedAllLinks: 0, createdAllLinks: 0
    }
  )

  return (
    <Wrapper>
      <div className='cover'>
        <div className='heading1'>
        <h1>Dashboad</h1>
        </div>
      <div className='container'>
        <div className='users'>
          <h2>Users</h2>
          <h1>{totalUsers}</h1>
        </div>
        <div className='articles'>
          <h2>Articles</h2>
          <h1>{totalArticles}</h1>
          <div className='span'>
            <span>Shared : {sharedArticles}</span>
            <span>Created : {createdArticles}</span>
          </div>
        </div>
        <div className='videos'>
          <h2>Video Links</h2>
          <h1>{totalVideos}</h1>
          <div className='span'>
            <span>Shared : {sharedVideos}</span>
            <span>Created : {createdVideos}</span>
          </div>
        </div>
        <div className='links'>
          <h2>Total Links</h2>
          <h1>{totalAllLinks}</h1>
          <div className='span'>
            <span>Shared : {sharedAllLinks}</span>
            <span>Created : {createdAllLinks}</span>
          </div>
        </div>
      </div>
      <div className="chart-container" style={{width : '95%'}}>
        <div className="heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px', paddingRight: '20px' }}>
          <h2>Average Time Spent By Users</h2>
          <select style={{ borderRadius: '10px', padding: '5px', border: '1px solid #ccc' }} onChange={(e) => setSelectedRange(e.target.value)} value={selectedRange}>
            <option value="last week">Last Week</option>
            <option value="last month">Last Month</option>
            <option value="last quarter">Last Quarter</option>
            <option value="last year">Last Year</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" label={{ value: 'Date', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: 'Avg Time Spent (hrs)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Line type="monotone" dataKey="spentTime" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
          {/* <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">User Login Statistics</h2>
      <Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
      </Select>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data[selectedYear] || []}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div> */}
      </div>
    </Wrapper>
  )
}

export default Dashboard