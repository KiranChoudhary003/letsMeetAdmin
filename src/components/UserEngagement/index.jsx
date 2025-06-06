import React, { useState, useEffect, useRef } from "react";
import Wrapper from "./style";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "../AxiosInstance";
import LoadingScreen from "../../modules/loading";

const UserEngagement = () => {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("this_month");
  const [events, setEvents] = useState([]);
  // const [users, setUsers] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const navigate = useNavigate();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      setLoading(true); // Show loading only on first mount
    }

    axios
      .get(`/events/eventlist/${selectedTimePeriod}`)
      .then((res) => {
        console.log("Events response:", res.data);
        if (res.data && res.data.events) {
          setEvents(res.data.events);
          if (res.data.events.length > 0) {
            setSelectedEvent(res.data.events[0].id);
          } else {
            setSelectedEvent(null);
          }
        } else {
          setEvents([]);
          setSelectedEvent(null);
        }
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setEvents([]);
        setSelectedEvent(null);
      })
      .finally(() => {
        setLoading(false); // ✅ Done loading events
        isFirstLoad.current = false; // Mark initial load done
      });
  }, [selectedTimePeriod]);

  useEffect(() => {
    if (!selectedEvent) {
      setChartData([]);
      return;
    }

    setLoading(true); // ✅ Start loading when fetching user connections
    axios
      .get(`/events/connections/${selectedEvent}`)
      .then((res) => {
        const users = res.data.users || [];

        const formatted = users
          .map(user => ({
            name: `${user.first_name} ${user.middle_name ? user.middle_name + " " : ""}${user.last_name}`,
            connections: parseInt(user.total_connections, 10)
          }))
          .sort((a, b) => b.connections - a.connections)
          .slice(0, 5); // Top 5 users

        setChartData(formatted);
      })
      .catch(err => {
        console.error("Error fetching connection data:", err);
        setChartData([]);
      })
      .finally(() => {
        setLoading(false); // ✅ Done loading user data
      });
  }, [selectedEvent]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <LoadingScreen />; // ✅ Show loading screen
  }

  return (
    <Wrapper>
      <IoMdArrowRoundBack className="backArrow" onClick={handleBack} />
      <h2>User Engagement</h2>

      {/* Time Period Filter */}
      <label>Time Period:</label>
      <select
        value={selectedTimePeriod}
        onChange={(e) => setSelectedTimePeriod(e.target.value)}
      >
        <option value="this_month">This Month</option>
        <option value="last_month">Last Month</option>
        <option value="last_year">Last Year</option>
      </select>

      {/* Event Filter */}
      <label>Event:</label>
      <select
        value={selectedEvent || ""}
        onChange={(e) => setSelectedEvent(Number(e.target.value))}
        disabled={events.length === 0}
      >
        {events.length > 0 ? (
          events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))
        ) : (
          <option>No Events Available</option>
        )}
      </select>

      {/* BarChart or No Data */}
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" type="category" />
            <YAxis type="number" />
            <Tooltip />
            <Legend />
            <Bar dataKey="connections" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No user engagement data available for the selected event and time period.</p>
      )}
    </Wrapper>
  );
};

export default UserEngagement;
