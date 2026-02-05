"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle } from "lucide-react";
import { saveSpecialOrderToFirestore } from "@/lib/quotes";

export default function SpecialOrderPage() {
  const { clear } = useCart();
  const [formData, setFormData] = useState({
    gradRange: "",
    classGroup: "",
    gradYear: "",
    gender: "",
    teamName: "",
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

  const [members, setMembers] = useState([
    { lastName: "", firstName: "", height: "", weight: "", position: "", registerNo: "" },
  ]);

  const handleMemberChange = (
    index: number,
    field: keyof (typeof members)[number],
    value: string
  ) => {
    setMembers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addMemberRow = () => {
    setMembers((prev) => [
      ...prev,
      { lastName: "", firstName: "", height: "", weight: "", position: "", registerNo: "" },
    ]);
  };

  const removeLastMemberRow = () => {
    setMembers((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const combinedInfo = [
        formData.gradRange ? `Төгсөлтийн хүрээ: ${formData.gradRange}` : null,
        formData.classGroup ? `Анги: ${formData.classGroup}` : null,
        formData.gradYear ? `Төгссөн жил: ${formData.gradYear}` : null,
        formData.gender ? `Хүйс: ${formData.gender}` : null,
        formData.teamName ? `Багийн нэр: ${formData.teamName}` : null,
        "Тамирчид:",
        ...members.map(
          (member, idx) =>
            `${idx + 1}) ${member.lastName} ${member.firstName}, ${member.height}см, ${member.weight}кг, ${member.position}, ${member.registerNo}`
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
      
      setSubmitStatus("success");
      setShowSuccessModal(true);
      // Clear cart after successful submission
      clear();
      
      // Reset form after successful submission
      setFormData({
        gradRange: "",
        classGroup: "",
        gradYear: "",
        gender: "",
        teamName: "",
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
      setMembers([{ lastName: "", firstName: "", height: "", weight: "", position: "", registerNo: "" }]);
    } catch (error: any) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
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

          {/* Success Modal */}
          {showSuccessModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 sm:px-4">
              <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-4 sm:p-6 md:p-8 text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Амжилттай!</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Таны хүсэлт амжилттай илгээгдлээ. Бид удахгүй тань руу холбогдох болно.
                </p>
                <Button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full bg-[#1f632b] hover:bg-[#16451e] text-white cursor-pointer"
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
                      <option value="Эрэгтэй">Эрэгтэй</option>
                      <option value="Эмэгтэй">Эмэгтэй</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Багийн нэр
                      <span className="text-red-500"> *</span>
                    </label>
                    <input
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1f632b]"
                      placeholder="Багийн нэр"
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
                      className="bg-[#1f632b] hover:bg-[#16451e] text-white"
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
                        <th className="px-3 py-2">Жин</th>
                        <th className="px-3 py-2">Тоглох байрлал</th>
                        <th className="px-3 py-2">Хувийн дугаар</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {members.map((member, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2 text-gray-500">{index + 1}</td>
                          <td className="px-3 py-2">
                            <input
                              value={member.lastName}
                              onChange={(e) => handleMemberChange(index, "lastName", e.target.value)}
                              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                              placeholder="Овог"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              value={member.firstName}
                              onChange={(e) => handleMemberChange(index, "firstName", e.target.value)}
                              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                              placeholder="Нэр"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              value={member.height}
                              onChange={(e) => handleMemberChange(index, "height", e.target.value)}
                              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                              placeholder="см"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              value={member.weight}
                              onChange={(e) => handleMemberChange(index, "weight", e.target.value)}
                              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                              placeholder="кг"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              value={member.position}
                              onChange={(e) => handleMemberChange(index, "position", e.target.value)}
                              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                              placeholder="Байрлал"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              value={member.registerNo}
                              onChange={(e) => handleMemberChange(index, "registerNo", e.target.value)}
                              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                              placeholder="Дугаар"
                            />
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

