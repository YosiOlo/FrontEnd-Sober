import React from 'react'
import TopBar from '../../components/Vendor/TopBar/Topbar'
import EtalaseTable from '../../components/Vendor/Etalase/EtalaseTable'

function EtalasePage() {
  return (
    <div className='text-black p-4'>
      <TopBar title="Etalase" />
      <div className="p-4">
      <EtalaseTable/>
      </div>
    </div>
  )
}

export default EtalasePage