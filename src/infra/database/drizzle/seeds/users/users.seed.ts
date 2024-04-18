import { env } from 'src/env';
import { UsersSchema } from '../../schemas';
import type { TransactionProps } from '../seed.props';

const users = JSON.parse(env.BASIC_SEED) as {
	name: string;
	email: string;
	phone: string;
	avatar: string;
	role: 'user' | 'manager';
}[];

export const usersSeed = async (transaction: TransactionProps) => {
	await transaction.insert(UsersSchema).values([...users]);
};
