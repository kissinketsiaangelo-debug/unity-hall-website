'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn, formatRelativeTime } from '@/lib/utils';

const EXAM_TYPES = ['MAIN_EXAM', 'MID_SEM', 'QUIZ', 'ASSIGNMENT', 'OTHER'] as const;

const examTypeColors: Record<string, string> = {
  MAIN_EXAM: 'bg-red-500/10 text-red-600 border-red-500/20',
  MID_SEM: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  QUIZ: 'bg-green-500/10 text-green-600 border-green-500/20',
  ASSIGNMENT: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  OTHER: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
};

interface PastQuestion {
  id: string;
  courseCode: string;
  courseName: string;
  year: number;
  examType: string;
  fileUrl: string;
  description: string | null;
  downloads: number;
  createdAt: string;
  user: { id: string; name: string | null };
}

export default function PastQuestionsPage() {
  const { data: session } = useSession();
  const [questions, setQuestions] = React.useState<PastQuestion[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [showUpload, setShowUpload] = React.useState(false);

  // Filters
  const [filterCourseCode, setFilterCourseCode] = React.useState('');
  const [filterYear, setFilterYear] = React.useState('');
  const [filterExamType, setFilterExamType] = React.useState('');

  // Upload form
  const [courseCode, setCourseCode] = React.useState('');
  const [courseName, setCourseName] = React.useState('');
  const [year, setYear] = React.useState('');
  const [examType, setExamType] = React.useState('MAIN_EXAM');
  const [fileUrl, setFileUrl] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [uploading, setUploading] = React.useState(false);

  const fetchQuestions = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (filterCourseCode) params.set('courseCode', filterCourseCode);
      if (filterYear) params.set('year', filterYear);
      if (filterExamType) params.set('examType', filterExamType);
      const res = await fetch(`/api/past-questions?${params}`);
      if (!res.ok) throw new Error('Failed to fetch past questions');
      const data = await res.json();
      setQuestions(data.questions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [filterCourseCode, filterYear, filterExamType]);

  React.useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseCode.trim() || !courseName.trim() || !year.trim() || !fileUrl.trim()) {
      toast.error('Course code, name, year, and file URL are required');
      return;
    }
    const yearNum = parseInt(year);
    if (isNaN(yearNum)) {
      toast.error('Invalid year');
      return;
    }
    try {
      setUploading(true);
      const res = await fetch('/api/past-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseCode: courseCode.toUpperCase(),
          courseName,
          year: yearNum,
          examType,
          fileUrl,
          description: description.trim() || undefined,
        }),
      });
      if (!res.ok) throw new Error('Failed to upload');
      toast.success('Past question uploaded successfully');
      setShowUpload(false);
      setCourseCode('');
      setCourseName('');
      setYear('');
      setExamType('MAIN_EXAM');
      setFileUrl('');
      setDescription('');
      fetchQuestions();
    } catch {
      toast.error('Failed to upload past question');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-18">
        <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/conti-hall-week-2.jpg" className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
          </div>
          <div className="relative z-10 text-center">
            <motion.h1
              className="font-display text-5xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Past Questions
            </motion.h1>
            <motion.p
              className="text-white/70 mt-4 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Access past examination questions and course materials
            </motion.p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div className="grid sm:grid-cols-3 gap-3 flex-1 max-w-2xl">
                <Input
                  placeholder="Course code..."
                  value={filterCourseCode}
                  onChange={(e) => setFilterCourseCode(e.target.value)}
                />
                <Input
                  placeholder="Year..."
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                />
                <select
                  value={filterExamType}
                  onChange={(e) => setFilterExamType(e.target.value)}
                  className="input-field"
                >
                  <option value="">All Types</option>
                  {EXAM_TYPES.map((t) => (
                    <option key={t} value={t}>{t.replace('_', ' ')}</option>
                  ))}
                </select>
              </div>
              {session && (
                <Button onClick={() => setShowUpload(true)}>
                  + Upload
                </Button>
              )}
            </div>

            <AnimatePresence>
              {showUpload && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mb-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Upload Past Question</CardTitle>
                      <CardDescription>Help fellow students by sharing course materials</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleUpload} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="label-field">Course Code</label>
                            <Input
                              value={courseCode}
                              onChange={(e) => setCourseCode(e.target.value)}
                              placeholder="e.g. MATH 151"
                              required
                            />
                          </div>
                          <div>
                            <label className="label-field">Course Name</label>
                            <Input
                              value={courseName}
                              onChange={(e) => setCourseName(e.target.value)}
                              placeholder="e.g. Calculus I"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="label-field">Year</label>
                            <Input
                              value={year}
                              onChange={(e) => setYear(e.target.value)}
                              placeholder="e.g. 2025"
                              required
                            />
                          </div>
                          <div>
                            <label className="label-field">Exam Type</label>
                            <select
                              value={examType}
                              onChange={(e) => setExamType(e.target.value)}
                              className="input-field"
                            >
                              {EXAM_TYPES.map((t) => (
                                <option key={t} value={t}>{t.replace('_', ' ')}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="label-field">File URL</label>
                          <Input
                            value={fileUrl}
                            onChange={(e) => setFileUrl(e.target.value)}
                            placeholder="Link to the document/file"
                            required
                          />
                        </div>
                        <div>
                          <label className="label-field">Description (optional)</label>
                          <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="input-field resize-none"
                            placeholder="Any additional info..."
                          />
                        </div>
                        <div className="flex gap-3 justify-end">
                          <Button variant="ghost" type="button" onClick={() => setShowUpload(false)}>
                            Cancel
                          </Button>
                          <Button type="submit" loading={uploading}>
                            Upload
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {loading && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-5 bg-muted rounded w-24 mb-3" />
                      <div className="h-4 bg-muted rounded w-full mb-2" />
                      <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                      <div className="h-4 bg-muted rounded w-16" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {error && (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-destructive mb-4">{error}</p>
                  <Button variant="outline" onClick={fetchQuestions}>Try Again</Button>
                </CardContent>
              </Card>
            )}

            {!loading && !error && questions.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-muted-foreground text-lg mb-2">No past questions found</p>
                  <p className="text-muted-foreground text-sm">Try adjusting your search or upload the first one</p>
                </CardContent>
              </Card>
            )}

            {!loading && !error && questions.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {questions.map((q, index) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <Card variant="interactive" className="h-full flex flex-col">
                      <CardContent className="p-6 flex flex-col flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <Badge className={cn('text-[10px]', (examTypeColors as Record<string, string>)[q.examType] || (examTypeColors as Record<string, string>)['OTHER'])}>
                            {q.examType.replace('_', ' ')}
                          </Badge>
                          <span className="text-caption text-muted-foreground">{q.year}</span>
                        </div>
                        <h3 className="font-display font-semibold text-headline-sm mb-1">{q.courseCode}</h3>
                        <p className="text-body-sm text-muted-foreground mb-3 line-clamp-2">{q.courseName}</p>
                        {q.description && (
                          <p className="text-caption text-muted-foreground mb-3 line-clamp-2">{q.description}</p>
                        )}
                        <div className="mt-auto flex items-center justify-between pt-3 border-t">
                          <span className="text-caption text-muted-foreground">
                            📥 {q.downloads} downloads
                          </span>
                          <span className="text-caption text-muted-foreground">
                            {formatRelativeTime(q.createdAt)}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 w-full"
                          onClick={() => window.open(q.fileUrl, '_blank')}
                        >
                          View / Download
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
