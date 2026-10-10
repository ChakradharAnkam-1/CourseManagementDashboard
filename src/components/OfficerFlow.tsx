import { useState, useMemo } from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell,
} from 'recharts';
import {
  jobRoles, allSkills, skillById, learningResources, roleGroupLabels,
  levelLabel, levelValue,
  type JobRole, type SkillLevel,
} from '../officerData';
import { mcqBank } from '../data';
import ExamGuide from './ExamGuide';

type OfficerPortalTab = 'learning' | 'exams' | 'progress';
type LearningStep = 'role' | 'profile' | 'assessment' | 'gap' | 'path' | 'mcq';

type OfficerProfile = {
  department: string;
  designation: string;
  assignment: string;
  yearsExp: string;
  education: string;
  prevTraining: string;
  toolsUsed: string;
  responsibilities: string;
  interests: string;
};

type Props = {
  officer: { id: string; name: string };
  onLogout: () => void;
};

const steps: { key: LearningStep; label: string }[] = [
  { key: 'role', label: 'Job Role' },
  { key: 'profile', label: 'Profile' },
  { key: 'assessment', label: 'Assessment' },
  { key: 'gap', label: 'Gap Analysis' },
  { key: 'path', label: 'Learning Path' },
  { key: 'mcq', label: 'Assessment' },
];
const stepOrder: LearningStep[] = steps.map((s) => s.key);

export default function OfficerFlow({ officer, onLogout }: Props) {
  const [tab, setTab] = useState<OfficerPortalTab>('learning');
  const [step, setStep] = useState<LearningStep>('role');

  // Role selection
  const [roleSearch, setRoleSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState<JobRole | null>(null);

  // Profile
  const [profile, setProfile] = useState<OfficerProfile>({
    department: '', designation: '', assignment: '', yearsExp: '',
    education: '', prevTraining: '', toolsUsed: '', responsibilities: '', interests: '',
  });

  // Assessment
  const [skillLevels, setSkillLevels] = useState<Record<string, SkillLevel>>({});

  // Learning path: track completed courses
  const [completedCourses, setCompletedCourses] = useState<Set<string>>(new Set());
  const [improvedSkills, setImprovedSkills] = useState<Record<string, SkillLevel>>({});

  // MCQ
  const [mcqSkill, setMcqSkill] = useState('');
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  const [mcqSubmitted, setMcqSubmitted] = useState(false);

  // ── Derived data ──────────────────────────────────────────
  const rolesByGroup = useMemo(() => {
    const groups: Record<string, JobRole[]> = {};
    jobRoles.forEach((r) => {
      if (!groups[r.group]) groups[r.group] = [];
      groups[r.group].push(r);
    });
    return groups;
  }, []);

  const filteredRoles = useMemo(() => {
    if (!roleSearch.trim()) return jobRoles;
    const q = roleSearch.toLowerCase();
    return jobRoles.filter(
      (r) => r.title.toLowerCase().includes(q) || r.department.toLowerCase().includes(q) || r.group.includes(q)
    );
  }, [roleSearch]);

  const effectiveSkillLevels = useMemo(
    () => ({ ...skillLevels, ...improvedSkills }),
    [skillLevels, improvedSkills]
  );

  type GapItem = { skill: (typeof allSkills)[0]; currentLvl: SkillLevel; requiredLvl: SkillLevel; current: number; required: number; gap: number; met: boolean };

  const gapAnalysis = useMemo((): GapItem[] => {
    if (!selectedRole) return [];
    const result: GapItem[] = [];
    for (const id of selectedRole.relevantSkillIds) {
      const skill = skillById[id];
      if (!skill) continue;
      const currentLvl: SkillLevel = (effectiveSkillLevels[id] as SkillLevel) ?? 'none';
      const requiredLvl: SkillLevel = (selectedRole.requiredLevels[id] as SkillLevel) ?? 'beginner';
      if (currentLvl === 'na') continue;
      const current = levelValue[currentLvl];
      const required = levelValue[requiredLvl];
      const gap = required - current;
      result.push({ skill, currentLvl, requiredLvl, current, required, gap, met: gap <= 0 });
    }
    return result;
  }, [selectedRole, effectiveSkillLevels]);

  const overallScore = useMemo(() => {
    if (!gapAnalysis.length) return 0;
    const total = gapAnalysis.reduce((acc, g) => {
      const pct = g.required > 0 ? Math.min(100, (g.current / g.required) * 100) : 100;
      return acc + pct;
    }, 0);
    return Math.round(total / gapAnalysis.length);
  }, [gapAnalysis]);

  const gapSkills = useMemo(() => gapAnalysis.filter((g) => !g.met).sort((a, b) => b.gap - a.gap), [gapAnalysis]);
  const metSkills = useMemo(() => gapAnalysis.filter((g) => g.met), [gapAnalysis]);

  const recommendedCourses = useMemo(() => {
    if (!selectedRole) return [];
    return learningResources.filter((r) => {
      const isGap = gapSkills.some((g) => g.skill.id === r.skillId);
      return isGap;
    });
  }, [selectedRole, gapSkills]);

  const activeMCQs = useMemo(
    () => mcqBank.filter((q) => q.skillId === mcqSkill).slice(0, 5),
    [mcqSkill]
  );

  const mcqScore = mcqSubmitted
    ? activeMCQs.filter((q) => mcqAnswers[q.id] === q.correct).length
    : 0;

  const completeCourseMark = (courseId: string, skillId: string) => {
    setCompletedCourses((prev) => new Set([...prev, courseId]));
    const currentLvl = effectiveSkillLevels[skillId] ?? 'none';
    const nextLvl: Record<SkillLevel, SkillLevel> = {
      none: 'beginner', beginner: 'intermediate', intermediate: 'advanced', advanced: 'advanced', na: 'na',
    };
    setImprovedSkills((prev) => ({ ...prev, [skillId]: nextLvl[currentLvl] }));
  };

  const navTabs: { key: OfficerPortalTab; label: string; icon: string }[] = [
    { key: 'learning', label: 'Learning Path', icon: '🎓' },
    { key: 'exams', label: 'Exam Guide', icon: '📅' },
    { key: 'progress', label: 'My Progress', icon: '📊' },
  ];

  return (
    <div className="min-h-screen bg-[#f0f4ff] flex flex-col">
      {/* Header */}
      <header className="bg-[#1e3a8a] text-white px-4 sm:px-6 py-3 flex items-center gap-3">
        <div className="font-display text-lg leading-tight">iGOT Karmayogi</div>
        <div className="h-4 w-px bg-blue-600 mx-1" />
        <div className="text-sm text-blue-200">Statistical Officer Portal</div>
        <div className="ml-auto flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-blue-300">{officer.id}</div>
            <div className="text-sm font-medium">{officer.name}</div>
          </div>
          <button onClick={onLogout} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
            Logout
          </button>
        </div>
      </header>

      {/* Top tab bar */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex gap-0 overflow-x-auto">
          {navTabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-5 py-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
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

      {/* Learning step stepper (only when on learning tab) */}
      {tab === 'learning' && (
        <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3">
          <div className="max-w-5xl mx-auto flex items-center gap-1 overflow-x-auto">
            {steps.map((s, i) => {
              const currentIdx = stepOrder.indexOf(step);
              const sIdx = stepOrder.indexOf(s.key);
              const done = sIdx < currentIdx;
              const active = s.key === step;
              return (
                <div key={s.key} className="flex items-center gap-1 flex-shrink-0">
                  <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold ${
                    active ? 'bg-[#1e3a8a] text-white' : done ? 'bg-blue-100 text-blue-700' : 'text-gray-400'
                  }`}>
                    <span className={`h-4 w-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      done ? 'bg-blue-600 text-white' : active ? 'bg-white/20' : 'bg-gray-200 text-gray-500'
                    }`}>{done ? '✓' : i + 1}</span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </div>
                  {i < steps.length - 1 && <div className="w-3 h-px bg-gray-200 flex-shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">

        {/* ═══════════════ EXAM GUIDE TAB ═══════════════ */}
        {tab === 'exams' && <ExamGuide />}

        {/* ═══════════════ PROGRESS TAB ═══════════════ */}
        {tab === 'progress' && (
          <ProgressTab
            officer={officer}
            selectedRole={selectedRole}
            gapAnalysis={gapAnalysis}
            overallScore={overallScore}
            completedCourses={completedCourses}
            improvedSkills={improvedSkills}
            skillLevels={effectiveSkillLevels}
          />
        )}

        {/* ═══════════════ LEARNING PATH TAB ═══════════════ */}
        {tab === 'learning' && (
          <>
            {/* STEP 1: Role Selection */}
            {step === 'role' && (
              <div>
                <h2 className="font-display text-3xl text-gray-900 mb-2">Select Your Job Role</h2>
                <p className="text-gray-500 mb-6">
                  We'll show only competencies relevant to your selected role. Choose from {jobRoles.length}+ roles.
                </p>

                {/* Search */}
                <div className="relative mb-6">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                  <input
                    type="text"
                    value={roleSearch}
                    onChange={(e) => setRoleSearch(e.target.value)}
                    placeholder="Search by role title or department…"
                    className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {roleSearch ? (
                  // Flat search results
                  <div>
                    <div className="text-xs text-gray-500 mb-3">{filteredRoles.length} roles found</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {filteredRoles.map((role) => (
                        <RoleCard key={role.id} role={role} selected={selectedRole?.id === role.id} onSelect={setSelectedRole} />
                      ))}
                    </div>
                  </div>
                ) : (
                  // Grouped by category
                  <div className="space-y-6">
                    {Object.entries(rolesByGroup).map(([group, roles]) => (
                      <div key={group}>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                          {roleGroupLabels[group as keyof typeof roleGroupLabels]}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {roles.map((role) => (
                            <RoleCard key={role.id} role={role} selected={selectedRole?.id === role.id} onSelect={setSelectedRole} />
                          ))}
                        </div>
                      </div>
                    ))}
                    {/* Other / Custom */}
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">G. Other / Custom Role</div>
                      <button className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-left hover:border-blue-400 transition-all text-sm text-gray-500 w-full sm:w-auto">
                        <span className="text-2xl block mb-1">➕</span>
                        <span className="font-medium">Other / Custom Role</span>
                        <span className="block text-xs text-gray-400 mt-0.5">Specify your own role</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-end">
                  <button
                    disabled={!selectedRole}
                    onClick={() => setStep('profile')}
                    className="bg-[#1e3a8a] text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-40 hover:bg-[#1e40af] transition-colors"
                  >
                    Next: Officer Profile →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Officer Profile */}
            {step === 'profile' && selectedRole && (
              <div>
                <button onClick={() => setStep('role')} className="text-sm text-blue-600 mb-4 flex items-center gap-1">← Back</button>
                <h2 className="font-display text-3xl text-gray-900 mb-1">Officer Profile</h2>
                <p className="text-gray-500 mb-6">
                  Tell us about your background so we can personalise your competency assessment for <strong>{selectedRole.title}</strong>.
                </p>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {([
                      { key: 'department', label: 'Department / Organisation', placeholder: 'e.g. MoSPI, State DES, NIC' },
                      { key: 'designation', label: 'Current Designation', placeholder: 'e.g. Statistical Officer Grade II' },
                      { key: 'assignment', label: 'Current Assignment', placeholder: 'e.g. Price Statistics, NSSO Survey' },
                      { key: 'yearsExp', label: 'Years of Experience', placeholder: 'e.g. 3 years' },
                      { key: 'education', label: 'Educational Qualification', placeholder: 'e.g. M.Stat (ISI), B.Sc Statistics' },
                      { key: 'toolsUsed', label: 'Technologies/Tools Already Used', placeholder: 'e.g. Excel, SPSS, R, SQL' },
                    ] as { key: keyof OfficerProfile; label: string; placeholder: string }[]).map((f) => (
                      <div key={f.key}>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">{f.label}</label>
                        <input
                          type="text"
                          value={profile[f.key]}
                          onChange={(e) => setProfile((p) => ({ ...p, [f.key]: e.target.value }))}
                          placeholder={f.placeholder}
                          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    ))}
                    {([
                      { key: 'prevTraining', label: 'Previous Trainings Completed', placeholder: 'e.g. NSSTA Sampling Course, SPSS Training' },
                      { key: 'responsibilities', label: 'Current Responsibilities', placeholder: 'e.g. Compiling district-level price data, report writing' },
                      { key: 'interests', label: 'Future Career / Skill Interests', placeholder: 'e.g. Data Science, GIS, Policy Analysis' },
                    ] as { key: keyof OfficerProfile; label: string; placeholder: string }[]).map((f) => (
                      <div key={f.key} className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">{f.label}</label>
                        <textarea
                          value={profile[f.key]}
                          onChange={(e) => setProfile((p) => ({ ...p, [f.key]: e.target.value }))}
                          placeholder={f.placeholder}
                          rows={2}
                          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setStep('assessment')}
                    className="bg-[#1e3a8a] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1e40af] transition-colors"
                  >
                    Start Competency Assessment →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Competency Assessment */}
            {step === 'assessment' && selectedRole && (
              <div>
                <button onClick={() => setStep('profile')} className="text-sm text-blue-600 mb-4 flex items-center gap-1">← Back</button>
                <h2 className="font-display text-3xl text-gray-900 mb-1">Competency Self-Assessment</h2>
                <p className="text-gray-500 mb-6">
                  Rate your proficiency for each competency required as a <strong>{selectedRole.title}</strong>.
                  Only relevant skills are shown.
                </p>

                {/* Group by category */}
                {(['statistical','sectoral','programming','ai_ml','dataviz','gis','digital_gov','behavioural'] as const).map((cat) => {
                  const catSkills = selectedRole.relevantSkillIds
                    .map((id) => skillById[id])
                    .filter((s) => s && s.category === cat);
                  if (!catSkills.length) return null;

                  const catLabels: Record<string, string> = {
                    statistical: '📐 Statistical Competencies',
                    sectoral: '🏭 Sectoral Statistics',
                    programming: '💻 Programming & Data Technology',
                    ai_ml: '🤖 AI & Machine Learning',
                    dataviz: '📊 Data Visualization & Analytics',
                    gis: '🗺️ GIS & Spatial Analytics',
                    digital_gov: '🔐 Digital Governance',
                    behavioural: '🤝 Behavioural & Managerial',
                  };

                  return (
                    <div key={cat} className="mb-6">
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">{catLabels[cat]}</div>
                      <div className="space-y-3">
                        {catSkills.map((skill) => {
                          if (!skill) return null;
                          const required = selectedRole.requiredLevels[skill.id] ?? 'beginner';
                          const current = skillLevels[skill.id] ?? null;
                          return (
                            <div key={skill.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <div className="font-medium text-gray-900 text-sm">{skill.name}</div>
                                  <div className="text-xs text-gray-400 mt-0.5">{skill.description}</div>
                                </div>
                                <div className="flex-shrink-0 ml-3">
                                  <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-semibold border border-amber-100">
                                    Required: {levelLabel[required]}
                                  </span>
                                </div>
                              </div>
                              <div className="grid grid-cols-5 gap-1.5">
                                {(['none','beginner','intermediate','advanced','na'] as SkillLevel[]).map((lvl) => {
                                  const isSelected = current === lvl;
                                  const colors: Record<SkillLevel, string> = {
                                    none: 'bg-gray-50 text-gray-500 border-gray-200 data-[sel=true]:bg-gray-600 data-[sel=true]:text-white data-[sel=true]:border-gray-600',
                                    beginner: 'bg-red-50 text-red-600 border-red-100 data-[sel=true]:bg-red-500 data-[sel=true]:text-white data-[sel=true]:border-red-500',
                                    intermediate: 'bg-amber-50 text-amber-600 border-amber-100 data-[sel=true]:bg-amber-500 data-[sel=true]:text-white data-[sel=true]:border-amber-500',
                                    advanced: 'bg-green-50 text-green-600 border-green-100 data-[sel=true]:bg-green-500 data-[sel=true]:text-white data-[sel=true]:border-green-500',
                                    na: 'bg-slate-50 text-slate-400 border-slate-100 data-[sel=true]:bg-slate-400 data-[sel=true]:text-white data-[sel=true]:border-slate-400',
                                  };
                                  return (
                                    <button
                                      key={lvl}
                                      data-sel={isSelected}
                                      onClick={() => setSkillLevels((p) => ({ ...p, [skill.id]: lvl }))}
                                      className={`border rounded-lg py-1.5 px-1 text-[10px] font-semibold text-center transition-all hover:scale-[1.03] ${colors[lvl]} ${isSelected ? 'shadow-sm scale-[1.03]' : ''}`}
                                    >
                                      {lvl === 'none' ? 'None' : lvl === 'na' ? 'N/A' : lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setStep('gap')}
                    className="bg-[#1e3a8a] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1e40af] transition-colors"
                  >
                    View Gap Analysis →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Gap Analysis */}
            {step === 'gap' && selectedRole && (
              <div>
                <button onClick={() => setStep('assessment')} className="text-sm text-blue-600 mb-4 flex items-center gap-1">← Back</button>
                <h2 className="font-display text-3xl text-gray-900 mb-1">AI Skill-Gap Analysis</h2>
                <p className="text-gray-500 mb-6">Your current vs required competency profile for <strong>{selectedRole.title}</strong>.</p>

                {/* Score banner */}
                <div className="bg-gradient-to-r from-[#1e3a8a] to-[#1d4ed8] text-white rounded-2xl p-6 mb-6 flex items-center gap-6">
                  <div className="text-center">
                    <div className="font-display text-5xl">{overallScore}%</div>
                    <div className="text-blue-200 text-xs mt-1">Overall Competency</div>
                  </div>
                  <div className="flex-1">
                    <div className="h-3 bg-white/20 rounded-full overflow-hidden mb-4">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${overallScore}%` }} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-bold text-2xl text-green-300">{metSkills.length}</div>
                        <div className="text-blue-200 text-xs">Skills meeting required level</div>
                      </div>
                      <div>
                        <div className="font-bold text-2xl text-red-300">{gapSkills.length}</div>
                        <div className="text-blue-200 text-xs">Skill gaps identified</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Radar chart */}
                {gapAnalysis.length > 2 && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm mb-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Competency Radar</h3>
                    <ResponsiveContainer width="100%" height={280}>
                      <RadarChart data={gapAnalysis.slice(0, 10).map((g) => ({
                        subject: g.skill.name.split(' ')[0],
                        current: g.current,
                        required: g.required,
                      }))}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                        <Radar name="Required" dataKey="required" stroke="#94a3b8" fill="#e2e8f0" fillOpacity={0.3} />
                        <Radar name="Current" dataKey="current" stroke="#1d4ed8" fill="#3b82f6" fillOpacity={0.5} />
                      </RadarChart>
                    </ResponsiveContainer>
                    <div className="flex items-center justify-center gap-6 text-xs mt-2">
                      <div className="flex items-center gap-1.5"><div className="h-2 w-6 rounded bg-slate-300" /> Required</div>
                      <div className="flex items-center gap-1.5"><div className="h-2 w-6 rounded bg-blue-500" /> Current</div>
                    </div>
                  </div>
                )}

                {/* Met skills */}
                {metSkills.length > 0 && (
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-green-700 mb-3 flex items-center gap-2">
                      <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-xs">✓</span>
                      Skills Meeting Required Level ({metSkills.length})
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {metSkills.map((g) => (
                        <div key={g.skill.id} className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1 text-xs text-green-700 font-medium">
                          ✓ {g.skill.name}
                          <span className="text-green-500">({levelLabel[g.currentLvl]})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gap skills */}
                {gapSkills.length > 0 && (
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-red-600 mb-3 flex items-center gap-2">
                      <span className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-xs">!</span>
                      Identified Skill Gaps ({gapSkills.length}) — sorted by priority
                    </div>
                    <div className="space-y-2">
                      {gapSkills.map((g) => {
                        const pct = g.required > 0 ? Math.round((g.current / g.required) * 100) : 100;
                        return (
                          <div key={g.skill.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-sm text-gray-900">{g.skill.name}</span>
                              <div className="flex items-center gap-2 text-xs">
                                <span className="text-gray-500">Current: <strong>{levelLabel[g.currentLvl]}</strong></span>
                                <span className="text-gray-300">→</span>
                                <span className="text-gray-500">Required: <strong>{levelLabel[g.requiredLvl]}</strong></span>
                                <span className="bg-red-50 text-red-600 border border-red-100 px-2 py-0.5 rounded-full font-semibold">⚠ Gap: {g.gap}pts</span>
                              </div>
                            </div>
                            <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="absolute h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                              <div className="absolute top-0 h-full w-0.5 bg-[#1e3a8a]" style={{ left: '100%' }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {gapSkills.length === 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center mb-6">
                    <div className="text-4xl mb-2">🏆</div>
                    <div className="font-semibold text-green-800 text-lg">All required competencies met!</div>
                    <p className="text-green-600 text-sm mt-1">You have achieved the required levels. Take the assessment to certify your skills.</p>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    onClick={() => setStep('path')}
                    className="bg-[#1e3a8a] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1e40af] transition-colors"
                  >
                    View Personalised Learning Path →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Personalised Learning Path */}
            {step === 'path' && selectedRole && (
              <div>
                <button onClick={() => setStep('gap')} className="text-sm text-blue-600 mb-4 flex items-center gap-1">← Back</button>
                <h2 className="font-display text-3xl text-gray-900 mb-1">Personalised Learning Path</h2>
                <p className="text-gray-500 mb-6">
                  {recommendedCourses.length} iGOT / NSSTA courses recommended to close your skill gaps.
                </p>

                {/* Flow diagram */}
                {gapSkills.length > 0 && (
                  <div className="mb-8 overflow-x-auto">
                    <div className="flex items-center gap-2 min-w-max pb-2">
                      {gapSkills.slice(0, 5).map((g, i) => (
                        <div key={g.skill.id} className="flex items-center gap-2">
                          <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-700 font-semibold text-center min-w-[80px]">
                            {g.skill.name.split(' ')[0]}
                            <div className="text-[10px] text-red-400 font-normal mt-0.5">Gap: {g.gap}pts</div>
                          </div>
                          <div className="text-gray-300">→</div>
                          <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-xs text-blue-700 text-center min-w-[80px]">
                            iGOT Course
                            <div className="text-[10px] text-blue-400 font-normal mt-0.5">+ MCQ Test</div>
                          </div>
                          <div className="text-gray-300">→</div>
                          <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-xs text-green-700 text-center min-w-[80px]">
                            ↑ Competency
                            <div className="text-[10px] text-green-500 font-normal mt-0.5">Updated</div>
                          </div>
                          {i < Math.min(gapSkills.length, 5) - 1 && <div className="text-gray-200 text-xl mx-1">|</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Improvement notifications */}
                {Object.keys(improvedSkills).length > 0 && (
                  <div className="mb-6 space-y-2">
                    {Object.entries(improvedSkills).map(([skillId, newLevel]) => {
                      const skill = skillById[skillId];
                      const prevLevel = skillLevels[skillId] ?? 'none';
                      return (
                        <div key={skillId} className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-xl p-3 flex items-center gap-3">
                          <span className="text-xl">↑</span>
                          <div className="text-sm">
                            <strong className="text-green-800">{skill?.name}</strong>
                            <span className="text-green-600"> improved: </span>
                            <span className="text-gray-500">{levelLabel[prevLevel]}</span>
                            <span className="text-green-600"> → </span>
                            <strong className="text-green-800">{levelLabel[newLevel]}</strong>
                          </div>
                          <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                            ↑ Competency Improved
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {recommendedCourses.length === 0 ? (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                    <div className="text-4xl mb-2">🎉</div>
                    <div className="font-semibold text-green-800">All skill gaps closed!</div>
                    <p className="text-green-600 text-sm mt-1">Proceed to the MCQ assessment to certify your competencies.</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {gapSkills.map((g) => {
                      const courses = recommendedCourses.filter((c) => c.skillId === g.skill.id);
                      if (!courses.length) return null;
                      return (
                        <div key={g.skill.id}>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="h-6 w-6 rounded-full bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center">!</span>
                            <span className="font-semibold text-gray-900 text-sm">{g.skill.name}</span>
                            <span className="text-xs text-gray-400">{levelLabel[g.currentLvl]} → {levelLabel[g.requiredLvl]}</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {courses.map((course) => {
                              const done = completedCourses.has(course.id);
                              return (
                                <div key={course.id} className={`rounded-2xl border shadow-sm overflow-hidden ${done ? 'border-green-200 bg-green-50' : 'bg-white border-gray-100'}`}>
                                  <img src={course.thumbnail} alt={course.title} className="w-full h-28 object-cover bg-gray-100" />
                                  <div className="p-4">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                                        course.difficulty === 'Foundation' ? 'bg-blue-100 text-blue-700' :
                                        course.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-700' :
                                        'bg-red-100 text-red-700'
                                      }`}>{course.difficulty}</span>
                                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                                        course.source === 'iGOT' ? 'bg-[#1e3a8a] text-white' :
                                        course.source === 'NSSTA' ? 'bg-teal-600 text-white' :
                                        'bg-gray-600 text-white'
                                      }`}>{course.source}</span>
                                    </div>
                                    <div className="font-semibold text-gray-900 text-sm leading-snug mb-1">{course.title}</div>
                                    <div className="text-xs text-gray-500 mb-3">
                                      🏛️ {course.provider} · ⏱ {course.durationHrs}h
                                    </div>
                                    {done ? (
                                      <div className="flex items-center gap-2 text-green-700 text-xs font-semibold bg-green-100 rounded-lg px-3 py-2">
                                        ✓ Completed
                                        <span className="ml-auto text-green-500">Competency updated!</span>
                                      </div>
                                    ) : (
                                      <div className="flex gap-2">
                                        <a
                                          href={course.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex-1 text-center bg-[#1e3a8a] text-white text-xs font-semibold py-2 rounded-lg hover:bg-[#1e40af] transition-colors"
                                        >
                                          Start on iGOT →
                                        </a>
                                        <button
                                          onClick={() => completeCourseMark(course.id, course.skillId)}
                                          className="text-xs bg-green-50 border border-green-200 text-green-700 font-semibold px-3 py-2 rounded-lg hover:bg-green-100 transition-colors"
                                        >
                                          Mark Done
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => {
                      setMcqSkill('');
                      setMcqAnswers({});
                      setMcqSubmitted(false);
                      setStep('mcq');
                    }}
                    className="bg-amber-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-amber-600 transition-colors"
                  >
                    Take MCQ Assessment →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: MCQ */}
            {step === 'mcq' && selectedRole && (
              <div>
                <button onClick={() => setStep('path')} className="text-sm text-blue-600 mb-4 flex items-center gap-1">← Back</button>
                <h2 className="font-display text-3xl text-gray-900 mb-1">Competency Assessment</h2>
                <p className="text-gray-500 mb-6">Verify your knowledge with a skill-based MCQ test.</p>

                {/* Skill selector */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 block">Select Skill to Test</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedRole.relevantSkillIds.map((id) => {
                      const hasQs = mcqBank.some((q) => q.skillId === id);
                      if (!hasQs) return null;
                      return (
                        <button
                          key={id}
                          onClick={() => { setMcqSkill(id); setMcqAnswers({}); setMcqSubmitted(false); }}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                            mcqSkill === id ? 'bg-[#1e3a8a] text-white border-[#1e3a8a]' : 'text-gray-700 border-gray-300 hover:border-blue-400 bg-white'
                          }`}
                        >
                          {skillById[id]?.name ?? id}
                        </button>
                      );
                    })}
                    {/* Fallback: show some general MCQ skills */}
                    {['policy','financial','leadership','digital','data','law','crisis','publichealth','environment','land','communication'].map((id) => {
                      const hasQs = mcqBank.some((q) => q.skillId === id);
                      if (!hasQs) return null;
                      if (selectedRole.relevantSkillIds.includes(id)) return null;
                      return (
                        <button
                          key={id}
                          onClick={() => { setMcqSkill(id); setMcqAnswers({}); setMcqSubmitted(false); }}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                            mcqSkill === id ? 'bg-[#1e3a8a] text-white border-[#1e3a8a]' : 'text-gray-600 border-gray-200 hover:border-blue-300 bg-gray-50'
                          }`}
                        >
                          {id}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {!mcqSkill ? (
                  <div className="bg-gray-50 rounded-2xl p-8 text-center text-gray-400">Select a skill above to start the assessment.</div>
                ) : activeMCQs.length === 0 ? (
                  <div className="bg-gray-50 rounded-2xl p-8 text-center text-gray-400">No MCQs available for this skill yet.</div>
                ) : (
                  <div className="space-y-5">
                    {activeMCQs.map((q, qi) => (
                      <div key={q.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-start gap-3 mb-4">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1e3a8a] text-white text-xs font-bold flex items-center justify-center">{qi + 1}</span>
                          <p className="text-gray-900 text-sm font-medium leading-relaxed">{q.question}</p>
                        </div>
                        <div className="space-y-2 ml-9">
                          {q.options.map((opt, oi) => {
                            const isSelected = mcqAnswers[q.id] === oi;
                            const isCorrect = oi === q.correct;
                            let cls = 'border border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300 hover:bg-blue-50';
                            if (mcqSubmitted) {
                              if (isCorrect) cls = 'border-green-500 bg-green-50 text-green-800';
                              else if (isSelected) cls = 'border-red-400 bg-red-50 text-red-700';
                              else cls = 'border-gray-100 bg-gray-50 text-gray-400';
                            } else if (isSelected) {
                              cls = 'border-[#1e3a8a] bg-blue-50 text-[#1e3a8a]';
                            }
                            return (
                              <button
                                key={oi}
                                disabled={mcqSubmitted}
                                onClick={() => setMcqAnswers((p) => ({ ...p, [q.id]: oi }))}
                                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all ${cls}`}
                              >
                                <span className="font-semibold mr-2">{String.fromCharCode(65 + oi)}.</span>{opt}
                              </button>
                            );
                          })}
                        </div>
                        {mcqSubmitted && (
                          <div className="ml-9 mt-3 text-xs text-gray-600 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                            💡 {q.explanation}
                          </div>
                        )}
                      </div>
                    ))}

                    {!mcqSubmitted ? (
                      <button
                        disabled={Object.keys(mcqAnswers).length < activeMCQs.length}
                        onClick={() => setMcqSubmitted(true)}
                        className="w-full bg-amber-500 text-white py-3 rounded-xl font-semibold hover:bg-amber-600 disabled:opacity-40 transition-colors"
                      >
                        Submit Answers
                      </button>
                    ) : (
                      <div className="bg-gradient-to-r from-[#1e3a8a] to-[#1d4ed8] text-white rounded-2xl p-6 text-center">
                        <div className="font-display text-4xl mb-1">{mcqScore}/{activeMCQs.length}</div>
                        <div className="text-blue-200 text-sm mb-3">{Math.round((mcqScore / activeMCQs.length) * 100)}% correct</div>
                        <div className={`text-sm font-semibold mb-4 ${mcqScore / activeMCQs.length >= 0.8 ? 'text-green-300' : 'text-amber-300'}`}>
                          {mcqScore / activeMCQs.length >= 0.8
                            ? '🎉 Excellent! Competency verified. Your profile has been updated.'
                            : '📚 Review the recommended courses to strengthen your knowledge.'}
                        </div>
                        <button
                          onClick={() => { setMcqAnswers({}); setMcqSubmitted(false); }}
                          className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-lg text-sm font-medium"
                        >
                          Retake Test
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────

function RoleCard({ role, selected, onSelect }: { role: JobRole; selected: boolean; onSelect: (r: JobRole) => void }) {
  return (
    <button
      onClick={() => onSelect(role)}
      className={`text-left p-4 rounded-xl border-2 transition-all hover:shadow-sm w-full ${
        selected ? 'border-[#1e3a8a] bg-blue-50 shadow-md' : 'border-gray-200 bg-white hover:border-blue-300'
      }`}
    >
      <div className="text-2xl mb-2">{role.icon}</div>
      <div className="font-semibold text-gray-900 text-sm leading-snug">{role.title}</div>
      <div className="text-xs text-gray-500 mt-0.5">{role.department}</div>
      <div className="mt-2 text-[10px] text-blue-600 font-semibold">{role.relevantSkillIds.length} competencies</div>
    </button>
  );
}

type GapItemExternal = { skill: (typeof allSkills)[0]; currentLvl: SkillLevel; requiredLvl: SkillLevel; current: number; required: number; gap: number; met: boolean };

function ProgressTab({
  officer, selectedRole, gapAnalysis, overallScore, completedCourses, improvedSkills, skillLevels,
}: {
  officer: { id: string; name: string };
  selectedRole: JobRole | null;
  gapAnalysis: GapItemExternal[];
  overallScore: number;
  completedCourses: Set<string>;
  improvedSkills: Record<string, SkillLevel>;
  skillLevels: Record<string, SkillLevel>;
}) {
  if (!selectedRole) {
    return (
      <div className="text-center py-16 text-gray-400">
        <div className="text-5xl mb-4">📊</div>
        <div className="text-lg font-medium text-gray-500">No data yet</div>
        <p className="text-sm mt-1">Complete your role selection and competency assessment to see your progress here.</p>
      </div>
    );
  }

  const barData = gapAnalysis.slice(0, 8).map((g) => ({
    name: g.skill.name.split(' ')[0],
    current: g.current,
    required: g.required,
  }));

  return (
    <div>
      <h2 className="font-display text-3xl text-gray-900 mb-6">My Progress Dashboard</h2>

      {/* Profile summary */}
      <div className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] text-white rounded-2xl p-5 mb-6 flex items-center gap-5">
        <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">
          {selectedRole.icon}
        </div>
        <div>
          <div className="text-blue-200 text-xs uppercase tracking-wider">Officer Profile</div>
          <div className="font-display text-2xl">{officer.name}</div>
          <div className="text-blue-200 text-sm">{selectedRole.title} · {selectedRole.department}</div>
        </div>
        <div className="ml-auto text-right">
          <div className="font-display text-4xl">{overallScore}%</div>
          <div className="text-blue-200 text-xs">Overall Competency</div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Skills Assessed', value: gapAnalysis.length, icon: '📋' },
          { label: 'Skills Met', value: gapAnalysis.filter((g) => g.met).length, icon: '✅' },
          { label: 'Skill Gaps', value: gapAnalysis.filter((g) => !g.met).length, icon: '⚠️' },
          { label: 'Courses Completed', value: completedCourses.size, icon: '🎓' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="font-display text-3xl text-[#1e3a8a]">{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      {barData.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Current vs Required by Skill</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f4ff" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v, n) => [`${v}`, n === 'current' ? 'Your Level' : 'Required']} />
              <Bar dataKey="required" fill="#e2e8f0" radius={[3, 3, 0, 0]} name="required">
                {barData.map((_, i) => <Cell key={i} fill="#e2e8f0" />)}
              </Bar>
              <Bar dataKey="current" radius={[3, 3, 0, 0]} name="current">
                {barData.map((entry, i) => (
                  <Cell key={i} fill={entry.current >= entry.required ? '#22c55e' : '#1d4ed8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-6 text-xs mt-2 justify-center">
            <div className="flex items-center gap-1.5"><div className="h-2 w-5 rounded bg-slate-200" /> Required</div>
            <div className="flex items-center gap-1.5"><div className="h-2 w-5 rounded bg-blue-600" /> Your Level</div>
            <div className="flex items-center gap-1.5"><div className="h-2 w-5 rounded bg-green-500" /> Goal Reached</div>
          </div>
        </div>
      )}

      {/* Improvements */}
      {Object.keys(improvedSkills).length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
          <div className="font-semibold text-green-800 mb-3">↑ Competency Improvements</div>
          <div className="space-y-2">
            {Object.entries(improvedSkills).map(([skillId, newLevel]) => {
              const skill = allSkills.find((s) => s.id === skillId);
              const prev = skillLevels[skillId] ?? 'none';
              return (
                <div key={skillId} className="flex items-center gap-3 text-sm">
                  <span className="text-green-500 font-bold">↑</span>
                  <strong className="text-green-800">{skill?.name}</strong>
                  <span className="text-gray-400 text-xs">{levelLabel[prev as SkillLevel]} → {levelLabel[newLevel]}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
