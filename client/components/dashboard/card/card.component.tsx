import Image from 'next/image'

interface CardComponentProps {
  templateId: string
  selectTemplateId: string
  setSelectTemplateId: (e: any) => void
}

const CardComponent = (props: CardComponentProps) => {
  return (
    <div className="bg-white shadow-md rounded-md relative w-full h-48 group cursor-pointer" onClick={() => { props.setSelectTemplateId(props.templateId) }}>
      {/* background black opacity */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 z-20 rounded-md"></div>
      <Image
        src={'/screenshot/demo.png'}
        alt="Picture of the author"
        quality={100}
        width={500}
        height={100}
        unoptimized={true}
        className={`rounded-md z-10 ${props.templateId === props.selectTemplateId ? 'ring-2 ring-main ring-offset-1' : ''}`}
      />
      {/* top left name */}
        <div className="absolute top-1 left-2 z-30 group-hover:opacity-100 opacity-0 duration-150">
            <p className="text-white text-md">Pomodoro</p>
        </div>

      {/* bottom left tag */}
      <div className="absolute bottom-1 left-2 z-30 group-hover:opacity-0 duration-150 flex space-x-2">
        <div className="bg-yellow-500 text-white px-2 py-1 rounded-full">
          <p className="text-xs">Lofi</p>
        </div>

      </div>
    </div>
  )
}
export default CardComponent
