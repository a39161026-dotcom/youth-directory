#!/bin/bash
API="https://youth-directory.onrender.com/api/youth-directory/students"

curl -s "$API/" -H "Authorization: Bearer $TOKEN" > /tmp/students_all.json

name="박천희"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 임지수"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=임지수" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="윤하진"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 장소희"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=장소희" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="최은찬"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 최동석"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=최동석" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="노민재"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 김유진"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=김유진" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="배승윤"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 김지원"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=김지원" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="조형민"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 박상현"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=박상현" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="김준성"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 백신예"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=백신예" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이현빈"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 조미정"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=조미정" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="김주혜"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 신승희"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=신승희" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="서연우"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 신승희"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=신승희" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이하율"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 배소영"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=배소영" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="최지민"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 위진영"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=위진영" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="한소윤"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 박유미"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=박유미" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="강시후"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 안상아"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=안상아" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="손규민"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 박정아"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=박정아" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이효준"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 박미현"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=박미현" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="노태완"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 박건효"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=박건효" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="손수민"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 박정아"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=박정아" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="조양현"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 윤규환"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=윤규환" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="국하원"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 김소영"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=김소영" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="김소율"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 박서정"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=박서정" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="김은지"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 윤미선"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=윤미선" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="김주은"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 신승희"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=신승희" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="박효은"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 정수진"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=정수진" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이한나"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 이영숙"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=이영숙" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="최다민"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 위진영"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=위진영" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="한예진"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 박유미"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=박유미" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="유정은"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 진경효"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=진경효" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이가은"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> "
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="박효미"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> "
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="김지민"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 채주연"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=채주연" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="박은진"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 김미란"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=김미란" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="양소은"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 홍승주"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=홍승주" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="하시라"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 정송희"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=정송희" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이지민"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 정송희"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=정송희" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이효주"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 박미현"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=박미현" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="문혜인"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 이혜령"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=이혜령" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이수린"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 공현애"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=공현애" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이지우"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 정송희"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=정송희" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="황은결"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[보호자 이름] $name (id=$student_id) -> 김근정"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "parent_name=김근정" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
echo "완료!"