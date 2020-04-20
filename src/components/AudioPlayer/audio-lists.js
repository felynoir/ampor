import yourIt from '../../assets/sounds/youre-it.mp3'
const audioLists = [{ name: "You're It", by: 'Gabe Bondoc', song: yourIt }]

export const todayAudio = () => {
  return audioLists[0]
}
