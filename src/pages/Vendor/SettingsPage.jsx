import React from 'react';
import TopBar from '../../components/Vendor/TopBar/Topbar';
import Settings from '../../components/Vendor/Settings/Settings';

function SettingsPage() {
  return (
    <div>
      <TopBar title="Settings"/>
      <div className="p-7 ">
      <Settings/>

      </div>
    </div>
  )
}

export default SettingsPage