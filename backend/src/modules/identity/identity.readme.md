# Identity Module

## Overview

Identity Module chịu trách nhiệm **xác thực (Authentication)**, **phân
quyền (Authorization)** và **quản lý danh tính người dùng** trong hệ
thống NestJS.\
Module này được thiết kế theo hướng **scalable**, **secure**, và **tách
biệt rõ nghiệp vụ**, dựa trên các bảng cốt lõi như `users`,
`user_sessions`, `user_profiles`, `roles`, `oauth_*`,
`password_reset_tokens`.

Phạm vi chính: - Đăng nhập / đăng ký - Quản lý session & refresh token -
OAuth (Google, GitHub,...) - Quên / đổi mật khẩu - Role-based
authorization

## Folder Structure

    src/modules/identity/
    ├── identity.module.ts
    ├── controllers/
    │   ├── auth.controller.ts
    │   ├── oauth.controller.ts
    │   ├── users.controller.ts
    │   ├── sessions.controller.ts
    │   ├── password-reset.controller.ts
    │   └── roles.controller.ts
    ├── services/
    │   ├── auth.service.ts
    │   ├── oauth.service.ts
    │   ├── users.service.ts
    │   ├── sessions.service.ts
    │   ├── password-reset.service.ts
    │   ├── roles.service.ts
    │   └── token.service.ts
    ├── entities/
    ├── repositories/
    ├── dto/
    ├── guards/
    ├── strategies/
    ├── decorators/
    ├── constants/
    ├── interfaces/
    └── identity.readme.md

## Features

-   Authentication với JWT & Refresh Token
-   OAuth login & account linking
-   User & Profile management
-   Password reset flow
-   Role-based authorization

## API Endpoints

### Auth

-   POST /auth/login
-   POST /auth/register
-   POST /auth/refresh
-   POST /auth/logout
-   POST /auth/logout-all

### OAuth

-   GET /auth/oauth/:provider
-   GET /auth/oauth/:provider/callback

### Users

-   GET /users/me
-   PATCH /users/me
-   PATCH /users/me/password

### Sessions

-   GET /sessions
-   DELETE /sessions/:id

### Password Reset

-   POST /password-reset/request
-   POST /password-reset/confirm

### Roles

-   POST /roles
-   GET /roles
-   POST /roles/assign

## DTOs

-   LoginDto
-   RegisterDto
-   RefreshTokenDto
-   ChangePasswordDto
-   UpdateUserDto
-   UpdateProfileDto
-   OAuthCallbackDto
-   RequestPasswordResetDto
-   ResetPasswordDto
-   CreateRoleDto
-   AssignRoleDto

## Dependencies

-   @nestjs/jwt
-   @nestjs/passport
-   passport-jwt
-   bcrypt / argon2
-   class-validator
-   class-transformer

## Business Rules

-   Email và username là duy nhất
-   User bị block không được login
-   Refresh token gắn với session
-   Password reset token chỉ dùng 1 lần

## Security & Middleware

-   Hash toàn bộ password & token
-   Rotate refresh token
-   JWT & Role Guards
-   Rate limit login & reset password

## Events

-   user.registered
-   user.logged_in
-   user.logged_out
-   user.password_changed
-   user.password_reset_requested
-   user.oauth_linked

## Environment Variables

-   JWT_ACCESS_SECRET
-   JWT_REFRESH_SECRET
-   OAUTH_GOOGLE_CLIENT_ID
-   OAUTH_GOOGLE_CLIENT_SECRET

## Testing

-   Unit tests (services, repositories)
-   Integration tests (auth flow)
-   E2E tests (login, OAuth)

## Notes

-   Module độc lập business domain
-   Có thể mở rộng MFA, permission, device trust
