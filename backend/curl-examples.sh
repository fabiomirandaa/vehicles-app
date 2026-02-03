#!/bin/bash

# Vehicles API - Comandos CURL
# Importe este arquivo no Postman ou execute diretamente no terminal

BASE_URL="http://localhost:3000"

echo "========================================="
echo "  Vehicles API - CURL Commands"
echo "========================================="
echo ""

# 1. CREATE - Criar Veículos
echo "1. CREATE - Honda Civic"
curl -X POST "${BASE_URL}/vehicles" \
  -H "Content-Type: application/json" \
  -d '{
  "placa": "ABC-1234",
  "chassi": "9BWZZZ377VT004251",
  "renavam": "12345678901",
  "modelo": "Civic",
  "marca": "Honda",
  "ano": 2023
}'

echo -e "\n\n2. CREATE - Toyota Corolla"
curl -X POST "${BASE_URL}/vehicles" \
  -H "Content-Type: application/json" \
  -d '{
  "placa": "XYZ-5678",
  "chassi": "9BWZZZ377VT004252",
  "renavam": "98765432109",
  "modelo": "Corolla",
  "marca": "Toyota",
  "ano": 2024
}'

echo -e "\n\n3. CREATE - Volkswagen Gol"
curl -X POST "${BASE_URL}/vehicles" \
  -H "Content-Type: application/json" \
  -d '{
  "placa": "DEF-9012",
  "chassi": "9BWAA48U08A123456",
  "renavam": "11122233344",
  "modelo": "Gol",
  "marca": "Volkswagen",
  "ano": 2022
}'

echo -e "\n\n4. CREATE - Chevrolet Onix"
curl -X POST "${BASE_URL}/vehicles" \
  -H "Content-Type: application/json" \
  -d '{
  "placa": "GHI-3456",
  "chassi": "8AFBR1EH0KJ123456",
  "renavam": "55566677788",
  "modelo": "Onix",
  "marca": "Chevrolet",
  "ano": 2025
}'

echo -e "\n\n5. CREATE - Fiat Argo"
curl -X POST "${BASE_URL}/vehicles" \
  -H "Content-Type: application/json" \
  -d '{
  "placa": "JKL-7890",
  "chassi": "9BD15N1Z5PP123456",
  "renavam": "99988877766",
  "modelo": "Argo",
  "marca": "Fiat",
  "ano": 2023
}'

echo -e "\n\n6. CREATE - Hyundai HB20"
curl -X POST "${BASE_URL}/vehicles" \
  -H "Content-Type: application/json" \
  -d '{
  "placa": "MNO-1357",
  "chassi": "8AFBG41C0LJ123456",
  "renavam": "22233344455",
  "modelo": "HB20",
  "marca": "Hyundai",
  "ano": 2024
}'

echo -e "\n\n7. CREATE - Jeep Compass"
curl -X POST "${BASE_URL}/vehicles" \
  -H "Content-Type: application/json" \
  -d '{
  "placa": "PQR-2468",
  "chassi": "3C4NJDBB2LT123456",
  "renavam": "66677788899",
  "modelo": "Compass",
  "marca": "Jeep",
  "ano": 2026
}'

echo -e "\n\n8. CREATE - Ford Ranger"
curl -X POST "${BASE_URL}/vehicles" \
  -H "Content-Type: application/json" \
  -d '{
  "placa": "STU-9753",
  "chassi": "8AFER13L0LJ123456",
  "renavam": "33344455566",
  "modelo": "Ranger",
  "marca": "Ford",
  "ano": 2023
}'

echo -e "\n\n9. CREATE - Nissan Kicks"
curl -X POST "${BASE_URL}/vehicles" \
  -H "Content-Type: application/json" \
  -d '{
  "placa": "VWX-8642",
  "chassi": "3N1BC1AP8LL123456",
  "renavam": "77788899900",
  "modelo": "Kicks",
  "marca": "Nissan",
  "ano": 2024
}'

echo -e "\n\n10. CREATE - Renault Sandero"
curl -X POST "${BASE_URL}/vehicles" \
  -H "Content-Type: application/json" \
  -d '{
  "placa": "YZA-1593",
  "chassi": "93YBBSR2CJJ123456",
  "renavam": "44455566677",
  "modelo": "Sandero",
  "marca": "Renault",
  "ano": 2022
}'

# 2. GET ALL
echo -e "\n\n========================================="
echo "GET ALL - Listar todos os veículos"
echo "========================================="
curl -X GET "${BASE_URL}/vehicles" \
  -H "Content-Type: application/json"

# 3. GET BY ID (substitua VEHICLE_ID pelo ID real)
echo -e "\n\n========================================="
echo "GET BY ID - Buscar veículo específico"
echo "========================================="
echo "Substitua VEHICLE_ID pelo ID retornado ao criar um veículo"
# curl -X GET "${BASE_URL}/vehicles/VEHICLE_ID" \
#   -H "Content-Type: application/json"

# 4. UPDATE (substitua VEHICLE_ID pelo ID real)
echo -e "\n\n========================================="
echo "UPDATE - Atualizar veículo"
echo "========================================="
echo "Substitua VEHICLE_ID pelo ID retornado ao criar um veículo"
# curl -X PUT "${BASE_URL}/vehicles/VEHICLE_ID" \
#   -H "Content-Type: application/json" \
#   -d '{
#   "modelo": "Civic Touring",
#   "ano": 2024
# }'

# 5. DELETE (substitua VEHICLE_ID pelo ID real)
echo -e "\n\n========================================="
echo "DELETE - Deletar veículo"
echo "========================================="
echo "Substitua VEHICLE_ID pelo ID retornado ao criar um veículo"
# curl -X DELETE "${BASE_URL}/vehicles/VEHICLE_ID" \
#   -H "Content-Type: application/json"

# 6. Exemplos de ERRO - Validação
echo -e "\n\n========================================="
echo "ERRO - Placa vazia (deve falhar)"
echo "========================================="
curl -X POST "${BASE_URL}/vehicles" \
  -H "Content-Type: application/json" \
  -d '{
  "placa": "",
  "chassi": "9BWZZZ377VT004251",
  "renavam": "12345678901",
  "modelo": "Civic",
  "marca": "Honda",
  "ano": 2023
}'

echo -e "\n\n========================================="
echo "ERRO - Ano inválido (deve falhar)"
echo "========================================="
curl -X POST "${BASE_URL}/vehicles" \
  -H "Content-Type: application/json" \
  -d '{
  "placa": "ABC-9999",
  "chassi": "9BWZZZ377VT009999",
  "renavam": "99999999999",
  "modelo": "Civic",
  "marca": "Honda",
  "ano": 1800
}'

echo -e "\n\n========================================="
echo "ERRO - Campos obrigatórios faltando (deve falhar)"
echo "========================================="
curl -X POST "${BASE_URL}/vehicles" \
  -H "Content-Type: application/json" \
  -d '{
  "placa": "ABC-1234",
  "ano": 2023
}'

echo -e "\n\n========================================="
echo "Testes concluídos!"
echo "========================================="
