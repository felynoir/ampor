import React, { useEffect, useState, useRef } from 'react'

const Lyric = ({ html }) => {
  console.log(html)
  return (
    <div className="mt-2">
      <div className="max-w-lg">
        <div className="text-xl mb-1">เนื้อเพลง | Lyric</div>
        <hr></hr>
        <div
          className="text-lg m-3 whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}

export default Lyric
