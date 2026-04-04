import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Save, Globe, Mail, Phone, MapPin, School } from 'lucide-react';

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [school, setSchool] = useState({
    name: 'Homagama Maha Vidyalaya',
    short_name: 'HMV',
    tagline: 'Nurturing minds since 1889',
    established: '1889',
  });

  const [contact, setContact] = useState({
    address: 'Homagama, Colombo, Sri Lanka',
    phone: '+94 11 284 0000',
    email: 'info@hmv.lk',
    website: 'www.hmv.lk',
  });

  const [social, setSocial] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: '',
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-zinc-400 text-sm">Configure school information and site settings</p>
        {saved && <div className="mt-3 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/50 text-green-400 text-sm inline-block">Settings saved successfully!</div>}
      </div>

      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardHeader><CardTitle className="flex items-center gap-2 text-white"><School className="w-5 h-5 text-primary" />School Information</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>School Name</Label><Input value={school.name} onChange={e => setSchool({ ...school, name: e.target.value })} className="bg-zinc-950 border-zinc-800 text-white" /></div>
            <div className="space-y-2"><Label>Short Name</Label><Input value={school.short_name} onChange={e => setSchool({ ...school, short_name: e.target.value })} className="bg-zinc-950 border-zinc-800 text-white" /></div>
          </div>
          <div className="space-y-2"><Label>Tagline</Label><Input value={school.tagline} onChange={e => setSchool({ ...school, tagline: e.target.value })} className="bg-zinc-950 border-zinc-800 text-white" /></div>
          <div className="space-y-2"><Label>Established Year</Label><Input value={school.established} onChange={e => setSchool({ ...school, established: e.target.value })} className="bg-zinc-950 border-zinc-800 text-white" /></div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardHeader><CardTitle className="flex items-center gap-2 text-white"><MapPin className="w-5 h-5 text-primary" />Contact Details</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2"><Label>Address</Label><Textarea value={contact.address} onChange={e => setContact({ ...contact, address: e.target.value })} rows={2} className="bg-zinc-950 border-zinc-800 text-white resize-none" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Phone</Label><Input value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} className="bg-zinc-950 border-zinc-800 text-white" /></div>
            <div className="space-y-2"><Label>Email</Label><Input value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} className="bg-zinc-950 border-zinc-800 text-white" /></div>
          </div>
          <div className="space-y-2"><Label>Website</Label><Input value={contact.website} onChange={e => setContact({ ...contact, website: e.target.value })} className="bg-zinc-950 border-zinc-800 text-white" /></div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardHeader><CardTitle className="flex items-center gap-2 text-white"><Globe className="w-5 h-5 text-primary" />Social Media Links</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          {Object.entries(social).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <Label className="capitalize">{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
              <Input value={value} onChange={e => setSocial({ ...social, [key]: e.target.value })} placeholder={`https://${key}.com/hmv`} className="bg-zinc-950 border-zinc-800 text-white" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="bg-primary hover:bg-primary/80" disabled={saving}>
        <Save className="w-4 h-4 mr-1" /> {saving ? 'Saving...' : 'Save Settings'}
      </Button>
    </div>
  );
}
