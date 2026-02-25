import React, { createContext, useContext, useState } from 'react';
import { calculateEfficiency } from '../utils/calculateEfficiency';

const TrackerContext = createContext();

export const TrackerProvider = ({ children }) => {
  const [applicationData, setApplicationData] = useState([]);
  const [efficiencyData, setEfficiencyData] = useState(null);

  const updateTrackerData = (data) => {
    if (!data || data.length === 0) {
      setEfficiencyData(null);
      return;
    }

    const calculated = calculateEfficiency(data);
    setEfficiencyData(calculated);
  };

  const resetEfficiency = () => {
    setEfficiencyData(null);
  };

  return (
    <TrackerContext.Provider
      value={{
        applicationData,
        efficiencyData,
        updateTrackerData,
        resetEfficiency,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
};

export const useTracker = () => useContext(TrackerContext);
