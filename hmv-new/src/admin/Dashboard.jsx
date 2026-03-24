import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Newspaper, Image as ImageIcon, Users, BookOpen } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { title: 'Total News', value: '12', icon: <Newspaper className="w-8 h-8 text-primary" />, desc: '+2 this month' },
    { title: 'Gallery Photos', value: '145', icon: <ImageIcon className="w-8 h-8 text-secondary" />, desc: '+15 this week' },
    { title: 'Staff Members', value: '48', icon: <Users className="w-8 h-8 text-accent" />, desc: 'All active' },
    { title: 'Societies', value: '24', icon: <BookOpen className="w-8 h-8 text-green-500" />, desc: '3 new additions' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold font-playfair mb-2 text-white">Dashboard Overview</h2>
        <p className="text-zinc-400">Welcome to your school management portal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-zinc-900 border-zinc-800 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">
                {stat.title}
              </CardTitle>
              <div className="p-2 bg-zinc-950 rounded-xl border border-zinc-800">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{stat.value}</div>
              <p className="text-xs text-zinc-500 mt-2">{stat.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card className="bg-zinc-900 border-zinc-800 text-white min-h-[300px] flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">Recent News Uploads</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center text-zinc-500">
             <div className="w-16 h-16 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-4">
               <Newspaper className="w-8 h-8 text-zinc-700" />
             </div>
             <p>No recent news. Add some via the News tab.</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-white min-h-[300px] flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             {['Add New Event', 'Upload Gallery Photos', 'Update Principal Message', 'Manage Contact Submissions'].map((act, i) => (
               <div key={i} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-primary/50 hover:bg-primary/10 cursor-pointer transition-colors flex items-center justify-between group">
                 <span className="font-medium text-zinc-300 group-hover:text-primary">{act}</span>
                 <span className="text-zinc-600 group-hover:text-primary transition-transform group-hover:translate-x-1">→</span>
               </div>
             ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
