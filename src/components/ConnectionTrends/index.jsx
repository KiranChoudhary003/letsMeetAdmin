import React, { useEffect, useState, useRef } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import Wrapper from './style';
import { useNavigate } from 'react-router-dom';
import axios from '../AxiosInstance';
import LoadingScreen from "../../modules/loading";

const ConnectionTrends = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);  // <-- Added loading state
  const isFirstLoad = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventConnections = async () => {
      if (isFirstLoad.current) {
        setLoading(true); // Show loading only on first mount
      }
      try {
        const response = await axios.get(`/events/total/connections`);
        const data = response.data;

        if (data.events) {
          setEventData(data.events);
        }
      } catch (error) {
        console.error("Error fetching event connections:", error);
      } finally {
        if (isFirstLoad.current) {
          setLoading(false);  // Turn off loading only after first fetch
          isFirstLoad.current = false; // Mark initial load as done
        }
      }
    };

    fetchEventConnections();
  }, []);


  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <LoadingScreen />;  // <-- Show loading screen while fetching

  return (
    <Wrapper>
      <div className='modal-content'>
        <div className='header'>
          <IoMdArrowRoundBack className="backArrow" onClick={handleBack} />
          <h2>Connection Trends</h2>
        </div>
        <div className='scroll-container'>
          <table>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Event Name</th>
                <th>Total Connections</th>
              </tr>
            </thead>
            <tbody>
              {eventData.map((event, index) => (
                <tr key={event.event_id}>
                  <td>{index + 1}</td>
                  <td>{event.event_name}</td>
                  <td>{event.total_connections}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Wrapper>
  );
};

export default ConnectionTrends;
