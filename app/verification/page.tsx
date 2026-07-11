'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Mail, Key, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

type Step = 'email' | 'code' | 'success';

export default function VerificationPage() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [sendingCode, setSendingCode] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const sendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter your email');
      return;
    }
    setSendingCode(true);
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) {
        toast.success('Verification code sent to your email');
        setStep('code');
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data.message || 'Failed to send code');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setSendingCode(false);
    }
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      toast.error('Please enter the verification code');
      return;
    }
    setVerifying(true);
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), code: code.trim() }),
      });
      if (res.ok) {
        toast.success('Email verified successfully');
        setStep('success');
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data.message || 'Invalid verification code');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-18">
        <section className="relative overflow-hidden bg-gradient-to-b from-knust-lust/5 via-background to-knust-gold/5">
          <div className="container-custom relative z-10 py-16 sm:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-knust-charcoal mb-4">
                Student Verification
              </h1>
              <p className="text-muted-foreground text-lg">
                Verify your identity to access hall services
              </p>
            </motion.div>

            <div className="max-w-md mx-auto">
              <AnimatePresence mode="wait">
                {step === 'email' && (
                  <motion.div
                    key="email"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card variant="elevated" padding="lg">
                      <CardHeader className="text-center">
                        <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-knust-lust/10 mb-4">
                          <Mail className="h-7 w-7 text-knust-lust" />
                        </div>
                        <CardTitle className="text-xl">Enter Your Email</CardTitle>
                        <CardDescription>
                          We&apos;ll send a verification code to your student email
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={sendCode} className="space-y-4">
                          <Input
                            type="email"
                            placeholder="student@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            disabled={sendingCode}
                            loading={sendingCode}
                          >
                            Send Code
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {step === 'code' && (
                  <motion.div
                    key="code"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card variant="elevated" padding="lg">
                      <CardHeader className="text-center">
                        <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-knust-gold/10 mb-4">
                          <Key className="h-7 w-7 text-knust-gold" />
                        </div>
                        <CardTitle className="text-xl">Enter Verification Code</CardTitle>
                        <CardDescription>
                          Enter the code sent to {email}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={verifyCode} className="space-y-4">
                          <Input
                            type="text"
                            inputMode="numeric"
                            placeholder="000000"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            maxLength={6}
                            required
                            className="text-center text-2xl tracking-widest font-display"
                          />
                          <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            variant="secondary"
                            disabled={verifying}
                            loading={verifying}
                          >
                            Verify Code
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            className="w-full"
                            onClick={() => setStep('email')}
                          >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Change Email
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {step === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card variant="elevated" padding="lg" className="border-green-200">
                      <CardHeader className="text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                          className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4"
                        >
                          <CheckCircle2 className="h-8 w-8 text-green-600" />
                        </motion.div>
                        <CardTitle className="text-xl text-green-700">Verified!</CardTitle>
                        <CardDescription className="text-green-600/70">
                          Your email has been successfully verified. You now have access to all hall services.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <Button
                          variant="default"
                          onClick={() => window.location.href = '/'}
                        >
                          Go to Dashboard
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <div className="flex items-center justify-center gap-2">
                  {(['email', 'code', 'success'] as Step[]).map((s, i) => (
                    <div key={s} className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          step === s
                            ? 'bg-knust-lust text-white scale-110'
                            : ['email', 'code', 'success'].indexOf(step) > i
                            ? 'bg-green-500 text-white'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {['email', 'code', 'success'].indexOf(step) > i ? '✓' : i + 1}
                      </div>
                      {i < 2 && (
                        <div
                          className={`w-12 h-0.5 transition-all duration-300 ${
                            ['email', 'code', 'success'].indexOf(step) > i
                              ? 'bg-green-500'
                              : 'bg-muted'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-center text-xs text-muted-foreground mt-2">
                  {step === 'email' ? 'Enter email' : step === 'code' ? 'Verify code' : 'Complete'}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
