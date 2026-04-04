import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Plus, Trash2, Loader2, Upload, Image as ImageIcon, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const gallerySchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  image_url: z.string().url('Must be a valid URL').min(1, 'Image URL is required'),
  category: z.string().min(1, 'Category is required'),
  featured: z.boolean().default(false),
});

const DEMO_ITEMS = [
  { id: '1', title: 'Annual Day Performance', image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c4a475?w=400', category: 'Events', featured: true },
  { id: '2', title: 'Science Fair Winners', image_url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400', category: 'Academics', featured: false },
  { id: '3', title: 'Sports Day Highlights', image_url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400', category: 'Sports', featured: true },
  { id: '4', title: 'Classroom Activities', image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400', category: 'Academics', featured: false },
];

export default function GalleryCMS() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [demoMode] = useState(!import.meta.env.VITE_SUPABASE_URL);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(gallerySchema),
    defaultValues: { title: '', image_url: '', category: '', featured: false },
  });

  const displayItems = demoMode ? DEMO_ITEMS : items;
  const categories = [...new Set(displayItems.map(i => i.category))];

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setItems(data || []);
    } catch (err) { console.error('Failed to fetch:', err); }
    finally { setLoading(false); }
  };

  if (demoMode === false && items.length === 0 && !loading) {
    fetchItems();
  }

  const onSubmit = async (values) => {
    if (demoMode) {
      const newItem = { id: Math.random().toString(36).slice(2, 11), ...values };
      setItems(prev => [newItem, ...prev]);
      setDialogOpen(false);
      reset();
      return;
    }
    try {
      const { data, error } = await supabase.from('gallery').insert(values).select();
      if (error) throw error;
      setItems(prev => [data[0], ...prev]);
      setDialogOpen(false);
      reset();
    } catch (err) { console.error('Failed to save:', err); }
  };

  const handleDelete = async (id) => {
    setDeleteId(id);
    if (demoMode) { setItems(prev => prev.filter(n => n.id !== id)); setDeleteId(null); return; }
    try {
      const { error } = await supabase.from('gallery').delete().eq('id', id);
      if (error) throw error;
      setItems(prev => prev.filter(n => n.id !== id));
    } catch (err) { console.error('Failed to delete:', err); }
    finally { setDeleteId(null); }
  };

  const filtered = displayItems.filter(i => !search || i.title.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase()));
  const finalItems = activeCategory === 'All' ? filtered : filtered.filter(i => i.category === activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Gallery</h2>
          <p className="text-zinc-400 text-sm">Manage photo gallery and media</p>
        </div>
        <Button onClick={() => { reset({ title: '', image_url: '', category: '', featured: false }); setDialogOpen(true); }} className="bg-primary hover:bg-primary/80">
          <Plus className="w-4 h-4 mr-1" /> Add Photo
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <Input placeholder="Search gallery..." value={search} onChange={e => setSearch(e.target.value)} className="bg-zinc-900 border-zinc-800 pl-10 text-white" />
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Button variant={activeCategory === 'All' ? 'default' : 'outline'} size="sm" onClick={() => setActiveCategory('All')} className={activeCategory === 'All' ? 'bg-primary hover:bg-primary/80' : 'border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500'}>All</Button>
          {categories.map(c => (
            <Button key={c} variant={activeCategory === c ? 'default' : 'outline'} size="sm" onClick={() => setActiveCategory(c)} className={activeCategory === c ? 'bg-primary hover:bg-primary/80' : 'border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500'}>{c}</Button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : (
        <Card className="bg-zinc-900 border-zinc-800 text-white">
          {finalItems.length === 0 ? (
            <CardContent className="py-16 text-center text-zinc-500">
              <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-lg mb-2">No photos found</p>
              <p className="text-sm">Upload your first image to get started.</p>
            </CardContent>
          ) : (
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {finalItems.map((item) => (
                  <div key={item.id} className="group relative aspect-square rounded-lg overflow-hidden bg-zinc-800">
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex items-end">
                      <div className="p-3 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-sm font-medium text-white truncate">{item.title}</p>
                        <p className="text-xs text-zinc-400">{item.category}</p>
                        <div className="flex gap-1 mt-2">
                          <Button size="sm" variant="destructive" className="h-7 text-xs" onClick={() => handleDelete(item.id)} disabled={deleteId === item.id}>{deleteId === item.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}</Button>
                        </div>
                      </div>
                    </div>
                    {item.featured && <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-500 text-[10px] font-bold uppercase">Featured</div>}
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      )}

      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) { setDialogOpen(false); reset(); } }}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Add Photo</DialogTitle>
            <DialogDescription className="text-zinc-400">Upload an image to the gallery.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input {...register('title')} placeholder="Photo title" className="bg-zinc-950 border-zinc-800 text-white" />
              {errors.title && <p className="text-red-400 text-xs">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Image URL</Label>
              <div className="flex items-center gap-2">
                <Input {...register('image_url')} placeholder="https://..." className="bg-zinc-950 border-zinc-800 text-white flex-1" />
                <Upload className="w-4 h-4 text-zinc-500 shrink-0" />
              </div>
              {errors.image_url && <p className="text-red-400 text-xs">{errors.image_url.message}</p>}
              <p className="text-xs text-zinc-600">In production, this will support file upload to Supabase Storage.</p>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Input {...register('category')} placeholder="e.g. Events, Sports, Academics" className="bg-zinc-950 border-zinc-800 text-white" />
              {errors.category && <p className="text-red-400 text-xs">{errors.category.message}</p>}
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" {...register('featured')} className="accent-primary w-4 h-4" />
              <span className="text-sm text-zinc-300">Featured</span>
            </label>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => { setDialogOpen(false); reset(); }} className="text-zinc-400">Cancel</Button>
              <Button type="submit" className="bg-primary hover:bg-primary/80">Add Photo</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
