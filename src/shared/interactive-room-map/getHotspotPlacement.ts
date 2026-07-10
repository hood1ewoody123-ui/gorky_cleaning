import type { RoomMapPoint } from "@/shared/interactive-room-map/types";

export type HotspotPlacement = {
  placement: "top" | "bottom";
  align: "start" | "center" | "end";
};

export function getHotspotPlacement(point: RoomMapPoint): HotspotPlacement {
  const placement = point.y > 55 ? "top" : "bottom";
  const align =
    point.x < 28 ? "start" : point.x > 72 ? "end" : ("center" as const);

  return { placement, align };
}
