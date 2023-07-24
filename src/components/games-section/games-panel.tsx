import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "./skeleton";

interface Props {
  searchValue: string;
  genre: number;
}
interface gameProps {
  background_image: string;
  name: string;
  metacritic: number;
}

const GamesPanel = ({ searchValue, genre }: Props) => {
  const {
    data: gameData,
    isError,
    refetch,
    isFetching,
  } = useQuery(["games"], () => {
    return Axios.get(
      `https://api.rawg.io/api/games?key=3c809f59bdbe43b399cb764cb901f09a&page_size=40${
        sortValue ? `&ordering=${sortValue}` : ""
      }${searchValue ? `&search=${searchValue}` : ""}${
        genre != 0 ? `&genres=${genre}` : ""
      }${platform ? `&platforms=${platform}` : ""}
     `
    ).then((res) => res.data);
  });

  const [sortClicked, setSortClicked] = useState(false);
  const [platformsClicked, setPlatformsClicked] = useState(false);
  const [sortValue, setSortValue] = useState("");
  const [platform, setPlatform] = useState(0);
  const [selectedPlatform,setSelectedPlatform]=useState("All");
  const [selectedSort,setSelectedSort]=useState("Relevance");
  const n = 40;

  // const {
  //   data
  // } = useQuery(["dta"], () => {
  //   return Axios.get(
  //     'https://api.rawg.io/api/platforms/lists/parents?key=3c809f59bdbe43b399cb764cb901f09a'
  //   ).then((res) => res.data);
  // });

  // data && data.results.map((e)=>{
  //   console.log(e.name);
  //   console.log(e.id);
  //   console.log(e.platforms)
  // })

  useEffect(() => {
    refetch();
  }, [searchValue, genre, sortValue, platform]);
  return (
    <div className="content">
      <div className="content-top">
        <div className="platforms">
          <button
            onClick={() => {
              setPlatformsClicked(!platformsClicked);
              setSortClicked(false);
            }}
          >
             {selectedPlatform ==="All"?"Platforms":selectedPlatform}
          </button>
          <div className={platformsClicked ? "enable" : "platforms-list"}>
            <ul
              id="platforms-list"
              onClick={() => {
                setPlatformsClicked(false);
              }}
            >
              <li
                onClick={() => {
                  setPlatform(0);
                  setSelectedPlatform("All")
                }}
              >
                All
              </li>
              <li
                onClick={() => {
                  setPlatform(1);
                  setSelectedPlatform("PC");
                }}
              >
                PC
              </li>
              <li
                onClick={() => {
                  setPlatform(18);
                  setSelectedPlatform("Playstation");
                }}
              >
                PlayStation
              </li>
              <li
                onClick={() => {
                  setPlatform(3);
                  setSelectedPlatform("Xbox");
                }}
              >
                Xbox
              </li>
              {/* <li
                onClick={() => {
                  setPlatform(4);
                }}
              >
                iOS
              </li> */}
              <li
                onClick={() => {
                  setPlatform(8);
                  setSelectedPlatform("Android");
                }}
              >
                Android
              </li>
              <li
                onClick={() => {
                  setPlatform(6);
                  setSelectedPlatform("Linux");
                }}
              >
                Linux
              </li>
              <li
                onClick={() => {
                  setPlatform(7);
                  setSelectedPlatform("Nintendo");
                }}
              >
                Nintendo
              </li>
            </ul>
          </div>
        </div>
        <div className="sort">
          <button
            onClick={() => {
              setSortClicked(!sortClicked);
              setPlatformsClicked(false);
            }}
          >
            Sort by:{selectedSort}
          </button>
          <div className={sortClicked ? "enable" : "sort-list"}>
            <ul id="sort-list"
              onClick={() => {
                setSortClicked(false);
              }}
            >
              <li
                onClick={() => {
                  setSortValue("");
                  setSelectedSort("Relevance");
                }}
              >
                Relevance
              </li>
              <li
                onClick={() => {
                  setSortValue("name");
                  setSelectedSort("Name");
                }}
              >
                Name
              </li>
              <li
                onClick={() => {
                  setSortValue("-metacritic");
                  setSelectedSort("Popularity");
                }}
              >
                Popularity
              </li>
              <li
                onClick={() => {
                  setSortValue("-released");
                  setSelectedSort("Release date");
                }}
              >
                Release date
              </li>
              <li
                onClick={() => {
                  setSortValue("-rating");
                  setSelectedSort("Rating");
                }}
              >
                Rating
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="games-panel">
        {!isFetching &&
          gameData &&
          gameData.results.map((game: gameProps) => {
            return (
              <div className="game-card">
                <img src={game.background_image}></img>
                <div className="game-details">
                  <h3 style={{ textAlign: "center" }}>{game.name}</h3>
                  <p
                    className={
                      game.metacritic >= 80
                        ? "green"
                        : game.metacritic >= 70
                        ? "yellow"
                        : game.metacritic > 0
                        ? "red"
                        : ""
                    }
                  >
                    {game.metacritic}
                  </p>
                </div>
              </div>
            );
          })}
        {isFetching &&
          [...Array(n)].map((e, i) => <Skeleton key={i}></Skeleton>)}
      </div>
    </div>
  );
};

export default GamesPanel;
