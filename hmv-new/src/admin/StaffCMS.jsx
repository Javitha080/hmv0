import { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Plus, Pencil, Trash2, Loader2, Users, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const staffSchema = z.object({
  name: z.string().min(2, 'Name required'),
  role: z.string().min(1, 'Role required'),
  department: z.string().optional().or(z.literal('')),
  qualification: z.string().optional().or(z.literal('')),
  bio: z.string().optional().or(z.literal('')),
  image_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  active: z.boolean().default(true),
});

export default function StaffCMS() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const [demoMode] = useState(!import.meta.env.VITE_SUPABASE_URL);
  const [demoItems] = useState([
    { id: '1', name: 'Dr. Kamala Fernando', role: 'Principal', department: 'Administration', qualification: 'Ph.D. in Education Management', bio: 'Over 25 years of experience in education.', image_url: '', email: 'principal@hmv.lk', active: true, created_at: new Date().toISOString() },
    { id: '2', name: 'Mr. Nuwan Silva', role: 'Vice Principal', department: 'Science', qualification: 'M.Sc. Physics', bio: 'Specializes in physics curriculum development.', image_url: '', email: 'vp.science@hmv.lk', active: true, created_at: new Date().toISOString() },
    { id: '3', name: 'Ms. Dilani Perera', role: 'Senior Teacher', department: 'Mathematics', qualification: 'B.Ed. Mathematics', bio: 'Award-winning mathematics educator.', image_url: '', email: 'maths.dilani@hmv.lk', active: true, created_at: new Date().toISOString() },
  ]);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(staffSchema),
    defaultValues: { name: '', role: '', department: '', qualification: '', bio: '', image_url: '', email: '', active: true },
  });

  useEffect(() => { if (demoMode) setItems(demoItems); else fetchItems(); }, [demoMode, demoItems]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('staff').select('*').order('name');
      if (error) throw error;
      setItems(data || []);
    } catch (err) { console.error('Failed to fetch:', err); }
    finally { setLoading(false); }
  };

  const onSubmit = async (values) => {
    if (demoMode) {
      const id = editing?.id || Math.random().toString(36).slice(2, 11);
      if (editing) setItems(prev => prev.map(s => s.id === editing.id ? { ...editing, ...values } : s));
      else setItems(prev => [{ id, ...values, created_at: new Date().toISOString() }, ...prev]);
      closeDialog();
      return;
    }
    try {
      const { data, error } = editing
        ? await supabase.from('staff').update(values).eq('id', editing.id).select()
        : await supabase.from('staff').insert(values).select();
      if (error) throw error;
      if (editing) setItems(prev => prev.map(s => s.id === editing.id ? data[0] : s));
      else setItems(prev => [data[0], ...prev]);
      closeDialog();
    } catch (err) { console.error('Failed to save:', err); }
  };

  const handleDelete = async (id) => {
    setDeleteId(id);
    if (demoMode) { setItems(prev => prev.filter(s => s.id !== id)); setDeleteId(null); return; }
    try { const { error } = await supabase.from('staff').delete().eq('id', id); if (error) throw error; setItems(prev => prev.filter(s => s.id !== id)); }
    catch (err) { console.error('Failed to delete:', err); }
    finally { setDeleteId(null); }
  };

  const closeDialog = () => { setDialogOpen(false); setEditing(null); reset({ name: '', role: '', department: '', qualification: '', bio: '', image_url: '', email: '', active: true }); };
  const openEdit = (item) => { setEditing(item); setDialogOpen(true); setTimeout(() => { Object.keys(item).forEach(k => setValue(k, item[k])); }, 50); };
  const filtered = items.filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.role.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Staff Directory</h2>
          <p className="text-zinc-400 text-sm">Manage teaching and administrative staff profiles</p>
        </div>
        <Button onClick={() => { setEditing(null); reset({ name: '', role: '', department: '', qualification: '', bio: '', image_url: '', email: '', active: true }); setDialogOpen(true); }} className="bg-primary hover:bg-primary/80">
          <Plus className="w-4 h-4 mr-1" /> Add Staff
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <Input placeholder="Search staff..." value={search} onChange={e => setSearch(e.target.value)} className="bg-zinc-900 border-zinc-800 pl-10 text-white" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : (
        <Card className="bg-zinc-900 border-zinc-800 text-white">
          {filtered.length === 0 ? (
            <CardContent className="py-16 text-center text-zinc-500">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No staff found. Add your first member.</p>
            </CardContent>
          ) : (
            <div className="divide-y divide-zinc-800">
              {filtered.map((s) => (
                <div key={s.id} className="flex items-center gap-4 p-4 hover:bg-zinc-800/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-lg font-bold text-zinc-400 shrink-0 overflow-hidden">
                    {s.image_url ? <img src={s.image_url} alt={s.name} className="w-full h-full object-cover" /> : s.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{s.name} {!s.active && <span className="text-xs text-zinc-500 ml-2">Inactive</span>}</p>
                    <p className="text-sm text-zinc-500">{s.role}{s.department ? ` &middot; ${s.department}` : ''}</p>
                    {s.qualification && <p className="text-xs text-zinc-600">{s.qualification}</p>}
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
            <DialogTitle className="text-white">{editing ? 'Edit' : 'Add'} Staff Member</DialogTitle>
            <DialogDescription className="text-zinc-400">{editing ? 'Update staff details.' : 'Fill in the new staff member details.'}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Name</Label><Input {...register('name')} className="bg-zinc-950 border-zinc-800 text-white" />{errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}</div>
              <div className="space-y-2"><Label>Role</Label><Input {...register('role')} placeholder="e.g. Teacher, Principal" className="bg-zinc-950 border-zinc-800 text-white" />{errors.role && <p className="text-red-400 text-xs">{errors.role.message}</p>}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Department</Label><Input {...register('department')} className="bg-zinc-950 border-zinc-800 text-white" /></div>
              <div className="space-y-2"><Label>Qualification</Label><Input {...register('qualification')} className="bg-zinc-950 border-zinc-800 text-white" /></div>
            </div>
            <div className="space-y-2"><Label>Email</Label><Input {...register('email')} type="email" className="bg-zinc-950 border-zinc-800 text-white" />{errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}</div>
            <div className="space-y-2"><Label>Bio</Label><Textarea {...register('bio')} rows={3} className="bg-zinc-950 border-zinc-800 text-white resize-none" /></div>
            <div className="space-y-2"><Label>Photo URL (optional)</Label><Input {...register('image_url')} placeholder="https://..." className="bg-zinc-950 border-zinc-800 text-white" />{errors.image_url && <p className="text-red-400 text-xs">{errors.image_url.message}</p>}</div>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" {...register('active')} className="accent-primary w-4 h-4" /><span className="text-sm text-zinc-300">Active</span></label>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={closeDialog} className="text-zinc-400">Cancel</Button>
              <Button type="submit" className="bg-primary hover:bg-primary/80">{editing ? 'Update' : 'Add Member'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
