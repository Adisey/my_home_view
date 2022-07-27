import React from "react";
import CSS from "csstype";
import {
  IDivMainProps,
  IHouseFloorSettings,
  IRoomSettings,
} from "../../interfaces";
import { Light, Windows } from "../";
import cx from "classnames";
import Styles from "./Room.module.scss";
import { asNumber } from "../../instrument";

type IRoomProps = IDivMainProps & {
  floor: IHouseFloorSettings;
  room: IRoomSettings;
};

export const Room: React.FC<IRoomProps> = ({
  floor,
  room,
  className,
  children,
  ...props
}: IRoomProps): JSX.Element => {
  const {
    id,
    startX,
    startY,
    lengthX,
    lengthY,
    wallUp,
    wallRight,
    wallDown,
    wallLeft,
    title,
    windows,
    isLightActive,
    isLightHide,
  } = room;
  const numberStartX = asNumber(startX);
  const numberStartY = asNumber(startY);
  const numberLengthX = asNumber(lengthX);
  const numberLengthY = asNumber(lengthY);
  const positionStyles: CSS.Properties = {
    gridRowStart: numberStartY + 1,
    gridColumnStart: numberStartX + 1,
    gridRowEnd: numberStartY + numberLengthY,
    gridColumnEnd: numberStartX + numberLengthX,
    paddingTop: `${asNumber(wallUp)}px`,
    paddingRight: `${asNumber(wallRight)}px`,
    paddingBottom: `${asNumber(wallDown)}px`,
    paddingLeft: `${asNumber(wallLeft)}px`,
  };
  return (
    <div
      {...props}
      className={cx(Styles.main, className)}
      style={positionStyles}
    >
      <div title={title} className={Styles.title}>
        {title}
      </div>
      <div className={Styles.covering}>
        <Windows floor={floor} room={room} windows={windows} />
        <Light
          id={id}
          isLightActive={isLightActive}
          isLightHide={isLightHide}
        />
        {children}
      </div>
    </div>
  );
};
