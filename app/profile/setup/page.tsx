"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfileSetup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    gender: "",
    birthYear: "1990",
    birthMonth: "01",
    birthDay: "15",
    zipCode: "",
    prefecture: "", 
    city: ""
  });

  const fetchAddress = async (zip: string) => {
    try {
      const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`);
      const data = await res.json();
      if (data.results) {
        const resData = data.results[0];
        setFormData(prev => ({
          ...prev,
          prefecture: resData.address1, // 例: "東京都"
          city: resData.address2 + resData.address3 // 例: "渋谷区道玄坂"
        }));
      }
    } catch (error) { console.error(error); }
  };

  useEffect(() => {
    if (formData.zipCode.length === 7) fetchAddress(formData.zipCode);
  }, [formData.zipCode]);

  const saveProfile = () => {
    // 漢字のままlocalStorageに保存（後でAPI側でローマ字変換する）
    localStorage.setItem("profile", JSON.stringify(formData));
    router.push("/tasks");
  };

  // ... (UI部分は前回のデザインを維持)
}