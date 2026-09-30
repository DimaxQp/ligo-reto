import { Given, When, Then } from '@cucumber/cucumber';
import { ShopWorld } from '../support/world';
import { env } from '../config/env';
import { messages, invalidPassword } from '../data/shop-data';

Given('que estoy en la página de acceso', async function (this: ShopWorld) {
  await this.login.open(env.baseURL);
});
When('ingreso con la cuenta {string}', async function (this: ShopWorld, kind: string) {
  if (!['estándar', 'bloqueada', 'contraseña incorrecta'].includes(kind)) throw new Error('Cuenta no definida: ' + kind);
  await this.login.login(kind === 'bloqueada' ? env.lockedUsername : env.username,
    kind === 'contraseña incorrecta' ? invalidPassword : env.password);
});
Given('que ingreso con la cuenta {string}', async function (this: ShopWorld, kind: string) {
  if (kind !== 'estándar') throw new Error('La precondición requiere la cuenta estándar');
  await this.login.login(env.username, env.password);
  // La transición termina en catálogo; cada página valida su propio estado.
  await this.catalog.expectLoaded();
});
Then('se rechaza el acceso por {string}', async function (this: ShopWorld, reason: string) {
  if (!['bloqueo', 'credenciales inválidas'].includes(reason)) throw new Error('Motivo desconocido');
  await this.login.expectRejected(reason === 'bloqueo' ? messages.locked : messages.invalid, env.baseURL);
  await this.catalog.expectNotLoaded();
});

