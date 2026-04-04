import Navigation from "./Navigation";

const Header = () => {
  return (
    <header>
      <Navigation />
      <img src="./hero.png" alt="Hero Banner" width={512} height={476} />
    </header>
  );
};

export default Header;
