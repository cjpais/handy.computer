import HandyTextLogo from "./logo/HandyTextLogo";

const Header = () => {
  return (
    <div className="flex justify-between w-full pt-8 items-center">
      <a href="/">
        <HandyTextLogo className="h-14" />
      </a>
      <div className="flex gap-4 items-center">
        <a href="/download">download</a>
        <a href="/about">about</a>
        <a href="/buttons">buttons</a>
        <a href="https://github.com/cjpais/Handy" target="_blank">
          github
        </a>
        <a
          href="https://donate.stripe.com/6oU4gz8762g9790c8Vffy0j"
          target="_blank"
          className="px-5 py-[6px] rounded-lg bg-handy-pink !text-handy-dark-pink hover:bg-handy-light-pink"
        >
          donate
        </a>
      </div>
    </div>
  );
};

export default Header;
