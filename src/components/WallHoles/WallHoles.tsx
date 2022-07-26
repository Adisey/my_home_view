import React from "react";
import CSS from "csstype";
import {
  IDivMainProps,
  IDoorSettings,
  IHouseFloorSettings,
  IRoomSettingsWithWall,
  IWallHoleSettings,
  IWindowSettings,
} from "../../interfaces";
import { defaultDoor, defaultWindow } from "../../settings/appConfig";
import { asNumber, showDoubleId, upperFirsLetter } from "../../instrument";
import cx from "classnames";
import Styles from "./WallHoles.module.scss";

type IWallHoleProps = IWallHolesProps & {
  hole: IWallHoleSettings;
};

const WallHole: React.FC<IWallHoleProps> = ({
  floor,
  room,
  hole,
  className,
  children,
  ...props
}: IWallHoleProps): JSX.Element => {
  const width = asNumber(hole?.width);

  const positionStyles = (): CSS.Properties => {
    const margin: number = asNumber(hole?.margin);
    const widthRoomWall: number =
      hole?.wallPlace === "up"
        ? room?.wallUp
        : hole?.wallPlace === "down"
        ? room?.wallDown
        : hole?.wallPlace === "left"
        ? room?.wallLeft
        : hole?.wallPlace === "right"
        ? room?.wallRight
        : 0;

    // const ulc = hole?.wallPlace === "left" || hole?.wallPlace === "up" ? 1 : 0;
    const depth =
      hole?.internalDepth !== undefined
        ? asNumber(hole?.internalDepth)
        : hole.type === "door"
        ? asNumber(floor.internalWall)
        : widthRoomWall + 1;
    // + ulc;

    switch (hole?.wallPlace) {
      case "up":
        return {
          left: `${margin}px`,
          width: `${width}px`,
          height: `${depth}px`,
          top: `${depth * -1}px`,
        };
      case "right":
        return {
          right: `${depth * -1}px`,
          width: `${depth}px`,
          height: `${width}px`,
          top: `${margin}px`,
        };
      case "down":
        return {
          left: `${margin}px`,
          width: `${width}px`,
          height: `${depth}px`,
          bottom: `${depth * -1}px`,
        };
      case "left":
        return {
          left: `${depth * -1}px`,
          width: `${depth}px`,
          height: `${width}px`,
          top: `${margin}px`,
        };
      default:
        return {};
    }
  };

  const doorStyle: CSS.Properties = {
    height: `${width}px`,
    width: `${width}px`,
  };

  const doorCanvasStyleName = `door${upperFirsLetter(
    hole.wallPlace
  )}${upperFirsLetter(hole.direction)}`;

  const canvas =
    hole.type === "window" ? (
      <>
        <div className={Styles.glass1} />
        <div className={Styles.glass2} />
      </>
    ) : (
      <div
        className={cx(Styles.door, Styles[doorCanvasStyleName])}
        style={doorStyle}
      />
    );

  return (
    <div
      {...props}
      className={cx(
        Styles.hole,
        {
          [Styles.holeHorizontal]:
            hole?.wallPlace === "down" || hole?.wallPlace === "up",
          [Styles.holeVertical]:
            hole?.wallPlace === "left" || hole?.wallPlace === "right",
          [Styles.holeDoorHorizontal]:
            (hole?.wallPlace === "down" || hole?.wallPlace === "up") &&
            hole.type === "door",
          [Styles.holeDoorVertical]:
            (hole?.wallPlace === "left" || hole?.wallPlace === "right") &&
            hole.type === "door",
        },
        className
      )}
      style={positionStyles()}
    >
      {canvas}
    </div>
  );
};

type IWallHolesProps = IDivMainProps & {
  floor: IHouseFloorSettings;
  room: IRoomSettingsWithWall;
};

export const WallHoles: React.FC<IWallHolesProps> = ({
  floor,
  room,
  className,
  children,
  ...props
}: IWallHolesProps): JSX.Element => {
  const windows: IWallHoleSettings[] =
    room?.windows?.map((window: IWindowSettings) => ({
      ...defaultWindow,
      ...window,
      type: "window",
    })) || [];
  const doors: IWallHoleSettings[] =
    room?.doors?.map((door: IDoorSettings) => ({
      ...defaultDoor,
      ...door,
      type: "door",
    })) || [];

  const holes = [...windows, ...doors];

  process?.env?.NODE_ENV === "development" && showDoubleId(holes);

  const holeJSX = holes.map((hole: IWallHoleSettings) => (
    <WallHole key={hole.id} floor={floor} room={room} hole={hole} />
  ));

  return (
    <div {...props} className={cx(Styles.main, className)}>
      {holeJSX}
    </div>
  );
};
