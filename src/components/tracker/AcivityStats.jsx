import { AlertCircle, Clock, Code, Monitor, TrendingUp } from 'lucide-react';
import React, { useEffect } from 'react';
import { useTracker } from '../../context/TrackerContext';

function AcivityStats() {
  const { efficiencyData, resetEfficiency } = useTracker();
  console.log('Efficient Data:', efficiencyData);

  useEffect(() => {
    resetEfficiency();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* --------- Total Active hours --------------------*/}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-cyan-400/20 rounded-lg">
            <Clock className="h-5 w-5 text-cyan-300" />
          </div>
          <p className="text-sm text-gray-300">Total Active Time</p>
        </div>
        <h3 className="text-2xl font-bold text-white">{efficiencyData?.totalActiveTime || 0}</h3>
      </div>
      {/*------------------- Most Used App ----------------*/}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-green-400/20 rounded-lg">
            <Monitor className="h-5 w-5 text-green-300" />
          </div>
          <p className="text-sm text-gray-300">Most Used App</p>
        </div>
        <h3 className="text-2xl font-bold text-white">{efficiencyData?.mostUsedTime || 0}</h3>
        <p className="text-xs text-gray-400 mt-1">{efficiencyData?.mostUsedAppName || ''} </p>
      </div>
      {/*----------------- Code time ----------------------*/}
      {/* <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-green-400/20 rounded-lg">
            <Code className="h-5 w-5 text-green-300" />
          </div>
          <p className="text-sm text-gray-300">Code Time</p>
        </div>
        <h3 className="text-2xl font-bold text-white">{efficiencyData?.codeTime || 0}</h3>
        <p className="text-xs text-gray-400 mt-1">Spent on:- <b className='text-white/70'>V S Code / IntelliJ</b></p>
      </div> */}
      {/*---------------- Idle Time ---------------------*/}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-orange-400/20 rounded-lg">
            <AlertCircle className="h-5 w-5 text-orange-300" />
          </div>
          <p className="text-sm text-gray-300">Idle Time</p>
        </div>
        <h3 className="text-2xl font-bold text-white">{efficiencyData?.totalIdleTime || 0}</h3>
      </div>
      {/*-------------- Productivity --------------------*/}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-400/20 rounded-lg">
            <TrendingUp className="h-5 w-5 text-purple-300" />
          </div>
          <p className="text-sm text-gray-300">Productivity</p>
        </div>
        <h3 className="text-2xl font-bold text-white">{efficiencyData?.productivity || 0}%</h3>
      </div>
    </div>
  );
}

export default AcivityStats;
