export type WorkStage = {
  id: string;
  title: string;
  description: string;
};

export const WORK_STAGES_HEADING = "Как мы работаем с вами";

export const WORK_STAGES_DESCRIPTION =
  "От первой заявки до приёмки объекта — понятный процесс без лишних звонков и неожиданных доплат.";

export const WORK_STAGES: WorkStage[] = [
  {
    id: "request",
    title: "Заявка",
    description:
      "Оставляете заявку на сайте, в мессенджере или по телефону — отвечаем в течение 15 минут.",
  },
  {
    id: "estimate",
    title: "Расчёт стоимости",
    description:
      "Уточняем детали объекта, рассчитываем цену и согласовываем удобное время выезда.",
  },
  {
    id: "agreement",
    title: "Согласование",
    description:
      "Фиксируем стоимость, состав работ и сроки — без скрытых доплат после начала.",
  },
  {
    id: "cleaning",
    title: "Уборка",
    description:
      "Бригада приезжает со своим оборудованием и выполняет работы по чек-листу.",
  },
  {
    id: "acceptance",
    title: "Приёмка и оплата",
    description:
      "Проверяете результат вместе с нами и оплачиваете только после принятия объекта.",
  },
];
