import { expect as playwrightExpect } from '@playwright/test';
import { env } from '../config/env';
export const expect = playwrightExpect.configure({ timeout: env.expectTimeout });

