import { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Plus, Pencil, Trash2, Loader2, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const newsSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  image_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  category: z.enum(['news', 'event', 'announcement']),
  publish_date: z.string().min(1, 'Date is required'),
  published: z.boolean().default(true),
});

export default function NewsCMS() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const [demoMode] = useState(!import.meta.env.VITE_SUPABASE_URL);
  const [demoItems] = useState([
    { id: '1', title: 'Annual Sports Meet 2026', excerpt: 'Our students achieve record-breaking performances at the inter-school athletics championship.', content: 'Full article content here...', image_url: '', category: 'event', publish_date: '2026-04-01', published: true, created_at: new Date().toISOString() },
    { id: '2', title: 'New Science Lab Opening', excerpt: 'State-of-the-art physics and chemistry laboratory inaugurated by the chief guest.', content: 'Full article content here...', image_url: '', category: 'news', publish_date: '2026-03-28', published: true, created_at: new Date().toISOString() },
    { id: '3', title: 'Parent-Teacher Meeting Schedule', excerpt: 'Upcoming PTM schedule for Term 1, 2026. Please confirm your attendance.', content: 'Full article content here...', image_url: '', category: 'announcement', publish_date: '2026-03-25', published: true, created_at: new Date().toISOString() },
  ]);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(newsSchema),
    defaultValues: { title: '', excerpt: '', content: '', image_url: '', category: 'news', publish_date: new Date().toISOString().split('T')[0], published: true },
  });

  useEffect(() => { if (!demoMode) fetchItems(); else setItems(demoItems); }, [demoMode]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('news').select('*').order('publish_date', { ascending: false });
      if (error) throw error;
      setItems(data || []);
    } catch (err) { console.error('Failed to fetch:', err); }
    finally { setLoading(false); }
  };

  const onSubmit = async (values) => {
    if (demoMode) {
      const newId = Math.random().toString(36).slice(2, 11);
      const now = new Date().toISOString();
      if (editing) {
        setItems(prev => prev.map(n => n.id === editing.id ? { ...n, ...values } : n));
      } else {
        setItems(prev => [{ id: newId, ...values, created_at: now }, ...prev]);
      }
      closeDialog();
      return;
    }
    try {
      const { data, error } = editing
        ? await supabase.from('news').update(values).eq('id', editing.id).select()
        : await supabase.from('news').insert(values).select();
      if (error) throw error;
      if (editing) setItems(prev => prev.map(n => n.id === editing.id ? data[0] : n));
      else setItems(prev => [data[0], ...prev]);
      closeDialog();
    } catch (err) { console.error('Failed to save:', err); }
  };

  const handleDelete = async (id) => {
    setDeleteId(id);
    if (demoMode) { setItems(prev => prev.filter(n => n.id !== id)); setDeleteId(null); return; }
    try {
      const { error } = await supabase.from('news').delete().eq('id', id);
      if (error) throw error;
      setItems(prev => prev.filter(n => n.id !== id));
    } catch (err) { console.error('Failed to delete:', err); }
    finally { setDeleteId(null); }
  };

  const closeDialog = () => { setDialogOpen(false); setEditing(null); reset({ title: '', excerpt: '', content: '', image_url: '', category: 'news', publish_date: new Date().toISOString().split('T')[0], published: true }); };

  const openEditDialog = (item) => {
    setEditing(item);
    setDialogOpen(true);
    setTimeout(() => {
      setValue('title', item.title);
      setValue('excerpt', item.excerpt);
      setValue('content', item.content);
      setValue('image_url', item.image_url || '');
      setValue('category', item.category);
      setValue('publish_date', item.publish_date);
      setValue('published', item.published);
    }, 50);
  };

  const filtered = items.filter(n => !search || n.title.toLowerCase().includes(search.toLowerCase()));

  const categoryColors = { event: 'bg-yellow-500/10 text-yellow-500', news: 'bg-blue-500/10 text-blue-500', announcement: 'bg-red-500/10 text-red-500' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">News & Events</h2>
          <p className="text-zinc-400 text-sm">Manage news articles, events, and announcements</p>
        </div>
        <Button onClick={() => { setEditing(null); reset({ title: '', excerpt: '', content: '', image_url: '', category: 'news', publish_date: new Date().toISOString().split('T')[0], published: true }); setDialogOpen(true); }} className="bg-primary hover:bg-primary/80">
          <Plus className="w-4 h-4 mr-1" /> Add News
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <Input placeholder="Search articles..." value={search} onChange={e => setSearch(e.target.value)} className="bg-zinc-900 border-zinc-800 pl-10 text-white" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : (
        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardContent className="p-0">
            {filtered.length === 0 ? (
              <div className="py-16 text-center text-zinc-500">
                <p className="text-lg mb-2">No articles found</p>
                <p className="text-sm">Create your first news article to get started.</p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-800">
                {filtered.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors">
                    <div className="flex-1 min-w-0 mr-4">
                      <p className="font-semibold truncate">{item.title}</p>
                      <p className="text-xs text-zinc-500 mt-1">{item.publish_date} &middot; <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${categoryColors[item.category]}`}>{item.category}</span>{!item.published && <span className="ml-2 px-2 py-0.5 rounded-full bg-zinc-700/50 text-zinc-400 text-[10px] font-bold uppercase">Draft</span>}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(item)} className="text-zinc-400 hover:text-white w-8 h-8"><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-zinc-400 hover:text-red-500 w-8 h-8" disabled={deleteId === item.id}>{deleteId === item.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) closeDialog(); }}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">{editing ? 'Edit' : 'Create'} Article</DialogTitle>
            <DialogDescription className="text-zinc-400">{editing ? 'Update the details below.' : 'Fill in the details for the new article.'}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input {...register('title')} placeholder="Article title" className="bg-zinc-950 border-zinc-800 text-white" />
              {errors.title && <p className="text-red-400 text-xs">{errors.title.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <select {...register('category')} className="w-full h-10 rounded-md border border-zinc-800 bg-zinc-950 px-3 text-white text-sm focus:border-primary outline-none">
                  <option value="news">News</option>
                  <option value="event">Event</option>
                  <option value="announcement">Announcement</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Publish Date</Label>
                <Input type="date" {...register('publish_date')} className="bg-zinc-950 border-zinc-800 text-white" />
                {errors.publish_date && <p className="text-red-400 text-xs">{errors.publish_date.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Excerpt</Label>
              <Input {...register('excerpt')} placeholder="Short summary (shown on cards)" className="bg-zinc-950 border-zinc-800 text-white" />
              {errors.excerpt && <p className="text-red-400 text-xs">{errors.excerpt.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea {...register('content')} rows={6} placeholder="Full article content..." className="bg-zinc-950 border-zinc-800 text-white resize-none" />
              {errors.content && <p className="text-red-400 text-xs">{errors.content.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Image URL (optional)</Label>
              <Input {...register('image_url')} placeholder="https://..." className="bg-zinc-950 border-zinc-800 text-white" />
              {errors.image_url && <p className="text-red-400 text-xs">{errors.image_url.message}</p>}
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" {...register('published')} className="accent-primary w-4 h-4" />
              <span className="text-sm text-zinc-300">Published (uncheck for draft)</span>
            </label>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={closeDialog} className="text-zinc-400">Cancel</Button>
              <Button type="submit" className="bg-primary hover:bg-primary/80">{editing ? 'Update' : 'Publish'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
