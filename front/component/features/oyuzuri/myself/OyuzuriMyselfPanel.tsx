import React from "react";
import { IApiOyuzuri } from "../../../../pages/posts/interfaces/apiOyuzuri";
import ConfirmPanel from "./ConfirmPanel";
import WantedlyPanel from "./WantedlyPanel";

type Props = {
  oyuzuri: IApiOyuzuri;
};
const OyuzuriMyselfPanel: React.FC<Props> = ({ oyuzuri }) => {
  switch (oyuzuri.status) {
    case "wantedly":
      return <WantedlyPanel oyuzuri={oyuzuri} />;
    case "confirm":
      return <ConfirmPanel oyuzuri={oyuzuri} />;
  }
};

export default OyuzuriMyselfPanel;
