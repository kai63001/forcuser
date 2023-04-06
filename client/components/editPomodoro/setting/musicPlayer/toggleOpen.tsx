import FaqSelection from '@/components/libs/edit/faqSelection'
import dynamic from 'next/dynamic'

const BackgroundSetting = dynamic(
  async () =>
    await import(
      '@/components/editPomodoro/setting/musicPlayer/list/backgroundSetting'
    ),
  { ssr: false }
)

const EditMusicPlayerToggleOpen = () => {
  return (
    <div
      id="musicPlayerSetting"
      className="absolute z-50 text-white left-[63px] hover:bg-opacity-100 bg-opacity-90 bg-black w-[450px] h-[70vh] px-5 py-4 top-1/2 -translate-y-1/2 rounded-md overflow-hidden"
    >
      <FaqSelection>
        <BackgroundSetting />
      </FaqSelection>
    </div>
  )
}
export default EditMusicPlayerToggleOpen
