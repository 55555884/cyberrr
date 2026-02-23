import { NextResponse } from 'next/server';
import crypto from 'crypto';

// 都道府県名からISO 3166-2:JPコードへのマッピング
const isoStateMap: { [key: string]: string } = {
  "北海道": "JP-01", "青森県": "JP-02", "岩手県": "JP-03", "宮城県": "JP-04", "秋田県": "JP-05",
  "山形県": "JP-06", "福島県": "JP-07", "茨城県": "JP-08", "栃木県": "JP-09", "群馬県": "JP-10",
  "埼玉県": "JP-11", "千葉県": "JP-12", "東京都": "JP-13", "神奈川県": "JP-14", "新潟県": "JP-15",
  "富山県": "JP-16", "石川県": "JP-17", "福井県": "JP-18", "山梨県": "JP-19", "長野県": "JP-20",
  "岐阜県": "JP-21", "静岡県": "JP-22", "愛知県": "JP-23", "三重県": "JP-24", "滋賀県": "JP-25",
  "京都府": "JP-26", "大阪府": "JP-27", "兵庫県": "JP-28", "奈良県": "JP-29", "和歌山県": "JP-30",
  "鳥取県": "JP-31", "島根県": "JP-32", "岡山県": "JP-33", "広島県": "JP-34", "山口県": "JP-35",
  "徳島県": "JP-36", "香川県": "JP-37", "愛媛県": "JP-38", "高知県": "JP-39", "福岡県": "JP-40",
  "佐賀県": "JP-41", "長崎県": "JP-42", "熊本県": "JP-43", "大分県": "JP-44", "宮崎県": "JP-45",
  "鹿児島県": "JP-46", "沖縄県": "JP-47"
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const api_key = process.env.RAPIDOREACH_APP_ID || 'PVnxv7sZMH2';
  const secret = process.env.RAPIDOREACH_APP_KEY; 
  const user_id = searchParams.get('userId') || 'guest';

  if (!secret) return NextResponse.json({ error: "No Secret" }, { status: 500 });

  // 1. プロフィールデータの正規化
  const gender = searchParams.get('gender') === '男性' ? '1' : '2'; // 1=Male, 2=Female
  const dob = `${searchParams.get('birthYear')}-01-01`; // YYYY-MM-DD形式
  const zip = (searchParams.get('zip') || '').replace(/\D/g, ''); // 数字のみ7桁
  const state = isoStateMap[searchParams.get('prefecture') || ''] || 'JP-13'; // ISOコード
  const country = 'JP';

  // 2. ハッシュ (enc) の生成
  // 仕様: api_key + user_id + プロフィール属性を連結してハッシュ化
  // クエリパラメータのアルファベット順に並べる必要がある
  const paramsForHash: any = {
    api_key,
    country,
    dob,
    gender,
    state,
    user_id,
    zip
  };

  // キーをソートして値を連結
  const sortedValues = Object.keys(paramsForHash)
    .sort()
    .map(key => paramsForHash[key])
    .join('');
  
  // 最後にシークレットを付加してMD5ハッシュ化
  const enc = crypto.createHash('md5').update(sortedValues + secret).digest('hex');

  // 3. 最終的なURLの構築
  let finalUrl = `https://www.rapidoreach.com/content/rewardcenter?api_key=${api_key}&user_id=${user_id}&enc=${enc}`;
  finalUrl += `&gender=${gender}&dob=${dob}&zip=${zip}&country=${country}&state=${state}`;
  
  // スキップ用フラグの追加（調査報告書に基づき追加）
  finalUrl += `&full_profile=true&resetProfiler=false`; 

  return NextResponse.json({ url: finalUrl });
}