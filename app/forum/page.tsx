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
import { cn } from '@/lib/utils';
import { formatRelativeTime } from '@/lib/utils';

const CATEGORIES = ['GENERAL', 'ACADEMICS', 'EVENTS', 'SPORTS', 'ROOMMATE', 'LOST_FOUND', 'BUY_SELL', 'OTHER'] as const;

const categoryColors: Record<string, string> = {
  GENERAL: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  ACADEMICS: 'bg-green-500/10 text-green-600 border-green-500/20',
  EVENTS: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  SPORTS: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  ROOMMATE: 'bg-pink-500/10 text-pink-600 border-pink-500/20',
  LOST_FOUND: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  BUY_SELL: 'bg-teal-500/10 text-teal-600 border-teal-500/20',
  OTHER: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
};

interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  likes: number;
  isPinned: boolean;
  createdAt: string;
  user: { id: string; name: string | null; email: string; image: string | null };
  _count: { comments: number };
  comments?: ForumComment[];
}

interface ForumComment {
  id: string;
  content: string;
  createdAt: string;
  user: { id: string; name: string | null; email: string; image: string | null };
}

export default function ForumPage() {
  const { data: session } = useSession();
  const [posts, setPosts] = React.useState<ForumPost[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);
  const [selectedPost, setSelectedPost] = React.useState<ForumPost | null>(null);
  const [showNewPost, setShowNewPost] = React.useState(false);
  const [newPostTitle, setNewPostTitle] = React.useState('');
  const [newPostContent, setNewPostContent] = React.useState('');
  const [newPostCategory, setNewPostCategory] = React.useState<string>('GENERAL');
  const [newPostTags, setNewPostTags] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [commentText, setCommentText] = React.useState('');
  const [commenting, setCommenting] = React.useState(false);

  const fetchPosts = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (activeCategory) params.set('category', activeCategory);
      const res = await fetch(`/api/forum/posts?${params}`);
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      setPosts(data.posts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [activeCategory]);

  React.useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const fetchPostDetail = async (postId: string) => {
    try {
      const res = await fetch(`/api/forum/posts/${postId}`);
      if (!res.ok) throw new Error('Failed to fetch post');
      const data = await res.json();
      setSelectedPost(data);
    } catch {
      toast.error('Failed to load post details');
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast.error('Title and content are required');
      return;
    }
    try {
      setSubmitting(true);
      const tags = newPostTags.split(',').map((t) => t.trim()).filter(Boolean);
      const res = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newPostTitle, content: newPostContent, category: newPostCategory, tags }),
      });
      if (!res.ok) throw new Error('Failed to create post');
      toast.success('Post created successfully');
      setShowNewPost(false);
      setNewPostTitle('');
      setNewPostContent('');
      setNewPostCategory('GENERAL');
      setNewPostTags('');
      fetchPosts();
    } catch {
      toast.error('Failed to create post');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!commentText.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    try {
      setCommenting(true);
      const res = await fetch('/api/forum/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, content: commentText }),
      });
      if (!res.ok) throw new Error('Failed to add comment');
      toast.success('Comment added');
      setCommentText('');
      fetchPostDetail(postId);
    } catch {
      toast.error('Failed to add comment');
    } finally {
      setCommenting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-18">
        <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/unity-hall-entrance.jpg" className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
          </div>
          <div className="relative z-10 text-center">
            <motion.h1
              className="font-display text-5xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Student Forum
            </motion.h1>
            <motion.p
              className="text-white/70 mt-4 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Connect, discuss, and share with fellow Continentals
            </motion.p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={activeCategory === null ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveCategory(null)}
                >
                  ALL
                </Button>
                {CATEGORIES.map((cat) => (
                  <Button
                    key={cat}
                    variant={activeCategory === cat ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat.replace('_', ' ')}
                  </Button>
                ))}
              </div>
              {session && (
                <Button onClick={() => setShowNewPost(true)}>
                  + New Post
                </Button>
              )}
            </div>

            <AnimatePresence>
              {showNewPost && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mb-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Create New Post</CardTitle>
                      <CardDescription>Share your thoughts with the community</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleCreatePost} className="space-y-4">
                        <div>
                          <label className="label-field">Title</label>
                          <Input
                            value={newPostTitle}
                            onChange={(e) => setNewPostTitle(e.target.value)}
                            placeholder="What's on your mind?"
                            required
                          />
                        </div>
                        <div>
                          <label className="label-field">Content</label>
                          <textarea
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            rows={5}
                            className="input-field resize-none"
                            placeholder="Write your post..."
                            required
                          />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="label-field">Category</label>
                            <select
                              value={newPostCategory}
                              onChange={(e) => setNewPostCategory(e.target.value)}
                              className="input-field"
                            >
                              {CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>{cat.replace('_', ' ')}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="label-field">Tags (comma separated)</label>
                            <Input
                              value={newPostTags}
                              onChange={(e) => setNewPostTags(e.target.value)}
                              placeholder="e.g. study, exam, tips"
                            />
                          </div>
                        </div>
                        <div className="flex gap-3 justify-end">
                          <Button variant="ghost" type="button" onClick={() => setShowNewPost(false)}>
                            Cancel
                          </Button>
                          <Button type="submit" loading={submitting}>
                            Publish Post
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {loading && (
              <div className="grid gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-5 bg-muted rounded w-3/4 mb-3" />
                      <div className="h-4 bg-muted rounded w-1/4 mb-2" />
                      <div className="h-4 bg-muted rounded w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {error && (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-destructive mb-4">{error}</p>
                  <Button variant="outline" onClick={fetchPosts}>Try Again</Button>
                </CardContent>
              </Card>
            )}

            {!loading && !error && posts.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-muted-foreground text-lg mb-2">No posts yet</p>
                  <p className="text-muted-foreground text-sm">Be the first to start a discussion</p>
                </CardContent>
              </Card>
            )}

            {!loading && !error && posts.length > 0 && (
              <div className="space-y-4">
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      variant="interactive"
                      onClick={() => {
                        if (selectedPost?.id === post.id) {
                          setSelectedPost(null);
                        } else {
                          fetchPostDetail(post.id);
                        }
                      }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <Badge className={cn('text-[10px]', categoryColors[post.category])}>
                                {post.category.replace('_', ' ')}
                              </Badge>
                              {post.isPinned && (
                                <Badge variant="secondary" size="sm">Pinned</Badge>
                              )}
                            </div>
                            <h3 className="font-display font-semibold text-headline-sm mb-1 truncate">
                              {post.title}
                            </h3>
                            <p className="text-body-sm text-muted-foreground line-clamp-2 mb-3">
                              {post.content}
                            </p>
                            {post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mb-3">
                                {post.tags.map((tag) => (
                                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className="flex items-center gap-4 text-caption text-muted-foreground">
                              <span>{post.user.name || post.user.email}</span>
                              <span>{formatRelativeTime(post.createdAt)}</span>
                              <span>💬 {post._count.comments}</span>
                              <span>❤️ {post.likes}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <AnimatePresence>
                      {selectedPost?.id === post.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <Card className="border-t-0 rounded-t-none">
                            <CardContent className="p-6">
                              <Separator className="mb-4" />
                              <div className="whitespace-pre-wrap text-body-sm mb-6">
                                {selectedPost.content}
                              </div>

                              <h4 className="font-display font-semibold text-headline-sm mb-4">
                                Comments ({selectedPost.comments?.length || 0})
                              </h4>

                              {session && (
                                <div className="flex gap-2 mb-4">
                                  <Input
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="Write a comment..."
                                    className="flex-1"
                                  />
                                  <Button
                                    size="sm"
                                    loading={commenting}
                                    onClick={() => handleAddComment(post.id)}
                                  >
                                    Post
                                  </Button>
                                </div>
                              )}

                              {(!selectedPost.comments || selectedPost.comments.length === 0) && (
                                <p className="text-muted-foreground text-sm">No comments yet.</p>
                              )}

                              <div className="space-y-3">
                                {selectedPost.comments?.map((comment) => (
                                  <motion.div
                                    key={comment.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-3 rounded-lg bg-muted/50"
                                  >
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-sm font-medium">
                                        {comment.user.name || comment.user.email}
                                      </span>
                                      <span className="text-caption text-muted-foreground">
                                        {formatRelativeTime(comment.createdAt)}
                                      </span>
                                    </div>
                                    <p className="text-body-sm">{comment.content}</p>
                                  </motion.div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
