import React, { useEffect, useState, useRef } from 'react'

const Lyric = ({ html }) => {
  console.log(html)
  return (
    <div>
      <div className="max-w-lg mx-auto">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  )
}

export default Lyric
