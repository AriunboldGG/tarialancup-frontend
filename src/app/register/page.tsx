"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { uploadTeamMemberPhoto } from "@/lib/firebaseStorage";
import { saveTeamRegistration } from "@/lib/firestore";
import { initializeFirebase } from "@/lib/firebase";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function RegisterTeamPage() {
  const bankInfo = {
    ownerName: "Тунгалагмөрөн",
    accountNumber: "5314583897",
  };
  const [formData, setFormData] = useState({
    gradRange: "",
    sportType: "",
    classGroup: "",
    gradYear: "",
    gender: "",
    teamName: "",
    contactName: "",
    contactPhone: "",
  });
  const [submittedInfo, setSubmittedInfo] = useState<{
    sportType: string;
    gradRange: string;
    gradYear: string;
    gender: string;
    classGroup: string;
    teamName: string;
    playerName: string;
    contactName: string;
  }>({
    sportType: "",
    gradRange: "",
    gradYear: "",
    gender: "",
    classGroup: "",
    teamName: "",
    playerName: "",
    contactName: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Initialize Firebase on component mount
  useEffect(() => {
    try {
      initializeFirebase();
    } catch (error) {
      console.error("Firebase initialization failed:", error);
    }
  }, []);

  // Countdown timer to 2026-04-01
  useEffect(() => {
    const targetDate = new Date("2026-04-01T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Allow only digits for phone fields
    const nextValue =
      name === "contactPhone" || name === "phone" ? value.replace(/\D/g, "") : value;
    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCopy = async (value: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "true");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  };

  const [members, setMembers] = useState([
    
    {
      lastName: "",
      firstName: "",
      sportRank: "",
      position: "",
      registerNo: "",
      job: "",
      photo: null as File | null,
      previewUrl: "",  // local blob for form preview only, never saved to Firestore
      photoUrl: "",    // real Firebase Storage URL, set after upload
    },
  ]);

  // Enforce sport-specific member limits on sportType change
  useEffect(() => {
    let maxMembers = 12;
    if (formData.sportType === "Теннис") maxMembers = 1;
    if (formData.sportType === "Дартс") maxMembers = 4;
    if (members.length > maxMembers) {
      setMembers((prev) => prev.slice(0, maxMembers));
    }
  }, [formData.sportType, members.length]);

  const getTransactionLastPart = () => {
    if (submittedInfo.sportType === "Теннис") {
      return submittedInfo.playerName || members[0]?.firstName || "";
    }
    if (submittedInfo.sportType === "Дартс") {
      // If team name is present, use it as last part. If not, use contactName as last part.
      return submittedInfo.teamName?.trim()
        ? submittedInfo.teamName
        : (submittedInfo.contactName || formData.contactName || "");
    }
    return submittedInfo.teamName || formData.teamName;
  }

  const transactionCode = [
    submittedInfo.sportType || formData.sportType,
    submittedInfo.gradYear || formData.gradYear,
    submittedInfo.gender || formData.gender,
    submittedInfo.classGroup || formData.classGroup,
    getTransactionLastPart(),
  ]
    .filter(Boolean)
    .map((value) =>
      value
        .toString()
        .toUpperCase()
        .replace(/\s+/g, "")
        .replace(/[^A-Z0-9А-ЯӨҮЁ]/g, "")
    )
    .join("-");

  const handleMemberChange = (
    index: number,
    field: keyof (typeof members)[number],
    value: string | File | null
  ) => {
    setMembers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addMemberRow = () => {
    setMembers((prev) => {
      const maxMembers =
        formData.sportType === "Теннис"
          ? 1
          : formData.sportType === "Дартс"
          ? 4
          : 12;
      if (prev.length >= maxMembers) return prev;
      return [
        ...prev,
        {
          lastName: "",
          firstName: "",
          sportRank: "",
          position: "",
          registerNo: "",
          job: "",
          photo: null,
          previewUrl: "",
          photoUrl: "",
        },
      ];
    });
  };

  const removeLastMemberRow = () => {
    setMembers((prev) => {
      if (prev.length <= 1) return prev;
      const last = prev[prev.length - 1];
      if (last.previewUrl) {
        URL.revokeObjectURL(last.previewUrl);
      }
      return prev.slice(0, -1);
    });
  };

  const handlePhotoChange = (index: number, file: File | null) => {
    setMembers((prev) => {
      const next = [...prev];
      const current = next[index];
      if (current.previewUrl) {
        URL.revokeObjectURL(current.previewUrl);
      }
      next[index] = {
        ...current,
        photo: file,
        previewUrl: file ? URL.createObjectURL(file) : "",
        photoUrl: "", // reset until upload succeeds
      };
      return next;
    });
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Initialize Firebase
      initializeFirebase();

      // Team name is optional now for all sports. Keep the current value if provided.
      const sanitizedTeamName = formData.teamName.trim();

      const submissionTeamName =
        formData.sportType === "Теннис"
          ? `${members[0]?.lastName || ""} ${members[0]?.firstName || ""}`.trim()
          : sanitizedTeamName;

      // Validate member required fields (lastName firstName)
      const invalidMember = members.some(
        (member) => !member.lastName.trim() || !member.firstName.trim()
      );
      if (invalidMember) {
        setSubmitStatus("error");
        setIsSubmitting(false);
        return;
      }

      // submissionTeamName can be empty for all sports now (team name optional).
      // If you want fallback values, adjust here.

      // Upload team member photos to Firebase Storage
      const membersWithPhotos = await Promise.all(
        members.map(async (member, idx) => {
          let photoUrl = "";


          // If a file was selected, upload it to Firebase Storage
          if (member.photo) {
            const uploadedUrl = await uploadTeamMemberPhoto(
              member.photo,
              formData.gradYear,
              submissionTeamName,
              `${member.lastName}-${member.firstName}`,
              idx
            );
            photoUrl = uploadedUrl || "";
          }

          return {
            ...member,
            photoUrl,
            previewUrl: undefined, // strip local preview before saving
            photo: undefined,      // strip File object before saving
          };
        })
      );

      const combinedInfo = [
        formData.gradRange ? `Төгсөлтийн хүрээ: ${formData.gradRange}` : null,
        formData.sportType ? `Спортын төрөл: ${formData.sportType}` : null,
        formData.classGroup ? `Анги: ${formData.classGroup}` : null,
        formData.gradYear ? `Төгссөн жил: ${formData.gradYear}` : null,
        formData.gender ? `Хүйс: ${formData.gender}` : null,
        formData.teamName ? `Багийн нэр: ${sanitizedTeamName}` : null,
        formData.contactName ? `Холбоо барих хүний нэр: ${formData.contactName}` : null,
        formData.contactPhone ? `Холбоо барих утас: ${formData.contactPhone}` : null,
        "Тамирчид:",
        ...membersWithPhotos.map(
          (member, idx) =>
            `${idx + 1}) ${member.lastName} ${member.firstName}, ${member.sportRank}, ${member.position}, ${member.registerNo}, ${member.job}${
              member.photoUrl ? `, зураг URL: ${member.photoUrl}` : ""
            }`
        ),
      ]
        .filter(Boolean)
        .join("\n");

      // Save to Firestore team_registrations organized by sport type
      const registrationPayload: any = {
        gradRange: formData.gradRange,
        sportType: formData.sportType,
        classGroup: formData.classGroup,
        gradYear: formData.gradYear,
        gender: formData.gender,
        contactPhone: formData.contactPhone,
        transactionCode: transactionCode,
        members: membersWithPhotos as any,
      };

      if (formData.sportType !== "Теннис") {
        registrationPayload.teamName = submissionTeamName;
        registrationPayload.contactName = formData.contactName;
      }

      await saveTeamRegistration(registrationPayload);
      
      setSubmittedInfo({
        sportType: formData.sportType,
        gradRange: formData.gradRange,
        gradYear: formData.gradYear,
        gender: formData.gender,
        classGroup: formData.classGroup,
        teamName: submissionTeamName,
        playerName:
          formData.sportType === "Теннис"
            ? `${membersWithPhotos[0]?.firstName || ""}`.trim()
            : "",
        contactName: formData.contactName,
      });
      setSubmitStatus("success");
      setShowSuccessModal(true);
      
      // Reset form after successful submission
      setFormData({
        gradRange: "",
        sportType: "",
        classGroup: "",
        gradYear: "",
        gender: "",
        teamName: "",
        contactName: "",
        contactPhone: "",
      });
      members.forEach((member) => {
        if (member.previewUrl) {
          URL.revokeObjectURL(member.previewUrl);
        }
      });
      setMembers([
        {
          lastName: "",
          firstName: "",
          sportRank: "",
          position: "",
          registerNo: "",
          job: "",
          photo: null,
          previewUrl: "",
          photoUrl: "",
        },
      ]);
    } catch (error: any) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  const maxMemberCount =
    formData.sportType === "Теннис"
      ? 1
      : formData.sportType === "Дартс"
      ? 4
      : 12;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">НҮҮР</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Бүртгүүлэх</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Бүртгүүлэх
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-6 sm:mb-8">
            Нэг багийн бүртгэлийг вэбсайтаас нэг удаа л илгээхийг анхаарна уу!
          </p>

          {/* Confirm Modal */}
          {showConfirmModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 sm:px-4">
              <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-4 sm:p-6 md:p-8 text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Анхааруулга</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Бүртгэлийн хүсэлтийг вэбсайтаас нэг л удаа илгээх боломжтой. Хэрэв та бүртгүүлсэн мэдээллээ шинэчлэх бол холбоо барих админтай холбогдоно уу. Илгээх үү?
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Button
                    type="button"
                    onClick={() => setShowConfirmModal(false)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-900 cursor-pointer"
                  >
                    😟 Үгүй
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setShowConfirmModal(false);
                      submitForm();
                    }}
                    className="bg-[#1f632b] hover:bg-[#16451e] text-white cursor-pointer"
                  >
                    🙂 Тийм
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Success Modal */}
          {showSuccessModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 sm:px-4">
              <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-4 sm:p-6 md:p-8 text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Амжилттай!</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Таны хүсэлт амжилттай илгээгдлээ. Доорх дансанд хураамжийг шилжүүлснээр бүртгэл баталгаажуулах болно.
                </p>
                <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-left text-sm text-gray-700">
                  <div className="font-semibold text-gray-900 mb-2">Дансны мэдээлэл</div>
                  <div className="flex items-center justify-between gap-2">
                    <span>
                      Хураамж:{" "}
                      <span className="text-base font-semibold text-gray-900">
                        {(() => {
                          const sport = submittedInfo.sportType || formData.sportType;
                          if (sport === "Сагсан бөмбөг") return "160,000₮";
                          if (sport === "Дартс") return "80,000₮";
                          return "20,000₮";
                        })()}
                      </span>
                    </span>
                    <Button
                      type="button"
                      onClick={() => { const s = submittedInfo.sportType || formData.sportType; handleCopy(s === "Сагсан бөмбөг" ? "160000" : s === "Дартс" ? "80000" : "20000"); }}
                      className="h-7 px-2 text-xs bg-[#1f632b] hover:bg-[#16451e] text-white cursor-pointer"
                    >
                      Хуулах
                    </Button>
                  </div>
                  <div>
                    Хүлээн авах банк:{" "}
                    <span className="text-base font-semibold text-gray-900">
                      Хаан банк
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span>
                      Дансны дугаар:{" "}
                      <span className="text-base font-semibold text-gray-900">
                        {bankInfo.accountNumber}
                      </span>
                    </span>
                    <Button
                      type="button"
                      onClick={() => handleCopy(bankInfo.accountNumber)}
                      className="h-7 px-2 text-xs bg-[#1f632b] hover:bg-[#16451e] text-white cursor-pointer"
                    >
                      Хуулах
                    </Button>
                  </div>
                  <div>
                    Дансны нэр:{" "}
                    <span className="text-base font-semibold text-gray-900">
                      {bankInfo.ownerName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span>
                      Гүйлгээний код:{" "}
                      <span className="text-base font-semibold text-gray-900">
                        {transactionCode || "-"}
                      </span>
                    </span>
                    <Button
                      type="button"
                      onClick={() => handleCopy(transactionCode)}
                      disabled={!transactionCode}
                      className="h-7 px-2 text-xs bg-[#1f632b] hover:bg-[#16451e] text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Хуулах
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={() => setShowSuccessModal(false)}
                  className="mt-5 w-full bg-[#1f632b] hover:bg-[#16451e] text-white cursor-pointer"
                >
                  Хаах
                </Button>
              </div>
            </div>
          )}

          {!showSuccessModal && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Contact Information Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Багийн мэдээлэл</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Спортын төрөл:
                      <span className="text-red-500"> *</span>
                    </label>
                    <select
                      name="sportType"
                      value={formData.sportType}
                      onChange={handleSelectChange}
                      required
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1f632b]"
                    >
                      <option value="" disabled>
                        Сонгох
                      </option>
                      <option value="Сагсан бөмбөг">Сагсан бөмбөг</option>
                      <option value="Дартс">Дартс</option>
                      <option value="Теннис">Теннис</option>
                    </select>
                  </div>
                  {formData.sportType === "Дартс" && (
                    <div className="md:col-span-2 rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
                      ⚠️ <span className="font-semibold">Дартс тэмцээний дүрэм:</span> Баг нь <span className="font-semibold">2 эрэгтэй, 2 эмэгтэй</span> нийт <span className="font-semibold">4 гишүүнтэй</span> байна. Тоглолт нь <span className="font-semibold">багийн</span> дүрмээр явагдана.
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Багийн тоглох он:
                      <span className="text-red-500"> *</span>
                    </label>
                    <select
                      name="gradRange"
                      value={formData.gradRange}
                      onChange={handleSelectChange}
                      required
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1f632b]"
                    >
                      <option value="" disabled>
                        Сонгох
                      </option>
                      <option value="2003-аас өмнө">2003-аас өмнө</option>
                      <option value="2004-2014">2004-2014</option>
                      <option value="2015-2025">2015-2025</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Анги
                      <span className="text-red-500"> *</span>
                    </label>
                    <select
                      name="classGroup"
                      value={formData.classGroup}
                      onChange={handleSelectChange}
                      required
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1f632b]"
                    >
                      <option value="" disabled>
                        Сонгох
                      </option>
                      {[
                        8, 9, 10, 11, 12,
                      ].flatMap((grade) =>
                        ["А", "Б", "В", "Г", "Д", "Е"].map((section) => {
                          const value = `${grade}${section}`;
                          return (
                            <option key={value} value={value}>
                              {grade} {section} анги
                            </option>
                          );
                        })
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Төгссөн жил
                      <span className="text-red-500"> *</span>
                    </label>
                    <select
                      name="gradYear"
                      value={formData.gradYear}
                      onChange={handleSelectChange}
                      required
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1f632b]"
                    >
                      <option value="" disabled>
                        Сонгох
                      </option>
                      {Array.from({ length: 2025 - 1980 + 1 }, (_, i) => {
                        const year = 1980 + i;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {formData.sportType !== "Дартс" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Хүйс
                        <span className="text-red-500"> *</span>
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleSelectChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1f632b]"
                      >
                        <option value="" disabled>
                          Сонгох
                        </option>
                        <option value="эр">эрэгтэй</option>
                        <option value="эм">эмэгтэй</option>
                      </select>
                    </div>
                  )}
                  {formData.sportType !== "Теннис" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Багийн нэр
                        <span className="text-red-500"> *</span>
                      </label>
                      <input
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1f632b]"
                        placeholder="Багийн нэр (заавал)"
                        required
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Холбоо барих утас
                      <span className="text-red-500"> *</span>
                    </label>
                    <input
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      required
                      type="tel"
                      inputMode="numeric"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1f632b]"
                      placeholder="Утасны дугаар"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Багийн гишүүд</h2>
                  <div className="flex items-center gap-2">
                    {members.length > 1 && (
                      <Button
                        type="button"
                        onClick={removeLastMemberRow}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        Устгах
                      </Button>
                    )}
                    <Button
                      type="button"
                      onClick={addMemberRow}
                      disabled={members.length >= maxMemberCount}
                      className="bg-[#1f632b] hover:bg-[#16451e] text-white disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      Нэмэх
                    </Button>
                  </div>
                </div>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700">
                      <tr>
                        <th className="px-3 py-2 w-12">№</th>
                        <th className="px-3 py-2">Тамирчны овог</th>
                        <th className="px-3 py-2">Тамирчны нэр</th>
                        <th className="px-3 py-2">Спортын зэрэг</th>
                        {formData.sportType === "Сагсан бөмбөг" ? (
                          <>
                            <th className="px-3 py-2">Тоглох байрлал</th>
                            <th className="px-3 py-2">Хувийн дугаар</th>
                          </>
                        ) : null}
                        <th className="px-3 py-2">Ажил мэргэжил</th>
                        <th className="px-3 py-2">Зураг</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {members.map((member, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2 text-gray-500">{index + 1}</td>
                          <td className="px-3 py-2">
                            <input
                              required
                              value={member.lastName}
                              onChange={(e) => handleMemberChange(index, "lastName", e.target.value)}
                              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                              placeholder="Овог"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              required
                              value={member.firstName}
                              onChange={(e) => handleMemberChange(index, "firstName", e.target.value)}
                              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                              placeholder="Нэр"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              value={member.sportRank}
                              onChange={(e) => handleMemberChange(index, "sportRank", e.target.value)}
                              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                              placeholder="Зэрэг"
                            />
                          </td>
                          {formData.sportType === "Сагсан бөмбөг" ? (
                            <>
                              <td className="px-3 py-2">
                                <input
                                  value={member.position}
                                  onChange={(e) =>
                                    handleMemberChange(index, "position", e.target.value)
                                  }
                                  className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                                  placeholder="Байрлал"
                                />
                              </td>
                              <td className="px-3 py-2">
                                <input
                                  type="number"
                                  inputMode="numeric"
                                  value={member.registerNo}
                                  onChange={(e) =>
                                    handleMemberChange(index, "registerNo", e.target.value)
                                  }
                                  className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                                  placeholder="Дугаар"
                                />
                              </td>
                            </>
                          ) : null}
                          <td className="px-3 py-2">
                            <input
                              value={member.job}
                              onChange={(e) => handleMemberChange(index, "job", e.target.value)}
                              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                              placeholder="Ажил мэргэжил"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-2">
                              <input
                                id={`member-photo-${index}`}
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handlePhotoChange(
                                    index,
                                    e.target.files && e.target.files[0] ? e.target.files[0] : null
                                  )
                                }
                                className="hidden"
                              />
                              {member.previewUrl ? (
                                <div className="relative h-14 w-14">
                                  <img
                                    src={member.previewUrl}
                                    alt="Тамирчны зураг"
                                    className="h-14 w-14 rounded border border-gray-200 object-cover"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handlePhotoChange(index, null)}
                                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white shadow"
                                    aria-label="Зураг устгах"
                                  >
                                    ×
                                  </button>
                                </div>
                              ) : (
                                <label
                                  htmlFor={`member-photo-${index}`}
                                  className="inline-flex cursor-pointer items-center rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                  Зураг сонгох
                                </label>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

          

              {/* Submit Button */}
              <div className="border-t border-gray-200 pt-6">
                {submitStatus === "error" && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                    Алдаа гарлаа. Дахин оролдоно уу эсвэл утсаар холбогдоно уу.
                  </div>
                )}
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2">
                    Бүртгэл нээгдлээ!
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    Багийн бооцооны мөнгөө шилжүүлсний дараа таны илгээсэн бүртгэл баталгаажиж БҮРТГЭГДСЭН БАГУУД цэсэнд байрших болно.
                  </p>
                  
                </div>
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#1f632b] hover:bg-[#16451e] text-white font-semibold py-3 px-8 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Илгээж байна..." : "Илгээх"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
          )}

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Анхаарна уу:</h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">

              <li>Дансны нэр: Тунгалагмөрөн</li>
              <li>Дансны дугаар: 5314583897</li>
              <li>Гүйлгээний утга: Бүртгэлийн хүсэлт илгээсний дараа гарч ирнэ</li>

            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

