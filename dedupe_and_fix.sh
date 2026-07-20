#!/bin/bash
# 사용법: TOKEN을 export 해둔 상태에서 실행
#   export TOKEN
#   bash dedupe_and_fix.sh

API="https://youth-directory.onrender.com/api/youth-directory/students"
PHOTO_DIR="$HOME/wooriban-full/photos/photos_by_student"

echo "[1/3] 전체 학생 목록 가져오는 중..."
curl -s "$API/" -H "Authorization: Bearer $TOKEN" > /tmp/students_all.json

echo "[2/3] 중복 이름 찾아서, 최신(가장 큰 id) 쪽에 사진 다시 붙이는 중..."
# 이름이 2번 이상 나오는 이름들 추출
DUP_NAMES=$(jq -r 'group_by(.name) | map(select(length > 1)) | map(.[0].name) | .[]' /tmp/students_all.json)

for name in $DUP_NAMES; do
  keep_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n)] | max_by(.id).id' /tmp/students_all.json)
  old_ids=$(jq -r --arg n "$name" --argjson keep "$keep_id" '[.[] | select(.name == $n and .id != $keep)] | .[].id' /tmp/students_all.json)

  # 사진 파일 찾아서 최신(keep) 쪽에 업로드
  photo_file=$(find "$PHOTO_DIR" -iname "${name}.*" 2>/dev/null | head -1)
  if [ -n "$photo_file" ]; then
    echo "  [사진 재업로드] $name -> id=$keep_id"
    curl -s -X PATCH "$API/$keep_id/" -H "Authorization: Bearer $TOKEN" -F "photo=@$photo_file" > /dev/null
  fi

  # 오래된 중복본 비활성화
  for old_id in $old_ids; do
    echo "  [비활성화] $name 중복본 id=$old_id"
    curl -s -X PATCH "$API/$old_id/" -H "Authorization: Bearer $TOKEN" -F "is_active=false" > /dev/null
  done
done

echo "[3/3] 완료!"
