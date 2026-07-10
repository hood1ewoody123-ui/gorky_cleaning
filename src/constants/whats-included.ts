import type { RoomMapPoint } from "@/shared/interactive-room-map/types";

export type IncludedRoomCategory = {
  id: string;
  label: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  title: string;
  points: RoomMapPoint[];
};

export const WHATS_INCLUDED_HEADING = "Как мы делаем полную уборку";

export const WHATS_INCLUDED_DESCRIPTION =
  "Это не быстрая протирка полов и мытьё окон. Полный клининг занимает 5–8 часов: мы проходим каждую зону по чек-листу и доводим помещение до идеального порядка — от мебели и сантехники до плинтусов и труднодоступных углов.";

export const INCLUDED_ROOM_CATEGORIES: IncludedRoomCategory[] = [
  {
    id: "room",
    label: "Комната",
    title: "Комната",
    image: "/images/included/room.jpg",
    imageAlt: "Гостиная комната с мягкой мебелью и декором",
    imageWidth: 1920,
    imageHeight: 1280,
    points: [
      {
        id: "room-carpet",
        x: 28,
        y: 72,
        title: "Пылесосим ковры и мягкую мебель",
      },
      {
        id: "room-surfaces",
        x: 53,
        y: 64,
        title: "Протираем поверхности и декор",
      },
      {
        id: "room-dust",
        x: 79,
        y: 28,
        title: "Убираем пыль с труднодоступных мест",
      },
      {
        id: "room-floors",
        x: 44,
        y: 95,
        title: "Моем полы и плинтусы",
      },
    ],
  },
  {
    id: "kitchen",
    label: "Кухня",
    title: "Кухня",
    image: "/images/included/kitchen.jpg",
    imageAlt: "Современная кухня с техникой и рабочими поверхностями",
    imageWidth: 1920,
    imageHeight: 1600,
    points: [
      {
        id: "kitchen-facades",
        x: 28,
        y: 58,
        title: "Обезжириваем фасады",
      },
      {
        id: "kitchen-stove",
        x: 54,
        y: 58,
        title: "Очищаем плиту и технику",
      },
      {
        id: "kitchen-sink",
        x: 6,
        y: 69,
        title: "Моим раковину и поверхности",
      },
      {
        id: "kitchen-stains",
        x: 61,
        y: 27,
        title: "Удаляем налет и загрязнения",
      },
    ],
  },
  {
    id: "bathroom",
    label: "Ванная",
    title: "Ванная",
    image: "/images/included/bathroom.jpg",
    imageAlt: "Ванная комната с сантехникой и плиткой",
    imageWidth: 1920,
    imageHeight: 1920,
    points: [
      {
        id: "bathroom-limescale",
        x: 29,
        y: 35,
        title: "Удаляем известковый налет",
      },
      {
        id: "bathroom-sanitary",
        x: 33,
        y: 86,
        title: "Дезинфицируем сантехнику",
      },
      {
        id: "bathroom-seams",
        x: 60,
        y: 83,
        title: "Очищаем швы и труднодоступные места",
      },
      {
        id: "bathroom-polish",
        x: 70,
        y: 45,
        title: "Полируем поверхности",
      },
    ],
  },
  {
    id: "hallway",
    label: "Прихожая",
    title: "Прихожая",
    image: "/images/included/hallway.jpg",
    imageAlt: "Прихожая с зеркалом и мебелью для хранения",
    imageWidth: 1920,
    imageHeight: 1047,
    points: [
      {
        id: "hallway-mirror",
        x: 85,
        y: 19,
        title: "Очищаем зеркала",
      },
      {
        id: "hallway-furniture",
        x: 31,
        y: 74,
        title: "Убираем пыль с мебели",
      },
      {
        id: "hallway-floors",
        x: 52,
        y: 90,
        title: "Моем полы и плинтусы",
      },
      {
        id: "hallway-surfaces",
        x: 77,
        y: 61,
        title: "Обрабатываем поверхности",
      },
    ],
  },
  {
    id: "office",
    label: "Офис",
    title: "Офис",
    image: "/images/included/office.jpg",
    imageAlt: "Офисное пространство с рабочими местами и окнами",
    imageWidth: 1920,
    imageHeight: 1084,
    points: [
      {
        id: "office-workspaces",
        x: 19,
        y: 64,
        title: "Обеспыливаем рабочие зоны",
      },
      {
        id: "office-furniture",
        x: 48,
        y: 57,
        title: "Протираем мебель",
      },
      {
        id: "office-windows",
        x: 87,
        y: 26,
        title: "Моем окна",
      },
      {
        id: "office-floors",
        x: 44,
        y: 89,
        title: "Очищаем полы",
      },
      {
        id: "office-stains",
        x: 76,
        y: 64,
        title: "Убираем загрязнения",
      },
    ],
  },
];
