import React from "react";
import { IApiOyuzuri } from "../../../../pages/posts/interfaces/apiOyuzuri";
import WantedlyPanel from "./WantedlyPanel";

type Props = {
  oyuzuri: IApiOyuzuri;
};
const OyuzuriMyselfPanel: React.FC<Props> = ({ oyuzuri }) => {
  switch (oyuzuri.status) {
    case "wantedly":
      return <WantedlyPanel oyuzuri={oyuzuri} />;
    case "confirm":
      return <p>確認中だよ</p>;
  }
};

export default OyuzuriMyselfPanel;
