#!/bin/bash
# 사용법: TOKEN 환경변수를 미리 설정한 뒤 이 스크립트를 실행
# 예: TOKEN=$(curl ... | jq -r '.access')
#     bash upload_photos.sh

PHOTO_DIR="$HOME/wooriban-full/photos/photos_by_student"
API="https://youth-directory.onrender.com/api/youth-directory/students"

# 서버에서 전체 학생 목록 가져오기 (이름 -> id 매핑용)
STUDENTS_JSON=$(curl -s "$API/" -H "Authorization: Bearer $TOKEN")

for photo_file in "$PHOTO_DIR"/*; do
  filename=$(basename "$photo_file")
  name="${filename%.*}"  # 확장자 제거

  # 이름으로 id 찾기 (동명이인 있으면 첫 번째 것만 잡힘 - 주의)
  student_id=$(echo "$STUDENTS_JSON" | jq -r --arg n "$name" '[.[] | select(.name == $n)][0].id // empty')

  if [ -z "$student_id" ]; then
    echo "[건너뜀] $name : 서버에서 학생을 찾을 수 없음"
    continue
  fi

  echo "[업로드] $name (id=$student_id) <- $filename"
  curl -s -X PATCH "$API/$student_id/" \
    -H "Authorization: Bearer $TOKEN" \
    -F "photo=@$photo_file" > /dev/null
done

echo "완료!"
