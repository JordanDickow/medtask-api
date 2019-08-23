#!/bin/bash

API="http://localhost:4741"
URL_PATH="/medicines"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "medicine": {
      "name": "'"${NAME}"'",
      "doctor": "'"${DOCTOR}"'",
      "prescribed": "'"${PRESCRIBED}"'",
        "description": "'"${DESCRIPTION}"'",
          "dueDate": "'"${DUEDATE}"'"

    }
  }'

echo
