"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";

type TeamMember = {
  raw: string;
  name: string;
  photoName?: string;
};

type TeamRegistration = {
  id: string;
  createdAt?: string;
  sportType?: string;
  gradRange?: string;
  classGroup?: string;
  gradYear?: string;
  gender?: string;
  teamName?: string;
  contactName?: string;
  contactPhone?: string;
  members: TeamMember[];
};

const MOCK_TEAMS: TeamRegistration[] = [
  {
    id: "team-1",
    sportType: "Сагсан бөмбөг",
    gradRange: "2016-2025",
    classGroup: "12 А анги",
    gradYear: "2024",
    gender: "эр",
    teamName: "Шонхорууд",
    contactName: "Бат-Эрдэнэ",
    contactPhone: "99112233",
    members: [
      {
        name: "Батсайхан Ганбаатар",
        raw: "1) Батсайхан Ганбаатар, 185см, Дэд мастер, Довтлогч, 123456",
      },
      {
        name: "Тэмүүлэн Баярсайхан",
        raw: "2) Тэмүүлэн Баярсайхан, 178см, Спортын зэрэггүй, Хамгаалагч, 654321",
      },
    ],
  },
  {
    id: "team-2",
    sportType: "Дартс",
    gradRange: "2001-2010",
    classGroup: "10 Б анги",
    gradYear: "2009",
    gender: "эм",
    teamName: "Мэргэн",
    contactName: "Саруул",
    contactPhone: "88005566",
    members: [
      {
        name: "Саруул Эрдэнэ",
        raw: "1) Саруул Эрдэнэ, 165см, Спортын зэрэггүй",
      },
    ],
  },
  {
    id: "team-3",
    sportType: "Теннис",
    gradRange: "2011-2015",
    classGroup: "11 В анги",
    gradYear: "2013",
    gender: "эр",
    teamName: "Сетүүд",
    contactName: "Наран",
    contactPhone: "99001122",
    members: [
      {
        name: "Наран Төмөр",
        raw: "1) Наран Төмөр, 172см, Дэд мастер",
      },
      {
        name: "Ганболд Билгүүн",
        raw: "2) Ганболд Билгүүн, 176см, Спортын зэрэггүй",
      },
    ],
  },
];

const formatMemberDetails = (raw: string) => {
  const cleaned = raw.replace(/^\d+\)\s*/, "").trim();
  const parts = cleaned.split(",").map((part) => part.trim()).filter(Boolean);
  const labels = [
    "Овог нэр",
    "Өндөр",
    "Спортын зэрэг",
    "Байрлал",
    "Хувийн дугаар",
  ];
  return labels
    .map((label, index) => ({
      label,
      value: parts[index],
    }))
    .filter((item) => item.value);
};

export default function TeamsPage() {
  const [teams] = useState<TeamRegistration[]>(MOCK_TEAMS);
  const [activeRange, setActiveRange] = useState<string>("Бүгд");
  const [sportTypes, setSportTypes] = useState<string[]>([]);
  const [classGroups, setClassGroups] = useState<string[]>([]);
  const [gradYears, setGradYears] = useState<string[]>([]);
  const [genders, setGenders] = useState<string[]>([]);
  const [activeTeam, setActiveTeam] = useState<TeamRegistration | null>(null);

  const rangeTabs = useMemo(() => {
    const ranges = Array.from(
      new Set(teams.map((team) => team.gradRange).filter(Boolean))
    ) as string[];
    return ["Бүгд", ...ranges];
  }, [teams]);

  const normalizeGenderLabel = (value: string) => {
    if (value === "эр") return "Эрэгтэй";
    if (value === "эм") return "Эмэгтэй";
    return value;
  };
  const uniqueOptions = (values: (string | undefined)[]) =>
    Array.from(new Set(values.filter(Boolean) as string[]));

  const filterOptions = useMemo(() => {
    return {
      sportTypes: uniqueOptions(teams.map((team) => team.sportType)),
      classGroups: uniqueOptions(teams.map((team) => team.classGroup)),
      gradYears: uniqueOptions(teams.map((team) => team.gradYear)),
      genders: uniqueOptions(teams.map((team) => normalizeGenderLabel(team.gender || ""))),
    };
  }, [teams]);

  const filteredTeams = useMemo(() => {
    return teams.filter((team) => {
      if (activeRange !== "Бүгд" && team.gradRange !== activeRange) return false;
      if (sportTypes.length && !sportTypes.includes(team.sportType || "")) return false;
      if (classGroups.length && !classGroups.includes(team.classGroup || "")) return false;
      if (gradYears.length && !gradYears.includes(team.gradYear || "")) return false;
      if (
        genders.length &&
        !genders.includes(normalizeGenderLabel(team.gender || ""))
      )
        return false;
      return true;
    });
  }, [teams, activeRange, sportTypes, classGroups, gradYears, genders]);

  const toggleSelection = (
    value: string,
    selected: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-900">Бүртгэгдсэн багууд</h1>
        <p className="mt-1 text-sm text-gray-600">
          Бүртгүүлсэн багуудын мэдээлэл болон шүүлтүүрүүд.
        </p>

        <div className="mt-6 flex flex-wrap gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3">
          {rangeTabs.map((range) => {
            const isActive = range === activeRange;
            const count =
              range === "Бүгд"
                ? teams.length
                : teams.filter((team) => team.gradRange === range).length;
            return (
              <button
                key={range}
                type="button"
                onClick={() => setActiveRange(range)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-1 text-sm transition cursor-pointer ${
                  isActive
                    ? "border-[#1f632b] bg-[#1f632b] text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-[#1f632b]"
                }`}
              >
                <span>{range}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Спортын төрөл</h3>
              <div className="space-y-2 text-sm text-gray-700">
                {filterOptions.sportTypes.length === 0 ? (
                  <div className="text-gray-400">Мэдээлэл алга</div>
                ) : (
                  filterOptions.sportTypes.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={sportTypes.includes(option)}
                        onChange={() => toggleSelection(option, sportTypes, setSportTypes)}
                        className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                      />
                      <span>{option}</span>
                    </label>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Анги</h3>
              <div className="space-y-2 text-sm text-gray-700">
                {filterOptions.classGroups.length === 0 ? (
                  <div className="text-gray-400">Мэдээлэл алга</div>
                ) : (
                  filterOptions.classGroups.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={classGroups.includes(option)}
                        onChange={() => toggleSelection(option, classGroups, setClassGroups)}
                        className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                      />
                      <span>{option}</span>
                    </label>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Төгссөн жил</h3>
              <div className="space-y-2 text-sm text-gray-700">
                {filterOptions.gradYears.length === 0 ? (
                  <div className="text-gray-400">Мэдээлэл алга</div>
                ) : (
                  filterOptions.gradYears.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={gradYears.includes(option)}
                        onChange={() => toggleSelection(option, gradYears, setGradYears)}
                        className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                      />
                      <span>{option}</span>
                    </label>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Хүйс</h3>
              <div className="space-y-2 text-sm text-gray-700">
                {filterOptions.genders.length === 0 ? (
                  <div className="text-gray-400">Мэдээлэл алга</div>
                ) : (
                  filterOptions.genders.map((option, index) => (
                    <label key={`${option}-${index}`} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={genders.includes(option)}
                        onChange={() => toggleSelection(option, genders, setGenders)}
                        className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                      />
                      <span>{option}</span>
                    </label>
                  ))
                )}
              </div>
            </div>
          </aside>

          <section>
            {filteredTeams.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
                Бүртгэлтэй баг алга байна.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredTeams.map((team) => (
                  <div
                    key={team.id}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <div className="text-lg font-semibold text-gray-900">
                      {team.teamName || "Багийн нэр оруулаагүй"}
                    </div>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <div>Спортын төрөл: {team.sportType || "-"}</div>
                      <div>Багийн тоглох үе: {team.gradRange || "-"}</div>
                      <div>Анги: {team.classGroup || "-"}</div>
                      <div>Төгссөн жил: {team.gradYear || "-"}</div>
                      <div>
                        Хүйс: {team.gender ? normalizeGenderLabel(team.gender) : "-"}
                      </div>
                      <div>Багийн нэр: {team.teamName || "-"}</div>
                      <div>Холбоо барих хүн: {team.contactName || "-"}</div>
                      <div>Утас: {team.contactPhone || "-"}</div>
                    </div>
                    {team.members.length ? (
                      <div className="mt-3 text-xs text-gray-500">
                        Багийн гишүүд: {team.members.length}
                      </div>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => setActiveTeam(team)}
                      className="mt-4 w-full rounded-lg border border-[#1f632b] px-3 py-2 text-sm font-medium text-[#1f632b] transition hover:bg-[#1f632b] hover:text-white cursor-pointer"
                    >
                      Дэлгэрэнгүй
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {activeTeam ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {activeTeam.teamName || "Багийн нэр оруулаагүй"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Багийн дэлгэрэнгүй мэдээлэл
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTeam(null)}
                className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                Хаах
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 text-sm text-gray-700">
              <div>Багийн нэр: {activeTeam.teamName || "-"}</div>
              <div>Спортын төрөл: {activeTeam.sportType || "-"}</div>
              <div>Багийн тоглох үе: {activeTeam.gradRange || "-"}</div>
              <div>Анги: {activeTeam.classGroup || "-"}</div>
              <div>Төгссөн жил: {activeTeam.gradYear || "-"}</div>
              <div>
                Хүйс: {activeTeam.gender ? normalizeGenderLabel(activeTeam.gender) : "-"}
              </div>
              <div>Холбоо барих хүн: {activeTeam.contactName || "-"}</div>
              <div>Утас: {activeTeam.contactPhone || "-"}</div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Багийн гишүүд</h3>
              {activeTeam.members.length === 0 ? (
                <div className="text-sm text-gray-500">Мэдээлэл алга</div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {activeTeam.members.map((member, index) => (
                    <div
                      key={`${member.raw}-${index}`}
                      className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                    >
                      <div className="aspect-square w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
                        <img
                          src="/images/cover-2.png"
                          alt="Багийн гишүүний зураг"
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                      <div className="mt-3 text-base font-semibold text-gray-900">
                        {member.name || "-"}
                      </div>
                      <div className="mt-2 space-y-1 text-xs text-gray-500">
                        {formatMemberDetails(member.raw).map((item) => (
                          <div key={`${item.label}-${item.value}`}>
                            {item.label}: {item.value}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
