import React, { useEffect, useState } from 'react';
import Wrapper from './style';
import { ToggleSlider } from 'react-toggle-slider';
import axios from 'axios';

const Settings = () => {
  const REACT_APP_BACKEND_URL = "http://192.168.0.87:5000/api";

  const [settings, setSettings] = useState({
    enabled: false,
    check_in_distance: ""
  });

  // Fetch initial settings from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const connectionRes = await axios.get(`${REACT_APP_BACKEND_URL}/settings/connection-status`);
        const distanceRes = await axios.get(`${REACT_APP_BACKEND_URL}/settings/check-in-distance`);

        setSettings({
          enabled: Boolean(connectionRes.data.connections_enabled),
          check_in_distance: distanceRes.data.check_in_distance.toString()
        });
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchData();
  }, []);

  // Toggle Connection Status
  const handleToggleAction = async () => {
    const newStatus = !settings.enabled;
  
    setSettings((prev) => ({
      ...prev,
      enabled: newStatus
    }));
  
    try {
      await axios.put(`${REACT_APP_BACKEND_URL}/settings/connection-status`, {
        enabled: newStatus
      }, {
        headers: { "Content-Type": "application/json" }
      });
  
      console.log("Updated connection status:", newStatus);
    } catch (error) {
      console.error("Error updating connection status:", error);
      alert("Failed to update connection status.");
    }
  }

  // Handle input change
  const handleDistanceChange = (e) => {
    setSettings((prev) => ({
      ...prev,
      check_in_distance: e.target.value
    }));
  };

  // Save Settings to Backend
  const handleSave = async () => {
    try {
      // Ensure values are correctly formatted
      const connectionStatusData = {
        enabled: Boolean(settings.enabled) // Ensures it's `true` or `false`
      };
  
      const distanceData = {
        check_in_distance: Number.isNaN(parseInt(settings.check_in_distance, 10)) 
          ? 0 
          : parseInt(settings.check_in_distance, 10) // Ensures it's a valid integer
      };
  
      console.log("Sending connection status:", connectionStatusData);
      console.log("Sending check-in distance:", distanceData);
  
      // Send the updated connection status
      await axios.put(`${REACT_APP_BACKEND_URL}/settings/connection-status`, connectionStatusData, {
        headers: { "Content-Type": "application/json" }
      });
  
      // Send the updated check-in distance
      await axios.put(`${REACT_APP_BACKEND_URL}/settings/check-in-distance`, distanceData, {
        headers: { "Content-Type": "application/json" }
      });
  
      alert("Successfully Saved!");
    } catch (error) {
      console.error("Error saving settings:", error.response?.data || error.message);
      alert(`Failed to save the setting! ${error.response?.data?.error || ""}`);
    }
  };
  

  return (
    <Wrapper>
      <div className="container">
        <h1>Settings</h1>
        <div className="settings">
          <div className='connection-request'>
            <h2>Connection Request</h2>
            <div className='toggleSlider'>
              <ToggleSlider onToggle={handleToggleAction} active={settings.enabled} />
            </div>
            <p>{settings.enabled ? "Approved" : "Denied"}</p>
          </div>
          <div className='distance'>
            <h2>Distance to Check-In</h2>
            <input
              type='text'
              placeholder='Enter the distance'
              value={settings.check_in_distance}
              onChange={handleDistanceChange}
            />
            <p>meter</p>
          </div>
          <div className='save-btn'>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Settings;
