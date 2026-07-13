export type CompanyStatHighlight = {
  id: string;
  endValue: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

export type CompanyStatsSegment =
  { type: "text"; value: string } | ({ type: "stat" } & CompanyStatHighlight);

export const COMPANY_STATS_PARAGRAPHS: CompanyStatsSegment[][] = [
  [
    { type: "text", value: "Мы — команда из " },
    { type: "stat", id: "employees", endValue: 8 },
    {
      type: "text",
      value:
        " профессионалов, которые каждый день делают город чище — от уютных квартир до больших офисов. За три года работы мы привели в порядок уже более ",
    },
    { type: "stat", id: "area", endValue: 45_000, suffix: " м²" },
    {
      type: "text",
      value: " и знаем, как добиться результата, который чувствуется с порога.",
    },
  ],
  [
    {
      type: "text",
      value: "Средняя уборка у нас занимает ",
    },
    {
      type: "stat",
      id: "duration",
      endValue: 6.5,
      decimals: 1,
      suffix: " часа",
    },
    {
      type: "text",
      value: " — мы не спешим, потому что качество важнее скорости. ",
    },
    { type: "stat", id: "satisfaction", endValue: 98, suffix: "%" },
    {
      type: "text",
      value:
        " клиентов остаются довольны результатом и рекомендуют нас близким.",
    },
  ],
];
