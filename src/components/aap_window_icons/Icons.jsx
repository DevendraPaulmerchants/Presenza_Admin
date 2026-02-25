import { Bug, Chrome, Code, FileJson, FileText, Folder, Globe, Lock, Terminal } from 'lucide-react';

export const getAppIcon = (appName) => {
  const app = appName?.toLowerCase() || '';

  const iconMap = {
    'chrome.exe': <Chrome className="h-5 w-5 text-yellow-500" />,
    'firefox.exe': <Globe className="h-5 w-5 text-orange-400" />,
    'msedge.exe': <Chrome className="h-5 w-5 text-yellow-500" />,
    'idea64.exe': <Code className="h-5 w-5 text-red-400" />,
    'idea.exe': <Code className="h-5 w-5 text-red-400" />,
    'code.exe': <Code className="h-5 w-5 text-blue-300" />,
    'explorer.exe': <Folder className="h-5 w-5 text-yellow-400" />,
    'notepad.exe': <FileText className="h-5 w-5 text-gray-300" />,
    'lockapp.exe': <Lock className="h-5 w-5 text-gray-400" />,
    'cmd.exe': <Terminal className="h-5 w-5 text-green-400" />,
    'powershell.exe': <Terminal className="h-5 w-5 text-blue-500" />,
    'notepad++': <FileText className="h-5 w-5 text-gray-300" />,
    'mmc.exe': <FileJson className="h-5 w-5 text-gray-400" />,
    'werfault.exe': <Bug className="h-5 w-5 text-red-500" />,
  };

  return iconMap[app] || <FileText className="h-5 w-5 text-gray-400" />;
};
