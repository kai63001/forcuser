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

const EditMusicPlayerToggleOpen = (props: any) => {
  return (
    <div
      id="musicPlayerSetting"
      className="absolute z-50 text-white left-[63px] hover:bg-opacity-100 bg-opacity-90 bg-black w-[450px] h-[70vh] px-5 py-4 top-1/2 -translate-y-1/2 rounded-md overflow-hidden"
    >
      <h2 className="text-2xl">Music Setting</h2>
      <hr className="bg-gray-500 border-gray-500 my-2" />
      <div className="overflow-y-scroll px-2 h-[60vh]">
        {!props.iframe && (
          <>
            <FaqSelection title="Background" icon={faPalette}>
              <BackgroundSetting />
            </FaqSelection>
            <FaqSelection title="Font" icon={faFont}>
              <FontSetting />
            </FaqSelection>
          </>
        )}
        <FaqSelection title="Playlist Music" icon={faMusic}>
          <MusicPlaylistSetting iframe={props.iframe} />
        </FaqSelection>
      </div>
    </div>
  )
}
export default EditMusicPlayerToggleOpen
