import { useState } from "react";
import { setDragableEditWidget } from "@/store/dragableEditWidgetSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

const SettingWidget = () => {
  const dragableEditWidget = useSelector(
    (state: RootState) => state.dragableEditWidgetSlice
  );
  const dispatch = useDispatch();

  const openToggle = (id: number) => {
    if (id == dragableEditWidget.toggleId) {
      dispatch(setDragableEditWidget({
        ...dragableEditWidget,
        toggleId: 0
      }));
      return;
    }
    dispatch(setDragableEditWidget({
      ...dragableEditWidget,
      toggleId: id
    }));
  };
  
  return (
    <>
      <div
        className="bg-black bg-opacity-90 flex flex-col items-center space-y-10 py-5 rounded-md mt-5"
        id="edit"
      >
        <div
          onClick={(e) => openToggle(991)}
          className="text-white cursor-pointer px-3"
          id="settingWidget"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.48975 1.17C9.10975 -0.39 6.88975 -0.39 6.50975 1.17C6.45302 1.40442 6.34174 1.62213 6.18497 1.80541C6.02821 1.9887 5.83038 2.13238 5.60759 2.22477C5.38481 2.31716 5.14336 2.35564 4.90289 2.33709C4.66242 2.31854 4.42973 2.24347 4.22375 2.118C2.85175 1.282 1.28175 2.852 2.11775 4.224C2.65775 5.11 2.17875 6.266 1.17075 6.511C-0.39025 6.89 -0.39025 9.111 1.17075 9.489C1.40523 9.54581 1.62298 9.65719 1.80626 9.81407C1.98955 9.97096 2.13319 10.1689 2.22549 10.3918C2.31779 10.6147 2.35614 10.8563 2.33742 11.0968C2.3187 11.3373 2.24343 11.5701 2.11775 11.776C1.28175 13.148 2.85175 14.718 4.22375 13.882C4.42969 13.7563 4.6624 13.6811 4.90293 13.6623C5.14347 13.6436 5.38502 13.682 5.60793 13.7743C5.83084 13.8666 6.02879 14.0102 6.18568 14.1935C6.34256 14.3768 6.45394 14.5945 6.51075 14.829C6.88975 16.39 9.11075 16.39 9.48875 14.829C9.54575 14.5946 9.65724 14.377 9.81416 14.1939C9.97108 14.0107 10.169 13.8672 10.3918 13.7749C10.6147 13.6826 10.8561 13.6442 11.0966 13.6628C11.3371 13.6815 11.5698 13.7565 11.7758 13.882C13.1477 14.718 14.7178 13.148 13.8818 11.776C13.7563 11.57 13.6812 11.3373 13.6626 11.0969C13.644 10.8564 13.6824 10.6149 13.7747 10.3921C13.8669 10.1692 14.0105 9.97133 14.1936 9.81441C14.3768 9.65749 14.5944 9.546 14.8288 9.489C16.3898 9.11 16.3898 6.889 14.8288 6.511C14.5943 6.45419 14.3765 6.34281 14.1932 6.18593C14.01 6.02904 13.8663 5.83109 13.774 5.60818C13.6817 5.38527 13.6434 5.14372 13.6621 4.90318C13.6808 4.66265 13.7561 4.42994 13.8818 4.224C14.7178 2.852 13.1477 1.282 11.7758 2.118C11.5698 2.24368 11.3371 2.31895 11.0966 2.33767C10.856 2.35639 10.6145 2.31804 10.3916 2.22574C10.1687 2.13344 9.97071 1.9898 9.81382 1.80651C9.65694 1.62323 9.54556 1.40548 9.48875 1.171L9.48975 1.17ZM7.99975 11C8.7954 11 9.55846 10.6839 10.1211 10.1213C10.6837 9.55871 10.9998 8.79565 10.9998 8C10.9998 7.20435 10.6837 6.44129 10.1211 5.87868C9.55846 5.31607 8.7954 5 7.99975 5C7.2041 5 6.44104 5.31607 5.87843 5.87868C5.31582 6.44129 4.99975 7.20435 4.99975 8C4.99975 8.79565 5.31582 9.55871 5.87843 10.1213C6.44104 10.6839 7.2041 11 7.99975 11Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      {dragableEditWidget.toggleId == 991 && (
        <div
          id="musicPlayerSetting"
          className="absolute left-14 top-0 bg-black bg-opacity-90 rounded-md px-5 py-2 text-white w-96"
        >
          <h3 className="text-xl">Setting Music Player</h3>
          <hr className="bg-gray-500 border-gray-500 my-2" />
          
        </div>
      )}
    </>
  );
};

export default SettingWidget;
