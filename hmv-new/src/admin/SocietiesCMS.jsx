import { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Plus, Pencil, Trash2, Loader2, BookOpen, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const societiesSchema = z.object({
  name: z.string().min(2, 'Name required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category required'),
  advisor: z.string().optional().or(z.literal('')),
  meeting_day: z.string().optional().or(z.literal('')),
  members_count: z.coerce.number().min(0).default(0),
  image_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  active: z.boolean().default(true),
});

export default function SocietiesCMS() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const [demoMode] = useState(!import.meta.env.VITE_SUPABASE_URL);
  const [demoItems] = useState([
    { id: '1', name: 'Science Society', description: 'Encouraging scientific curiosity through experiments, fairs, and guest lectures.', category: 'Academic', advisor: 'Mr. Nuwan Silva', meeting_day: 'Friday', members_count: 45, image_url: '', active: true, created_at: new Date().toISOString() },
    { id: '2', name: 'Drama & Theatre Club', description: 'Developing confidence and creativity through performing arts and dramatic expression.', category: 'Arts', advisor: 'Ms. Perera', meeting_day: 'Wednesday', members_count: 30, image_url: '', active: true, created_at: new Date().toISOString() },
    { id: '3', name: 'Cricket Club', description: 'Training the next generation of cricket champions with professional coaching.', category: 'Sports', advisor: 'Mr. Rajapaksa', meeting_day: 'Monday, Thursday', members_count: 35, image_url: '', active: true, created_at: new Date().toISOString() },
  ]);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(societiesSchema),
    defaultValues: { name: '', description: '', category: '', advisor: '', meeting_day: '', members_count: 0, image_url: '', active: true },
  });

  useEffect(() => { if (demoMode) setItems(demoItems); else fetchItems(); }, [demoMode, demoItems]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('societies').select('*').order('name');
      if (error) throw error;
      setItems(data || []);
    } catch (err) { console.error('Failed to fetch:', err); }
    finally { setLoading(false); }
  };

  const onSubmit = async (values) => {
    if (demoMode) {
      const id = editing?.id || Math.random().toString(36).slice(2, 11);
      if (editing) setItems(prev => prev.map(s => s.id === editing.id ? { ...s, ...values } : s));
      else setItems(prev => [{ id, ...values, created_at: new Date().toISOString() }, ...prev]);
      closeDialog();
      return;
    }
    try {
      const { data, error } = editing
        ? await supabase.from('societies').update(values).eq('id', editing.id).select()
        : await supabase.from('societies').insert(values).select();
      if (error) throw error;
      if (editing) setItems(prev => prev.map(s => s.id === editing.id ? data[0] : s));
      else setItems(prev => [data[0], ...prev]);
      closeDialog();
    } catch (err) { console.error('Failed to save:', err); }
  };

  const handleDelete = async (id) => {
    setDeleteId(id);
    if (demoMode) { setItems(prev => prev.filter(s => s.id !== id)); setDeleteId(null); return; }
    try { const { error } = await supabase.from('societies').delete().eq('id', id); if (error) throw error; setItems(prev => prev.filter(s => s.id !== id)); }
    catch (err) { console.error('Failed to delete:', err); }
    finally { setDeleteId(null); }
  };

  const closeDialog = () => { setDialogOpen(false); setEditing(null); reset({ name: '', description: '', category: '', advisor: '', meeting_day: '', members_count: 0, image_url: '', active: true }); };
  const openEdit = (item) => { setEditing(item); setDialogOpen(true); setTimeout(() => { Object.keys(item).forEach(k => setValue(k, item[k])); }, 50); };
  const filtered = items.filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()));
  const categories = [...new Set(items.map(s => s.category))];
  const [activeCat, setActiveCat] = useState('All');
  const finalItems = activeCat === 'All' ? filtered : filtered.filter(s => s.category === activeCat);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Clubs & Societies</h2>
          <p className="text-zinc-400 text-sm">Manage school clubs, societies, and extracurricular groups</p>
        </div>
        <Button onClick={() => { setEditing(null); reset({ name: '', description: '', category: '', advisor: '', meeting_day: '', members_count: 0, image_url: '', active: true }); setDialogOpen(true); }} className="bg-primary hover:bg-primary/80">
          <Plus className="w-4 h-4 mr-1" /> Add Society
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <Input placeholder="Search societies..." value={search} onChange={e => setSearch(e.target.value)} className="bg-zinc-900 border-zinc-800 pl-10 text-white" />
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Button variant={activeCat === 'All' ? 'default' : 'outline'} size="sm" onClick={() => setActiveCat('All')} className={activeCat === 'All' ? 'bg-primary hover:bg-primary/80' : 'border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500'}>All</Button>
          {categories.map(c => (
            <Button key={c} variant={activeCat === c ? 'default' : 'outline'} size="sm" onClick={() => setActiveCat(c)} className={activeCat === c ? 'bg-primary hover:bg-primary/80' : 'border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500'}>{c}</Button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : (
        <Card className="bg-zinc-900 border-zinc-800 text-white">
          {finalItems.length === 0 ? (
            <CardContent className="py-16 text-center text-zinc-500">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No societies found. Create your first one.</p>
            </CardContent>
          ) : (
            <div className="divide-y divide-zinc-800">
              {finalItems.map((s) => (
                <div key={s.id} className="flex items-center gap-4 p-4 hover:bg-zinc-800/50 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6 text-zinc-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{s.name} {!s.active && <span className="text-xs text-zinc-500 ml-2">Inactive</span>}</p>
                    <p className="text-sm text-zinc-500 truncate">{s.description}</p>
                    <p className="text-xs text-zinc-600">{s.category} &middot; {s.members_count} members{ s.advisor ? ` &middot; Adv. ${s.advisor}` : ''}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(s)} className="text-zinc-400 hover:text-white w-8 h-8"><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)} className="text-zinc-400 hover:text-red-500 w-8 h-8" disabled={deleteId === s.id}>{deleteId === s.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) closeDialog(); }}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">{editing ? 'Edit' : 'Add'} Society</DialogTitle>
            <DialogDescription className="text-zinc-400">{editing ? 'Update society details.' : 'Fill in the new society details.'}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Name</Label><Input {...register('name')} className="bg-zinc-950 border-zinc-800 text-white" />{errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}</div>
              <div className="space-y-2"><Label>Category</Label><Input {...register('category')} placeholder="Academic, Sports, Arts" className="bg-zinc-950 border-zinc-800 text-white" />{errors.category && <p className="text-red-400 text-xs">{errors.category.message}</p>}</div>
            </div>
            <div className="space-y-2"><Label>Description</Label><Textarea {...register('description')} rows={3} className="bg-zinc-950 border-zinc-800 text-white resize-none" />{errors.description && <p className="text-red-400 text-xs">{errors.description.message}</p>}</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Faculty Advisor</Label><Input {...register('advisor')} className="bg-zinc-950 border-zinc-800 text-white" /></div>
              <div className="space-y-2"><Label>Meeting Day</Label><Input {...register('meeting_day')} placeholder="e.g. Friday" className="bg-zinc-950 border-zinc-800 text-white" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Members Count</Label><Input {...register('members_count')} type="number" className="bg-zinc-950 border-zinc-800 text-white" /></div>
              <div className="space-y-2"><Label>Photo URL (optional)</Label><Input {...register('image_url')} placeholder="https://..." className="bg-zinc-950 border-zinc-800 text-white" />{errors.image_url && <p className="text-red-400 text-xs">{errors.image_url.message}</p>}</div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" {...register('active')} className="accent-primary w-4 h-4" /><span className="text-sm text-zinc-300">Active</span></label>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={closeDialog} className="text-zinc-400">Cancel</Button>
              <Button type="submit" className="bg-primary hover:bg-primary/80">{editing ? 'Update' : 'Add Society'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
