import Input from '@/components/libs/Input'
import { useState } from 'react'
import { addMusicPlaylistSpotify } from 'services/musicPlayerApi'

const MusicPlaylistSetting = () => {
  const [listMusic, setListMusic] = useState<any[]>([])
  const [error, setError] = useState({ spotify: '' })
  const handleAddMusic = async (e: any) => {
    e.preventDefault()
    setError({ spotify: '' })
    const {
      spotify: { value }
    } = e.target
    if (value == '') return
    try {
      const playList = await addMusicPlaylistSpotify(value)
      setListMusic(playList.data)
      console.log(listMusic)
    } catch (error: any) {
      setError({ spotify: error.toString() })
    }
  }

  return (
    <>
      <p className="mb-1">Spotify playlist</p>
      <form className="flex items-start space-x-2" onSubmit={handleAddMusic}>
        <div className="w-10/12">
          <Input
            name="spotify"
            error={error.spotify}
            className="bg-gray-900 border-gray-400 text-white appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="https://open.spotify.com/playlist/4Zjli1P13J5mmSCD5iKAXK"
          />
        </div>
        <button className="w-2/12 bg-main text-white rounded-md h-full py-2">
          Add
        </button>
      </form>
    </>
  )
}

export default MusicPlaylistSetting
