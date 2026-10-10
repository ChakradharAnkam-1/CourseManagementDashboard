import { useState } from 'react';
import { exams, stageLabels, stageIcons, categoryLabels, type Exam } from '../examData';

export default function ExamGuide() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [activeSection, setActiveSection] = useState<'timeline' | 'syllabus' | 'pattern' | 'tips' | 'centres'>('timeline');

  const categories = ['all', ...Array.from(new Set(exams.map((e) => e.category)))];

  const filtered = exams.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.fullName.toLowerCase().includes(search.toLowerCase()) ||
      e.conductedBy.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || e.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedExam) {
    return <ExamDetail exam={selectedExam} onBack={() => { setSelectedExam(null); setActiveSection('timeline'); }} />;
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-display text-3xl text-gray-900 mb-2">Exam Guide</h2>
        <p className="text-gray-500">
          Complete step-by-step guidance for competitive exams — from eligibility to counselling.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search exams (JEE, GATE, UPSC…)"
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                selectedCategory === cat
                  ? 'bg-[#1e3a8a] text-white border-[#1e3a8a]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
              }`}
            >
              {cat === 'all' ? 'All Exams' : categoryLabels[cat] ?? cat}
            </button>
          ))}
        </div>
      </div>

      {/* Exam cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((exam) => {
          const currentStageIdx = exam.timeline.findIndex((t) => t.status === 'active');
          const currentStage = currentStageIdx >= 0 ? exam.timeline[currentStageIdx] : null;
          const completedCount = exam.timeline.filter((t) => t.status === 'completed').length;
          const pct = Math.round((completedCount / exam.timeline.length) * 100);

          return (
            <button
              key={exam.id}
              onClick={() => setSelectedExam(exam)}
              className="text-left bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{exam.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{exam.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{exam.fullName}</div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  exam.category === 'engineering' ? 'bg-blue-100 text-blue-700' :
                  exam.category === 'medical' ? 'bg-green-100 text-green-700' :
                  exam.category === 'civil_services' ? 'bg-amber-100 text-amber-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {categoryLabels[exam.category]}
                </span>
              </div>

              <p className="text-xs text-gray-500 mb-3 leading-relaxed">{exam.description}</p>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500">Application Progress</span>
                  <span className="font-semibold text-[#1e3a8a]">{pct}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  {currentStage && (
                    <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200 font-medium">
                      ▶ {stageLabels[currentStage.stage]}
                    </span>
                  )}
                </div>
                <div className="text-gray-400">
                  {exam.nextExamDate && <span>📅 {exam.nextExamDate}</span>}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <div className="text-4xl mb-3">🔍</div>
          <div>No exams found for "{search}". Try searching JEE, GATE, UPSC, NEET, or SSC.</div>
        </div>
      )}
    </div>
  );
}

function ExamDetail({ exam, onBack }: { exam: Exam; onBack: () => void }) {
  const [section, setSection] = useState<'timeline' | 'syllabus' | 'pattern' | 'tips' | 'centres'>('timeline');

  const sectionTabs = [
    { key: 'timeline', label: '📅 Timeline', icon: '📅' },
    { key: 'syllabus', label: '📚 Syllabus', icon: '📚' },
    { key: 'pattern', label: '📋 Exam Pattern', icon: '📋' },
    { key: 'tips', label: '💡 Tips', icon: '💡' },
    { key: 'centres', label: '📍 Centres', icon: '📍' },
  ] as const;

  const completedCount = exam.timeline.filter((t) => t.status === 'completed').length;
  const activeIdx = exam.timeline.findIndex((t) => t.status === 'active');

  return (
    <div>
      {/* Back + Header */}
      <button onClick={onBack} className="text-sm text-blue-600 mb-4 flex items-center gap-1">
        ← Back to Exam List
      </button>

      <div className="bg-gradient-to-r from-[#1e3a8a] to-[#1d4ed8] text-white rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <span className="text-4xl">{exam.icon}</span>
          <div className="flex-1">
            <div className="text-blue-200 text-xs font-medium uppercase tracking-wider mb-1">{categoryLabels[exam.category]}</div>
            <h2 className="font-display text-3xl mb-1">{exam.name}</h2>
            <div className="text-blue-200 text-sm">{exam.fullName}</div>
            <div className="text-blue-300 text-xs mt-1">Conducted by: {exam.conductedBy}</div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Frequency', value: exam.frequency },
            { label: 'Next Exam', value: exam.nextExamDate ?? 'TBA' },
            { label: 'Result', value: exam.resultDate ?? 'TBA' },
            { label: 'Stage', value: `${completedCount}/${exam.timeline.length} done` },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 rounded-xl p-3">
              <div className="text-blue-300 text-[10px] uppercase tracking-wide mb-0.5">{s.label}</div>
              <div className="font-semibold text-sm">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Eligibility quick summary */}
        <div className="mt-4 bg-white/10 rounded-xl p-4">
          <div className="text-blue-200 text-xs font-semibold mb-2 uppercase tracking-wide">Eligibility</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-blue-100">
            {exam.eligibility.age && <div>🎂 Age: {exam.eligibility.age}</div>}
            <div>🎓 Qualification: {exam.eligibility.qualification}</div>
            {exam.eligibility.percentage && <div>📊 Min Marks: {exam.eligibility.percentage}</div>}
            {exam.eligibility.attempts && <div>🔄 Attempts: {exam.eligibility.attempts}</div>}
          </div>
        </div>
      </div>

      {/* Section tabs */}
      <div className="flex gap-0 overflow-x-auto border-b border-gray-200 mb-6 bg-white rounded-xl">
        {sectionTabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setSection(t.key)}
            className={`flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
              section === t.key
                ? 'border-[#1e3a8a] text-[#1e3a8a]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.icon} {t.label.split(' ').slice(1).join(' ')}
          </button>
        ))}
      </div>

      {/* TIMELINE */}
      {section === 'timeline' && (
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
          <div className="space-y-0">
            {exam.timeline.map((stage, idx) => {
              const isActive = stage.status === 'active';
              const isDone = stage.status === 'completed';
              const isExamDay = stage.stage === 'exam_day';

              return (
                <div key={stage.stage} className="relative flex gap-4 pl-14 pb-6">
                  {/* Circle indicator */}
                  <div className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center text-lg border-2 z-10 ${
                    isExamDay ? 'bg-[#1e3a8a] border-[#1e3a8a] text-white shadow-lg shadow-blue-300 scale-110'
                    : isDone ? 'bg-green-500 border-green-500 text-white'
                    : isActive ? 'bg-amber-400 border-amber-400 text-white animate-pulse'
                    : 'bg-white border-gray-300 text-gray-400'
                  }`}>
                    {isDone ? '✓' : stageIcons[stage.stage]}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 rounded-xl p-4 border ${
                    isExamDay ? 'bg-[#1e3a8a] text-white border-[#1e3a8a] shadow-md'
                    : isActive ? 'bg-amber-50 border-amber-200'
                    : isDone ? 'bg-green-50 border-green-100'
                    : 'bg-white border-gray-100'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <div className={`font-semibold text-sm ${isExamDay ? 'text-white' : 'text-gray-900'}`}>
                        {isExamDay && <span className="mr-2 bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-bold">★ KEY DATE</span>}
                        {stageLabels[stage.stage]}
                      </div>
                      <div className={`text-xs ${isExamDay ? 'text-blue-200' : 'text-gray-500'}`}>{stage.date}</div>
                    </div>
                    <p className={`text-xs leading-relaxed mb-2 ${isExamDay ? 'text-blue-100' : 'text-gray-600'}`}>
                      {stage.description}
                    </p>
                    {stage.actionUrl && (
                      <a
                        href={stage.actionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                          isExamDay ? 'bg-white text-[#1e3a8a] hover:bg-blue-50'
                          : isActive ? 'bg-amber-500 text-white hover:bg-amber-600'
                          : isDone ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-[#1e3a8a] text-white hover:bg-[#1e40af]'
                        }`}
                      >
                        {stage.actionLabel} →
                      </a>
                    )}

                    {/* Exam day special: QR code area */}
                    {isExamDay && (
                      <div className="mt-3 bg-white/10 rounded-lg p-3 flex items-center gap-3">
                        <div className="h-12 w-12 bg-white rounded flex items-center justify-center">
                          <div className="grid grid-cols-3 gap-0.5">
                            {Array.from({ length: 9 }).map((_, i) => (
                              <div key={i} className={`h-3 w-3 ${[0,1,3,5,6,8].includes(i) ? 'bg-gray-900' : 'bg-white'}`} />
                            ))}
                          </div>
                        </div>
                        <div className="text-blue-100 text-xs">
                          <div className="font-semibold text-white mb-0.5">Exam Day Checklist</div>
                          <div>📍 Scan QR on admit card for exact centre location</div>
                          <div>🎫 Carry admit card + original Aadhaar/ID</div>
                          <div>⏰ Reach centre at least 60 minutes early</div>
                        </div>
                      </div>
                    )}

                    {/* Result stage: what to do after */}
                    {stage.stage === 'result' && (
                      <div className="mt-2 text-xs bg-blue-50 border border-blue-100 rounded-lg p-2 text-blue-700">
                        🎉 If you qualify → proceed to counselling immediately
                        <br />
                        📚 If you don't → check our roadmap for next attempt below
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* After result actions */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <div className="text-2xl mb-2">🎉</div>
              <div className="font-semibold text-green-800 mb-1">If You Qualify</div>
              <ul className="text-xs text-green-700 space-y-1">
                <li>→ Register for counselling immediately</li>
                <li>→ Keep documents ready (mark sheets, category cert, photo ID)</li>
                <li>→ Lock in choices during choice filling</li>
                <li>→ Report to allotted institution before deadline</li>
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="text-2xl mb-2">📈</div>
              <div className="font-semibold text-amber-800 mb-1">If You Need to Re-attempt</div>
              <ul className="text-xs text-amber-700 space-y-1">
                <li>→ Analyse topic-wise weak areas from answer key</li>
                <li>→ Start preparation within 2 weeks</li>
                <li>→ Revise the entire syllabus systematically</li>
                <li>→ Check next cycle dates and register early</li>
                <li>→ Consider coaching or online resources</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SYLLABUS */}
      {section === 'syllabus' && (
        <div className="space-y-4">
          {exam.syllabus.map((sec) => (
            <div key={sec.subject} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-5 py-4 flex items-center justify-between border-b border-gray-100">
                <div className="font-semibold text-gray-900">{sec.subject}</div>
                {sec.weightage && (
                  <span className="bg-[#1e3a8a] text-white text-xs px-3 py-1 rounded-full font-semibold">{sec.weightage}</span>
                )}
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  {sec.topics.map((topic) => (
                    <span key={topic} className="bg-gray-50 border border-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-700">
            💡 Syllabus is as per the official notification. Always verify against the latest official notification at{' '}
            <a href={exam.officialUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline">{exam.officialUrl}</a>
          </div>
        </div>
      )}

      {/* EXAM PATTERN */}
      {section === 'pattern' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(exam.examPattern).map(([key, val]) => (
              <div key={key} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-semibold">
                  {{ mode: 'Mode', duration: 'Duration', sections: 'Sections', marking: 'Marking Scheme', totalMarks: 'Total Marks' }[key] ?? key}
                </div>
                <div className="font-semibold text-gray-900 text-sm">{val}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TIPS */}
      {section === 'tips' && (
        <div className="space-y-3">
          {exam.preparationTips.map((tip, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
              <span className="h-6 w-6 rounded-full bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-gray-700">{tip}</p>
            </div>
          ))}

          <div className="mt-4">
            <div className="font-semibold text-gray-900 mb-3">Important Links</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {exam.importantLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-3 hover:border-blue-400 hover:shadow-sm transition-all"
                >
                  <span className="text-[#1e3a8a]">🔗</span>
                  <span className="text-sm text-gray-700 font-medium">{link.label}</span>
                  <span className="ml-auto text-blue-600 text-xs">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CENTRES */}
      {section === 'centres' && (
        <div>
          <p className="text-sm text-gray-500 mb-4">
            {exam.name} is conducted in {exam.examCentres.length}+ cities across India. Check your nearest centre via admit card after download.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {exam.examCentres.map((city) => (
              <div key={city} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 flex items-center gap-1.5 shadow-sm">
                <span className="text-xs">📍</span>
                {city}
              </div>
            ))}
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
            <strong>On Exam Day:</strong> Your exact exam centre address and room number will be printed on your admit card.
            Use the QR code on the admit card with Google Maps for precise navigation.
            Arrive at least 60 minutes before the reporting time.
          </div>
        </div>
      )}
    </div>
  );
}
