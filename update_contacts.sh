#!/bin/bash
# 사용법: export TOKEN 해둔 뒤 실행
API="https://youth-directory.onrender.com/api/youth-directory/students"

curl -s "$API/" -H "Authorization: Bearer $TOKEN" > /tmp/students_all.json

name="박천희"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:35 부모연락처:010-6315-6019"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=35" -F "parent_phone=010-6315-6019" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="윤하진"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:45 부모연락처:010-5607-4500"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=45" -F "parent_phone=010-5607-4500" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="최은찬"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:22 부모연락처:010-5616-2705"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=22" -F "parent_phone=010-5616-2705" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="노민재"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:41 부모연락처:010-4602-1185"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=41" -F "parent_phone=010-4602-1185" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="배승윤"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:11 부모연락처:010-8214-0888"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=11" -F "parent_phone=010-8214-0888" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="조형민"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:15 부모연락처:010-5800-8675"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=15" -F "parent_phone=010-5800-8675" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="김준성"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:24 부모연락처:010-8610-4433"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=24" -F "parent_phone=010-8610-4433" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이현빈"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:15 부모연락처:010-2609-1658"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=15" -F "parent_phone=010-2609-1658" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="김주혜"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:34 부모연락처:010-9040-2115"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=34" -F "parent_phone=010-9040-2115" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="서연우"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:34 부모연락처:010-9040-2115"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=34" -F "parent_phone=010-9040-2115" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이하율"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:11 부모연락처:010-9277-2317"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=11" -F "parent_phone=010-9277-2317" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="최지민"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:15 부모연락처:010-6654-7348"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=15" -F "parent_phone=010-6654-7348" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="한소윤"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:41 부모연락처:010-7179-9372"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=41" -F "parent_phone=010-7179-9372" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="강시후"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:44 부모연락처:010-2052-7878"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=44" -F "parent_phone=010-2052-7878" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="손규민"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:22 부모연락처:010-3524-9179"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=22" -F "parent_phone=010-3524-9179" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이효준"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:14 부모연락처:010-9608-7280"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=14" -F "parent_phone=010-9608-7280" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="노태완"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:13 부모연락처:010-9877-4961"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=13" -F "parent_phone=010-9877-4961" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="손수민"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:22 부모연락처:010-3524-9179"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=22" -F "parent_phone=010-3524-9179" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="조양현"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:45 부모연락처:010-9446-6176"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=45" -F "parent_phone=010-9446-6176" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="국하원"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:41 부모연락처:010-9880-4131"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=41" -F "parent_phone=010-9880-4131" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="김소율"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:42 부모연락처:010-4095-4961"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=42" -F "parent_phone=010-4095-4961" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="김은지"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:25 부모연락처:010-3009-9179"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=25" -F "parent_phone=010-3009-9179" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="김주은"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:34 부모연락처:010-9040-2115"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=34" -F "parent_phone=010-9040-2115" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="박효은"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:45 부모연락처:010-7150-6878"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=45" -F "parent_phone=010-7150-6878" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이한나"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:25 부모연락처:010-2646-0691"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=25" -F "parent_phone=010-2646-0691" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="최다민"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:15 부모연락처:010-6654-7348"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=15" -F "parent_phone=010-6654-7348" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="한예진"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:41 부모연락처:010-7179-9372"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=41" -F "parent_phone=010-7179-9372" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="유정은"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:23 부모연락처:010-8617-5248"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=23" -F "parent_phone=010-8617-5248" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이가은"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:15 부모연락처:"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=15" -F "parent_phone=" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="박효미"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:45 부모연락처:"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=45" -F "parent_phone=" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="김지민"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:35 부모연락처:010-3628-4362"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=35" -F "parent_phone=010-3628-4362" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="박은진"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:35 부모연락처:010-2366-9087"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=35" -F "parent_phone=010-2366-9087" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="양소은"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:24 부모연락처:010-4651-3160"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=24" -F "parent_phone=010-4651-3160" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="하시라"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:34 부모연락처:010-2387-9179"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=34" -F "parent_phone=010-2387-9179" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이지민"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:34 부모연락처:010-2387-9179"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=34" -F "parent_phone=010-2387-9179" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이효주"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:14 부모연락처:010-9608-7280"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=14" -F "parent_phone=010-9608-7280" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="문혜인"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:11 부모연락처:010-5117-9125"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=11" -F "parent_phone=010-5117-9125" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이수린"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:31 부모연락처:010-3293-1228"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=31" -F "parent_phone=010-3293-1228" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이지우"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:34 부모연락처:010-2387-9179"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=34" -F "parent_phone=010-2387-9179" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="황은결"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[구역/부모연락처] $name (id=$student_id) -> 구역:32 부모연락처:010-2727-7351"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "region=32" -F "parent_phone=010-2727-7351" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
echo "완료!"