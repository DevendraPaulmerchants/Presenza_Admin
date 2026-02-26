import { ChevronDown, Globe } from 'lucide-react';
import React, { memo, useEffect, useState } from 'react';
import { getWindowUsedByEmp } from '../../services/api/apiService';
import { formatDurationFromSeconds } from '../../utils/formattedDurationFromSeconds';
import Loading from '../common/Loading';
import { getAppIcon } from '../aap_window_icons/Icons';
import { sortArrayBasedOnKey } from '../../utils/sortArrayBasedOnKey';

function UsesWindows({ selectedEmp='' }) {
  const [windowDetails, setWindowDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

  const totalRecords = windowDetails?.length || 0;

  const displayedApps = windowDetails?.slice(0, visibleCount);

  const isExpanded = visibleCount >= totalRecords;


  useEffect(() => {
    if(selectedEmp){
      fetchEmployees();
    }
  }, [selectedEmp]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await getWindowUsedByEmp(selectedEmp);
      if (response.success) {
        console.log('uses windows responses', response);
         const sortedList=sortArrayBasedOnKey(response.data,"duration");
         setWindowDetails(sortedList);
        // setWindowDetails(response.data || []);
      } else {
        console.error(response.error || 'Something went wrong');
      }
    } catch (err) {
      console.error('Failed to fetch attendance',err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Top Window Titles</h3>
        <Globe className="h-5 w-5 text-cyan-300" />
      </div>
      <div className="space-y-3">
        {loading && <Loading message="Fetching uses windows list..." />}
        {displayedApps && displayedApps.length > 0 ? (
          displayedApps?.map((window, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">{getAppIcon(window.app)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate mb-1">{window.title}</p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-cyan-300 truncate">{window.app}</span>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {formatDurationFromSeconds(window.duration)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-gray-400">No Windows found</div>
        )}
      </div>
      {totalRecords > 5 && (
        <button
          onClick={() => {
            if (isExpanded) {
              setVisibleCount(5);
            } else {
              setVisibleCount((prev) => Math.min(prev + 5, totalRecords));
            }
          }}
          className="mt-4 text-sm text-cyan-300 hover:text-cyan-200 hover:bg-cyan-400/10 flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 font-medium"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>
      )}
    </div>
  );
}

export default memo(UsesWindows);
