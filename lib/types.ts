// 型定義ファイル：アプリ全体で使用するTypeScript型

// ユーザー型：World IDと内部ユーザーIDの紐付け
export interface User {
  id: string; // UUID（内部ユーザーID）
  world_id_proof: string; // World ID証明（一意）
  profile_completed: boolean; // プロフィール入力完了フラグ
  created_at: string;
  updated_at: string;
}

// プロフィール型：性別・生年月日・郵便番号
export interface Profile {
  id: string;
  user_id: string; // users.idへの外部キー
  gender: number; // 1=男性, 2=女性
  date_of_birth: string; // YYYY-MM-DD形式
  zip_code: string; // 郵便番号（最大10文字）
  created_at: string;
  updated_at: string;
}

// タスク完了履歴型：RapidoReachアンケートの完了記録
export interface TaskCompletion {
  id: string;
  user_id: string; // users.idへの外部キー
  survey_number: string; // RapidoReachのアンケート番号
  cpi: number | null; // Cost Per Interview（報酬額）
  loi: number | null; // Length Of Interview（所要時間・分）
  status: number; // 0=未完了, 1=完了, 2=失格
  earned_amount: number; // 確定報酬額
  created_at: string;
  completed_at: string | null;
  updated_at: string;
}

// RapidoReach APIのアンケート型（v2レスポンス）
export interface RapidoReachSurvey {
  survey_number: string; // アンケート番号
  cpi: number; // 報酬額（USD）
  loi: number; // 所要時間（分）
  entry_link: string; // アンケート参加リンク（プロフィール関所スキップ済み）
  title?: string; // アンケートタイトル（任意）
  category?: string; // カテゴリ（任意）
  ir?: number; // Incidence Rate（対象者率・任意）
}

// RapidoReach APIレスポンス型
export interface RapidoReachApiResponse {
  surveys: RapidoReachSurvey[];
  total?: number;
}

// プロフィールフォームの入力値型
export interface ProfileFormData {
  gender: string; // "1"=男性, "2"=女性
  birthYear: string; // 例: "1990"
  birthMonth: string; // 例: "01"
  birthDay: string; // 例: "15"
  zipCode: string; // 郵便番号（7桁）
}

// World ID検証リクエスト型
export interface WorldIdVerifyRequest {
  proof: string; // World IDの証明データ
  nullifier_hash: string; // ヌリファイアハッシュ（一意ユーザー識別子）
  merkle_root: string; // マークルルート
  verification_level: string; // 検証レベル（"orb" or "device"）
  action: string; // アクション識別子
}

// RapidoReach Postbackリクエスト型（S2Sコールバック）
export interface RapidoReachPostback {
  user_id: string; // アプリ側ユーザーID
  survey_number: string; // アンケート番号
  status: number; // 完了ステータス（1=完了）
  cpi?: number; // 確定報酬額
  signature?: string; // Webhook署名（セキュリティ検証用）
}
