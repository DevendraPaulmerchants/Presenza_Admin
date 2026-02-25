import { ChevronDown, Monitor } from 'lucide-react';
import React, { memo, useEffect, useState } from 'react';
import { getTarackById } from '../../services/api/apiService';
import Loading from '../common/Loading';
import { formatDurationFromSeconds } from '../../utils/formattedDurationFromSeconds';
import { getAppIcon } from '../aap_window_icons/Icons';
import { useTracker } from '../../context/TrackerContext';

const topApplications = [
  { name: 'VS Code', time: '4h 26m', percentage: 48.3, color: '#4dd0e1' },
  { name: 'Google Chrome', time: '2h 15m', percentage: 24.5, color: '#ff6b35' },
  { name: 'Slack', time: '1h 42m', percentage: 18.7, color: '#ffd93d' },
  { name: 'Firefox', time: '0h 38m', percentage: 6.9, color: '#a78bfa' },
  { name: 'Terminal', time: '0h 08m', percentage: 1.5, color: '#fb923c' },
];

function TopApplication({ selectedEmp }) {
  const { updateTrackerData } = useTracker();
  const [appDetails, setApplicationDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const displayedApps = showAll ? appDetails : appDetails?.slice(0, 5);
  const hasMoreRecords = appDetails?.length > 5;

  useEffect(() => {
    if (selectedEmp) {
      fetchEmployees();
    }
  }, [selectedEmp]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await getTarackById(selectedEmp);
      if (response.success) {
        console.log('application response', response);
        setApplicationDetails(response.data || []);
        updateTrackerData(response.data || []);
        setShowAll(false);
      } else {
        setError(response.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to fetch attendance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Top Applications</h3>
        <Monitor className="h-5 w-5 text-cyan-300" />
      </div>
      <div className={`space-y-3 ${!showAll ? 'max-h-96 overflow-hidden' : 'overflow-visible'}`}>
        {loading ? (
          <Loading message="Fetching the uses Application list..." />
        ) : error ? (
          <div className="py-8 text-center text-red-400">{error}</div>
        ) : displayedApps && displayedApps.length > 0 ? (
          displayedApps.map((application, index) => (
            <div
              key={index}
              className="bg-white/5 space-y-2 p-3 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <div className="grid grid-cols-4">
                <div className="col-span-3 flex gap-2 items-center">
                  <span>{getAppIcon(application.app)}</span>
                  <div>
                    <p className="text-sm text-white">{application.title}</p>
                    <p className="text-xs text-cyan-300">{application.app}</p>
                  </div>
                </div>
                <span className="text-md font-medium text-white/60 px-2 py-1 rounded col-span-1 justify-self-end">
                  {formatDurationFromSeconds(application.totalDuration)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-gray-400">No applications found</div>
        )}
      </div>

      {hasMoreRecords && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 text-sm text-cyan-300 hover:text-cyan-200 hover:bg-cyan-400/10 flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 font-medium"
        >
          {showAll ? 'Show Less' : 'Show More'}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
          />
        </button>
      )}
    </div>
  );
}

export default memo(TopApplication);
