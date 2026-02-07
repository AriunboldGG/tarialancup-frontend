"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle } from "lucide-react";
import { saveSpecialOrderToFirestore } from "@/lib/quotes";

export default function SpecialOrderPage() {
  const { clear } = useCart();
  const bankInfo = {
    ownerName: "Tarialan cup - 2026",
    accountNumber: "0000000000",
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
    name: "",
    email: "",
    phone: "",
    company: "",
    productName: "",
    productDescription: "",
    quantity: "",
    specifications: "",
    deliveryDate: "",
    additionalInfo: "",
  });
  const [submittedInfo, setSubmittedInfo] = useState({
    sportType: "",
    gradRange: "",
    gradYear: "",
    gender: "",
    classGroup: "",
    teamName: "",
  });
  const transactionCode = [
    submittedInfo.sportType || formData.sportType,
    submittedInfo.gradYear || formData.gradYear,
    submittedInfo.gender || formData.gender,
    submittedInfo.classGroup || formData.classGroup,
    submittedInfo.teamName || formData.teamName,
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
      height: "",
      sportRank: "",
      position: "",
      registerNo: "",
      photo: null as File | null,
      photoUrl: "",
    },
  ]);

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
      if (prev.length >= 12) return prev;
      return [
        ...prev,
        {
          lastName: "",
          firstName: "",
          height: "",
          sportRank: "",
          position: "",
          registerNo: "",
          photo: null,
          photoUrl: "",
        },
      ];
    });
  };

  const removeLastMemberRow = () => {
    setMembers((prev) => {
      if (prev.length <= 1) return prev;
      const last = prev[prev.length - 1];
      if (last.photoUrl) {
        URL.revokeObjectURL(last.photoUrl);
      }
      return prev.slice(0, -1);
    });
  };

  const handlePhotoChange = (index: number, file: File | null) => {
    setMembers((prev) => {
      const next = [...prev];
      const current = next[index];
      if (current.photoUrl) {
        URL.revokeObjectURL(current.photoUrl);
      }
      next[index] = {
        ...current,
        photo: file,
        photoUrl: file ? URL.createObjectURL(file) : "",
      };
      return next;
    });
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      if (formData.sportType !== "Сагсан бөмбөг" && !formData.teamName.trim()) {
        setSubmitStatus("error");
        setIsSubmitting(false);
        return;
      }
      const combinedInfo = [
        formData.gradRange ? `Төгсөлтийн хүрээ: ${formData.gradRange}` : null,
        formData.sportType ? `Спортын төрөл: ${formData.sportType}` : null,
        formData.classGroup ? `Анги: ${formData.classGroup}` : null,
        formData.gradYear ? `Төгссөн жил: ${formData.gradYear}` : null,
        formData.gender ? `Хүйс: ${formData.gender}` : null,
        formData.teamName ? `Багийн нэр: ${formData.teamName}` : null,
        formData.contactName ? `Холбоо барих хүний нэр: ${formData.contactName}` : null,
        formData.contactPhone ? `Холбоо барих утас: ${formData.contactPhone}` : null,
        "Тамирчид:",
        ...members.map(
          (member, idx) =>
            `${idx + 1}) ${member.lastName} ${member.firstName}, ${member.height}см, ${member.sportRank}, ${member.position}, ${member.registerNo}${
              member.photo?.name ? `, зураг: ${member.photo.name}` : ""
            }`
        ),
      ]
        .filter(Boolean)
        .join("\n");

      // Save to Firestore special_quotes collection
      await saveSpecialOrderToFirestore({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        productName: formData.productName,
        productDescription: formData.productDescription,
        quantity: formData.quantity,
        specifications: formData.specifications,
        deliveryDate: formData.deliveryDate,
        additionalInfo: combinedInfo,
      });
      
      setSubmittedInfo({
        sportType: formData.sportType,
        gradRange: formData.gradRange,
        gradYear: formData.gradYear,
        gender: formData.gender,
        classGroup: formData.classGroup,
        teamName: formData.teamName,
      });
      setSubmitStatus("success");
      setShowSuccessModal(true);
      // Clear cart after successful submission
      clear();
      
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
        name: "",
        email: "",
        phone: "",
        company: "",
        productName: "",
        productDescription: "",
        quantity: "",
        specifications: "",
        deliveryDate: "",
        additionalInfo: "",
      });
      members.forEach((member) => {
        if (member.photoUrl) {
          URL.revokeObjectURL(member.photoUrl);
        }
      });
      setMembers([
        {
          lastName: "",
          firstName: "",
          height: "",
          sportRank: "",
          position: "",
          registerNo: "",
          photo: null,
          photoUrl: "",
        },
      ]);
    } catch (error: any) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
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
                        20,000₮
                      </span>
                    </span>
                    <Button
                      type="button"
                      onClick={() => handleCopy("20000")}
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
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Багийн тоглох үе:
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
                      <option value="2000-аас өмнө">2000-аас өмнө</option>
                      <option value="2001-2010">2001-2010</option>
                      <option value="2011-2015">2011-2015</option>
                      <option value="2016-2025">2016-2025</option>
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
                      <option value="эр">эр</option>
                      <option value="эм">эм</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Багийн нэр
                      {formData.sportType !== "Сагсан бөмбөг" ? (
                        <span className="text-red-500"> *</span>
                      ) : null}
                    </label>
                    <input
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleChange}
                      required={formData.sportType !== "Сагсан бөмбөг"}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1f632b]"
                      placeholder="Багийн нэр"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Холбоо барих хүний нэр
                      <span className="text-red-500"> *</span>
                    </label>
                    <input
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1f632b]"
                      placeholder="Нэр"
                    />
                  </div>
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
                      disabled={members.length >= 12}
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
                        <th className="px-3 py-2">Өндөр</th>
                        <th className="px-3 py-2">Спортын зэрэг</th>
                        {formData.sportType === "Сагсан бөмбөг" ? (
                          <>
                            <th className="px-3 py-2">Тоглох байрлал</th>
                            <th className="px-3 py-2">Хувийн дугаар</th>
                          </>
                        ) : null}
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
                              type="number"
                              inputMode="numeric"
                              value={member.height}
                              onChange={(e) => handleMemberChange(index, "height", e.target.value)}
                              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                              placeholder="см"
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
                              {member.photoUrl ? (
                                <div className="relative h-14 w-14">
                                  <img
                                    src={member.photoUrl}
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
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-[#1f632b] hover:bg-[#16451e] text-white font-semibold py-3 px-8 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Илгээж байна..." : "Илгээх"}
                </Button>
              </div>
            </form>
          </div>
          )}

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Анхаарна уу:</h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">

              <li>Багийн бооцооны мөнгө шилжсэний дараа бүртгэл баталгаажих болно</li>
              <li>Дансны нэр:</li>
              <li>Дансны дугаар:</li>

            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

