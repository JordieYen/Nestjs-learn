import { Body, ForbiddenException, Injectable } from "@nestjs/common";
import { User, Bookmark } from '@prisma/client';
// import { PrismaService } from "src/prisma/prisma.service";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { IsEmail } from "class-validator";
import { PrismaClient, Prisma  } from '@prisma/client';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

	async signup(dto: AuthDto) {
		const hash = await argon.hash(dto.password);

		try {
			const user = await this.prisma.user.create({
				data: {
					email: dto.email,
					hash,
				},
			});
			return this.signToken(user.id, user.email);
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ForbiddenException(
						'Credentials taken',
						);
					}
				}
			throw error;
		}
	}

	async signin(dto: AuthDto) {
		const user = await this.prisma.user.findUnique({
			where : {
				email: dto.email,
			},
		});

		if (!user)
			throw new ForbiddenException(
				'Credentials incorrect',
			);
		
		const pwMatches = await argon.verify(user.hash, dto.password);

		if (!pwMatches)
			throw new ForbiddenException(
				'Credentials incorrect',
			);

		return this.signToken(user.id, user.email);
	}

	async signToken(userId: Number, email: String): Promise<{access_token: String}> {
		const payload = {
			sub: userId,
			email,
		};

		const secret = this.config.get('JWT_SECRET');

		const token = await this.jwt.signAsync(payload, {
			expiresIn: '15m',
			secret: secret,
		});

		return {
			access_token: token,
		}

	}
}