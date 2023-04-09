import axios from '@/lib/axios'

const addMusicPlaylistSpotify = async (url: string) => {
  if (
    !url.match(
      /^(https?:\/\/)?(www\.)?open\.spotify\.com\/playlist\/[a-zA-Z0-9]+$/
    )
  ) {
    throw new Error('Invalid Spotify URL')
  }
  const { data } = await axios.post('/spotify/playlist-data', { url })
  return data
}

export {
  addMusicPlaylistSpotify
}
