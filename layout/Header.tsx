import InstagramLogoSvg from "~/public/svg/instagram-logo.svg";
const Header = () => {
  return (
    <div className="h-[44px] px-4 flex shadow">
      <span className="flex items-center">
        <InstagramLogoSvg />
      </span>
    </div>
  );
};

export default Header;
