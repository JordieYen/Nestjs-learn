import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signup(dto: AuthDto): Promise<{
        access_token: String;
    }>;
    signin(dto: AuthDto): Promise<{
        access_token: String;
    }>;
    signToken(userId: Number, email: String): Promise<{
        access_token: String;
    }>;
}
