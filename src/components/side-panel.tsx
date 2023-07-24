import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import React, { MouseEventHandler, useEffect, useState } from "react";

interface DataProps {
  name: string;
  image_background: string;
  id: number;
}
interface Props {
  setGenre: (val: number) => void;
}

const SidePanel = ({ setGenre }: Props) => {
  const { data, isLoading, isError, refetch } = useQuery(["genre"], () => {
    return Axios.get(
      "https://api.rawg.io/api/genres?key=3c809f59bdbe43b399cb764cb901f09a"
    ).then((res) => res.data);
  });
  const[genreSelection,setGenreSelection]=useState(-1);

  return (
    <div className="side-panel">
      
      {!isLoading &&
        data.results.map((res: DataProps,i:number) => {
          return (
            <div
              className={genreSelection === i? "genre selected-genre":"genre"}
              onClick={() => {
                setGenre(res.id); 
                setGenreSelection(i);
              }}
            >
              <img src={res.image_background} />
              <div>{res.name}</div>
              </div>
          );
        })}
    </div>
  );
};

export default SidePanel;
