import FaqSelection from '@/components/libs/edit/faqSelection'
import { faFont, faMusic, faPalette } from '@fortawesome/free-solid-svg-icons'
import dynamic from 'next/dynamic'

const BackgroundSetting = dynamic(
  async () =>
    await import(
      '@/components/editPomodoro/setting/musicPlayer/list/backgroundSetting'
    ),
  { ssr: false }
)

const FontSetting = dynamic(
  async () =>
    await import(
      '@/components/editPomodoro/setting/musicPlayer/list/fontSetting'
    ),
  { ssr: false }
)

const MusicPlaylistSetting = dynamic(
  async () =>
    await import(
      '@/components/editPomodoro/setting/musicPlayer/list/musicPlaylistSetting'
    ),
  { ssr: false }
)

const EditMusicPlayerToggleOpen = () => {
  return (
    <div
      id="musicPlayerSetting"
      className="absolute z-50 text-white left-[63px] hover:bg-opacity-100 bg-opacity-90 bg-black w-[450px] h-[70vh] px-5 py-4 top-1/2 -translate-y-1/2 rounded-md overflow-hidden"
    >
      <FaqSelection title="Background" icon={faPalette}>
        <BackgroundSetting />
      </FaqSelection>
      <FaqSelection title="Font" icon={faFont}>
        <FontSetting />
      </FaqSelection>
      <FaqSelection title="Playlist Music" icon={faMusic}>
        <MusicPlaylistSetting />
      </FaqSelection>
    </div>
  )
}
export default EditMusicPlayerToggleOpen
