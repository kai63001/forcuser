import dynamic from 'next/dynamic'
const Header = dynamic(import('./HeaderIndex'))

interface Layout {
  title?: string | undefined
  des?: string | undefined
  image?: string | undefined
  children?: any | undefined
}

const LayoutIndex = (props: Layout) => {
  return (
    <>
      <Header title={props.title} des={props.des} image={props.image} />
      <main>{props.children}</main>
    </>
  )
}

export default LayoutIndex
