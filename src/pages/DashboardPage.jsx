import React from 'react';
import StatsGrid from '../components/dashboard/StatsGrid';
import ChartsSection from '../components/dashboard/ChartsSection';
import RecentActivityTable from '../components/dashboard/RecentActivityTable';

const DashboardPage = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here's what's happening.</p>
      </div>
      <StatsGrid />
      <ChartsSection />
      <RecentActivityTable />
    </>
  );
};

export default DashboardPage;
