import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

type Header = {
  title?: string;
  des?: string;
  asPath?: string;
  image?: string;
};

const Header = (props: Header) => {
  const router = useRouter();
//   console.log(router.asPath);
  return (
    <NextSeo
      title={
        props.title
          ? `${props.title}`
          : "Focuser - Life timer, Pomodoro timer, and more"
      }
      description={
        props.des
          ? props.des
          : "Set timers for specific time intervals, such as 10 minutes, 20 minutes, 30 minutes, or 5 minutes. The website may also offer features such as a clock, a work timer, and the ability to set multiple timers. The website's primary function is to help users increase productivity and stay on track with tasks by breaking them into timed intervals."
      }
      canonical={`https://focuser.com${router.asPath}`}
      openGraph={{
        type: "website",
        locale: "en_EN",
        title: props.title
          ? `${props.title}`
          : "Focuser - Life timer, Pomodoro timer, and more",
        description: props.des
          ? props.des
          : "Set timers for specific time intervals, such as 10 minutes, 20 minutes, 30 minutes, or 5 minutes. The website may also offer features such as a clock, a work timer, and the ability to set multiple timers. The website's primary function is to help users increase productivity and stay on track with tasks by breaking them into timed intervals.",
        images: [
          {
            url:
              props.image == undefined || props.image.length == 0
                ? "https://focuser.com/main.jpg"
                : props.image,
          },
        ],
        url: `https://focuser.com${router.asPath}`,
        site_name: "focuser",
      }}
      twitter={{
        handle: "@focuser",
        site: "@focuser",
        cardType: "summary_large_image",
      }}
    />
  );
};

export default Header;