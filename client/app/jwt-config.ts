import { provideAuth } from 'angular2-jwt';

export const JwtProvider = provideAuth({
  tokenName: 'token',
  tokenGetter: () => localStorage.getItem('token') as string,
  globalHeaders: [{ 'Content-Type': 'application/json' }],
  noJwtError: true,
  noTokenScheme: true
})
