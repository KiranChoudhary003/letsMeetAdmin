import React, { useState, useRef, useEffect } from 'react';
import Wrapper from './style';


const EventManagement = () => {
  const [events, setEvents] = useState([
    { id: 201, name: 'Tech Summit', date: '2025-04-15', venue: 'Hall A', url: '[URL]', description: 'AI Innovations', status: 'Enabled' },
    { id: 202, name: 'Marketing Expo', date: '2025-05-20', venue: 'Hall B', url: '[www.google.co]', description: 'Digital Marketing', status: 'Disabled' },
    { id: 203, name: 'Startup Fest', date: '2025-06-10', venue: 'Hall C', url: '[URL]', description: 'Startup Networking', status: 'Enabled' },
    { id: 204, name: 'Health Expo', date: '2025-07-25', venue: 'Hall D', url: '[URL]', description: 'Healthcare Tech', status: 'Enabled' },
    { id: 205, name: 'AI Innovation', date: '2025-08-15', venue: 'Hall E', url: '[URL]', description: 'AI in Business', status: 'Disabled' },
    { id: 206, name: 'Design Conference', date: '2025-09-05', venue: 'Hall F', url: '[URL]', description: 'Creative Designs', status: 'Enabled' },
    { id: 207, name: 'Tech Forum', date: '2025-10-10', venue: 'Hall G', url: '[URL]', description: 'Technology Discussions', status: 'Enabled' },
    { id: 208, name: 'AI Seminar', date: '2025-11-12', venue: 'Hall H', url: '[URL]', description: 'AI Trends and Innovations', status: 'Enabled' },
    { id: 209, name: 'Cloud Tech Expo', date: '2025-12-05', venue: 'Hall I', url: '[URL]', description: 'Cloud Computing Solutions', status: 'Disabled' },
    { id: 210, name: 'Blockchain Seminar', date: '2026-01-15', venue: 'Hall J', url: '[URL]', description: 'Blockchain Innovations', status: 'Enabled' },
    { id: 211, name: 'Cyber Security Summit', date: '2026-02-20', venue: 'Hall K', url: '[URL]', description: 'Cyber Security Trends', status: 'Enabled' },
    { id: 212, name: 'Digital Transformation Expo', date: '2026-03-25', venue: 'Hall L', url: '[URL]', description: 'Digital Business Solutions', status: 'Disabled' },
    { id: 213, name: 'VR Tech Conference', date: '2026-04-15', venue: 'Hall M', url: '[URL]', description: 'Virtual Reality Innovations', status: 'Enabled' },
    { id: 214, name: 'Robotics Expo', date: '2026-05-10', venue: 'Hall N', url: '[URL]', description: 'Robotic Automation Solutions', status: 'Enabled' },
    { id: 215, name: 'Smart Tech Conference', date: '2026-06-20', venue: 'Hall O', url: '[URL]', description: 'Smart Technology Integration', status: 'Enabled' },
    { id: 216, name: 'IoT Conference', date: '2026-07-15', venue: 'Hall P', url: '[URL]', description: 'Internet of Things Innovations', status: 'Disabled' },
    { id: 217, name: 'Automation Summit', date: '2026-08-10', venue: 'Hall Q', url: '[URL]', description: 'Automation and AI Solutions', status: 'Enabled' },
    { id: 218, name: 'Green Tech Expo', date: '2026-09-05', venue: 'Hall R', url: '[URL]', description: 'Sustainable Tech Innovations', status: 'Enabled' },
    { id: 219, name: 'Space Tech Conference', date: '2026-10-12', venue: 'Hall S', url: '[URL]', description: 'Space Exploration Solutions', status: 'Disabled' },
    { id: 220, name: 'Quantum Computing Seminar', date: '2026-11-20', venue: 'Hall T', url: '[URL]', description: 'Quantum Computing Trends', status: 'Enabled' },
    { id: 221, name: 'FinTech Conference', date: '2027-01-15', venue: 'Hall U', url: '[URL]', description: 'FinTech Innovations', status: 'Enabled' },
    { id: 222, name: 'Tech Vision Summit', date: '2027-02-25', venue: 'Hall V', url: '[URL]', description: 'Tech Innovation Trends', status: 'Enabled' },
    { id: 223, name: 'EduTech Innovations', date: '2027-03-10', venue: 'Hall W', url: '[URL]', description: 'Education Technology Trends', status: 'Enabled' },
    { id: 224, name: 'Gaming Expo', date: '2027-04-05', venue: 'Hall X', url: '[URL]', description: 'Gaming Trends and Innovations', status: 'Enabled' },
    { id: 225, name: 'AI & Robotics Forum', date: '2027-05-18', venue: 'Hall Y', url: '[URL]', description: 'AI and Robotics Solutions', status: 'Enabled' },
    { id: 226, name: 'Automation Expo', date: '2027-06-12', venue: 'Hall Z', url: '[URL]', description: 'Industrial Automation Trends', status: 'Enabled' },
    { id: 227, name: 'Tech Startups Expo', date: '2027-07-22', venue: 'Hall AA', url: '[URL]', description: 'Startup Ecosystem Insights', status: 'Enabled' },
    { id: 228, name: 'Healthcare Tech Conference', date: '2027-08-15', venue: 'Hall BB', url: '[URL]', description: 'Healthcare Innovation Solutions', status: 'Enabled' },
    { id: 229, name: 'Renewable Energy Expo', date: '2027-09-10', venue: 'Hall CC', url: '[URL]', description: 'Green Energy Solutions', status: 'Enabled' },
    { id: 230, name: 'AI & Data Science Summit', date: '2027-10-05', venue: 'Hall DD', url: '[URL]', description: 'AI and Data Science Innovations', status: 'Enabled' },
    { id: 231, name: 'Event 231', date: '2028-01-01', venue: 'Hall A', url: '[URL]', description: 'Innovative Tech Solutions', status: 'Enabled' },
    { id: 232, name: 'Event 232', date: '2028-02-10', venue: 'Hall B', url: '[URL]', description: 'Healthcare Innovations', status: 'Disabled' },
    { id: 233, name: 'Event 233', date: '2028-03-15', venue: 'Hall C', url: '[URL]', description: 'Marketing Trends', status: 'Enabled' },
    { id: 234, name: 'Event 234', date: '2028-04-20', venue: 'Hall D', url: '[URL]', description: 'AI Developments', status: 'Enabled' },
    { id: 235, name: 'Event 235', date: '2028-05-10', venue: 'Hall E', url: '[URL]', description: 'Education Technology', status: 'Enabled' },
    { id: 236, name: 'Event 236', date: '2028-06-05', venue: 'Hall F', url: '[URL]', description: 'Creative Solutions', status: 'Enabled' },
    { id: 237, name: 'Event 237', date: '2028-07-15', venue: 'Hall G', url: '[URL]', description: 'Cloud Computing', status: 'Disabled' },
    { id: 238, name: 'Event 238', date: '2028-08-12', venue: 'Hall H', url: '[URL]', description: 'Blockchain Innovations', status: 'Enabled' },
    { id: 239, name: 'Event 239', date: '2028-09-20', venue: 'Hall I', url: '[URL]', description: 'Cyber Security', status: 'Enabled' },
    { id: 240, name: 'Event 240', date: '2028-10-05', venue: 'Hall J', url: '[URL]', description: 'Digital Transformation', status: 'Disabled' },
    { id: 241, name: 'Event 241', date: '2028-11-11', venue: 'Hall K', url: '[URL]', description: 'Tech Innovations', status: 'Enabled' },
    { id: 242, name: 'Event 242', date: '2028-12-25', venue: 'Hall L', url: '[URL]', description: 'Virtual Reality', status: 'Enabled' },
    { id: 243, name: 'Event 243', date: '2029-01-15', venue: 'Hall M', url: '[URL]', description: 'Gaming Trends', status: 'Enabled' },
    { id: 244, name: 'Event 244', date: '2029-02-20', venue: 'Hall N', url: '[URL]', description: 'Automation', status: 'Enabled' },
    { id: 245, name: 'Event 245', date: '2029-03-12', venue: 'Hall O', url: '[URL]', description: 'Sustainable Tech', status: 'Enabled' },
    { id: 246, name: 'Event 246', date: '2029-04-22', venue: 'Hall P', url: '[URL]', description: 'Space Tech', status: 'Disabled' },
    { id: 247, name: 'Event 247', date: '2029-05-18', venue: 'Hall Q', url: '[URL]', description: 'Quantum Computing', status: 'Enabled' },
    { id: 248, name: 'Event 248', date: '2029-06-10', venue: 'Hall R', url: '[URL]', description: 'FinTech', status: 'Enabled' },
    { id: 249, name: 'Event 249', date: '2029-07-15', venue: 'Hall S', url: '[URL]', description: 'Tech Vision', status: 'Enabled' },
    { id: 250, name: 'Event 250', date: '2029-08-20', venue: 'Hall T', url: '[URL]', description: 'EduTech', status: 'Enabled' },
    { id: 251, name: 'Event 251', date: '2029-09-25', venue: 'Hall U', url: '[URL]', description: 'Gaming Innovations', status: 'Enabled' },
    { id: 252, name: 'Event 252', date: '2029-10-05', venue: 'Hall V', url: '[URL]', description: 'AI & Robotics', status: 'Enabled' },
    { id: 253, name: 'Event 253', date: '2029-11-10', venue: 'Hall W', url: '[URL]', description: 'Automation Trends', status: 'Enabled' },
    { id: 254, name: 'Event 254', date: '2029-12-15', venue: 'Hall X', url: '[URL]', description: 'Healthcare Tech', status: 'Enabled' },
    { id: 255, name: 'Event 255', date: '2030-01-20', venue: 'Hall Y', url: '[URL]', description: 'Renewable Energy', status: 'Enabled' },
    { id: 256, name: 'Event 256', date: '2030-02-28', venue: 'Hall Z', url: '[URL]', description: 'AI & Data Science', status: 'Enabled' },
    { id: 257, name: 'Event 257', date: '2031-01-01', venue: 'Hall A', url: '[URL]', description: 'Future Tech Innovations', status: 'Enabled' },
    { id: 258, name: 'Event 258', date: '2031-02-14', venue: 'Hall B', url: '[URL]', description: 'Medical Breakthroughs', status: 'Disabled' },
    { id: 259, name: 'Event 259', date: '2031-03-20', venue: 'Hall C', url: '[URL]', description: 'Digital Marketing Strategies', status: 'Enabled' },
    { id: 260, name: 'Event 260', date: '2031-04-10', venue: 'Hall D', url: '[URL]', description: 'AI in Healthcare', status: 'Enabled' },
    { id: 261, name: 'Event 261', date: '2031-05-08', venue: 'Hall E', url: '[URL]', description: 'EdTech Innovations', status: 'Enabled' },
    { id: 262, name: 'Event 262', date: '2031-06-20', venue: 'Hall F', url: '[URL]', description: 'Creative Design Trends', status: 'Enabled' },
    { id: 263, name: 'Event 263', date: '2031-07-15', venue: 'Hall G', url: '[URL]', description: 'Cloud Infrastructure', status: 'Disabled' },
    { id: 264, name: 'Event 264', date: '2031-08-25', venue: 'Hall H', url: '[URL]', description: 'Blockchain Security', status: 'Enabled' },
    { id: 265, name: 'Event 265', date: '2031-09-12', venue: 'Hall I', url: '[URL]', description: 'Cybersecurity Strategies', status: 'Enabled' },
    { id: 266, name: 'Event 266', date: '2031-10-05', venue: 'Hall J', url: '[URL]', description: 'Digital Transformation Insights', status: 'Disabled' },
    { id: 267, name: 'Event 267', date: '2031-11-18', venue: 'Hall K', url: '[URL]', description: 'Tech Innovations Summit', status: 'Enabled' },
    { id: 268, name: 'Event 268', date: '2031-12-25', venue: 'Hall L', url: '[URL]', description: 'VR & AR Applications', status: 'Enabled' },
    { id: 269, name: 'Event 269', date: '2032-01-10', venue: 'Hall M', url: '[URL]', description: 'Gaming Tech Advances', status: 'Enabled' },
    { id: 270, name: 'Event 270', date: '2032-02-28', venue: 'Hall N', url: '[URL]', description: 'Automation Technologies', status: 'Enabled' },

  ]);

  const [selectedEvents, setSelectedEvents] = useState([]);
  const [visibleEntries, setVisibleEntries] = useState(10);
  const tableRef = useRef(null);

  const handleScroll = () => {
    const tableElement = tableRef.current;
    if (!tableElement) return;

    const { scrollTop, scrollHeight, clientHeight } = tableElement;

    // Ensure we load more entries when the user scrolls near the bottom
    if (scrollTop + clientHeight <= scrollHeight - 20) {
      setVisibleEntries((prev) => Math.min(prev + 10, events.length)); // Prevent exceeding available events
    }
  };





  useEffect(() => {
    const tableElement = tableRef.current;

    if (tableElement) {
      tableElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (tableElement) {
        tableElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [visibleEntries, handleScroll]); // Depend on visibleEntries to update properly


  const toggleStatus = (id) => {
    const updatedEvents = events.map(event =>
      event.id === id ? { ...event, status: event.status === 'Enabled' ? 'Disabled' : 'Enabled' } : event
    );
    setEvents(updatedEvents);
  };

  const handleSelectEvent = (id) => {
    setSelectedEvents((prev) =>
      prev.includes(id) ? prev.filter(eventId => eventId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedEvents.length === events.length) {
      setSelectedEvents([]);
    } else {
      setSelectedEvents(events.map(event => event.id));
    }
  };

  const handleMassDelete = () => {
    setEvents(events.filter(event => !selectedEvents.includes(event.id)));
    setSelectedEvents([]);
  };

  return (
    <Wrapper>
      <section className='events'>
        <h1>Events</h1>
        {selectedEvents.length > 1 && (
          <button className='mass-delete' onClick={handleMassDelete}>Delete</button>
        )}
      </section>
      <section className="table-container" ref={tableRef}>
        <table className="whole-table">
          <thead className="table-header">
            <tr>
              <th className="column checkbox">
                <input
                  type="checkbox"
                  checked={selectedEvents.length === events.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="column id">ID</th>
              <th className="column name">Event Name</th>
              <th className="column date">Date</th>
              <th className="column venue">Venue</th>
              <th className="column url">Web Page URL</th>
              <th className="column description">Description</th>
              <th className="column status">Status</th>
              <th className="column actions">Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {events.slice(0, visibleEntries).map((event) => (
              <tr key={event.id} className="table-row">
                <td className="column checkbox">
                  <input
                    type="checkbox"
                    checked={selectedEvents.includes(event.id)}
                    onChange={() => handleSelectEvent(event.id)}
                  />
                </td>
                <td className="column id">{event.id}</td>
                <td className="column name">{event.name}</td>
                <td className="column date">{event.date}</td>
                <td className="column venue">{event.venue}</td>
                <td className="column url">{event.url}</td>
                <td className="column description">{event.description}</td>
                <td className="column status">
                  <button
                    className={event.status === "Enabled" ? "enabled" : "disabled"}
                    onClick={() => toggleStatus(event.id)}
                  >
                    {event.status}
                  </button>
                </td>
                <td className="column actions">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Wrapper>
  );
};

export default EventManagement