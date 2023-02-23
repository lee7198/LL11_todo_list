import { FabType } from "../typd";

export const Fab = ({ viewClear, onViewChange }: FabType) => {
  return (
    <div className="fab" onClick={onViewChange}>
      {!viewClear ? "미완료 목록" : "완료 목록"}
    </div>
  );
};
