export type ExamStage =
  | 'eligibility'
  | 'registration_open'
  | 'form_fill'
  | 'correction_window'
  | 'city_intimation'
  | 'admit_card'
  | 'exam_day'
  | 'answer_key'
  | 'result'
  | 'counselling';

export const stageLabels: Record<ExamStage, string> = {
  eligibility: 'Understand Eligibility',
  registration_open: 'Registration Opens',
  form_fill: 'Complete Application',
  correction_window: 'Application Correction Window',
  city_intimation: 'City Intimation Slip',
  admit_card: 'Admit Card Download',
  exam_day: 'EXAM DAY',
  answer_key: 'Answer Key Released',
  result: 'Result Declared',
  counselling: 'Counselling / Admissions',
};

export const stageIcons: Record<ExamStage, string> = {
  eligibility: '📋',
  registration_open: '🟢',
  form_fill: '📝',
  correction_window: '✏️',
  city_intimation: '🏙️',
  admit_card: '🎫',
  exam_day: '🎯',
  answer_key: '🔑',
  result: '📊',
  counselling: '🎓',
};

export type ExamTimeline = {
  stage: ExamStage;
  date: string; // e.g. "Jan 28, 2025"
  status: 'completed' | 'active' | 'upcoming';
  description: string;
  actionUrl?: string;
  actionLabel?: string;
};

export type SyllabusSection = {
  subject: string;
  topics: string[];
  weightage?: string;
};

export type Exam = {
  id: string;
  name: string;
  fullName: string;
  category: 'engineering' | 'medical' | 'civil_services' | 'defence' | 'banking' | 'teaching' | 'management' | 'law' | 'other';
  conductedBy: string;
  officialUrl: string;
  description: string;
  icon: string;
  frequency: string;
  eligibility: {
    age?: string;
    qualification: string;
    percentage?: string;
    attempts?: string;
  };
  timeline: ExamTimeline[];
  syllabus: SyllabusSection[];
  examPattern: {
    mode: string;
    duration: string;
    sections: string;
    marking: string;
    totalMarks: string;
  };
  preparationTips: string[];
  importantLinks: { label: string; url: string }[];
  examCentres: string[];
  nextExamDate?: string;
  resultDate?: string;
};

export const exams: Exam[] = [
  {
    id: 'jee_mains',
    name: 'JEE Mains',
    fullName: 'Joint Entrance Examination (Main)',
    category: 'engineering',
    conductedBy: 'National Testing Agency (NTA)',
    officialUrl: 'https://jeemain.nta.nic.in',
    description: 'Gateway to NITs, IIITs, and other centrally funded technical institutions. Held twice a year (January & April sessions).',
    icon: '⚙️',
    frequency: 'Twice a year (Jan & Apr)',
    eligibility: {
      age: 'No upper age limit (as of 2024)',
      qualification: 'Class 12 with Physics, Chemistry, Maths',
      percentage: '75% (65% for SC/ST)',
      attempts: '3 consecutive years after Class 12',
    },
    timeline: [
      { stage: 'eligibility', date: 'Oct 2025', status: 'completed', description: 'Check age, educational qualification, subject requirements, and attempt count.', actionUrl: 'https://jeemain.nta.nic.in', actionLabel: 'View Eligibility Criteria' },
      { stage: 'registration_open', date: 'Nov 01, 2025', status: 'completed', description: 'Online registration at jeemain.nta.nic.in. Keep Aadhaar, photograph, signature ready.', actionUrl: 'https://jeemain.nta.nic.in', actionLabel: 'Register Now' },
      { stage: 'form_fill', date: 'Nov 01 – Nov 30, 2025', status: 'completed', description: 'Fill personal, academic, and exam-centre details. Pay fee (₹1000 Gen / ₹500 SC/ST).', actionUrl: 'https://jeemain.nta.nic.in', actionLabel: 'Fill Application' },
      { stage: 'correction_window', date: 'Dec 1–10, 2025', status: 'completed', description: 'Edit personal and academic details. Photo/signature corrections allowed.', actionUrl: 'https://jeemain.nta.nic.in', actionLabel: 'Correction Portal' },
      { stage: 'city_intimation', date: 'Dec 15, 2025', status: 'completed', description: 'City of exam intimated. Download from candidate login portal.', actionUrl: 'https://jeemain.nta.nic.in', actionLabel: 'Check City' },
      { stage: 'admit_card', date: 'Jan 05, 2026', status: 'active', description: 'Download Hall Ticket from NTA portal. Carry original ID proof and photograph.', actionUrl: 'https://jeemain.nta.nic.in', actionLabel: 'Download Admit Card' },
      { stage: 'exam_day', date: 'Jan 22–30, 2026', status: 'upcoming', description: 'Exam in 2 shifts (9 AM–12 PM, 3 PM–6 PM). Reach centre 60 mins early. No electronics.', actionUrl: 'https://jeemain.nta.nic.in', actionLabel: 'Exam Day Guidelines' },
      { stage: 'answer_key', date: 'Feb 02, 2026', status: 'upcoming', description: 'Provisional answer key released. Challenge window open for 3 days with ₹200/challenge.', actionUrl: 'https://jeemain.nta.nic.in', actionLabel: 'View Answer Key' },
      { stage: 'result', date: 'Feb 12, 2026', status: 'upcoming', description: 'NTA Score and Rank declared. Scores valid for 1 year. Download scorecard.', actionUrl: 'https://jeemain.nta.nic.in', actionLabel: 'Check Result' },
      { stage: 'counselling', date: 'Apr – Jun 2026', status: 'upcoming', description: 'JoSAA/CSAB counselling for NIT/IIIT/GFTI seats. Register at josaa.nic.in. Multiple rounds.', actionUrl: 'https://josaa.nic.in', actionLabel: 'JoSAA Counselling' },
    ],
    syllabus: [
      { subject: 'Mathematics', weightage: '33%', topics: ['Sets, Relations & Functions', 'Complex Numbers', 'Matrices & Determinants', 'Permutations & Combinations', 'Sequences & Series', 'Limits & Continuity', 'Integral Calculus', 'Differential Equations', 'Coordinate Geometry', '3D Geometry', 'Vector Algebra', 'Statistics & Probability', 'Mathematical Induction', 'Trigonometry'] },
      { subject: 'Physics', weightage: '33%', topics: ['Mechanics', 'Kinematics', 'Laws of Motion', 'Work, Energy & Power', 'Rotational Motion', 'Gravitation', 'Properties of Solids & Liquids', 'Thermodynamics', 'Kinetic Theory of Gases', 'Oscillations & Waves', 'Electrostatics', 'Current Electricity', 'Magnetic Effects', 'Optics', 'Modern Physics'] },
      { subject: 'Chemistry', weightage: '34%', topics: ['Some Basic Concepts of Chemistry', 'States of Matter', 'Atomic Structure', 'Chemical Bonding', 'Chemical Thermodynamics', 'Solutions', 'Equilibrium', 'Redox Reactions', 'Hydrogen', 's/p/d/f Block Elements', 'Coordination Chemistry', 'Hydrocarbons', 'Organic Chemistry', 'Biomolecules', 'Polymers'] },
    ],
    examPattern: { mode: 'Computer Based Test (CBT)', duration: '3 Hours', sections: '3 Sections (Maths, Physics, Chemistry) × 30 Qs each', marking: '+4 for correct, –1 for wrong (MCQs)', totalMarks: '300' },
    preparationTips: ['Solve previous 10 years\' papers daily', 'Focus on NCERT textbooks for Chemistry', 'Practice 50+ numerical problems per day for Maths', 'Take full-length mock tests every week', 'Maintain a formula sheet for quick revision', 'Watch NTA official video lectures on YouTube', 'Manage time: 1 min/MCQ, 2 min/numerical'],
    importantLinks: [{ label: 'Official NTA JEE Portal', url: 'https://jeemain.nta.nic.in' }, { label: 'JoSAA Counselling', url: 'https://josaa.nic.in' }, { label: 'NTA Student Portal', url: 'https://ntaexamresult.nic.in' }, { label: 'Previous Year Papers (NTA)', url: 'https://jeemain.nta.nic.in' }],
    examCentres: ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Patna', 'Bhopal', 'Chandigarh', 'Guwahati', 'Kochi'],
    nextExamDate: 'Jan 22, 2026',
    resultDate: 'Feb 12, 2026',
  },
  {
    id: 'gate',
    name: 'GATE',
    fullName: 'Graduate Aptitude Test in Engineering',
    category: 'engineering',
    conductedBy: 'IITs & IISc (rotating basis)',
    officialUrl: 'https://gate2026.iitd.ac.in',
    description: 'National exam for M.Tech/PhD admissions in IITs, NITs, IISc and PSU recruitment (BARC, BHEL, NTPC, GAIL, etc.).',
    icon: '🔬',
    frequency: 'Once a year (February)',
    eligibility: {
      age: 'No age limit',
      qualification: 'BE/B.Tech/B.Sc (Research) or final year students',
      attempts: 'Unlimited',
    },
    timeline: [
      { stage: 'eligibility', date: 'Aug 2025', status: 'completed', description: 'Check qualification (BE/B.Tech or equivalent). No age bar. Identify your GATE paper.', actionUrl: 'https://gate2026.iitd.ac.in', actionLabel: 'Check Eligibility' },
      { stage: 'registration_open', date: 'Aug 28, 2025', status: 'completed', description: 'Register at GATE Online Application Processing System (GOAPS). Create account with email.', actionUrl: 'https://goaps.iitd.ac.in', actionLabel: 'Register at GOAPS' },
      { stage: 'form_fill', date: 'Aug 28 – Sep 26, 2025', status: 'completed', description: 'Select paper(s), upload photo/signature/certificates. Pay fee (₹1800 Gen / ₹900 SC/ST/PwD).', actionUrl: 'https://goaps.iitd.ac.in', actionLabel: 'Complete Application' },
      { stage: 'correction_window', date: 'Nov 1–7, 2025', status: 'completed', description: 'Limited edits to exam city, paper, personal data. No fee change.', actionUrl: 'https://goaps.iitd.ac.in', actionLabel: 'Correction Window' },
      { stage: 'city_intimation', date: 'Jan 5, 2026', status: 'active', description: 'City of examination released. Check candidate portal at GOAPS.', actionUrl: 'https://goaps.iitd.ac.in', actionLabel: 'Check City Intimation' },
      { stage: 'admit_card', date: 'Jan 15, 2026', status: 'upcoming', description: 'Download from GOAPS. Required along with original ID at exam centre.', actionUrl: 'https://goaps.iitd.ac.in', actionLabel: 'Download Admit Card' },
      { stage: 'exam_day', date: 'Feb 1–2 & 8–9, 2026', status: 'upcoming', description: '3-hour CBT. 1 or 2 paper options. Arrive 90 mins before. No calculators.', actionUrl: 'https://gate2026.iitd.ac.in', actionLabel: 'Exam Instructions' },
      { stage: 'answer_key', date: 'Feb 14, 2026', status: 'upcoming', description: 'Provisional keys published. Challenge window: Feb 14–17. ₹500 per challenge (refunded if valid).', actionUrl: 'https://gate2026.iitd.ac.in', actionLabel: 'View Answer Key' },
      { stage: 'result', date: 'Mar 19, 2026', status: 'upcoming', description: 'GATE Score Card valid for 3 years. Download from GOAPS. Score used for M.Tech admissions & PSU recruitment.', actionUrl: 'https://goaps.iitd.ac.in', actionLabel: 'Check Result' },
      { stage: 'counselling', date: 'Apr – Jun 2026', status: 'upcoming', description: 'CCMT counselling for NIT/IIIT M.Tech seats. IIT individual admissions. PSU interview calls.', actionUrl: 'https://ccmt.admissions.nic.in', actionLabel: 'CCMT Counselling' },
    ],
    syllabus: [
      { subject: 'General Aptitude (All Papers)', weightage: '15%', topics: ['Verbal Ability', 'Critical Reasoning', 'Numerical Ability', 'Data Interpretation', 'Analytical Skills'] },
      { subject: 'Engineering Mathematics (Most Papers)', weightage: '13%', topics: ['Linear Algebra', 'Calculus', 'Differential Equations', 'Complex Variables', 'Probability & Statistics', 'Numerical Methods'] },
      { subject: 'Core Subject (e.g. CSE)', weightage: '72%', topics: ['Algorithms & DS', 'Programming & Languages', 'Theory of Computation', 'Operating Systems', 'DBMS', 'Computer Networks', 'Digital Logic', 'Computer Organisation', 'Compiler Design'] },
    ],
    examPattern: { mode: 'Computer Based Test (CBT)', duration: '3 Hours', sections: 'General Aptitude (15) + Engineering Maths (13) + Core Subject (72)', marking: 'MCQ: +1/+2, –1/3 or –2/3. NAT: No negative marking', totalMarks: '100' },
    preparationTips: ['Solve GATE previous 15 years\' papers paper-wise', 'Focus on core subject (72% weightage)', 'Use Made Easy / ACE Academy materials', 'Solve 5+ mock tests before exam', 'General Aptitude needs only 15 days preparation', 'Study Engineering Mathematics from standard books', 'Focus on weak topics identified by mock tests'],
    importantLinks: [{ label: 'Official GATE 2026 Site', url: 'https://gate2026.iitd.ac.in' }, { label: 'GOAPS Portal', url: 'https://goaps.iitd.ac.in' }, { label: 'CCMT M.Tech Counselling', url: 'https://ccmt.admissions.nic.in' }, { label: 'PSU Recruitment Through GATE', url: 'https://gate2026.iitd.ac.in' }],
    examCentres: ['Ahmedabad', 'Bangalore', 'Bhopal', 'Bhubaneswar', 'Chandigarh', 'Chennai', 'Delhi', 'Guwahati', 'Hyderabad', 'Jaipur', 'Kanpur', 'Kolkata', 'Mumbai', 'Nagpur', 'Patna', 'Pune', 'Roorkee', 'Thiruvananthapuram'],
    nextExamDate: 'Feb 1, 2026',
    resultDate: 'Mar 19, 2026',
  },
  {
    id: 'upsc_cse',
    name: 'UPSC CSE',
    fullName: 'Union Public Service Commission – Civil Services Examination',
    category: 'civil_services',
    conductedBy: 'Union Public Service Commission (UPSC)',
    officialUrl: 'https://www.upsc.gov.in',
    description: 'Premier exam for IAS, IPS, IFS and 24 other civil services. Three-stage process: Prelims → Mains → Personality Test (Interview).',
    icon: '🏛️',
    frequency: 'Once a year',
    eligibility: {
      age: '21–32 years (relaxations for OBC/SC/ST/PwD)',
      qualification: 'Any graduate from a recognised university',
      attempts: '6 (Gen), 9 (OBC), Unlimited (SC/ST) up to age limit',
    },
    timeline: [
      { stage: 'eligibility', date: 'Feb 2026', status: 'upcoming', description: 'Verify age, educational qualification, nationality, and attempt count. Consult UPSC notification carefully.', actionUrl: 'https://www.upsc.gov.in', actionLabel: 'UPSC CSE 2026 Notification' },
      { stage: 'registration_open', date: 'Feb 14, 2026', status: 'upcoming', description: 'Apply online at upsconline.nic.in. Two-stage application: Part I (basic) and Part II (complete).', actionUrl: 'https://upsconline.nic.in', actionLabel: 'Register Online' },
      { stage: 'form_fill', date: 'Feb 14 – Mar 6, 2026', status: 'upcoming', description: 'Select optional subject, exam centres, upload photograph/signature. Pay fee ₹100 (exempted for women/SC/ST/PH).', actionUrl: 'https://upsconline.nic.in', actionLabel: 'Fill Application' },
      { stage: 'correction_window', date: 'Mar 7–13, 2026', status: 'upcoming', description: 'Modify name, centre preference, optional subject, and uploaded documents.', actionUrl: 'https://upsconline.nic.in', actionLabel: 'Correction Portal' },
      { stage: 'city_intimation', date: 'May 2026', status: 'upcoming', description: 'UPSC releases centre allocation. Check candidate login.', actionUrl: 'https://www.upsc.gov.in', actionLabel: 'Check Centre' },
      { stage: 'admit_card', date: '3 weeks before exam', status: 'upcoming', description: 'e-Admit Card downloadable from UPSC portal. Must carry Photo ID.', actionUrl: 'https://www.upsc.gov.in', actionLabel: 'Download e-Admit Card' },
      { stage: 'exam_day', date: 'Prelims: May 24, 2026', status: 'upcoming', description: 'Prelims: 2 papers (GS Paper I + CSAT). Mains: 9 papers over 5 days in Sep–Oct. Interview: Feb–Apr 2027.', actionUrl: 'https://www.upsc.gov.in', actionLabel: 'UPSC Exam Calendar' },
      { stage: 'answer_key', date: 'Jun 2026 (Unofficial)', status: 'upcoming', description: 'UPSC does not release official answer keys. Unofficial keys from coaching institutes within hours.', actionUrl: 'https://www.upsc.gov.in', actionLabel: 'UPSC Site' },
      { stage: 'result', date: 'Prelims: Jul 2026 | Mains: Feb 2027 | Final: May 2027', status: 'upcoming', description: 'Final merit list published with service allocation. Download rank card from UPSC portal.', actionUrl: 'https://www.upsc.gov.in', actionLabel: 'Check Result' },
      { stage: 'counselling', date: 'Jun–Aug 2027', status: 'upcoming', description: 'Service/cadre allocation via DoPT. Medical examination, document verification, training at LBSNAA.', actionUrl: 'https://dopt.gov.in', actionLabel: 'DoPT Service Allocation' },
    ],
    syllabus: [
      { subject: 'Prelims – GS Paper I (200 marks)', weightage: 'Qualifying (cut-off)', topics: ['Current Affairs', 'History of India & Indian National Movement', 'Indian & World Geography', 'Indian Polity & Governance', 'Economic & Social Development', 'Environment & Ecology', 'General Science'] },
      { subject: 'Prelims – CSAT Paper II (200 marks)', weightage: 'Qualifying (33%)', topics: ['Comprehension', 'Interpersonal Skills', 'Logical Reasoning & Analytical Ability', 'Decision Making', 'General Mental Ability', 'Basic Numeracy', 'Data Interpretation'] },
      { subject: 'Mains – General Studies (4 papers)', weightage: '4 × 250 = 1000 marks', topics: ['GS I: History, Geography, Society', 'GS II: Polity, Constitution, Governance, IR', 'GS III: Economy, Agriculture, Science & Tech, Environment', 'GS IV: Ethics, Integrity, Aptitude'] },
      { subject: 'Mains – Essay (2 papers)', weightage: '2 × 250 = 500 marks', topics: ['Essay Paper I', 'Essay Paper II'] },
      { subject: 'Mains – Optional Subject (2 papers)', weightage: '2 × 250 = 500 marks', topics: ['26 optional subjects to choose from (e.g., Public Administration, Geography, History, Sociology, Anthropology, Mathematics…)'] },
    ],
    examPattern: { mode: 'Offline (OMR for Prelims, descriptive for Mains)', duration: 'Prelims: 2+2 hrs | Mains: 3 hrs/paper | Interview: 30-45 mins', sections: '3 Stages: Prelims → Mains → Personality Test', marking: 'Prelims: –1/3 for wrong. Mains: No negative marking', totalMarks: 'Mains 1750 + Interview 275 = 2025' },
    preparationTips: ['Read The Hindu / Indian Express daily', 'Complete NCERT books (Class 6–12) for all subjects', 'Make concise notes for revision', 'Solve UPSC PYQs (minimum 10 years)', 'Write answer practice from Day 1', 'Choose optional subject based on interest + past performance', 'Follow UPSC Calendar strictly', 'Join a test series for Prelims & Mains'],
    importantLinks: [{ label: 'UPSC Official Website', url: 'https://www.upsc.gov.in' }, { label: 'UPSC Online Application', url: 'https://upsconline.nic.in' }, { label: 'LBSNAA (IAS Training)', url: 'https://www.lbsnaa.gov.in' }, { label: 'UPSC Exam Calendar 2026', url: 'https://www.upsc.gov.in' }],
    examCentres: ['Agartala', 'Ahmedabad', 'Aizawl', 'Aligarh', 'Bengaluru', 'Bhopal', 'Chennai', 'Delhi', 'Dharwad', 'Dispur', 'Hyderabad', 'Imphal', 'Itanagar', 'Jaipur', 'Jammu', 'Jorhat', 'Kochi', 'Kohima', 'Kolkata', 'Lucknow', 'Mumbai', 'Nagpur', 'Panaji', 'Patna', 'Port Blair', 'Prayagraj', 'Raipur', 'Ranchi', 'Sambalpur', 'Srinagar', 'Thiruvananthapuram', 'Tirupati', 'Udaipur', 'Vishakhapatnam'],
    nextExamDate: 'May 24, 2026',
    resultDate: 'Jul 2026 (Prelims)',
  },
  {
    id: 'ssc_cgl',
    name: 'SSC CGL',
    fullName: 'Staff Selection Commission – Combined Graduate Level',
    category: 'civil_services',
    conductedBy: 'Staff Selection Commission (SSC)',
    officialUrl: 'https://ssc.nic.in',
    description: 'Recruits graduates for Group B and Group C posts in Central Government departments (Income Tax, Excise, CBI, etc.).',
    icon: '📋',
    frequency: 'Once a year',
    eligibility: { age: '18–27 years (post-wise variation)', qualification: 'Any Bachelor\'s Degree', attempts: 'No limit within age' },
    timeline: [
      { stage: 'eligibility', date: 'Mar 2026', status: 'upcoming', description: 'Age between 18–27 years (as on Aug 1, 2026). Any graduate. Check post-wise age relaxation.', actionUrl: 'https://ssc.nic.in', actionLabel: 'SSC CGL 2026 Notification' },
      { stage: 'registration_open', date: 'Mar 20, 2026', status: 'upcoming', description: 'Apply at ssc.nic.in. Register with mobile and email first, then fill detailed application.', actionUrl: 'https://ssc.nic.in', actionLabel: 'Apply Online' },
      { stage: 'form_fill', date: 'Mar 20 – Apr 20, 2026', status: 'upcoming', description: 'Fill basic details, choose exam centres, upload photo/signature. Pay ₹100 fee (free for women/SC/ST/Ex-Servicemen).', actionUrl: 'https://ssc.nic.in', actionLabel: 'Fill Application' },
      { stage: 'correction_window', date: 'Apr 21–27, 2026', status: 'upcoming', description: 'Correct name, DOB, exam centre, photograph.', actionUrl: 'https://ssc.nic.in', actionLabel: 'Correction Window' },
      { stage: 'city_intimation', date: 'Jun 2026', status: 'upcoming', description: 'City intimation letters released before Tier I.', actionUrl: 'https://ssc.nic.in', actionLabel: 'Check City' },
      { stage: 'admit_card', date: '2 weeks before Tier I', status: 'upcoming', description: 'Tier I admit card from Regional SSC websites.', actionUrl: 'https://ssc.nic.in', actionLabel: 'Download Admit Card' },
      { stage: 'exam_day', date: 'Tier I: Jul 2026 | Tier II: Nov 2026', status: 'upcoming', description: 'Tier I: CBT 60 mins, 100 Qs. Tier II: CBT + Descriptive + Skill Test. Report 30 mins early.', actionUrl: 'https://ssc.nic.in', actionLabel: 'Exam Day Instructions' },
      { stage: 'answer_key', date: 'Within 5 days of Tier I', status: 'upcoming', description: 'Provisional keys released. Raise objections within 3 days at ₹100/challenge.', actionUrl: 'https://ssc.nic.in', actionLabel: 'View Answer Key' },
      { stage: 'result', date: 'Tier I: Sep 2026 | Final: Mar 2027', status: 'upcoming', description: 'Tier I result → Tier II shortlist. Final result after document verification.', actionUrl: 'https://ssc.nic.in', actionLabel: 'Check Result' },
      { stage: 'counselling', date: 'Apr–Jun 2027', status: 'upcoming', description: 'Document verification, medical exam, service/post allocation as per merit and preference.', actionUrl: 'https://ssc.nic.in', actionLabel: 'Document Verification' },
    ],
    syllabus: [
      { subject: 'General Intelligence & Reasoning', weightage: '25 Qs', topics: ['Analogies', 'Symbolic Operations', 'Symbolic/Number Analogy', 'Trends', 'Figural Analogy', 'Space Orientation', 'Venn Diagrams', 'Semantic Classification', 'Non-Verbal Reasoning'] },
      { subject: 'General Awareness', weightage: '25 Qs', topics: ['India & its Neighbours', 'Sports', 'History', 'Culture', 'Geography', 'Economy', 'Polity', 'Scientific Research', 'Current Affairs'] },
      { subject: 'Quantitative Aptitude', weightage: '25 Qs', topics: ['Computation of Whole Numbers', 'Decimals & Fractions', 'Percentages', 'Ratio & Proportion', 'Square Roots', 'Averages', 'Interest', 'Profit & Loss', 'Time & Work', 'Time & Distance', 'Geometry', 'Mensuration', 'Trigonometry', 'Data Interpretation'] },
      { subject: 'English Comprehension', weightage: '25 Qs', topics: ['Spot the Error', 'Fill in the Blanks', 'Synonyms/Antonyms', 'Spelling/Detecting Misspelt Words', 'Idioms & Phrases', 'One Word Substitution', 'Sentence Improvement', 'Active/Passive Voice', 'Direct/Indirect Speech', 'Reading Comprehension'] },
    ],
    examPattern: { mode: 'Computer Based Test (CBT)', duration: 'Tier I: 60 mins (80 mins for PwD)', sections: '4 Sections × 25 Qs = 100 Qs', marking: '+2 for correct, –0.50 for wrong', totalMarks: 'Tier I: 200 | Tier II: 200 + 100 + Skill' },
    preparationTips: ['Solve SSC CGL PYQs from last 5 years', 'Quantitative Aptitude: Practice short tricks', 'English: 10 new words daily', 'General Awareness: Read monthly current affairs digest', 'Attempt 15+ mock tests', 'Time management: 36 sec per question in Tier I'],
    importantLinks: [{ label: 'SSC Official Website', url: 'https://ssc.nic.in' }, { label: 'SSC Application Portal', url: 'https://ssc.nic.in' }, { label: 'SSC CGL Previous Papers', url: 'https://ssc.nic.in' }],
    examCentres: ['Delhi', 'Jaipur', 'Mumbai', 'Ahmedabad', 'Chennai', 'Hyderabad', 'Bangalore', 'Kolkata', 'Bhopal', 'Lucknow', 'Patna', 'Chandigarh', 'Dehradun', 'Guwahati', 'Allahabad'],
    nextExamDate: 'Jul 2026',
    resultDate: 'Sep 2026 (Tier I)',
  },
  {
    id: 'neet',
    name: 'NEET UG',
    fullName: 'National Eligibility cum Entrance Test (Undergraduate)',
    category: 'medical',
    conductedBy: 'National Testing Agency (NTA)',
    officialUrl: 'https://neet.nta.nic.in',
    description: 'Single national entrance exam for MBBS, BDS, BAMS, BSMS, BUMS, BHMS admissions across India.',
    icon: '🩺',
    frequency: 'Once a year (May)',
    eligibility: { age: '17 years on Dec 31 of admission year', qualification: 'Class 12 with Physics, Chemistry, Biology/Biotechnology', percentage: '50% aggregate (40% for OBC, 45% for PwD)', attempts: '3 attempts' },
    timeline: [
      { stage: 'eligibility', date: 'Dec 2025', status: 'completed', description: 'Age min 17 years. Class 12 with PCB. Minimum 50% marks (40% OBC, 45% PwD). Indian & OCI/NRI eligible.', actionUrl: 'https://neet.nta.nic.in', actionLabel: 'Check Eligibility' },
      { stage: 'registration_open', date: 'Feb 1, 2026', status: 'upcoming', description: 'Apply at neet.nta.nic.in. Keep scanned photo, signature, Class 10/12 certificates ready.', actionUrl: 'https://neet.nta.nic.in', actionLabel: 'Register Now' },
      { stage: 'form_fill', date: 'Feb 1 – Mar 10, 2026', status: 'upcoming', description: 'Fill application, select exam city (up to 3 preferences), upload documents, pay fee ₹1700 (Gen) / ₹1000 (SC/ST).', actionUrl: 'https://neet.nta.nic.in', actionLabel: 'Apply Online' },
      { stage: 'correction_window', date: 'Mar 11–18, 2026', status: 'upcoming', description: 'Edit personal details, category, exam centre. Photo/signature changes allowed.', actionUrl: 'https://neet.nta.nic.in', actionLabel: 'Correction Portal' },
      { stage: 'city_intimation', date: 'Apr 20, 2026', status: 'upcoming', description: 'City of examination released. Download city slip from candidate login.', actionUrl: 'https://neet.nta.nic.in', actionLabel: 'City Slip' },
      { stage: 'admit_card', date: 'Apr 28, 2026', status: 'upcoming', description: 'Download Hall Ticket from portal. Print 2 copies. Carry passport-size photo.', actionUrl: 'https://neet.nta.nic.in', actionLabel: 'Download Admit Card' },
      { stage: 'exam_day', date: 'May 4, 2026', status: 'upcoming', description: 'Single day, single shift (2 PM – 5:20 PM). OMR-based. Biometric verification. Reporting by 12:30 PM.', actionUrl: 'https://neet.nta.nic.in', actionLabel: 'Exam Day Instructions' },
      { stage: 'answer_key', date: 'May 7, 2026', status: 'upcoming', description: 'Provisional answer key on NTA portal. Challenge at ₹200/question (refunded if valid).', actionUrl: 'https://neet.nta.nic.in', actionLabel: 'View Answer Key' },
      { stage: 'result', date: 'Jun 4, 2026', status: 'upcoming', description: 'Scorecard with AIR, category rank. 720/720 max. Valid for 3 years for admission purposes.', actionUrl: 'https://neet.nta.nic.in', actionLabel: 'Check Result' },
      { stage: 'counselling', date: 'Jul–Sep 2026', status: 'upcoming', description: 'MCC counselling for 15% AIQ seats (MBBS/BDS). State counselling for 85% state quota. Stray vacancy round.', actionUrl: 'https://mcc.nic.in', actionLabel: 'MCC Counselling' },
    ],
    syllabus: [
      { subject: 'Physics (45 Qs)', weightage: '180 marks', topics: ['Physical World & Measurement', 'Kinematics', 'Laws of Motion', 'Work, Energy, Power', 'Gravitation', 'Properties of Bulk Matter', 'Thermodynamics', 'Oscillations & Waves', 'Electrostatics', 'Current Electricity', 'Magnetic Effects', 'Electromagnetic Induction', 'Optics', 'Dual Nature of Matter', 'Atoms & Nuclei', 'Electronic Devices'] },
      { subject: 'Chemistry (45 Qs)', weightage: '180 marks', topics: ['Basic Concepts', 'Atomic Structure', 'Chemical Bonding', 'States of Matter', 'Thermodynamics', 'Equilibrium', 'Redox', 'Hydrogen', 'p/d/f-Block Elements', 'Coordination Compounds', 'Haloalkanes', 'Alcohols & Phenols', 'Aldehydes', 'Amines', 'Biomolecules', 'Polymers', 'Chemistry in Everyday Life'] },
      { subject: 'Biology (90 Qs = Botany + Zoology)', weightage: '360 marks', topics: ['Diversity in Living World', 'Structural Organisation', 'Cell Structure', 'Plant Physiology', 'Human Physiology', 'Reproduction', 'Genetics & Evolution', 'Biology in Human Welfare', 'Biotechnology', 'Ecology & Environment'] },
    ],
    examPattern: { mode: 'Pen-and-Paper (OMR-based)', duration: '3 Hours 20 Minutes', sections: 'Physics (45Q) + Chemistry (45Q) + Biology (90Q)', marking: '+4 for correct, –1 for wrong', totalMarks: '720' },
    preparationTips: ['NCERT Biology is the Bible for NEET – read it 5+ times', 'Physics: Focus on NCERT + HC Verma numericals', 'Chemistry: Inorganic from NCERT; Organic reactions chart', 'Attempt NEET PYQs (last 15 years)', 'Weekly full-length mock tests', 'Biology constitutes 50% weightage – master it first', 'Avoid leaving questions (only skip if completely unsure)'],
    importantLinks: [{ label: 'NTA NEET Portal', url: 'https://neet.nta.nic.in' }, { label: 'MCC NEET Counselling', url: 'https://mcc.nic.in' }, { label: 'NEET Sample Papers (NTA)', url: 'https://neet.nta.nic.in' }],
    examCentres: ['Ahmedabad', 'Bengaluru', 'Bhopal', 'Chennai', 'Delhi', 'Guwahati', 'Hyderabad', 'Jaipur', 'Jammu', 'Kolkata', 'Lucknow', 'Mumbai', 'Nagpur', 'Patna', 'Pune', 'Ranchi', 'Srinagar', 'Thiruvananthapuram'],
    nextExamDate: 'May 4, 2026',
    resultDate: 'Jun 4, 2026',
  },
];

export const categoryLabels: Record<string, string> = {
  engineering: 'Engineering Entrance',
  medical: 'Medical Entrance',
  civil_services: 'Civil Services & Government Jobs',
  defence: 'Defence Services',
  banking: 'Banking & Finance',
  teaching: 'Teaching',
  management: 'Management',
  law: 'Law',
  other: 'Other',
};
