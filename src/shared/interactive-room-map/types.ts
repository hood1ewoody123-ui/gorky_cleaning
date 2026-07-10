export type RoomMapPoint = {
  id: string;
  x: number;
  y: number;
  title: string;
  description?: string;
};

export type InteractiveRoomMapProps = {
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  title: string;
  points: RoomMapPoint[];
  categoryId: string;
  onPointMove?: (
    categoryId: string,
    pointId: string,
    deltaX: number,
    deltaY: number,
  ) => void;
  onPointTitleChange?: (
    categoryId: string,
    pointId: string,
    title: string,
  ) => void;
};
