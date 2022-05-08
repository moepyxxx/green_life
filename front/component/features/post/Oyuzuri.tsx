import React from "react";
import { IApiOyuzuri } from "../../../pages/posts/interfaces/apiOyuzuri";
import OyuzuriMyselfPanel from "./OyuzuriMyselfPanel";
import OyuzuriOtherPanel from "./OyuzuriOtherPanel";
import OyuzuriParagraph from "./OyuzuriParagraph";

type Props = {
  oyuzuri: IApiOyuzuri;
};
const Oyuzuri: React.FC<Props> = ({ oyuzuri }) => {
  return (
    <>
      <OyuzuriParagraph oyuzuri={oyuzuri} />

      {oyuzuri.isPostMyself ? (
        <OyuzuriMyselfPanel oyuzuri={oyuzuri} />
      ) : (
        <OyuzuriOtherPanel oyuzuri={oyuzuri} />
      )}
    </>
  );
};

export default Oyuzuri;
