import Input from '@/components/libs/Input'
import { type RootState } from '@/store/store'
import { setTemplate } from '@/store/templateSlice'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMusicPlaylistSpotify, getMusicPlaylistSpotify } from 'services/musicPlayerApi'

const MusicPlaylistSetting = (props: any) => {
  const dispatch = useDispatch()
  const template = useSelector((state: RootState) => state.templateSlice)
  const [, setInfoMusic] = useState(template?.music?.info ?? {
    title: 'Lofi 💿 for study, chill, and more',
    thumbnail: 'https://i.scdn.co/image/ab67706c0000da842a07ae7bf4baaed76ac0db21'
  })
  const [listMusic, setListMusic] = useState<any>({ items: template?.music?.playlist })
  const [error, setError] = useState({ spotify: '' })
  const [loading, setLoading] = useState(false)
  const handleAddMusic = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setError({ spotify: '' })

    const {
      spotify: { value }
    } = e.target
    if (value == '') {
      setError({ spotify: 'Please enter a valid URL' })
      setLoading(false)
      return
    }
    // check if url is not playlist
    if (!value.includes('playlist')) {
      setError({ spotify: 'Please enter a valid playlist URL' })
      setLoading(false)
      return
    }
    try {
      if (props.iframe) {
        setListMusic({
          items: []
        })
        dispatch(
          setTemplate({
            ...template,
            music: {
              ...template.music,
              info: {
                ...template.music.info,
                uri: value
              }
            }
          })
        )
        setLoading(false)
        // clear
        e.target.spotify.value = ''
        return
      }
      const playList = await addMusicPlaylistSpotify(value)
      const info = await getMusicPlaylistSpotify(value)
      setInfoMusic({
        uri: info?.uri,
        title: info?.title,
        thumbnail: info?.thumbnail_url
      })
      console.log(info?.title)
      e.target.spotify.value = ''
      setListMusic(playList.data)
      dispatch(
        setTemplate({
          ...template,
          music: {
            ...template.music,
            info: {
              uri: info?.uri,
              title: info?.title,
              thumbnail: info?.thumbnail_url
            },
            playlist: playList.data.items
          }
        })
      )
      setLoading(false)
      // clear input
    } catch (error: any) {
      setError({ spotify: error.toString() })
      setLoading(false)
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
        <button disabled={loading} className="w-2/12 bg-main text-white rounded-md h-full py-2">
          Submit
        </button>
      </form>
      {listMusic?.items?.length > 0 && (
        <div className="">
          <p className="text-lg my-2">{listMusic.items.length} Playlist</p>
          <div className="flex flex-col space-y-3">
            {listMusic?.items.map((item: any, index: number) => (
              <div key={index} className="grid grid-cols-10 gap-4">
                <div className="col-span-9">
                  {index + 1} {item.track.name}
                </div>
                <div className="col-span-1">
                  <FontAwesomeIcon icon={faTrashCan} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default MusicPlaylistSetting
