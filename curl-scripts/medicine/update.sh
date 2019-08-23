#!/bin/bash

API="http://localhost:4741"
URL_PATH="/medicines"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "medicine": {
      "name": "'"${NAME}"'",
      "doctor": "'"${DOCTOR}"'",
      "prescribed": "'"${PRESCRIBED}"'",
      "description": "'"${DESCRIPTION}"'",
      "dueDATE": "'"${DUEDATE}"'"
    }
  }'

echo
