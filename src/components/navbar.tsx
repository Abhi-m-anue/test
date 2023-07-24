
// &#128269;
interface Props {
  setSearchValue: (value: string) => void;
  setGenre: (val: number) => void;
}

const Navbar = ({ setSearchValue, setGenre}: Props) => {
  return (
    <div className="Navbar">
      <h1 className="games-title" onClick={()=>{
        setGenre(0);
      }}>Games</h1>
      <form>
        <input
          className="Search-bar"
          placeholder="Search for games"
          onChange={(e) => {
            setSearchValue(e.target.value);
            // console.log(e.target.value)
          }}
        ></input>
      </form>
    </div>
  );
};

export default Navbar;
