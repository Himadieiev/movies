import Search from "./Search";

const Header = ({searchTerm, setSearchTerm, showSearch, title}) => {
  const defaultTitle = (
    <>
      Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
    </>
  );

  return (
    <header>
      <img src="./hero.png" alt="Hero Banner" width={512} height={476} />
      <h1>{title || defaultTitle}</h1>

      {showSearch && <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
    </header>
  );
};

export default Header;
