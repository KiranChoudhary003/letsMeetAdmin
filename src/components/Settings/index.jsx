import React, { useEffect, useState } from 'react';
import Wrapper from './style';
import axios from '../AxiosInstance';
import { toast, ToastContainer } from 'react-toastify';

const Settings = () => {

  const [settings, setSettings] = useState({
    enabled: false,
    check_in_distance: ""
  })

  // Fetch initial settings from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const connectionRes = await axios.get(`/settings/connection-status`);
        const distanceRes = await axios.get(`/settings/check-in-distance`);

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
      await axios.put(`/settings/connection-status`, {
        enabled: newStatus
      }, {
        headers: { "Content-Type": "application/json" }
      });

      toast.success(`Connection status ${newStatus ? "enabled" : "disabled"} successfully.`);
    } catch (error) {
      console.error("Error updating connection status:", error);
      toast.error("Failed to update connection status.");
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
      await axios.put(`/settings/connection-status`, connectionStatusData, {
        headers: { "Content-Type": "application/json" }
      });

      // Send the updated check-in distance
      await axios.put(`/settings/check-in-distance`, distanceData, {
        headers: { "Content-Type": "application/json" }
      });

      toast.success("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error.response?.data || error.message);
      toast.error(`Failed to save settings! ${error.response?.data?.error || ""}`);
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
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.enabled}
                  onChange={handleToggleAction}
                />
                <span className="slider round"></span>
              </label>
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

      <ToastContainer position="top-right" autoClose={1500} />
    </Wrapper>
  );
};

export default Settings;
