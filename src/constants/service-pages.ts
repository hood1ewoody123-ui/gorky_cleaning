export type ServiceLandingPage = {
  slug: string;
  label: string;
};

export type ServiceLandingGroup = {
  id: string;
  title: string;
  pages: ServiceLandingPage[];
};

export const SERVICE_LANDING_GROUPS: ServiceLandingGroup[] = [
  {
    id: "apartments",
    title: "Квартиры",
    pages: [
      {
        slug: "generalnaya-uborka-kvartiry",
        label: "Генеральная уборка квартиры",
      },
      {
        slug: "podderzhivayushchaya-uborka-kvartiry",
        label: "Поддерживающая уборка",
      },
      {
        slug: "uborka-kvartiry-posle-remonta",
        label: "Уборка после ремонта",
      },
      {
        slug: "uborka-pered-zaseleniem",
        label: "Уборка перед заселением",
      },
      {
        slug: "uborka-odnokomnatnoy-kvartiry",
        label: "Уборка однокомнатной квартиры",
      },
    ],
  },
  {
    id: "houses",
    title: "Дома и коттеджи",
    pages: [
      {
        slug: "uborka-chastnogo-doma",
        label: "Уборка частного дома",
      },
      {
        slug: "generalnaya-uborka-doma",
        label: "Генеральная уборка дома",
      },
      {
        slug: "uborka-kottedzha",
        label: "Уборка коттеджа",
      },
    ],
  },
  {
    id: "offices",
    title: "Офисы",
    pages: [
      {
        slug: "uborka-ofisa",
        label: "Ежедневная уборка офиса",
      },
      {
        slug: "generalnaya-uborka-ofisa",
        label: "Генеральная уборка офиса",
      },
      {
        slug: "uborka-ofisa-posle-remonta",
        label: "Уборка офиса после ремонта",
      },
    ],
  },
  {
    id: "commercial",
    title: "Коммерческие объекты",
    pages: [
      {
        slug: "uborka-sklada",
        label: "Уборка складов",
      },
      {
        slug: "uborka-restorana",
        label: "Уборка ресторанов и кафе",
      },
      {
        slug: "uborka-meditsinskogo-kabineta",
        label: "Уборка медицинских кабинетов",
      },
    ],
  },
  {
    id: "special",
    title: "Специальные услуги",
    pages: [
      {
        slug: "moyka-okon",
        label: "Мойка окон",
      },
      {
        slug: "himchistka-mebeli",
        label: "Химчистка мебели",
      },
      {
        slug: "himchistka-kovrov",
        label: "Химчистка ковров",
      },
      {
        slug: "uborka-posle-zatopleniya",
        label: "Уборка после затопления",
      },
    ],
  },
];

export function getServiceLandingHref(slug: string): string {
  return `/uslugi/${slug}`;
}
