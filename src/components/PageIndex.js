import React, { useState } from 'react'

const PageIndex = ({ totalPages, page, setPage }) => {
  const goToNextPage = () => {
    setPage((prevCurrentPage) => Math.min(prevCurrentPage + 1, totalPages))
    window.scrollTo(0, document.documentElement.scrollHeight)
  }

  const goToPreviousPage = () => {
    setPage((prevCurrentPage) => Math.max(prevCurrentPage - 1, 1))
  }

  return (
    <div className='pageIndexContainer '>
      <button onClick={goToPreviousPage} disabled={page === 1}>
        Previous
      </button>
      <span>
        {' '}
        Page {page} of {totalPages}{' '}
      </span>
      <button onClick={goToNextPage} disabled={page === totalPages}>
        Next
      </button>
    </div>
  )
}

export default PageIndex
