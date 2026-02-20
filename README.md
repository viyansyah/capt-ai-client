<<<<<<< HEAD
# 🚀 CaptionLab AI -- API Documentation

AI-powered caption generator untuk membuat caption media sosial
berdasarkan deskripsi gambar, tone, dan platform.

------------------------------------------------------------------------

## 🌐 Base URL

### Local

http://localhost:3400

### Production

https://server.viyansyah.my.id

------------------------------------------------------------------------

# 🔐 Authentication

Semua endpoint (kecuali `register` & `login`) membutuhkan JWT Token.

Gunakan header berikut:

Authorization: Bearer `<access_token>`{=html}

------------------------------------------------------------------------

# 👤 Auth Endpoints

## 1️⃣ Register

**POST** /register

### Request Body

``` json
{
  "username": "viyan",
  "email": "viyan@mail.com",
  "password": "123456"
}
```

### Success Response (201)

``` json
{
  "message": "Register success"
}
```

------------------------------------------------------------------------

## 2️⃣ Login

**POST** /login

### Request Body

``` json
{
  "email": "viyan@mail.com",
  "password": "123456"
}
```

### Success Response (200)

``` json
{
  "access_token": "jwt_token_here"
}
```

------------------------------------------------------------------------

# 📝 Caption Endpoints

## 1️⃣ Generate Caption

**POST** /captions

### Headers

Authorization: Bearer `<access_token>`{=html}\
Content-Type: multipart/form-data

### Form Data

  Field      Type     Required
  ---------- -------- ----------
  prompt     string   ✅
  tone       string   ✅
  platform   string   ✅
  image      file     ❌

### Success Response (201)

``` json
{
  "id": 1,
  "prompt": "A sunset at the beach",
  "tone": "formal",
  "platform": "Instagram",
  "caption": "A serene sunset gracing the horizon...",
  "imageUrl": "https://cloudinary.com/....jpg",
  "createdAt": "2026-02-20T00:00:00.000Z"
}
```

------------------------------------------------------------------------

## 2️⃣ Get All Captions

**GET** /captions

### Success Response (200)

``` json
[
  {
    "id": 1,
    "prompt": "A sunset at the beach",
    "tone": "formal",
    "platform": "Instagram",
    "caption": "...",
    "imageUrl": "...",
    "createdAt": "..."
  }
]
```

------------------------------------------------------------------------

## 3️⃣ Get Caption By ID

**GET** /captions/:id

------------------------------------------------------------------------

## 4️⃣ Delete Caption

**DELETE** /captions/:id

------------------------------------------------------------------------

# ❌ Error Responses

## 400 -- Bad Request

``` json
{
  "message": "tone prompt platform is required"
}
```

## 401 -- Unauthorized

``` json
{
  "message": "Invalid token"
}
```

## 404 -- Not Found

``` json
{
  "message": "Data not found"
}
```

## 500 -- Internal Server Error

``` json
{
  "message": "Internal server error"
}
```

------------------------------------------------------------------------

# 🛠 Tech Stack

-   Node.js
-   Express.js
-   Sequelize
-   PostgreSQL
-   JWT
-   Cloudinary
-   Gemini AI
