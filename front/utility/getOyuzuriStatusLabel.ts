import { TOyuzuriStatus } from "../pages/posts/interfaces/apiOyuzuri";

const getOyuzuriStatueLabel = (
  status: TOyuzuriStatus,
  isPostMyself: boolean,
  isTargetUser?: boolean
) => {
  switch (status) {
    case "wantedly":
      return "募集中";
    case "confirm":
      return "確認中";
    case "canceled":
      return "取りやめ";
    case "complete":
      return isTargetUser || isPostMyself ? "完了" : "募集終了";
    case "messaging":
      return isTargetUser || isPostMyself ? "やりとり" : "募集終了";
    default:
      return "募集中";
  }
};
export default getOyuzuriStatueLabel;
