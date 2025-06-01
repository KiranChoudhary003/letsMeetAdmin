import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, Legend, ResponsiveContainer
} from "recharts";
import Wrapper from "./style";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from '../AxiosInstance';
import LoadingScreen from "../loading";  // <-- Import LoadingScreen

const EventAnalytics = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);  // <-- Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventConnections = async () => {
      try {
        setLoading(true);  // start loading

        const response = await axios.get(`/events/total/connections`);
        const data = response.data

        if (data.events) {
          const sortedTop3 = data.events
            .map(event => ({
              ...event,
              connectionCount: parseInt(event.total_connections, 10)
            }))
            .sort((a, b) => b.connectionCount - a.connectionCount)
            .slice(0, 3);

          setEventData(sortedTop3);
        }
      } catch (error) {
        console.error("Error fetching event analytics:", error);
      } finally {
        setLoading(false);  // end loading
      }
    };

    fetchEventConnections();
  }, []);

  if (loading) return <LoadingScreen />;  // show loading while fetching

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  const handleChange = () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      <IoMdArrowRoundBack className="backArrow" onClick={handleChange} />
      <h2>Event Analytics</h2>

      <div className="chart-container">
        {/* Bar Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={eventData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="event_name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="connectionCount" barSize={50}>
              {eventData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Pie Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={eventData}
              dataKey="connectionCount"
              nameKey="event_name"
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
