import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend,
} from 'recharts';
import { dashboardStats, igotCourses, jobRoles, mcqBank } from '../data';

type OfficialTab = 'dashboard' | 'upload' | 'library' | 'mcqs';

type Props = {
  official: { id: string; name: string };
  onLogout: () => void;
};

type UploadedContent = {
  id: string;
  title: string;
  type: 'pdf' | 'video';
  skill: string;
  role: string;
  date: string;
  size: string;
  mcqGenerated: boolean;
};

const initialLibrary: UploadedContent[] = [
  { id: 'u001', title: 'Budget & Fiscal Policy 2025-26.pdf', type: 'pdf', skill: 'Financial Management', role: 'IAS Officer', date: '2026-09-10', size: '4.2 MB', mcqGenerated: true },
  { id: 'u002', title: 'Digital Governance Fundamentals.mp4', type: 'video', skill: 'Digital Governance', role: 'All Roles', date: '2026-09-05', size: '812 MB', mcqGenerated: false },
  { id: 'u003', title: 'Crisis Response Protocols.pdf', type: 'pdf', skill: 'Crisis Management', role: 'IPS Officer', date: '2026-08-28', size: '1.8 MB', mcqGenerated: true },
  { id: 'u004', title: 'Forest Conservation Guidelines 2026.pdf', type: 'pdf', skill: 'Environmental Science', role: 'IFS Officer', date: '2026-08-20', size: '3.1 MB', mcqGenerated: false },
];

export default function OfficialDashboard({ official, onLogout }: Props) {
  const [tab, setTab] = useState<OfficialTab>('dashboard');
  const [library, setLibrary] = useState<UploadedContent[]>(initialLibrary);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadType, setUploadType] = useState<'pdf' | 'video'>('pdf');
  const [uploadSkill, setUploadSkill] = useState('');
  const [uploadRole, setUploadRole] = useState('All Roles');
  const [uploadMsg, setUploadMsg] = useState('');
  const [generatingMCQ, setGeneratingMCQ] = useState<string | null>(null);
  const [generatedCount, setGeneratedCount] = useState<Record<string, number>>({});

  const allSkills = Array.from(new Set(jobRoles.flatMap((r) => r.requiredSkills.map((s) => s.name))));

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle || !uploadSkill) { setUploadMsg('Please fill in all fields.'); return; }
    const newItem: UploadedContent = {
      id: `u${Date.now()}`,
      title: uploadTitle + (uploadType === 'pdf' ? '.pdf' : '.mp4'),
      type: uploadType,
      skill: uploadSkill,
      role: uploadRole,
      date: new Date().toISOString().slice(0, 10),
      size: uploadType === 'pdf' ? `${(Math.random() * 5 + 0.5).toFixed(1)} MB` : `${(Math.random() * 500 + 100).toFixed(0)} MB`,
      mcqGenerated: false,
    };
    setLibrary((prev) => [newItem, ...prev]);
    setUploadTitle('');
    setUploadSkill('');
    setUploadMsg('✅ Content uploaded successfully!');
    setTimeout(() => setUploadMsg(''), 3000);
  };

  const generateMCQ = (id: string, title: string) => {
    setGeneratingMCQ(id);
    setTimeout(() => {
      const count = Math.floor(Math.random() * 6) + 5;
      setLibrary((prev) => prev.map((c) => c.id === id ? { ...c, mcqGenerated: true } : c));
      setGeneratedCount((prev) => ({ ...prev, [id]: count }));
      setGeneratingMCQ(null);
    }, 2500);
  };

  const tabs: { key: OfficialTab; label: string; icon: string }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'upload', label: 'Upload Content', icon: '📤' },
    { key: 'library', label: 'Content Library', icon: '🗂️' },
    { key: 'mcqs', label: 'MCQ Bank', icon: '✏️' },
  ];

  return (
    <div className="min-h-screen bg-[#f0f4ff] flex flex-col">
      {/* Header */}
      <header className="bg-[#1e3a8a] text-white px-4 sm:px-6 py-3 flex items-center gap-3">
        <div className="font-display text-lg">iGOT Karmayogi</div>
        <div className="h-4 w-px bg-blue-600 mx-1" />
        <div className="text-sm text-blue-200">Official Portal</div>
        <div className="ml-auto flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-blue-300">{official.id}</div>
            <div className="text-sm font-medium">{official.name}</div>
          </div>
          <button onClick={onLogout} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
            Logout
          </button>
        </div>
      </header>

      {/* Tab Nav */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex gap-0 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-4 py-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
                tab === t.key
                  ? 'border-[#1e3a8a] text-[#1e3a8a]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">

        {/* DASHBOARD TAB */}
        {tab === 'dashboard' && (
          <div>
            <h2 className="font-display text-3xl text-gray-900 mb-6">Analytics Dashboard</h2>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Officers', value: dashboardStats.totalOfficers.toLocaleString(), sub: 'Registered', color: 'bg-[#1e3a8a]', icon: '👥' },
                { label: 'Active This Month', value: dashboardStats.activeThisMonth.toLocaleString(), sub: '71.6% engagement', color: 'bg-teal-600', icon: '📈' },
                { label: 'Courses Completed', value: dashboardStats.coursesCompleted.toLocaleString(), sub: 'Total completions', color: 'bg-amber-500', icon: '🎓' },
                { label: 'Avg MCQ Score', value: `${dashboardStats.avgMCQScore}%`, sub: 'Platform average', color: 'bg-indigo-600', icon: '✅' },
              ].map((k) => (
                <div key={k.label} className={`${k.color} text-white rounded-2xl p-5 shadow-sm`}>
                  <div className="text-2xl mb-2">{k.icon}</div>
                  <div className="font-display text-3xl font-bold">{k.value}</div>
                  <div className="text-white/80 text-xs mt-1">{k.label}</div>
                  <div className="text-white/60 text-[10px]">{k.sub}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Attendance Chart */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-1">Monthly Attendance Rate (%)</h3>
                <p className="text-xs text-gray-400 mb-4">Officers who accessed at least one course</p>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={dashboardStats.attendanceByMonth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f4ff" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}
                      formatter={(v) => [`${v}%`, 'Attendance']}
                    />
                    <Line type="monotone" dataKey="attendance" stroke="#1e3a8a" strokeWidth={2.5} dot={{ fill: '#1e3a8a', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* MCQ Scores by Dept */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-1">Avg MCQ Score by Department</h3>
                <p className="text-xs text-gray-400 mb-4">Average across all assessments this quarter</p>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={dashboardStats.mcqScoresByDept} barSize={32}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f4ff" />
                    <XAxis dataKey="dept" tick={{ fontSize: 11 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}
                      formatter={(v) => [`${v}%`, 'Score']}
                    />
                    <Bar dataKey="score" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Skills Learning */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
              <h3 className="font-semibold text-gray-900 mb-1">Skills Learning Progress</h3>
              <p className="text-xs text-gray-400 mb-5">Enrolled vs completed officers per skill track</p>
              <div className="space-y-4">
                {dashboardStats.skillsDistribution.map((s) => {
                  const pct = Math.round((s.completed / s.enrolled) * 100);
                  return (
                    <div key={s.skill}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-medium text-gray-800">{s.skill}</span>
                        <span className="text-xs text-gray-500">{s.completed}/{s.enrolled} completed ({pct}%)</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#1e3a8a] to-[#2563eb]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Officer table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Officer Progress Tracker</h3>
                <span className="text-xs text-gray-400">Showing recent 6 officers</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                    <tr>
                      {['Employee ID', 'Name', 'Role', 'Learning Progress', 'MCQ Score', 'Status'].map((h) => (
                        <th key={h} className="text-left px-5 py-3 font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {dashboardStats.recentOfficers.map((o) => (
                      <tr key={o.id} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-5 py-3 text-xs font-mono text-gray-500">{o.id}</td>
                        <td className="px-5 py-3 font-medium text-gray-900">{o.name}</td>
                        <td className="px-5 py-3 text-gray-600 text-xs">{o.role}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden w-24">
                              <div
                                className="h-full rounded-full bg-[#1e3a8a]"
                                style={{ width: `${o.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-600 w-8">{o.progress}%</span>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <span className={`font-semibold text-sm ${o.mcq >= 80 ? 'text-green-600' : o.mcq >= 65 ? 'text-amber-600' : 'text-red-500'}`}>
                            {o.mcq}%
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <span className={`text-[10px] px-2 py-1 rounded-full font-semibold ${
                            o.progress >= 80 ? 'bg-green-100 text-green-700' :
                            o.progress >= 50 ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {o.progress >= 80 ? 'On Track' : o.progress >= 50 ? 'In Progress' : 'Needs Attention'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* UPLOAD TAB */}
        {tab === 'upload' && (
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl text-gray-900 mb-2">Upload Learning Content</h2>
            <p className="text-gray-500 mb-8">Upload PDFs or videos. iGOT will categorize and make them available to officers. MCQs can be auto-generated from PDFs.</p>

            <form onSubmit={handleUpload} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Content Title</label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g. Financial Management for IAS Officers"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Content Type</label>
                <div className="flex gap-3">
                  {(['pdf', 'video'] as const).map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setUploadType(t)}
                      className={`flex-1 flex items-center gap-2 justify-center py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                        uploadType === t
                          ? 'border-[#1e3a8a] bg-blue-50 text-[#1e3a8a]'
                          : 'border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      <span>{t === 'pdf' ? '📄' : '🎥'}</span>
                      <span>{t.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Skill Category</label>
                <select
                  value={uploadSkill}
                  onChange={(e) => setUploadSkill(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select skill category</option>
                  {allSkills.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Target Role</label>
                <select
                  value={uploadRole}
                  onChange={(e) => setUploadRole(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option>All Roles</option>
                  {jobRoles.map((r) => <option key={r.id}>{r.title}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                  Upload File
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer bg-gray-50">
                  <div className="text-4xl mb-2">{uploadType === 'pdf' ? '📄' : '🎬'}</div>
                  <div className="text-sm text-gray-600 font-medium">
                    Drop your {uploadType.toUpperCase()} here or <span className="text-blue-600">browse files</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {uploadType === 'pdf' ? 'PDF files up to 50MB' : 'MP4, MOV files up to 2GB'}
                  </div>
                </div>
              </div>

              {uploadType === 'pdf' && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                  <span className="text-xl">🤖</span>
                  <div>
                    <div className="font-semibold text-amber-800 text-sm">Auto MCQ Generation</div>
                    <p className="text-amber-700 text-xs mt-0.5">
                      After upload, you can auto-generate MCQ questions from this PDF using AI. Officers will be tested on this content.
                    </p>
                  </div>
                </div>
              )}

              {uploadMsg && (
                <div className={`text-sm rounded-lg px-4 py-2.5 ${uploadMsg.startsWith('✅') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                  {uploadMsg}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#1e3a8a] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#1e40af] transition-colors"
              >
                Upload Content to iGOT →
              </button>
            </form>
          </div>
        )}

        {/* LIBRARY TAB */}
        {tab === 'library' && (
          <div>
            <h2 className="font-display text-3xl text-gray-900 mb-2">Content Library</h2>
            <p className="text-gray-500 mb-6">All uploaded training materials. Generate MCQs from PDFs.</p>

            <div className="space-y-3">
              {library.map((content) => (
                <div key={content.id} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                    content.type === 'pdf' ? 'bg-red-50' : 'bg-blue-50'
                  }`}>
                    {content.type === 'pdf' ? '📄' : '🎥'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm truncate">{content.title}</div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="text-xs text-gray-500">{content.skill}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs text-gray-500">{content.role}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs text-gray-400">{content.size}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs text-gray-400">{content.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {content.mcqGenerated ? (
                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                        ✓ MCQs Ready {generatedCount[content.id] ? `(${generatedCount[content.id]})` : ''}
                      </span>
                    ) : content.type === 'pdf' ? (
                      <button
                        onClick={() => generateMCQ(content.id, content.title)}
                        disabled={generatingMCQ === content.id}
                        className="text-xs bg-amber-500 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-amber-600 disabled:opacity-60 transition-colors"
                      >
                        {generatingMCQ === content.id ? (
                          <span className="flex items-center gap-1.5">
                            <span className="h-3 w-3 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                            Generating...
                          </span>
                        ) : '🤖 Generate MCQs'}
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">Video — MCQ N/A</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MCQ BANK TAB */}
        {tab === 'mcqs' && (
          <div>
            <h2 className="font-display text-3xl text-gray-900 mb-2">MCQ Question Bank</h2>
            <p className="text-gray-500 mb-6">All generated MCQ questions available for officer assessments. {mcqBank.length} questions across {new Set(mcqBank.map((q) => q.skillId)).size} skills.</p>

            <div className="space-y-4">
              {Array.from(new Set(mcqBank.map((q) => q.skillId))).map((skillId) => {
                const questions = mcqBank.filter((q) => q.skillId === skillId);
                const skillName = jobRoles.flatMap((r) => r.requiredSkills).find((s) => s.id === skillId)?.name ?? skillId;
                return (
                  <details key={skillId} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
                    <summary className="p-5 cursor-pointer flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-[#1e3a8a] text-white text-xs font-bold flex items-center justify-center">
                          {questions.length}
                        </span>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{skillName}</div>
                          <div className="text-xs text-gray-400">{questions.length} questions</div>
                        </div>
                      </div>
                      <span className="text-gray-400 text-xs group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="border-t border-gray-100 divide-y divide-gray-50">
                      {questions.map((q, qi) => (
                        <div key={q.id} className="p-5">
                          <div className="font-medium text-sm text-gray-900 mb-3">
                            <span className="text-gray-400 mr-2">Q{qi + 1}.</span>
                            {q.question}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                            {q.options.map((opt, oi) => (
                              <div
                                key={oi}
                                className={`text-xs px-3 py-2 rounded-lg ${
                                  oi === q.correct
                                    ? 'bg-green-50 text-green-800 border border-green-200 font-semibold'
                                    : 'bg-gray-50 text-gray-600 border border-gray-100'
                                }`}
                              >
                                <span className="font-semibold mr-1">{String.fromCharCode(65 + oi)}.</span>
                                {opt}
                                {oi === q.correct && <span className="ml-2 text-green-600">✓</span>}
                              </div>
                            ))}
                          </div>
                          <div className="text-xs text-gray-500 bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
                            💡 {q.explanation}
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
