import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError.js';

export class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async register({ firstName, lastName, email, password }) {
        const existing = await this.userRepository.findByEmail(email);
        if (existing) {
            throw new AppError('Email is already registered', 409);
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await this.userRepository.create({
            firstName,
            lastName,
            email,
            passwordHash
        });

        const token = this.#generateToken(user.id);
        return {
            user: this.#sanitizeUser(user),
            token
        };
    }

    async login({ email, password }) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new AppError('Invalid credentials', 401);
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
            throw new AppError('Invalid credentials', 401);
        }

        const token = this.#generateToken(user.id);
        return {
            user: this.#sanitizeUser(user),
            token
        };
    }

    async getProfile(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new AppError('User not found', 404);
        }

        return this.#sanitizeUser(user);
    }

    #generateToken(userId) {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new AppError('JWT secret is not configured', 500);
        }

        const expiresIn = process.env.JWT_EXPIRES_IN || '1h';

        return jwt.sign(
            {
                sub: userId
            },
            secret,
            { expiresIn }
        );
    }

    #sanitizeUser(user) {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        };
    }
}
