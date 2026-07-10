export type CleaningProcessStep = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  orientation: "portrait" | "landscape";
  /** Zoom inside the frame to crop baked-in letterbox bars */
  imageScale?: number;
};

export const CLEANING_PROCESS_STEPS: CleaningProcessStep[] = [
  {
    id: "01",
    title: "Осмотр помещения",
    description:
      "Оцениваем особенности объекта, определяем объем работ и подбираем оптимальный набор услуг.",
    image: "/images/process/step-01.png",
    imageAlt: "Специалист проводит осмотр помещения и фиксирует объём работ",
    imageWidth: 1024,
    imageHeight: 682,
    orientation: "landscape",
    imageScale: 1.12,
  },
  {
    id: "02",
    title: "Подготовка оборудования",
    description:
      "Используем профессиональную технику и безопасные средства, подходящие для конкретных поверхностей.",
    image: "/images/process/step-02.png",
    imageAlt: "Профессиональное клининговое оборудование и средства",
    imageWidth: 536,
    imageHeight: 802,
    orientation: "portrait",
    imageScale: 1.08,
  },
  {
    id: "03",
    title: "Основной клининг",
    description:
      "Удаляем загрязнения, очищаем поверхности и приводим помещение в порядок по утвержденному чек-листу.",
    image: "/images/process/step-03.png",
    imageAlt: "Клинеры выполняют основную уборку помещения",
    imageWidth: 1024,
    imageHeight: 688,
    orientation: "landscape",
    imageScale: 1.18,
  },
  {
    id: "04",
    title: "Детальная обработка",
    description:
      "Уделяем внимание труднодоступным зонам, стыкам, фурнитуре и другим деталям.",
    image: "/images/process/step-04.png",
    imageAlt: "Детальная обработка поверхностей и оборудования",
    imageWidth: 1024,
    imageHeight: 679,
    orientation: "landscape",
    imageScale: 1.12,
  },
  {
    id: "05",
    title: "Контроль качества",
    description:
      "Проводим финальную проверку результата перед сдачей объекта клиенту.",
    image: "/images/process/step-05.png",
    imageAlt: "Руководитель проводит финальный контроль качества уборки",
    imageWidth: 1024,
    imageHeight: 683,
    orientation: "landscape",
    imageScale: 1.18,
  },
];

export const CLEANING_PROCESS_HEADING = "Как проходит профессиональная уборка";

export const CLEANING_PROCESS_DESCRIPTION =
  "Пять последовательных этапов — от осмотра до финальной проверки. Вы всегда понимаете, что происходит на объекте и за что платите.";
