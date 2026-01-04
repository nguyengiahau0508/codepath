export interface AuthRepository {
    // Repository methods would go here
    // login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }>;
    validateUser(email: string, password: string): Promise<any>
}   