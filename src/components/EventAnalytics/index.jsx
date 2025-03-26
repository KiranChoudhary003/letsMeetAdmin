import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import Wrapper from "./style";

const EventAnalytics = ({ events, users }) => {
  const [eventConnection, setEventConnection] = useState({});

  useEffect(() => {
    if (!Array.isArray(users) || users.length === 0) return;

    const eventMap = {};

    users.forEach((user) => {
      if (user.attendEventIDs && Array.isArray(user.attendEventIDs)) {
        user.attendEventIDs.forEach((eventID) => {
          if (!eventMap[eventID]) {
            eventMap[eventID] = 0;
          }
          if (user.connection && user.connection[eventID]) {
            eventMap[eventID] += user.connection[eventID];
          }
        });
      }
    });

    setEventConnection(eventMap);
  }, [users]);

  const eventData = events
    .map(event => ({
      ...event,
      connectionCount: eventConnection[event.id] || 0
    }))
    .sort((a, b) => b.connectionCount - a.connectionCount)
    .slice(0, 3);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <Wrapper>
      <h2>Event Analytics</h2>
      <div className="chart-container">
        {/* Bar Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={eventData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="eventName" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="connectionCount" fill="#8884d8" barSize={50} />
          </BarChart>
        </ResponsiveContainer>

        {/* Pie Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={eventData}
              dataKey="connectionCount"
              nameKey="eventName"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {eventData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Wrapper>
  );
};

export default EventAnalytics;
