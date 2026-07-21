#!/bin/bash
# 사용법: export TOKEN 해둔 뒤 실행
API="https://youth-directory.onrender.com/api/youth-directory/students"

curl -s "$API/" -H "Authorization: Bearer $TOKEN" > /tmp/students_all.json

name="박천희"
school="용두중"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="윤하진"
school="문성중"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="최은찬"
school="월계중"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="노민재"
school="용정중"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="배승윤"
school="봉선중"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="조형민"
school="운리중"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="김준성"
school="전대부중"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이현빈"
school="봉선중"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="강시후"
school="삼육고"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="손규민"
school="동일미래고"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이효준"
school="삼육고"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="노태완"
school="풍암고"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="손수민"
school="동성고"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="조양현"
school="석산고"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="김주혜"
school="주월중"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="서연우"
school="봉선중"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이하율"
school="수피아여중"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="최지민"
school="수피아여중"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="한소윤"
school="주월중"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="국하원"
school="봉선중"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="김소율"
school="운리중"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="김은지"
school="봉선중"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="김주은"
school="동아여중"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="박효은"
school="동아여중"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이한나"
school="봉선중"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="최다민"
school="광주중"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="한예진"
school="주월중"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="박은진"
school="동아여고"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="양소은"
school="동아여고"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="하시라"
school="동아여고"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이지민"
school="숭일고"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이효주"
school="광주여상"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이수린"
school="동아여고"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="이지우"
school="숭일고"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
name="황은결"
school="동아여고"
student_id=$(jq -r --arg n "$name" '[.[] | select(.name == $n and .is_active == true)] | max_by(.id).id // empty' /tmp/students_all.json)
if [ -n "$student_id" ]; then
  echo "[학교 재수정] $name -> $school (id=$student_id)"
  curl -s -X PATCH "$API/$student_id/" -H "Authorization: Bearer $TOKEN" -F "school=$school" > /dev/null
else
  echo "[건너뜀] $name : 학생을 찾을 수 없음"
fi
echo "완료!"