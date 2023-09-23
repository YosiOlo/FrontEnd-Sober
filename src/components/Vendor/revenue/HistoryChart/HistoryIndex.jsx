import React from 'react'
import TopBar from '../../TopBar/Topbar'
import HistoryTable from './HistoryTable'

function HistoryIndex() {
  return (
    <div>
        <TopBar title="History Revenue"/>
        <div className="p-4">
        <HistoryTable/>
        </div>
    </div>
  )
}

export default HistoryIndex