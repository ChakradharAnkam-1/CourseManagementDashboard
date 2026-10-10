// ─────────────────────────────────────────────────────────────
// SKILL DEFINITIONS
// ─────────────────────────────────────────────────────────────

export type SkillLevel = 'none' | 'beginner' | 'intermediate' | 'advanced' | 'na';

export const levelValue: Record<SkillLevel, number> = {
  none: 0, beginner: 25, intermediate: 55, advanced: 85, na: -1,
};

export const levelLabel: Record<SkillLevel, string> = {
  none: 'No Knowledge', beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced', na: 'Not Applicable',
};

export type CompetencyCategory =
  | 'statistical' | 'sectoral' | 'programming' | 'ai_ml' | 'dataviz' | 'gis' | 'digital_gov' | 'behavioural';

export type Skill = {
  id: string;
  name: string;
  category: CompetencyCategory;
  description: string;
};

export type RoleGroup =
  | 'statistical_core'
  | 'survey_data'
  | 'economic_sectoral'
  | 'data_technology'
  | 'quality_governance'
  | 'research_policy';

export type JobRole = {
  id: string;
  title: string;
  group: RoleGroup;
  icon: string;
  department: string;
  relevantSkillIds: string[];
  requiredLevels: Record<string, SkillLevel>; // skillId → required level
};

// ─────────────────────────────────────────────────────────────
// ALL SKILLS
// ─────────────────────────────────────────────────────────────

export const allSkills: Skill[] = [
  // A. Statistical Competencies
  { id: 'stat_fund', name: 'Statistical Fundamentals', category: 'statistical', description: 'Core concepts: mean, median, variance, distributions' },
  { id: 'descriptive', name: 'Descriptive Statistics', category: 'statistical', description: 'Summarising and describing datasets' },
  { id: 'inferential', name: 'Inferential Statistics', category: 'statistical', description: 'Hypothesis testing, confidence intervals' },
  { id: 'probability', name: 'Probability Theory', category: 'statistical', description: 'Probability models, Bayes theorem, distributions' },
  { id: 'sampling', name: 'Sampling Techniques', category: 'statistical', description: 'SRS, stratified, cluster, systematic sampling' },
  { id: 'survey_design', name: 'Survey Design', category: 'statistical', description: 'Designing statistically valid surveys' },
  { id: 'questionnaire', name: 'Questionnaire Design', category: 'statistical', description: 'Constructing effective survey instruments' },
  { id: 'data_collection', name: 'Data Collection Methodology', category: 'statistical', description: 'Field data collection methods and protocols' },
  { id: 'stat_modelling', name: 'Statistical Modelling', category: 'statistical', description: 'Building predictive and descriptive models' },
  { id: 'time_series', name: 'Time Series Analysis', category: 'statistical', description: 'ARIMA, seasonal decomposition, forecasting' },
  { id: 'regression', name: 'Regression Analysis', category: 'statistical', description: 'Linear, logistic, multivariate regression' },
  { id: 'experimental', name: 'Experimental Design', category: 'statistical', description: 'DOE, A/B testing, factorial experiments' },
  { id: 'data_quality', name: 'Data Quality', category: 'statistical', description: 'Accuracy, completeness, consistency checks' },
  { id: 'stat_qa', name: 'Statistical Quality Assurance', category: 'statistical', description: 'Quality frameworks for official statistics' },
  { id: 'metadata', name: 'Metadata Standards', category: 'statistical', description: 'SDMX, DDI, ISO metadata frameworks' },
  { id: 'stat_class', name: 'Statistical Classifications', category: 'statistical', description: 'NIC, NSSO, international classification systems' },
  { id: 'official_stat', name: 'Official Statistics Methodology', category: 'statistical', description: 'UN Fundamental Principles, NSO standards' },

  // B. Sectoral
  { id: 'national_accounts', name: 'National Accounts', category: 'sectoral', description: 'GDP, GNP, SNA 2008 methodology' },
  { id: 'price_stat', name: 'Price Statistics', category: 'sectoral', description: 'Index numbers, price surveys' },
  { id: 'cpi', name: 'Consumer Price Index', category: 'sectoral', description: 'CPI methodology, basket construction' },
  { id: 'producer_price', name: 'Producer Price Statistics', category: 'sectoral', description: 'WPI, PPI methodology' },
  { id: 'labour_stat', name: 'Labour Statistics', category: 'sectoral', description: 'Employment surveys, ILO standards' },
  { id: 'employment_stat', name: 'Employment Statistics', category: 'sectoral', description: 'PLFS, workforce statistics' },
  { id: 'agri_stat', name: 'Agricultural Statistics', category: 'sectoral', description: 'Crop surveys, agricultural census' },
  { id: 'industrial_stat', name: 'Industrial Statistics', category: 'sectoral', description: 'ASI, IIP, manufacturing surveys' },
  { id: 'health_stat', name: 'Health Statistics', category: 'sectoral', description: 'HMIS, SRS, health indicators' },
  { id: 'education_stat', name: 'Education Statistics', category: 'sectoral', description: 'ASER, DISE, enrollment and outcome data' },
  { id: 'social_stat', name: 'Social Statistics', category: 'sectoral', description: 'Poverty, welfare, social indicators' },
  { id: 'demographic_stat', name: 'Demographic Statistics', category: 'sectoral', description: 'Fertility, mortality, migration' },
  { id: 'sdg_indicators', name: 'SDG Indicators', category: 'sectoral', description: 'Sustainable Development Goal monitoring' },
  { id: 'env_stat', name: 'Environmental Statistics', category: 'sectoral', description: 'SEEA, green GDP, emissions data' },
  { id: 'epidemiology', name: 'Epidemiological Concepts', category: 'sectoral', description: 'Disease surveillance, outbreak analysis' },
  { id: 'pub_health_ind', name: 'Public Health Indicators', category: 'sectoral', description: 'MMR, IMR, NHM health metrics' },
  { id: 'crop_stat', name: 'Crop Statistics', category: 'sectoral', description: 'Crop area, yield, production estimation' },

  // C. Programming & Data Technology
  { id: 'python', name: 'Python', category: 'programming', description: 'Core Python programming for data work' },
  { id: 'r_lang', name: 'R', category: 'programming', description: 'Statistical computing with R' },
  { id: 'sql', name: 'SQL', category: 'programming', description: 'Querying and managing relational databases' },
  { id: 'stata', name: 'Stata', category: 'programming', description: 'Statistical analysis using Stata' },
  { id: 'spss', name: 'SPSS', category: 'programming', description: 'IBM SPSS for statistical analysis' },
  { id: 'sas', name: 'SAS', category: 'programming', description: 'SAS for enterprise data analytics' },
  { id: 'excel', name: 'Excel / Advanced Excel', category: 'programming', description: 'Pivot tables, VLOOKUP, macros, Power Query' },
  { id: 'pandas', name: 'Pandas / NumPy', category: 'programming', description: 'Python data manipulation libraries' },
  { id: 'data_cleaning', name: 'Data Cleaning & Processing', category: 'programming', description: 'ETL, data wrangling, deduplication' },
  { id: 'db_mgmt', name: 'Database Management', category: 'programming', description: 'RDBMS design, administration, optimisation' },
  { id: 'data_eng', name: 'Data Engineering', category: 'programming', description: 'Pipelines, orchestration, data lakes' },
  { id: 'apis', name: 'APIs & Data Integration', category: 'programming', description: 'REST APIs, JSON, SDMX data exchange' },
  { id: 'etl', name: 'ETL / ELT', category: 'programming', description: 'Extract, transform, load workflows' },
  { id: 'cloud', name: 'Cloud Computing', category: 'programming', description: 'AWS, GCP, Azure, NIC cloud' },

  // D. AI & ML
  { id: 'ml_fund', name: 'Machine Learning Fundamentals', category: 'ai_ml', description: 'Supervised, unsupervised, reinforcement learning' },
  { id: 'supervised', name: 'Supervised Learning', category: 'ai_ml', description: 'Regression, classification algorithms' },
  { id: 'unsupervised', name: 'Unsupervised Learning', category: 'ai_ml', description: 'Clustering, dimensionality reduction' },
  { id: 'classification', name: 'Classification Models', category: 'ai_ml', description: 'Decision trees, SVM, random forests' },
  { id: 'clustering', name: 'Clustering', category: 'ai_ml', description: 'K-means, hierarchical, DBSCAN' },
  { id: 'nlp', name: 'Natural Language Processing', category: 'ai_ml', description: 'Text analysis, sentiment, NER' },
  { id: 'gen_ai', name: 'Generative AI & LLMs', category: 'ai_ml', description: 'GPT, prompt engineering, RAG systems' },
  { id: 'ai_analytics', name: 'AI-assisted Analytics', category: 'ai_ml', description: 'Using AI tools for statistical work' },
  { id: 'model_eval', name: 'Model Evaluation', category: 'ai_ml', description: 'Cross-validation, metrics, bias detection' },
  { id: 'responsible_ai', name: 'Responsible AI & Ethics', category: 'ai_ml', description: 'Fairness, explainability, AI governance' },

  // E. Data Visualization & Analytics
  { id: 'dataviz', name: 'Data Visualization', category: 'dataviz', description: 'Charts, infographics, visual best practices' },
  { id: 'dashboard', name: 'Dashboard Development', category: 'dataviz', description: 'Building interactive monitoring dashboards' },
  { id: 'eda', name: 'Exploratory Data Analysis', category: 'dataviz', description: 'EDA techniques, pattern discovery' },
  { id: 'powerbi', name: 'Power BI', category: 'dataviz', description: 'Microsoft Power BI for reporting' },
  { id: 'tableau', name: 'Tableau', category: 'dataviz', description: 'Tableau Desktop and Server' },
  { id: 'gis_viz', name: 'GIS Visualization', category: 'dataviz', description: 'Choropleth maps, spatial dashboards' },
  { id: 'stat_reporting', name: 'Statistical Reporting', category: 'dataviz', description: 'Writing and presenting statistical reports' },
  { id: 'data_storytelling', name: 'Data Storytelling', category: 'dataviz', description: 'Communicating insights to non-technical audiences' },

  // F. GIS & Spatial
  { id: 'gis_fund', name: 'GIS Fundamentals', category: 'gis', description: 'Coordinate systems, projections, spatial data formats' },
  { id: 'spatial_data', name: 'Spatial Data Management', category: 'gis', description: 'Shapefiles, GeoJSON, PostGIS' },
  { id: 'geospatial_analysis', name: 'Geospatial Analysis', category: 'gis', description: 'Buffers, overlays, proximity analysis' },
  { id: 'mapping', name: 'Cartographic Mapping', category: 'gis', description: 'Thematic maps, atlas production' },
  { id: 'remote_sensing', name: 'Remote Sensing Basics', category: 'gis', description: 'Satellite imagery, land-use classification' },
  { id: 'spatial_stat', name: 'Spatial Statistics', category: 'gis', description: 'Moran\'s I, spatial autocorrelation' },
  { id: 'loc_intelligence', name: 'Location Intelligence', category: 'gis', description: 'Site selection, network analysis' },

  // G. Digital Governance
  { id: 'cybersec', name: 'Cybersecurity Awareness', category: 'digital_gov', description: 'Threats, phishing, secure practices' },
  { id: 'data_privacy', name: 'Data Privacy & PDPB', category: 'digital_gov', description: 'PDPB, GDPR basics, PII handling' },
  { id: 'digital_sign', name: 'Digital Signatures & PKI', category: 'digital_gov', description: 'e-Sign, digital certificates' },
  { id: 'gov_cloud', name: 'Government Cloud (MeghRaj)', category: 'digital_gov', description: 'NIC Cloud, GI Cloud services' },
  { id: 'dpi', name: 'Digital Public Infrastructure', category: 'digital_gov', description: 'Aadhaar, UPI, DigiLocker, India Stack' },
  { id: 'open_data', name: 'Open Data', category: 'digital_gov', description: 'data.gov.in, open data standards' },
  { id: 'digital_gov_skill', name: 'Digital Governance', category: 'digital_gov', description: 'e-governance frameworks, G2C services' },

  // H. Behavioural & Managerial
  { id: 'communication', name: 'Communication', category: 'behavioural', description: 'Written and verbal communication skills' },
  { id: 'leadership', name: 'Leadership', category: 'behavioural', description: 'Team leadership, motivation, delegation' },
  { id: 'teamwork', name: 'Teamwork & Collaboration', category: 'behavioural', description: 'Cross-functional team effectiveness' },
  { id: 'project_mgmt', name: 'Project Management', category: 'behavioural', description: 'Planning, scheduling, risk management' },
  { id: 'decision_making', name: 'Decision Making', category: 'behavioural', description: 'Analytical and evidence-based decisions' },
  { id: 'problem_solving', name: 'Problem Solving', category: 'behavioural', description: 'Root cause analysis, structured thinking' },
  { id: 'critical_thinking', name: 'Critical Thinking', category: 'behavioural', description: 'Evaluating evidence, logical reasoning' },
  { id: 'time_mgmt', name: 'Time Management', category: 'behavioural', description: 'Prioritisation, deadlines, efficiency' },
  { id: 'change_mgmt', name: 'Change Management', category: 'behavioural', description: 'Managing organisational transitions' },
  { id: 'stakeholder_mgmt', name: 'Stakeholder Management', category: 'behavioural', description: 'Engaging diverse stakeholders' },
  { id: 'presentation', name: 'Presentation Skills', category: 'behavioural', description: 'Public speaking, slide design, delivery' },
  { id: 'ethics', name: 'Ethics & Public Service Values', category: 'behavioural', description: 'Integrity, accountability, public interest' },
];

export const skillById = Object.fromEntries(allSkills.map((s) => [s.id, s]));

// ─────────────────────────────────────────────────────────────
// JOB ROLE GROUPS
// ─────────────────────────────────────────────────────────────

export const roleGroupLabels: Record<RoleGroup, string> = {
  statistical_core: 'A. Statistical & Core Official Statistics',
  survey_data: 'B. Survey & Data Collection',
  economic_sectoral: 'C. Economic & Sectoral Statistics',
  data_technology: 'D. Data & Technology',
  quality_governance: 'E. Data Quality, Standards & Governance',
  research_policy: 'F. Research, Policy & Management',
};

type ReqMap = Record<string, SkillLevel>;

// Helper: build a required-levels map
const req = (pairs: [string, SkillLevel][]): ReqMap =>
  Object.fromEntries(pairs);

export const jobRoles: JobRole[] = [
  // ──────────── A. Statistical & Core ────────────
  {
    id: 'stat_officer',
    title: 'Statistical Officer',
    group: 'statistical_core',
    icon: '📊',
    department: 'MoSPI / State DES',
    relevantSkillIds: ['stat_fund','descriptive','inferential','probability','sampling','survey_design','data_quality','stat_qa','stat_modelling','regression','time_series','official_stat','metadata','stat_class','python','r_lang','sql','excel','dataviz','stat_reporting','communication','ethics','critical_thinking'],
    requiredLevels: req([['stat_fund','advanced'],['descriptive','advanced'],['inferential','intermediate'],['probability','intermediate'],['sampling','intermediate'],['survey_design','intermediate'],['data_quality','intermediate'],['stat_qa','beginner'],['stat_modelling','beginner'],['regression','intermediate'],['time_series','beginner'],['official_stat','intermediate'],['metadata','beginner'],['python','intermediate'],['r_lang','intermediate'],['sql','beginner'],['excel','advanced'],['dataviz','intermediate'],['stat_reporting','intermediate'],['communication','advanced'],['ethics','advanced'],['critical_thinking','intermediate']]),
  },
  {
    id: 'asst_stat_officer',
    title: 'Assistant Statistical Officer',
    group: 'statistical_core',
    icon: '📈',
    department: 'MoSPI / State DES',
    relevantSkillIds: ['stat_fund','descriptive','sampling','survey_design','data_collection','data_quality','questionnaire','excel','python','r_lang','sql','dataviz','stat_reporting','communication','ethics','teamwork'],
    requiredLevels: req([['stat_fund','intermediate'],['descriptive','intermediate'],['sampling','beginner'],['survey_design','beginner'],['data_collection','intermediate'],['data_quality','beginner'],['questionnaire','beginner'],['excel','intermediate'],['python','beginner'],['sql','beginner'],['dataviz','beginner'],['stat_reporting','beginner'],['communication','intermediate'],['ethics','advanced'],['teamwork','intermediate']]),
  },
  {
    id: 'senior_stat_officer',
    title: 'Senior Statistical Officer',
    group: 'statistical_core',
    icon: '📋',
    department: 'MoSPI / NSSO',
    relevantSkillIds: ['stat_fund','descriptive','inferential','probability','sampling','survey_design','stat_modelling','regression','time_series','official_stat','metadata','stat_class','data_quality','stat_qa','python','r_lang','sql','excel','dataviz','stat_reporting','leadership','communication','project_mgmt','ethics','decision_making'],
    requiredLevels: req([['stat_fund','advanced'],['descriptive','advanced'],['inferential','advanced'],['probability','intermediate'],['sampling','advanced'],['survey_design','intermediate'],['stat_modelling','intermediate'],['regression','intermediate'],['time_series','intermediate'],['official_stat','advanced'],['metadata','intermediate'],['data_quality','advanced'],['stat_qa','intermediate'],['python','intermediate'],['r_lang','intermediate'],['sql','intermediate'],['excel','advanced'],['dataviz','intermediate'],['stat_reporting','advanced'],['leadership','intermediate'],['communication','advanced'],['project_mgmt','intermediate'],['ethics','advanced'],['decision_making','advanced']]),
  },
  {
    id: 'stat_analyst',
    title: 'Statistical Analyst',
    group: 'statistical_core',
    icon: '🔍',
    department: 'CSO / Planning Commission',
    relevantSkillIds: ['stat_fund','descriptive','inferential','probability','sampling','stat_modelling','regression','time_series','data_quality','python','r_lang','sql','pandas','dataviz','eda','dashboard','stat_reporting','data_storytelling','communication','critical_thinking','problem_solving'],
    requiredLevels: req([['stat_fund','advanced'],['descriptive','advanced'],['inferential','advanced'],['probability','intermediate'],['stat_modelling','advanced'],['regression','advanced'],['time_series','intermediate'],['data_quality','intermediate'],['python','advanced'],['r_lang','intermediate'],['sql','intermediate'],['pandas','intermediate'],['dataviz','advanced'],['eda','advanced'],['dashboard','intermediate'],['stat_reporting','advanced'],['data_storytelling','intermediate'],['communication','advanced'],['critical_thinking','advanced'],['problem_solving','advanced']]),
  },
  {
    id: 'director_stat',
    title: 'Director (Statistics)',
    group: 'statistical_core',
    icon: '🏛️',
    department: 'MoSPI / State DES',
    relevantSkillIds: ['stat_fund','official_stat','metadata','stat_class','data_quality','stat_qa','national_accounts','sdg_indicators','stat_reporting','leadership','communication','project_mgmt','decision_making','stakeholder_mgmt','change_mgmt','ethics'],
    requiredLevels: req([['stat_fund','advanced'],['official_stat','advanced'],['metadata','advanced'],['stat_class','advanced'],['data_quality','advanced'],['stat_qa','advanced'],['stat_reporting','advanced'],['leadership','advanced'],['communication','advanced'],['project_mgmt','advanced'],['decision_making','advanced'],['stakeholder_mgmt','advanced'],['change_mgmt','intermediate'],['ethics','advanced']]),
  },
  {
    id: 'stat_coord_officer',
    title: 'Statistical Coordination Officer',
    group: 'statistical_core',
    icon: '🔗',
    department: 'MoSPI / NIC',
    relevantSkillIds: ['official_stat','metadata','stat_class','data_quality','communication','stakeholder_mgmt','project_mgmt','presentation','digital_gov_skill','open_data','apis','stat_reporting','ethics'],
    requiredLevels: req([['official_stat','intermediate'],['metadata','intermediate'],['data_quality','intermediate'],['communication','advanced'],['stakeholder_mgmt','advanced'],['project_mgmt','intermediate'],['presentation','advanced'],['open_data','intermediate'],['apis','beginner'],['stat_reporting','intermediate'],['ethics','advanced']]),
  },

  // ──────────── B. Survey & Data Collection ────────────
  {
    id: 'survey_officer',
    title: 'Survey Officer',
    group: 'survey_data',
    icon: '📝',
    department: 'NSSO / State DES',
    relevantSkillIds: ['survey_design','sampling','questionnaire','data_collection','data_quality','stat_qa','stat_fund','descriptive','excel','python','sql','dataviz','stat_reporting','communication','project_mgmt','teamwork','ethics'],
    requiredLevels: req([['survey_design','advanced'],['sampling','advanced'],['questionnaire','advanced'],['data_collection','advanced'],['data_quality','advanced'],['stat_qa','intermediate'],['stat_fund','intermediate'],['descriptive','intermediate'],['excel','intermediate'],['python','beginner'],['sql','beginner'],['dataviz','intermediate'],['stat_reporting','intermediate'],['communication','advanced'],['project_mgmt','intermediate'],['teamwork','advanced'],['ethics','advanced']]),
  },
  {
    id: 'survey_supervisor',
    title: 'Survey Supervisor',
    group: 'survey_data',
    icon: '👁️',
    department: 'NSSO / PLFS',
    relevantSkillIds: ['survey_design','sampling','questionnaire','data_collection','data_quality','excel','communication','teamwork','time_mgmt','problem_solving','ethics'],
    requiredLevels: req([['survey_design','intermediate'],['sampling','intermediate'],['questionnaire','intermediate'],['data_collection','advanced'],['data_quality','intermediate'],['excel','intermediate'],['communication','advanced'],['teamwork','advanced'],['time_mgmt','intermediate'],['problem_solving','intermediate'],['ethics','advanced']]),
  },
  {
    id: 'field_investigation',
    title: 'Field Investigation Officer',
    group: 'survey_data',
    icon: '🏃',
    department: 'NSSO / Census',
    relevantSkillIds: ['data_collection','questionnaire','data_quality','sampling','excel','communication','teamwork','time_mgmt','ethics'],
    requiredLevels: req([['data_collection','advanced'],['questionnaire','intermediate'],['data_quality','intermediate'],['sampling','beginner'],['excel','beginner'],['communication','intermediate'],['teamwork','intermediate'],['time_mgmt','advanced'],['ethics','advanced']]),
  },
  {
    id: 'census_officer',
    title: 'Census Officer',
    group: 'survey_data',
    icon: '👥',
    department: 'RGI / Census India',
    relevantSkillIds: ['survey_design','sampling','questionnaire','data_collection','data_quality','demographic_stat','social_stat','gis_fund','mapping','excel','python','sql','dataviz','stat_reporting','communication','project_mgmt','teamwork','ethics'],
    requiredLevels: req([['survey_design','advanced'],['sampling','advanced'],['questionnaire','advanced'],['data_collection','advanced'],['data_quality','advanced'],['demographic_stat','intermediate'],['gis_fund','beginner'],['mapping','beginner'],['excel','intermediate'],['python','beginner'],['dataviz','intermediate'],['stat_reporting','intermediate'],['communication','advanced'],['project_mgmt','intermediate'],['teamwork','advanced'],['ethics','advanced']]),
  },
  {
    id: 'data_processing',
    title: 'Data Processing Officer',
    group: 'survey_data',
    icon: '⚙️',
    department: 'NSSO / DPD',
    relevantSkillIds: ['data_cleaning','data_quality','sql','python','excel','etl','db_mgmt','stat_fund','descriptive','metadata','dataviz','communication','time_mgmt'],
    requiredLevels: req([['data_cleaning','advanced'],['data_quality','advanced'],['sql','advanced'],['python','intermediate'],['excel','advanced'],['etl','intermediate'],['db_mgmt','intermediate'],['stat_fund','intermediate'],['metadata','intermediate'],['dataviz','beginner'],['communication','intermediate'],['time_mgmt','intermediate']]),
  },

  // ──────────── C. Economic & Sectoral Statistics ────────────
  {
    id: 'econ_stat',
    title: 'Economic Statistics Officer',
    group: 'economic_sectoral',
    icon: '💹',
    department: 'CSO / DIPP',
    relevantSkillIds: ['national_accounts','price_stat','cpi','producer_price','industrial_stat','stat_fund','regression','time_series','r_lang','python','excel','dataviz','stat_reporting','communication','critical_thinking'],
    requiredLevels: req([['national_accounts','intermediate'],['price_stat','intermediate'],['cpi','intermediate'],['industrial_stat','intermediate'],['stat_fund','advanced'],['regression','intermediate'],['time_series','intermediate'],['python','intermediate'],['excel','advanced'],['dataviz','intermediate'],['stat_reporting','advanced'],['communication','advanced'],['critical_thinking','advanced']]),
  },
  {
    id: 'national_accounts',
    title: 'National Accounts Officer',
    group: 'economic_sectoral',
    icon: '📑',
    department: 'NAD / CSO',
    relevantSkillIds: ['national_accounts','stat_fund','descriptive','inferential','time_series','regression','excel','python','r_lang','sql','dataviz','stat_reporting','communication','critical_thinking','official_stat'],
    requiredLevels: req([['national_accounts','advanced'],['stat_fund','advanced'],['time_series','intermediate'],['regression','intermediate'],['excel','advanced'],['python','intermediate'],['sql','intermediate'],['dataviz','intermediate'],['stat_reporting','advanced'],['communication','advanced'],['official_stat','intermediate']]),
  },
  {
    id: 'agri_stat',
    title: 'Agricultural Statistics Officer',
    group: 'economic_sectoral',
    icon: '🌾',
    department: 'IASRI / MoA',
    relevantSkillIds: ['agri_stat','crop_stat','survey_design','sampling','data_collection','data_quality','stat_fund','descriptive','regression','gis_fund','remote_sensing','mapping','python','r_lang','excel','dataviz','sdg_indicators','stat_reporting','communication'],
    requiredLevels: req([['agri_stat','advanced'],['crop_stat','advanced'],['survey_design','intermediate'],['sampling','intermediate'],['data_collection','intermediate'],['data_quality','intermediate'],['stat_fund','intermediate'],['regression','intermediate'],['gis_fund','beginner'],['remote_sensing','beginner'],['python','beginner'],['r_lang','beginner'],['excel','intermediate'],['dataviz','intermediate'],['stat_reporting','intermediate'],['communication','intermediate']]),
  },
  {
    id: 'health_stat',
    title: 'Health Statistics Officer',
    group: 'economic_sectoral',
    icon: '🏥',
    department: 'NHSRC / MoHFW',
    relevantSkillIds: ['health_stat','epidemiology','pub_health_ind','survey_design','sampling','data_collection','data_quality','stat_fund','regression','gis_fund','gis_viz','python','r_lang','sql','excel','dataviz','sdg_indicators','data_privacy','stat_reporting','communication'],
    requiredLevels: req([['health_stat','advanced'],['epidemiology','intermediate'],['pub_health_ind','intermediate'],['survey_design','intermediate'],['sampling','intermediate'],['data_quality','advanced'],['stat_fund','intermediate'],['regression','intermediate'],['gis_fund','beginner'],['python','beginner'],['r_lang','intermediate'],['sql','intermediate'],['dataviz','intermediate'],['sdg_indicators','intermediate'],['data_privacy','intermediate'],['stat_reporting','advanced'],['communication','advanced']]),
  },
  {
    id: 'sdg_stat',
    title: 'SDG Statistics Officer',
    group: 'economic_sectoral',
    icon: '🌐',
    department: 'MoSPI / SDG Unit',
    relevantSkillIds: ['sdg_indicators','stat_fund','data_quality','official_stat','metadata','stat_class','national_accounts','social_stat','env_stat','dataviz','dashboard','stat_reporting','data_storytelling','open_data','apis','communication','stakeholder_mgmt','presentation'],
    requiredLevels: req([['sdg_indicators','advanced'],['stat_fund','intermediate'],['data_quality','intermediate'],['official_stat','intermediate'],['metadata','intermediate'],['dataviz','advanced'],['dashboard','intermediate'],['stat_reporting','advanced'],['data_storytelling','intermediate'],['open_data','intermediate'],['communication','advanced'],['stakeholder_mgmt','intermediate'],['presentation','advanced']]),
  },

  // ──────────── D. Data & Technology ────────────
  {
    id: 'data_analyst',
    title: 'Data Analyst',
    group: 'data_technology',
    icon: '🔢',
    department: 'MoSPI / NIC / Any Ministry',
    relevantSkillIds: ['python','r_lang','sql','excel','pandas','data_cleaning','descriptive','inferential','stat_modelling','dataviz','eda','powerbi','tableau','stat_reporting','data_storytelling','communication','critical_thinking','problem_solving'],
    requiredLevels: req([['python','advanced'],['sql','advanced'],['excel','advanced'],['pandas','intermediate'],['data_cleaning','advanced'],['descriptive','advanced'],['inferential','intermediate'],['dataviz','advanced'],['eda','advanced'],['powerbi','intermediate'],['tableau','beginner'],['stat_reporting','intermediate'],['data_storytelling','intermediate'],['communication','advanced'],['critical_thinking','advanced'],['problem_solving','advanced']]),
  },
  {
    id: 'data_scientist',
    title: 'Data Scientist',
    group: 'data_technology',
    icon: '🧬',
    department: 'NIC / MeitY / Research Institutes',
    relevantSkillIds: ['python','r_lang','sql','pandas','stat_fund','probability','ml_fund','supervised','unsupervised','regression','classification','clustering','nlp','gen_ai','ai_analytics','model_eval','responsible_ai','dataviz','eda','cloud','apis','data_cleaning','communication','critical_thinking'],
    requiredLevels: req([['python','advanced'],['r_lang','intermediate'],['sql','intermediate'],['pandas','advanced'],['stat_fund','advanced'],['probability','advanced'],['ml_fund','advanced'],['supervised','advanced'],['unsupervised','intermediate'],['regression','advanced'],['classification','intermediate'],['clustering','intermediate'],['nlp','intermediate'],['gen_ai','intermediate'],['model_eval','advanced'],['responsible_ai','intermediate'],['dataviz','intermediate'],['eda','advanced'],['cloud','intermediate'],['apis','intermediate'],['communication','intermediate'],['critical_thinking','advanced']]),
  },
  {
    id: 'data_engineer',
    title: 'Data Engineer',
    group: 'data_technology',
    icon: '🔧',
    department: 'NIC / MeitY',
    relevantSkillIds: ['python','sql','etl','data_eng','db_mgmt','cloud','apis','data_cleaning','cybersec','data_privacy','gov_cloud','communication','problem_solving','time_mgmt'],
    requiredLevels: req([['python','advanced'],['sql','advanced'],['etl','advanced'],['data_eng','advanced'],['db_mgmt','advanced'],['cloud','intermediate'],['apis','advanced'],['data_cleaning','advanced'],['cybersec','intermediate'],['data_privacy','intermediate'],['gov_cloud','intermediate'],['problem_solving','advanced'],['time_mgmt','intermediate']]),
  },
  {
    id: 'gis_officer',
    title: 'GIS Officer',
    group: 'data_technology',
    icon: '🗺️',
    department: 'ISRO / FSI / NIC / Survey of India',
    relevantSkillIds: ['gis_fund','spatial_data','geospatial_analysis','mapping','remote_sensing','spatial_stat','loc_intelligence','gis_viz','python','sql','db_mgmt','dataviz','data_quality','agri_stat','communication'],
    requiredLevels: req([['gis_fund','advanced'],['spatial_data','advanced'],['geospatial_analysis','advanced'],['mapping','advanced'],['remote_sensing','intermediate'],['spatial_stat','intermediate'],['loc_intelligence','beginner'],['gis_viz','advanced'],['python','intermediate'],['sql','intermediate'],['db_mgmt','beginner'],['dataviz','intermediate'],['data_quality','intermediate'],['communication','intermediate']]),
  },
  {
    id: 'ai_ml_specialist',
    title: 'AI/ML Specialist',
    group: 'data_technology',
    icon: '🤖',
    department: 'MeitY / NASSCOM / NIC AI unit',
    relevantSkillIds: ['python','r_lang','ml_fund','supervised','unsupervised','classification','clustering','nlp','gen_ai','ai_analytics','model_eval','responsible_ai','cloud','apis','data_eng','stat_fund','probability','communication','ethics','presentation'],
    requiredLevels: req([['python','advanced'],['ml_fund','advanced'],['supervised','advanced'],['unsupervised','advanced'],['classification','advanced'],['clustering','intermediate'],['nlp','advanced'],['gen_ai','advanced'],['model_eval','advanced'],['responsible_ai','advanced'],['cloud','intermediate'],['apis','intermediate'],['stat_fund','intermediate'],['probability','intermediate'],['communication','intermediate'],['ethics','advanced'],['presentation','intermediate']]),
  },
  {
    id: 'dataviz_specialist',
    title: 'Data Visualization Specialist',
    group: 'data_technology',
    icon: '📉',
    department: 'MoSPI / NIC / Any Ministry',
    relevantSkillIds: ['dataviz','dashboard','eda','powerbi','tableau','gis_viz','data_storytelling','stat_reporting','python','sql','excel','data_cleaning','communication','presentation','critical_thinking'],
    requiredLevels: req([['dataviz','advanced'],['dashboard','advanced'],['eda','intermediate'],['powerbi','advanced'],['tableau','advanced'],['gis_viz','intermediate'],['data_storytelling','advanced'],['stat_reporting','intermediate'],['python','intermediate'],['sql','intermediate'],['excel','advanced'],['communication','advanced'],['presentation','advanced'],['critical_thinking','intermediate']]),
  },
  {
    id: 'it_systems',
    title: 'IT / Digital Systems Officer',
    group: 'data_technology',
    icon: '💻',
    department: 'NIC / MeitY',
    relevantSkillIds: ['db_mgmt','sql','python','cloud','gov_cloud','apis','etl','cybersec','data_privacy','digital_sign','dpi','digital_gov_skill','communication','problem_solving','time_mgmt'],
    requiredLevels: req([['db_mgmt','advanced'],['sql','advanced'],['python','intermediate'],['cloud','intermediate'],['gov_cloud','intermediate'],['apis','intermediate'],['cybersec','intermediate'],['data_privacy','intermediate'],['digital_sign','intermediate'],['dpi','intermediate'],['digital_gov_skill','intermediate'],['problem_solving','advanced'],['time_mgmt','intermediate']]),
  },

  // ──────────── E. Data Quality, Standards & Governance ────────────
  {
    id: 'data_quality_officer',
    title: 'Data Quality Officer',
    group: 'quality_governance',
    icon: '✅',
    department: 'MoSPI / DPIIT / Any Ministry',
    relevantSkillIds: ['data_quality','stat_qa','data_cleaning','metadata','stat_class','official_stat','sql','python','excel','dataviz','data_privacy','communication','critical_thinking','problem_solving','ethics'],
    requiredLevels: req([['data_quality','advanced'],['stat_qa','advanced'],['data_cleaning','advanced'],['metadata','advanced'],['stat_class','intermediate'],['official_stat','intermediate'],['sql','advanced'],['python','intermediate'],['excel','advanced'],['dataviz','intermediate'],['data_privacy','intermediate'],['communication','intermediate'],['critical_thinking','advanced'],['problem_solving','advanced'],['ethics','advanced']]),
  },
  {
    id: 'metadata_officer',
    title: 'Metadata Officer',
    group: 'quality_governance',
    icon: '🏷️',
    department: 'MoSPI / NIC',
    relevantSkillIds: ['metadata','stat_class','official_stat','data_quality','open_data','apis','digital_gov_skill','sql','python','communication','ethics'],
    requiredLevels: req([['metadata','advanced'],['stat_class','advanced'],['official_stat','intermediate'],['data_quality','intermediate'],['open_data','intermediate'],['apis','beginner'],['digital_gov_skill','beginner'],['sql','beginner'],['communication','intermediate'],['ethics','advanced']]),
  },
  {
    id: 'data_privacy_officer',
    title: 'Data Privacy Officer',
    group: 'quality_governance',
    icon: '🔒',
    department: 'Any Ministry / MeitY',
    relevantSkillIds: ['data_privacy','cybersec','digital_sign','digital_gov_skill','gov_cloud','dpi','open_data','metadata','communication','ethics','stakeholder_mgmt','decision_making'],
    requiredLevels: req([['data_privacy','advanced'],['cybersec','advanced'],['digital_sign','intermediate'],['digital_gov_skill','intermediate'],['gov_cloud','intermediate'],['open_data','intermediate'],['metadata','intermediate'],['communication','advanced'],['ethics','advanced'],['stakeholder_mgmt','intermediate'],['decision_making','advanced']]),
  },
  {
    id: 'open_data_officer',
    title: 'Open Data Officer',
    group: 'quality_governance',
    icon: '🌐',
    department: 'MoSPI / MeitY / data.gov.in',
    relevantSkillIds: ['open_data','metadata','apis','digital_gov_skill','stat_class','official_stat','data_quality','dataviz','data_storytelling','communication','stakeholder_mgmt','presentation','ethics'],
    requiredLevels: req([['open_data','advanced'],['metadata','advanced'],['apis','intermediate'],['digital_gov_skill','intermediate'],['data_quality','intermediate'],['dataviz','intermediate'],['data_storytelling','intermediate'],['communication','advanced'],['stakeholder_mgmt','intermediate'],['presentation','intermediate'],['ethics','advanced']]),
  },
  {
    id: 'cybersec_officer',
    title: 'Cybersecurity Officer',
    group: 'quality_governance',
    icon: '🛡️',
    department: 'NIC / MeitY / CERT-In',
    relevantSkillIds: ['cybersec','data_privacy','digital_sign','gov_cloud','dpi','python','db_mgmt','cloud','communication','ethics','problem_solving','decision_making'],
    requiredLevels: req([['cybersec','advanced'],['data_privacy','advanced'],['digital_sign','advanced'],['gov_cloud','intermediate'],['python','intermediate'],['db_mgmt','intermediate'],['communication','intermediate'],['ethics','advanced'],['problem_solving','advanced'],['decision_making','advanced']]),
  },

  // ──────────── F. Research, Policy & Management ────────────
  {
    id: 'research_officer',
    title: 'Research Officer',
    group: 'research_policy',
    icon: '🔬',
    department: 'MoSPI / ICSSR / Research Institutes',
    relevantSkillIds: ['stat_fund','descriptive','inferential','probability','stat_modelling','regression','time_series','experimental','python','r_lang','sql','dataviz','stat_reporting','data_storytelling','communication','critical_thinking','problem_solving','ethics','presentation'],
    requiredLevels: req([['stat_fund','advanced'],['inferential','advanced'],['probability','intermediate'],['stat_modelling','advanced'],['regression','advanced'],['time_series','intermediate'],['python','intermediate'],['r_lang','advanced'],['sql','intermediate'],['dataviz','intermediate'],['stat_reporting','advanced'],['data_storytelling','intermediate'],['communication','advanced'],['critical_thinking','advanced'],['problem_solving','advanced'],['ethics','advanced'],['presentation','advanced']]),
  },
  {
    id: 'policy_officer',
    title: 'Policy Analysis Officer',
    group: 'research_policy',
    icon: '📜',
    department: 'NITI Aayog / Ministries',
    relevantSkillIds: ['stat_fund','official_stat','sdg_indicators','national_accounts','data_quality','stat_reporting','data_storytelling','communication','leadership','decision_making','critical_thinking','stakeholder_mgmt','presentation','change_mgmt','ethics'],
    requiredLevels: req([['stat_fund','intermediate'],['official_stat','intermediate'],['sdg_indicators','intermediate'],['data_quality','intermediate'],['stat_reporting','advanced'],['data_storytelling','advanced'],['communication','advanced'],['leadership','intermediate'],['decision_making','advanced'],['critical_thinking','advanced'],['stakeholder_mgmt','advanced'],['presentation','advanced'],['ethics','advanced']]),
  },
  {
    id: 'monitoring_officer',
    title: 'Monitoring & Evaluation Officer',
    group: 'research_policy',
    icon: '📡',
    department: 'NITI / Ministries / DST',
    relevantSkillIds: ['stat_fund','descriptive','survey_design','data_collection','data_quality','sdg_indicators','dataviz','dashboard','excel','python','sql','stat_reporting','communication','project_mgmt','stakeholder_mgmt','decision_making'],
    requiredLevels: req([['stat_fund','intermediate'],['survey_design','intermediate'],['data_collection','intermediate'],['data_quality','intermediate'],['sdg_indicators','intermediate'],['dataviz','intermediate'],['dashboard','intermediate'],['excel','advanced'],['python','beginner'],['sql','beginner'],['stat_reporting','advanced'],['communication','advanced'],['project_mgmt','advanced'],['stakeholder_mgmt','intermediate'],['decision_making','intermediate']]),
  },
  {
    id: 'training_officer',
    title: 'Training & Capacity Building Officer',
    group: 'research_policy',
    icon: '🎓',
    department: 'NSSTA / IASRI / DoPT',
    relevantSkillIds: ['communication','presentation','leadership','teamwork','project_mgmt','change_mgmt','stat_fund','dataviz','excel','digital_gov_skill','ethics','stakeholder_mgmt','time_mgmt'],
    requiredLevels: req([['communication','advanced'],['presentation','advanced'],['leadership','advanced'],['teamwork','advanced'],['project_mgmt','intermediate'],['change_mgmt','intermediate'],['stat_fund','intermediate'],['dataviz','beginner'],['digital_gov_skill','beginner'],['ethics','advanced'],['stakeholder_mgmt','intermediate'],['time_mgmt','intermediate']]),
  },
];

// ─────────────────────────────────────────────────────────────
// LEARNING RESOURCES (iGOT / NSSTA / demo)
// ─────────────────────────────────────────────────────────────

export type LearningResource = {
  id: string;
  skillId: string;
  title: string;
  provider: string;
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced';
  durationHrs: number;
  source: 'iGOT' | 'NSSTA' | 'Coursera' | 'NPTEL' | 'Internal';
  thumbnail: string;
  url: string;
  tags: string[];
};

export const learningResources: LearningResource[] = [
  // Python
  { id: 'lr001', skillId: 'python', title: 'Python Fundamentals for Government Officers', provider: 'NSSTA', difficulty: 'Foundation', durationHrs: 6, source: 'iGOT', thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['Python', 'Coding', 'Basics'] },
  { id: 'lr002', skillId: 'python', title: 'Python for Data Analysis (Pandas & NumPy)', provider: 'IIT Bombay / NPTEL', difficulty: 'Intermediate', durationHrs: 12, source: 'NPTEL', thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['Python', 'Pandas', 'Data'] },
  { id: 'lr003', skillId: 'python', title: 'Statistical Analysis with Python', provider: 'NSSTA / MoSPI', difficulty: 'Advanced', durationHrs: 10, source: 'NSSTA', thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['Python', 'Statistics', 'Advanced'] },
  // SQL
  { id: 'lr004', skillId: 'sql', title: 'SQL for Data Management in Government', provider: 'NIC', difficulty: 'Foundation', durationHrs: 5, source: 'iGOT', thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['SQL', 'Database', 'Queries'] },
  { id: 'lr005', skillId: 'sql', title: 'Advanced SQL and Database Optimisation', provider: 'NIC / MeitY', difficulty: 'Advanced', durationHrs: 8, source: 'iGOT', thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['SQL', 'Performance', 'Database'] },
  // Statistics
  { id: 'lr006', skillId: 'stat_fund', title: 'Statistical Fundamentals for Official Statistics', provider: 'NSSTA New Delhi', difficulty: 'Foundation', durationHrs: 8, source: 'NSSTA', thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['Statistics', 'Official Stats', 'Foundation'] },
  { id: 'lr007', skillId: 'inferential', title: 'Inferential Statistics and Hypothesis Testing', provider: 'NSSTA / IASRI', difficulty: 'Intermediate', durationHrs: 10, source: 'NSSTA', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['Inferential', 'Hypothesis', 'Testing'] },
  // Sampling
  { id: 'lr008', skillId: 'sampling', title: 'Sampling Techniques for National Surveys', provider: 'NSSO / NSSTA', difficulty: 'Intermediate', durationHrs: 7, source: 'NSSTA', thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['Sampling', 'Surveys', 'NSS'] },
  // Survey Design
  { id: 'lr009', skillId: 'survey_design', title: 'Survey Methodology and Questionnaire Design', provider: 'NSSO / MoSPI', difficulty: 'Intermediate', durationHrs: 6, source: 'iGOT', thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['Survey', 'Questionnaire', 'Design'] },
  // Data Visualization
  { id: 'lr010', skillId: 'dataviz', title: 'Data Visualization for Government Dashboards', provider: 'NIC / MoSPI', difficulty: 'Intermediate', durationHrs: 6, source: 'iGOT', thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['Visualization', 'Charts', 'Dashboards'] },
  { id: 'lr011', skillId: 'powerbi', title: 'Power BI for Government Reporting', provider: 'Microsoft / NIC', difficulty: 'Intermediate', durationHrs: 8, source: 'iGOT', thumbnail: 'https://images.unsplash.com/photo-1640158615573-cd28feb1bf4e?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['Power BI', 'Reports', 'BI'] },
  // ML
  { id: 'lr012', skillId: 'ml_fund', title: 'Machine Learning Fundamentals for Public Sector', provider: 'IIT Delhi / NASSCOM', difficulty: 'Intermediate', durationHrs: 14, source: 'NPTEL', thumbnail: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['ML', 'AI', 'Fundamentals'] },
  { id: 'lr013', skillId: 'gen_ai', title: 'Generative AI for Government Use Cases', provider: 'MeitY / NASSCOM', difficulty: 'Intermediate', durationHrs: 6, source: 'iGOT', thumbnail: 'https://images.unsplash.com/photo-1679083216051-aa510a1a2c0e?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['GenAI', 'LLM', 'Prompt Engineering'] },
  // GIS
  { id: 'lr014', skillId: 'gis_fund', title: 'GIS Fundamentals for Statistical Officers', provider: 'FSI / ISRO', difficulty: 'Foundation', durationHrs: 8, source: 'iGOT', thumbnail: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['GIS', 'Spatial', 'Maps'] },
  { id: 'lr015', skillId: 'remote_sensing', title: 'Remote Sensing for Agricultural Statistics', provider: 'ISRO / SAC', difficulty: 'Intermediate', durationHrs: 10, source: 'iGOT', thumbnail: 'https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['Remote Sensing', 'Satellite', 'Agriculture'] },
  // Data Quality
  { id: 'lr016', skillId: 'data_quality', title: 'Data Quality Frameworks for Official Statistics', provider: 'MoSPI / UN Statistics', difficulty: 'Intermediate', durationHrs: 6, source: 'NSSTA', thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['Data Quality', 'Validation', 'QA'] },
  { id: 'lr017', skillId: 'metadata', title: 'Metadata Standards: SDMX and DDI', provider: 'UN Statistics / NSSTA', difficulty: 'Intermediate', durationHrs: 5, source: 'NSSTA', thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['Metadata', 'SDMX', 'DDI'] },
  // Digital Governance
  { id: 'lr018', skillId: 'cybersec', title: 'Cybersecurity Awareness for Government Officers', provider: 'CERT-In / MeitY', difficulty: 'Foundation', durationHrs: 4, source: 'iGOT', thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['Cybersecurity', 'Awareness', 'Safety'] },
  { id: 'lr019', skillId: 'data_privacy', title: 'PDPB & Data Privacy for Government', provider: 'MeitY / Law Ministry', difficulty: 'Intermediate', durationHrs: 5, source: 'iGOT', thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['Privacy', 'PDPB', 'PII'] },
  { id: 'lr020', skillId: 'dpi', title: 'India\'s Digital Public Infrastructure', provider: 'MeitY / UIDAI', difficulty: 'Foundation', durationHrs: 4, source: 'iGOT', thumbnail: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['Aadhaar', 'UPI', 'DPI'] },
  // Health Stats
  { id: 'lr021', skillId: 'health_stat', title: 'Health Information Systems and HMIS', provider: 'NHSRC / NHM', difficulty: 'Intermediate', durationHrs: 8, source: 'iGOT', thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['Health', 'HMIS', 'Statistics'] },
  // National Accounts
  { id: 'lr022', skillId: 'national_accounts', title: 'SNA 2008 and India\'s National Accounts', provider: 'NAD / CSO / NSSTA', difficulty: 'Advanced', durationHrs: 12, source: 'NSSTA', thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['GDP', 'SNA', 'National Accounts'] },
  // Time Series
  { id: 'lr023', skillId: 'time_series', title: 'Time Series Analysis for Economic Indicators', provider: 'NSSTA / RBI', difficulty: 'Advanced', durationHrs: 10, source: 'NSSTA', thumbnail: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['Time Series', 'ARIMA', 'Forecasting'] },
  // SDG
  { id: 'lr024', skillId: 'sdg_indicators', title: 'SDG Monitoring Framework for India', provider: 'MoSPI / UNDP', difficulty: 'Intermediate', durationHrs: 6, source: 'iGOT', thumbnail: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['SDG', 'Sustainable Development', 'Monitoring'] },
  // Communication
  { id: 'lr025', skillId: 'communication', title: 'Effective Communication for Government Officers', provider: 'ISTM / DoPT', difficulty: 'Foundation', durationHrs: 4, source: 'iGOT', thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['Communication', 'Writing', 'Presentation'] },
  // Regression
  { id: 'lr026', skillId: 'regression', title: 'Regression Techniques for Statistical Officers', provider: 'NSSTA / IASRI', difficulty: 'Intermediate', durationHrs: 8, source: 'NSSTA', thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['Regression', 'Modelling', 'Statistics'] },
  // Open Data
  { id: 'lr027', skillId: 'open_data', title: 'Open Data Policy & data.gov.in', provider: 'MeitY / NIC', difficulty: 'Foundation', durationHrs: 3, source: 'iGOT', thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=480&h=270&fit=crop', url: 'https://igot.gov.in', tags: ['Open Data', 'Government', 'Transparency'] },
];
