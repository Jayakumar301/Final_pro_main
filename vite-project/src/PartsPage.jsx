import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PartA from './PartA';
import PartB from './PartB';
import PartC from './PartC';
import PartD from './PartD';
import PartE from './PartE';
import PartF from './PartF';
import './App.css';  // Ensure this line is present

function PartsPage() {
  const [activeTab, setActiveTab] = useState('Part-A');
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state?.category || '';

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  const submitForm = () => {
    alert('Form Submitted!');
    navigate('/');
  };

  const getProgressStepClass = (tabName) => {
    const tabs = ['Part-A', 'Part-B', 'Part-C', 'Part-D', 'Part-E', 'Part-F'];
    const currentIndex = tabs.indexOf(activeTab);
    const tabIndex = tabs.indexOf(tabName);
    return tabIndex <= currentIndex ? 'progress-step completed' : 'progress-step';
  };

  const icons = [
    // Add your icons here as appropriate
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q2..."/></svg>, // Part-A icon (already placed)
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m590-488 160-92-160-92-160 92 160 92Zm0 122 110-64v-84l-110 64-110-64v84l110 64ZM480-480Zm320 320H600q0-20-1.5-40t-4.5-40h206v-480H160v46q-20-3-40-4.5T80-680v-40q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160Zm-720 0v-120q50 0 85 35t35 85H80Zm200 0q0-83-58.5-141.5T80-360v-80q117 0 198.5 81.5T360-160h-80Zm160 0q0-75-28.5-140.5t-77-114q-48.5-48.5-114-77T80-520v-80q91 0 171 34.5T391-471q60 60 94.5 140T520-160h-80Z"/></svg>, // Part-B icon
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg>, // Part-C icon
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M280-280h80v-200h-80v200Zm320 0h80v-400h-80v400Zm-160 0h80v-120h-80v120Zm0-200h80v-80h-80v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>, // Part-D icon
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M160-80v-80h640v80H160Zm320-120L320-360l56-56 64 62v-252l-64 62-56-56 160-160 160 160-56 56-64-62v252l64-62 56 56-160 160ZM160-800v-80h640v80H160Z"/></svg>, // Part-E icon
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg> // Part-F icon
  
  ];

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="background-container"></div>
      <div className="mytabs">
        <div className="progress-container">
          <div className="progress-line"></div>
          {['Part-A', 'Part-B', 'Part-C', 'Part-D', 'Part-E', 'Part-F'].map((tab, index) => (
            <div key={tab} className={getProgressStepClass(tab)}>
              {icons[index]}
            </div>
          ))}
        </div>

        <div className="labels-container">
          {['Part-A', 'Part-B', 'Part-C', 'Part-D', 'Part-E', 'Part-F'].map(tab => (
            <React.Fragment key={tab}>
              <input type="radio" id={tab} name="mytabs" checked={activeTab === tab} onChange={() => setActiveTab(tab)} />
              <label htmlFor={tab} className={activeTab === tab ? 'active' : ''}>{tab}</label>
            </React.Fragment>
          ))}
        </div>

        <div className={`tab ${activeTab === 'Part-A' ? 'active-tab' : ''}`}>
          <PartA category={category} openTab={openTab} />
        </div>
        <div className={`tab ${activeTab === 'Part-B' ? 'active-tab' : ''}`}>
          <PartB openTab={openTab} />
        </div>
        <div className={`tab ${activeTab === 'Part-C' ? 'active-tab' : ''}`}>
          <PartC openTab={openTab} />
        </div>
        <div className={`tab ${activeTab === 'Part-D' ? 'active-tab' : ''}`}>
          <PartD openTab={openTab} />
        </div>
        <div className={`tab ${activeTab === 'Part-E' ? 'active-tab' : ''}`}>
          <PartE openTab={openTab} />
        </div>
        <div className={`tab ${activeTab === 'Part-F' ? 'active-tab' : ''}`}>
          <PartF openTab={openTab} />
        </div>
      </div>
    </div>
  );
}

export default PartsPage;