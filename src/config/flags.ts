import { loadEnv } from 'vite';
import { defaultFlags, resolveFlags } from './flag-defs.js';

export type FlagName = keyof typeof defaultFlags;
export type Flags = typeof defaultFlags;

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

export const flags = resolveFlags(env) as Flags;

export const isEnabled = (flagName: FlagName): boolean => flags[flagName];
