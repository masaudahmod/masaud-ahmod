import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearError, clearPendingVerification, login, register, resendOtp, verifyEmail, verifyLogin } from '../store/authSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

type Mode = 'login' | 'register' | 'emailVerify' | 'loginVerify'

export function LoginPage() {
  const dispatch = useAppDispatch(); const navigate = useNavigate()
  const { loading, error, pendingVerificationEmail } = useAppSelector((state) => state.auth)
  const [mode, setMode] = useState<Mode>(pendingVerificationEmail ? 'emailVerify' : 'login')
  const [loginValue, setLoginValue] = useState(''); const [username, setUsername] = useState(''); const [email, setEmail] = useState(pendingVerificationEmail ?? ''); const [password, setPassword] = useState(''); const [otp, setOtp] = useState(''); const [trustDevice, setTrustDevice] = useState(false); const [notice, setNotice] = useState('')
  const selectMode = (next: Mode) => { dispatch(clearError()); setNotice(''); setMode(next) }
  const otpMode = mode === 'emailVerify' || mode === 'loginVerify'

  const submit = async (event: FormEvent) => {
    event.preventDefault(); setNotice('')
    if (mode === 'login') {
      const result = await dispatch(login({ login: loginValue, password }))
      if (login.fulfilled.match(result)) {
        if ('user' in result.payload) navigate('/', { replace: true })
        else { setEmail(result.payload.email); selectMode('loginVerify'); setNotice('A login code has been sent to your email.') }
      }
      return
    }
    if (mode === 'register') {
      const result = await dispatch(register({ username, email, password }))
      if (register.fulfilled.match(result)) { setEmail(result.payload); selectMode('emailVerify'); setNotice('Account created. Check your email for the six-digit code.') }
      return
    }
    if (mode === 'emailVerify') {
      const result = await dispatch(verifyEmail({ email, otp }))
      if (verifyEmail.fulfilled.match(result)) { dispatch(clearPendingVerification()); selectMode('login'); setNotice('Email verified. You can now sign in.') }
      return
    }
    const result = await dispatch(verifyLogin({ email, otp, trustDevice }))
    if (verifyLogin.fulfilled.match(result)) navigate('/', { replace: true })
  }

  const resend = async () => { const result = await dispatch(resendOtp(email)); if (resendOtp.fulfilled.match(result)) setNotice('A new OTP has been sent.') }
  const field = 'mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)]'
  const title = mode === 'login' ? 'Welcome back' : mode === 'register' ? 'Create your account' : mode === 'loginVerify' ? 'Verify your sign in' : 'Verify your email'

  return <main className="grid min-h-screen place-items-center bg-[var(--bg)] p-4"><section className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl sm:p-8"><p className="font-label text-[var(--accent)]">Portfolio CMS</p><h1 className="mt-2 text-2xl font-semibold">{title}</h1><p className="mt-2 text-sm text-[var(--text-muted)]">{otpMode ? `Enter the code sent to ${email}.` : 'Sign in to manage your portfolio.'}</p>
    {!otpMode && <div className="mt-6 grid grid-cols-2 rounded-lg bg-[var(--surface-elevated)] p-1"><button type="button" className={`rounded-md py-2 text-sm ${mode === 'login' ? 'bg-[var(--surface)] shadow-sm' : ''}`} onClick={() => selectMode('login')}>Sign in</button><button type="button" className={`rounded-md py-2 text-sm ${mode === 'register' ? 'bg-[var(--surface)] shadow-sm' : ''}`} onClick={() => selectMode('register')}>Register</button></div>}
    <form onSubmit={submit} className="mt-6 space-y-4">{mode === 'register' && <label className="block text-sm font-medium">Username<input value={username} onChange={(e) => setUsername(e.target.value)} className={field} required /></label>}{mode === 'login' && <label className="block text-sm font-medium">Email or username<input value={loginValue} onChange={(e) => setLoginValue(e.target.value)} className={field} required autoComplete="username" /></label>}{mode !== 'login' && <label className="block text-sm font-medium">Email<input value={email} onChange={(e) => setEmail(e.target.value)} className={field} type="email" required /></label>}{!otpMode && <label className="block text-sm font-medium">Password<input value={password} onChange={(e) => setPassword(e.target.value)} className={field} type="password" required minLength={8} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /></label>}{otpMode && <><label className="block text-sm font-medium">Verification code<input value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} className={field} inputMode="numeric" maxLength={6} required /></label>{mode === 'loginVerify' && <label className="flex items-center gap-2 text-sm text-[var(--text-muted)]"><input type="checkbox" checked={trustDevice} onChange={(e) => setTrustDevice(e.target.checked)} /> Trust this device for 30 days</label>}</>}
      {(error || notice) && <p className={`rounded-lg px-3 py-2 text-sm ${error ? 'bg-red-500/10 text-red-600' : 'bg-green-500/10 text-green-700'}`}>{error ?? notice}</p>}<button disabled={loading} className="w-full rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60">{loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : mode === 'register' ? 'Create account' : 'Verify code'}</button></form>
    {mode === 'emailVerify' ? <div className="mt-4 flex justify-between text-sm"><button type="button" onClick={() => void resend()} className="text-[var(--accent)]">Resend code</button><button type="button" onClick={() => selectMode('login')} className="text-[var(--text-muted)]">Back to sign in</button></div> : mode === 'loginVerify' ? <button type="button" onClick={() => selectMode('login')} className="mt-4 text-sm text-[var(--text-muted)]">Back to sign in</button> : <button type="button" onClick={() => selectMode('emailVerify')} className="mt-4 text-sm text-[var(--accent)]">Already have an email-verification code?</button>}</section></main>
}
