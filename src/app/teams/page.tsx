"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { getRegistrationsBySportType } from "@/lib/firestore";
import Header from "@/components/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type TeamMember = {
  lastName: string;
  firstName: string;
  fullName?: string;
  sportRank?: string;
  position?: string;
  registerNo?: string;
  job?: string;
  photoUrl?: string;
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
  transactionCode?: string;
  members: TeamMember[];
};


export default function TeamsPage() {
  const TEAMS_PER_PAGE = 24;
  const [teams, setTeams] = useState<TeamRegistration[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTeam, setActiveTeam] = useState<TeamRegistration | null>(null);
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeRange, setActiveRange] = useState<string>("Бүгд");
  const [sportTypes, setSportTypes] = useState<string[]>([]);
  const [classGroups, setClassGroups] = useState<string[]>([]);
  const [gradYears, setGradYears] = useState<string[]>([]);
  const [genders, setGenders] = useState<string[]>([]);
  const [filterOptions, setFilterOptions] = useState({
    sportTypes: [] as string[],
    classGroups: [] as string[],
    gradYears: [] as string[],
    genders: [] as string[],
  });
  const rangeTabs = ["Бүгд", "2003-аас өмнө", "2004-2014", "2015-2025"];

  // Utility to normalize gender label
  function normalizeGenderLabel(gender: string) {
    if (!gender) return "-";
    if (gender === "male" || gender === "эрэгтэй") return "Эрэгтэй";
    if (gender === "female" || gender === "эмэгтэй") return "Эмэгтэй";
    return gender;
  }

  // Fetch teams from all sport collections in Firestore
  useEffect(() => {
    async function fetchAllTeams() {
      try {
        const [basketball, darts, tennis] = await Promise.all([
          getRegistrationsBySportType("Сагсан бөмбөг"),
          getRegistrationsBySportType("Дартс"),
          getRegistrationsBySportType("Теннис"),
        ]);
        const allTeamsRaw = [...(basketball || []), ...(darts || []), ...(tennis || [])];
        // Ensure id is always a string and members is always an array
        const allTeams: TeamRegistration[] = allTeamsRaw.map((team: any) => ({
          ...team,
          id: team.id || "",
          members: Array.isArray(team.members) ? team.members : [],
        }));
        console.log("[TeamsPage] fetched teams:", allTeams.map(t => ({ id: t.id, teamName: t.teamName, membersCount: t.members.length, members: t.members })));
        setTeams(allTeams);
        // Extract filter options
        const sportTypesSet = new Set<string>();
        const classGroupsSet = new Set<string>();
        const gradYearsSet = new Set<string>();
        const gendersSet = new Set<string>();
        allTeams.forEach((team) => {
          if (team.sportType) sportTypesSet.add(team.sportType);
          if (team.classGroup) classGroupsSet.add(team.classGroup);
          if (team.gradYear) gradYearsSet.add(team.gradYear);
          if (team.gender) gendersSet.add(normalizeGenderLabel(team.gender));
        });
        setFilterOptions({
          sportTypes: Array.from(sportTypesSet),
          classGroups: Array.from(classGroupsSet),
          gradYears: Array.from(gradYearsSet),
          genders: Array.from(gendersSet),
        });
      } catch (e) {
        setTeams([]);
      }
    }
    fetchAllTeams();
  }, []);



  // Filtered teams (must be above pagination)
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

  // Pagination
  const totalPages = Math.ceil(filteredTeams.length / TEAMS_PER_PAGE);
  const paginatedTeams = useMemo(() => {
    const start = (currentPage - 1) * TEAMS_PER_PAGE;
    return filteredTeams.slice(start, start + TEAMS_PER_PAGE);
  }, [filteredTeams, currentPage]);

  const toggleSelection = (
    value: string,
    selected: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };
  const clearFilters = () => {
    setSportTypes([]);
    setClassGroups([]);
    setGradYears([]);
    setGenders([]);
  };

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">НҮҮР</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Бүртгэгдсэн багууд</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-semibold text-gray-900">Бүртгэгдсэн багууд</h1>
       

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
        <div className="mt-4 flex justify-end lg:hidden">
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-black shadow-sm transition hover:border-[#1f632b] cursor-pointer"
          >
            Шүүлт
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="hidden space-y-4 lg:block">
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
                  filterOptions.genders.map((option, index) => {
                    let display = option;
                    if (option === "эр" || option === "эрэгтэй") display = "Эрэгтэй";
                    if (option === "эм" || option === "эмэгтэй") display = "Эмэгтэй";
                    return (
                      <label key={`${option}-${index}`} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={genders.includes(option)}
                          onChange={() => toggleSelection(option, genders, setGenders)}
                          className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                        />
                        <span>{display}</span>
                      </label>
                    );
                  })
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
                    <div className="text-lg text-black">
                      {team.sportType === "Теннис" ? (
                        <>Тамирчны нэр:{" "}
                          <span className="font-semibold">
                            {[team.members?.[0]?.lastName, team.members?.[0]?.firstName].filter(Boolean).join(" ") || team.members?.[0]?.fullName || "-"}
                          </span>
                        </>
                      ) : (
                        <>Багийн нэр:{" "}
                          <span className="font-semibold">
                            {team.teamName || "Багийн нэр оруулаагүй"}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="mt-2 space-y-1 text-sm text-black">
                      <div>
                        Спортын төрөл:{" "}
                        <span className="font-semibold">{team.sportType || "-"}</span>
                      </div>
                      <div>
                        Багийн тоглох үе:{" "}
                        <span className="font-semibold">{team.gradRange || "-"}</span>
                      </div>
                      <div>
                        Анги: <span className="font-semibold">{team.classGroup || "-"}</span>
                      </div>
                      <div>
                        Төгссөн жил:{" "}
                        <span className="font-semibold">{team.gradYear || "-"}</span>
                      </div>
                      <div>
                        Хүйс:{" "}
                        <span className="font-semibold">
                          {team.gender ? normalizeGenderLabel(team.gender) : "-"}
                        </span>
                      </div>
                      <div>
                        Утас: <span className="font-semibold">{team.contactPhone || "-"}</span>
                      </div>
                    </div>
                    {Array.isArray(team.members) && team.members.length > 0 ? (
                      <div className="mt-3 text-xs text-gray-500">
                        Багийн гишүүд: {team.members.length}
                      </div>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => {
                        console.log("[TeamsPage] opening team modal:", team);
                        console.log("[TeamsPage] members:", team.members);
                        setActiveTeam(team);
                      }}
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
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6"
          style={{ 
            overflow: 'hidden',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTeam(null)}
            className="absolute inset-0 h-full w-full cursor-pointer"
            aria-label="Close modal"
          />
          <div 
            className="relative w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl"
            style={{
              maxHeight: '90vh',
              overflowY: 'scroll',
              overflowX: 'hidden',
              overscrollBehavior: 'contain',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {activeTeam.sportType === "Теннис"
                    ? [activeTeam.members?.[0]?.lastName, activeTeam.members?.[0]?.firstName].filter(Boolean).join(" ") || activeTeam.members?.[0]?.fullName || "-"
                    : activeTeam.teamName || "Багийн нэр оруулаагүй"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Багийн дэлгэрэнгүй мэдээлэл
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTeam(null)}
                className="rounded-full border border-gray-200 p-1.5 text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 text-sm text-gray-700 md:[&>div:nth-child(2n)]:font-semibold">
              {activeTeam.sportType === "Теннис" ? (
                <div>Тамирчны нэр: {[activeTeam.members?.[0]?.lastName, activeTeam.members?.[0]?.firstName].filter(Boolean).join(" ") || activeTeam.members?.[0]?.fullName || "-"}</div>
              ) : (
                <div>Багийн нэр: {activeTeam.teamName || "-"}</div>
              )}
              <div>Спортын төрөл: {activeTeam.sportType || "-"}</div>
              <div>Багийн тоглох үе: {activeTeam.gradRange || "-"}</div>
              <div>Анги: {activeTeam.classGroup || "-"}</div>
              <div>Төгссөн жил: {activeTeam.gradYear || "-"}</div>
              <div>
                Хүйс: {activeTeam.gender ? normalizeGenderLabel(activeTeam.gender) : "-"}
              </div>
              <div>Утас: {activeTeam.contactPhone || "-"}</div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Багийн гишүүд</h3>
              {activeTeam.members.length === 0 ? (
                <div className="text-sm text-gray-500">Мэдээлэл алга</div>
              ) : (
                <div 
                  className="swiper-container" 
                  style={{ 
                    width: '100%', 
                    position: 'relative'
                  }}
                >
                  <div style={{ position: 'relative', paddingLeft: '32px', paddingRight: '32px' }}>
                    <button
                      type="button"
                      onClick={() => swiperRef.current?.slidePrev()}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-7 h-7 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 cursor-pointer"
                    >
                      <ChevronLeft size={16} className="text-gray-600" />
                    </button>
                  <Swiper
                    spaceBetween={16}
                    slidesPerView={1}
                    modules={[]}
                    autoplay={false}
                    loop={false}
                    watchOverflow={true}
                    preventInteractionOnTransition={true}
                    speed={300}
                    allowTouchMove={true}
                    resistance={true}
                    resistanceRatio={0.85}
                    updateOnWindowResize={false}
                    observer={true}
                    observeParents={true}
                    normalizeSlideIndex={true}
                    onSlideChange={(swiper) => setSlideIndex(swiper.realIndex)}
                    onSwiper={(swiper) => { swiperRef.current = swiper; setSlideIndex(swiper.realIndex); }}
                    breakpoints={{
                      480: { slidesPerView: 2, spaceBetween: 16 },
                      640: { slidesPerView: 2, spaceBetween: 16 },
                      1024: { slidesPerView: 3, spaceBetween: 16 },
                    }}
                  >
                  {activeTeam.members.slice(0, 12).map((member, index) => (
                    
                    <SwiperSlide key={`${member.lastName}-${member.firstName}-${index}`}>
                      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm cursor-pointer">
                        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50" style={{ height: '180px' }}>
                          <img
                            src={member.photoUrl || "/images/cover-2.png"}
                            alt="Багийн гишүүний зураг"
                            className="w-full h-full object-cover object-center cursor-pointer"
                            onClick={() => setActiveMember(member)}
                            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/cover-2.png"; }}
                          />
                        </div>
                        <div className="mt-3 text-base font-semibold text-gray-900">
                          {[member.lastName, member.firstName].filter(Boolean).join(" ") || member.fullName || "-"}
                        </div>
                        <div className="mt-2 space-y-1 text-xs text-gray-500">
                          {member.sportRank && <div>Спортын зэрэг: {member.sportRank}</div>}
                          {member.position && <div>Байрлал: {member.position}</div>}
                          {member.registerNo && <div>Хувийн дугаар: {member.registerNo}</div>}
                          {member.job && <div>Ажил мэргэжил: {member.job}</div>}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                  </Swiper>
                    <button
                      type="button"
                      onClick={() => swiperRef.current?.slideNext()}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-7 h-7 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 cursor-pointer"
                    >
                      <ChevronRight size={16} className="text-gray-600" />
                    </button>
                  </div>
                  {activeTeam.members.length > 3 && (
                    <div className="mt-3 flex gap-1">
                      {activeTeam.members.slice(0, 12).map((_, i) => (
                        <div
                          key={i}
                          className="h-1 flex-1 rounded-full transition-all duration-500"
                          style={{
                            backgroundColor: i === slideIndex ? "#1f632b" : "#e5e7eb",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {activeMember ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
          <button
            type="button"
            onClick={() => setActiveMember(null)}
            className="absolute inset-0 h-full w-full cursor-pointer"
            aria-label="Close member photo"
          />
          <div className="relative w-full h-full max-w-2xl flex flex-col rounded-2xl bg-white shadow-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-gray-100 shrink-0">
              <div className="text-base font-semibold text-gray-900">
                {[activeMember.lastName, activeMember.firstName].filter(Boolean).join(" ") || activeMember.fullName || "Багийн гишүүн"}
              </div>
              <button
                type="button"
                onClick={() => setActiveMember(null)}
                className="rounded-full border border-gray-200 p-1.5 text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-hidden bg-gray-50 flex items-center justify-center">
              <img
                src={activeMember.photoUrl || "/images/cover-2.png"}
                alt={`${[activeMember.lastName, activeMember.firstName].filter(Boolean).join(" ") || activeMember.fullName || "Багийн гишүүн"} зураг`}
                className="w-full h-full object-contain"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/cover-2.png"; }}
              />
            </div>
            {(activeMember.sportRank || activeMember.position || activeMember.registerNo || activeMember.job) && (
              <div className="px-5 py-4 grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-700 border-t border-gray-100 shrink-0">
                {activeMember.sportRank && (
                  <div><span className="text-gray-500">Спортын зэрэг:</span> {activeMember.sportRank}</div>
                )}
                {activeMember.position && (
                  <div><span className="text-gray-500">Байрлал:</span> {activeMember.position}</div>
                )}
                {activeMember.registerNo && (
                  <div><span className="text-gray-500">Хувийн дугаар:</span> {activeMember.registerNo}</div>
                )}
                {activeMember.job && (
                  <div><span className="text-gray-500">Ажил мэргэжил:</span> {activeMember.job}</div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : null}

      {isFilterOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 pb-6 lg:hidden">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl text-black">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">Шүүлт</h3>
              
            </div>

            <div className="mt-4 space-y-4 max-h-[60vh] overflow-auto pr-1">
              <div className="rounded-xl border border-gray-200 p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Спортын төрөл</h4>
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

              <div className="rounded-xl border border-gray-200 p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Анги</h4>
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

              <div className="rounded-xl border border-gray-200 p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Төгссөн жил</h4>
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

              <div className="rounded-xl border border-gray-200 p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Хүйс</h4>
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
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={clearFilters}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm text-black hover:border-gray-300 cursor-pointer"
              >
                Цэвэрлэх
              </button>
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm text-black hover:border-gray-300 cursor-pointer"
              >
                Хаах
              </button>
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="w-full rounded-lg bg-[#1f632b] px-4 py-2 text-sm font-medium text-black hover:bg-[#16451e] cursor-pointer"
              >
                Хайх
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
