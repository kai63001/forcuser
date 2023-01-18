import Head from "next/head";
import dynamic from "next/dynamic";
const Header = dynamic(import("./Header"));

type Layout = {
  title?: string | undefined;
  des?: string | undefined;
  image?: string | undefined;
  children?: any | undefined;
};

const Layout = (props: Layout) => {
  return (
    <>
      <Header title={props.title} des={props.des} image={props.image} />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
