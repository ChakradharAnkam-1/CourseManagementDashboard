import { useState } from 'react';

type UserType = 'officer' | 'official';

type Props = {
  onLogin: (type: UserType, credentials: { id: string; name: string; password: string }) => void;
};

export default function LoginPage({ onLogin }: Props) {
  const [selected, setSelected] = useState<UserType>('officer');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !name || !password) {
      setError('Please fill in all fields.');
      return;
    }
    onLogin(selected, { id, name, password });
  };

  return (
    <div className="min-h-screen bg-[#f0f4ff] flex flex-col">
      {/* Header */}
      <header className="bg-[#1e3a8a] text-white px-6 py-3 flex items-center gap-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/100px-Emblem_of_India.svg.png"
          alt="Government of India"
          className="h-10 w-auto"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div>
          <div className="text-xs font-medium text-blue-200 tracking-widest uppercase">Government of India</div>
          <div className="font-display text-xl leading-tight">iGOT Karmayogi Platform</div>
        </div>
        <div className="ml-auto text-right hidden sm:block">
          <div className="text-xs text-blue-200">Mission Karmayogi</div>
          <div className="text-xs text-blue-300">Integrated Government Online Training</div>
        </div>
      </header>

      {/* Hero section */}
      <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#2563eb] text-white py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-6 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Capacity Building for Civil Servants</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl mb-4 leading-tight">
            Empowering India's Civil Servants
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Access curated training, identify skill gaps, and grow through iGOT's world-class learning ecosystem.
          </p>
        </div>
      </div>

      {/* Login card */}
      <div className="flex-1 flex items-start justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Role selector */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex border-b border-gray-100">
              {(['officer', 'official'] as UserType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => { setSelected(type); setError(''); }}
                  className={`flex-1 py-4 text-sm font-semibold tracking-wide transition-all ${
                    selected === type
                      ? 'bg-[#1e3a8a] text-white'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  {type === 'officer' ? '🎖️ Officer' : '🏢 Official / Admin'}
                </button>
              ))}
            </div>

            <div className="p-6 sm:p-8">
              <div className={`rounded-xl p-4 mb-6 text-sm ${
                selected === 'officer'
                  ? 'bg-blue-50 text-blue-800 border border-blue-100'
                  : 'bg-amber-50 text-amber-800 border border-amber-100'
              }`}>
                {selected === 'officer'
                  ? '👤 Login as an Officer to access your learning dashboard, skill gap analysis, and iGOT courses.'
                  : '🔑 Login as an Official to manage content, generate MCQs, and view officer analytics.'}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                    {selected === 'officer' ? 'Employee ID' : 'Official ID'}
                  </label>
                  <input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder={selected === 'officer' ? 'e.g. IAS/2020/001' : 'e.g. OFF/2023/007'}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
                )}

                <button
                  type="submit"
                  className={`w-full py-3 rounded-lg text-white font-semibold text-sm tracking-wide transition-all hover:opacity-90 active:scale-[0.98] ${
                    selected === 'officer' ? 'bg-[#1e3a8a]' : 'bg-amber-500'
                  }`}
                >
                  Sign In to iGOT →
                </button>
              </form>

              <div className="mt-4 text-center">
                <a href="https://igot.gov.in" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                  Visit iGOT Portal →
                </a>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { label: 'Officers Trained', value: '28L+' },
              { label: 'Courses Available', value: '800+' },
              { label: 'Ministries', value: '75+' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
                <div className="text-xl font-bold text-[#1e3a8a]">{s.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
