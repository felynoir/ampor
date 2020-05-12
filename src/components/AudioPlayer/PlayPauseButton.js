import React from 'react'
import styled from 'styled-components'

const PlayPause = styled.div`
  z-index: 10;
`

const CheckBoxLabel = styled.label`
  display: block;
  box-sizing: border-box;
  width: 0;
  height: 44px;
  cursor: pointer;
  border-color: transparent transparent transparent #c4c4c4;
  transition: 200ms all ease;
  will-change: border-width;
  border-style: solid;
  border-width: 20px 0 20px 40px;
  @media (hover: hover) {
    &:hover {
      border-color: transparent transparent transparent
        ${props => props?.theme?.colors?.secondary};
      opacity: 0.9;
    }
  }
`

const CheckBox = styled.input`
  display: none;
  &:checked + ${CheckBoxLabel} {
    border-style: double;
    border-width: 0px 0 0px 40px;
  }
`

const PlayPauseButton = ({ playing, setPlaying }) => {
  return (
    <PlayPause>
      <CheckBox type="checkbox" id="playPauseCheckbox" />
      <CheckBoxLabel
        htmlFor="playPauseCheckbox"
        onClick={() => setPlaying(!playing)}
      />
    </PlayPause>
  )
}

export default PlayPauseButton
