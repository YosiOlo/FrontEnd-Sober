import React from 'react';
import TopBar from '../../components/Vendor/TopBar/Topbar';
import ReviewTable from '../../components/Vendor/Review/ReviewTable';

function ReviewsPage() {
  return (
    <div>
      <TopBar title="Reviews"/>
      <div className="p-4">
      <ReviewTable/>
      </div>
    </div>
  )
}

export default ReviewsPage