// プロフィール入力フォームコンポーネント
// gender, dob, zipを1回限り入力・保存する

"use client";
import { useState, useCallback } from "react";
import type { ProfileFormData } from "@/lib/types";

interface ProfileFormProps {
  onSave: (data: ProfileFormData) => Promise<void>; // 保存ハンドラー（親コンポーネントから渡す）
  isLoading?: boolean; // 保存中のローディング状態
}

export default function ProfileForm({ onSave, isLoading = false }: ProfileFormProps) {
  // フォームの入力値を管理する状態
  const [formData, setFormData] = useState<ProfileFormData>({
    gender: "",
    birthYear: "1990",
    birthMonth: "01",
    birthDay: "15",
    zipCode: "",
  });

  // 住所の自動補完結果
  const [addressPreview, setAddressPreview] = useState("");
  // バリデーションエラーメッセージ
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileFormData, string>>>({});

  // zipcloud APIで郵便番号から住所を取得する
  // onChange内から直接呼び出す（useEffectは使わない）
  const fetchAddress = useCallback(async (zip: string) => {
    try {
      const res = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`
      );
      const data = await res.json();
      if (data.results) {
        const r = data.results[0];
        // 都道府県＋市区町村＋番地を結合して表示
        setAddressPreview(`${r.address1}${r.address2}${r.address3}`);
      } else {
        setAddressPreview("住所が見つかりませんでした");
      }
    } catch {
      // 住所取得失敗時はサイレントに無視
    }
  }, []);

  // フォームのバリデーション
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ProfileFormData, string>> = {};
    // アンケートサービス利用の最低年齢（18歳以上）
    const MIN_AGE = 18;

    if (!formData.gender) newErrors.gender = "性別を選択してください";

    // 生年月日のバリデーション
    const year = parseInt(formData.birthYear);
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear - MIN_AGE) {
      newErrors.birthYear = `有効な生年を入力してください（${MIN_AGE}歳以上）`;
    }

    // 郵便番号のバリデーション（7桁の数字）
    if (!/^\d{7}$/.test(formData.zipCode)) {
      newErrors.zipCode = "郵便番号は7桁の数字で入力してください（ハイフンなし）";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // フォーム送信ハンドラー
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSave(formData);
  };

  // 入力フィールドの共通スタイル
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1.5px solid #E0E0E0",
    fontSize: "14px",
    backgroundColor: "#FAFAFA",
    boxSizing: "border-box",
    outline: "none",
  };

  // 年の選択肢を生成（1900年〜現在-MIN_AGE年）
  const MIN_AGE = 18;
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 - MIN_AGE + 1 }, (_, i) =>
    String(currentYear - MIN_AGE - i)
  );

  // 月の選択肢（01〜12）
  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );

  // 日の選択肢（01〜31）
  const days = Array.from({ length: 31 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

      {/* 性別選択 */}
      <div>
        <label style={{ fontSize: "13px", fontWeight: 600, color: "#555555", display: "block", marginBottom: "8px" }}>
          性別 <span style={{ color: "#FF3B30" }}>*</span>
        </label>
        <div style={{ display: "flex", gap: "12px" }}>
          {[{ value: "1", label: "男性" }, { value: "2", label: "女性" }].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, gender: opt.value }))}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "12px",
                border: formData.gender === opt.value ? "2px solid #06C755" : "1.5px solid #E0E0E0",
                backgroundColor: formData.gender === opt.value ? "#F0FFF5" : "#FAFAFA",
                color: formData.gender === opt.value ? "#06C755" : "#555555",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {errors.gender && (
          <p style={{ fontSize: "11px", color: "#FF3B30", margin: "4px 0 0" }}>{errors.gender}</p>
        )}
      </div>

      {/* 生年月日入力 */}
      <div>
        <label style={{ fontSize: "13px", fontWeight: 600, color: "#555555", display: "block", marginBottom: "8px" }}>
          生年月日 <span style={{ color: "#FF3B30" }}>*</span>
        </label>
        <div style={{ display: "flex", gap: "8px" }}>
          {/* 年 */}
          <select
            value={formData.birthYear}
            onChange={(e) => setFormData((prev) => ({ ...prev, birthYear: e.target.value }))}
            style={{ ...inputStyle, flex: 2 }}
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}年</option>
            ))}
          </select>
          {/* 月 */}
          <select
            value={formData.birthMonth}
            onChange={(e) => setFormData((prev) => ({ ...prev, birthMonth: e.target.value }))}
            style={{ ...inputStyle, flex: 1 }}
          >
            {months.map((m) => (
              <option key={m} value={m}>{m}月</option>
            ))}
          </select>
          {/* 日 */}
          <select
            value={formData.birthDay}
            onChange={(e) => setFormData((prev) => ({ ...prev, birthDay: e.target.value }))}
            style={{ ...inputStyle, flex: 1 }}
          >
            {days.map((d) => (
              <option key={d} value={d}>{d}日</option>
            ))}
          </select>
        </div>
        {errors.birthYear && (
          <p style={{ fontSize: "11px", color: "#FF3B30", margin: "4px 0 0" }}>{errors.birthYear}</p>
        )}
      </div>

      {/* 郵便番号入力 */}
      <div>
        <label style={{ fontSize: "13px", fontWeight: 600, color: "#555555", display: "block", marginBottom: "8px" }}>
          郵便番号（ハイフンなし7桁） <span style={{ color: "#FF3B30" }}>*</span>
        </label>
        <input
          type="text"
          inputMode="numeric"
          maxLength={7}
          placeholder="例：1000001"
          value={formData.zipCode}
          onChange={(e) => {
            // 数字のみ許可してフォームデータを更新する
            const newZip = e.target.value.replace(/\D/g, "");
            setFormData((prev) => ({ ...prev, zipCode: newZip }));
            // 7桁入力完了時に住所を自動補完する（useEffectは使わずここで直接呼ぶ）
            if (newZip.length === 7) {
              fetchAddress(newZip);
            } else {
              setAddressPreview("");
            }
          }}
          style={inputStyle}
        />
        {/* 住所の自動補完プレビュー */}
        {addressPreview && (
          <p style={{ fontSize: "12px", color: "#06C755", margin: "4px 0 0" }}>
            📍 {addressPreview}
          </p>
        )}
        {errors.zipCode && (
          <p style={{ fontSize: "11px", color: "#FF3B30", margin: "4px 0 0" }}>{errors.zipCode}</p>
        )}
      </div>

      {/* 送信ボタン */}
      <button
        type="submit"
        disabled={isLoading}
        style={{
          width: "100%",
          padding: "16px",
          borderRadius: "999px",
          background: isLoading
            ? "#E6E6E6"
            : "linear-gradient(135deg, #06C755, #04a344)",
          color: isLoading ? "#999999" : "#FFFFFF",
          fontSize: "15px",
          fontWeight: 700,
          border: "none",
          cursor: isLoading ? "not-allowed" : "pointer",
          transition: "opacity 0.2s",
        }}
      >
        {isLoading ? "保存中..." : "プロフィールを保存する"}
      </button>

      {/* 注意書き：1回限りの入力制限 */}
      <p style={{ fontSize: "11px", color: "#AAAAAA", textAlign: "center", margin: 0 }}>
        ※ プロフィール情報は一度保存すると変更できません。正確に入力してください。
      </p>
    </form>
  );
}
