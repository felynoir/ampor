import { useState, useEffect } from 'react'

const useAudioPlayer = () => {
  const [duration, setDuration] = useState()
  const [curTime, setCurTime] = useState()
  const [playing, setPlaying] = useState(false)
  const [clickedTime, setClickedTime] = useState()

  useEffect(() => {
    const audio = document.getElementById('audio')

    const setAudioData = () => {
      setDuration(audio.duration)
      setCurTime(audio.currentTime)
    }

    const setAudioTime = () => setCurTime(audio.currentTime)

    if (audio) {
      audio.addEventListener('loadeddata', setAudioData)
      audio.addEventListener('timeupdate', setAudioTime)

      playing ? audio.play() : audio.pause()
    }

    if (clickedTime && clickedTime !== curTime) {
      audio.currentTime = clickedTime
      setClickedTime(null)
    }

    return () => {
      if (audio) {
        audio.removeEventListener('loadeddata', setAudioData)
        audio.removeEventListener('timeupdate', setAudioTime)
      }
    }
  })

  return {
    curTime,
    duration,
    playing,
    setPlaying,
    setClickedTime,
  }
}

export default useAudioPlayer
