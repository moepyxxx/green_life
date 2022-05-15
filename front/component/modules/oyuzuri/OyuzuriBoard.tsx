import React, { useContext } from "react";
import { PostContext } from "../../../pages/posts/[id]";
import OyuzuriMyselfBoard from "./myself/OyuzuriMyselfBoard";
import OyuzuriOtherBoard from "./other/OyuzuriOtherBoard";

const OyuzuriBoard: React.FC = () => {
  const { oyuzuri } = useContext(PostContext);

  if (!oyuzuri) return <></>;

  return (
    <>{oyuzuri.isPostMyself ? <OyuzuriMyselfBoard /> : <OyuzuriOtherBoard />}</>
  );
};

export default OyuzuriBoard;
