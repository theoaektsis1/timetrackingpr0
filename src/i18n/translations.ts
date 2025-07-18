export interface Translation {
  // Navigation
  dashboard: string;
  timeTracking: string;
  projects: string;
  analytics: string;
  settings: string;

  // Dashboard
  todaysWork: string;
  thisWeek: string;
  thisMonth: string;
  totalWorkTime: string;
  netWorkTime: string;
  breakTime: string;
  overtime: string;
  efficiency: string;
  recentEntries: string;
  noEntriesYet: string;
  workEfficiency: string;
  breakPercentage: string;
  avgBreakLength: string;
  hourlyRate: string;

  // Time Tracker
  currentTime: string;
  activeTimer: string;
  since: string;
  totalTime: string;
  pauseTime: string;
  netTime: string;
  startNewTracking: string;
  selectProject: string;
  description: string;
  descriptionPlaceholder: string;
  characters: string;
  startTracking: string;
  quickActions: string;
  breakTypes: string;
  pauseActive: string;
  endBreakToContinue: string;
  endBreak: string;
  todaysBreaks: string;
  running: string;

  // Break Types
  lunchBreak: string;
  coffeeBreak: string;
  meeting: string;
  personal: string;
  lunchDescription: string;
  coffeeDescription: string;
  meetingDescription: string;
  personalDescription: string;

  // Projects
  projectManagement: string;
  newProject: string;
  editProject: string;
  createNewProject: string;
  projectName: string;
  client: string;
  parentProject: string;
  mainProject: string;
  hourlyRateEuro: string;
  projectDescription: string;
  color: string;
  projectActive: string;
  create: string;
  update: string;
  cancel: string;
  noProjectsAvailable: string;
  createFirstProject: string;
  createFirstProjectDesc: string;
  subprojects: string;
  inactive: string;

  // Analytics
  analysisReporting: string;
  lastWeek: string;
  lastMonth: string;
  lastQuarter: string;
  lastYear: string;
  allProjects: string;
  overview: string;
  timeline: string;
  export: string;
  avgDailyHours: string;
  totalRevenue: string;
  projectAnalysis: string;
  noDataForPeriod: string;
  timelineView: string;
  noEntriesForPeriod: string;
  unknownProject: string;
  unknownClient: string;
  entries: string;
  revenue: string;

  // Settings
  settingsTitle: string;
  manageSettings: string;
  general: string;
  privacy: string;
  data: string;
  appearance: string;
  lightTheme: string;
  darkTheme: string;
  chooseTheme: string;
  workingHours: string;
  dailyWorkHours: string;
  language: string;
  selectLanguage: string;

  // Privacy & Security
  privacySecurity: string;
  localDataStorage: string;
  localDataDesc: string;
  gdprCompliance: string;
  gdprDesc: string;
  dataProcessing: string;
  dataProcessingItems: string[];

  // Data Management
  dataManagement: string;
  exportData: string;
  exportDataDesc: string;
  exportAllData: string;
  importData: string;
  importDataDesc: string;
  selectFile: string;
  deleteAllData: string;
  deleteAllDataDesc: string;
  deleteAllDataWarning: string;

  // Work Session Summary
  workSessionEnded: string;
  workSessionDetails: string;
  timeSummary: string;
  includesAllBreaks: string;
  pureWorkTime: string;
  estimatedEarnings: string;
  hours: string;
  breakDetails: string;
  productivityMetrics: string;
  close: string;
  edit: string;
  exportSession: string;

  // Common
  yes: string;
  no: string;
  save: string;
  delete: string;
  confirm: string;
  loading: string;
  error: string;
  success: string;
  today: string;
  yesterday: string;
  thisWeekShort: string;
  thisMonthShort: string;
  stop: string;
  pause: string;
  play: string;
  start: string;
}

export const translations: Record<string, Translation> = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    timeTracking: 'Time Tracking',
    projects: 'Projects',
    analytics: 'Analytics',
    settings: 'Settings',

    // Dashboard
    todaysWork: 'Today\'s Work',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    totalWorkTime: 'Total Work Time',
    netWorkTime: 'Net Work Time',
    breakTime: 'Break Time',
    overtime: 'Overtime',
    efficiency: 'Efficiency',
    recentEntries: 'Recent Entries',
    noEntriesYet: 'No time entries yet',
    workEfficiency: 'Work Efficiency',
    breakPercentage: 'Break Percentage',
    avgBreakLength: 'Avg Break Length',
    hourlyRate: 'Hourly Rate',

    // Time Tracker
    currentTime: 'Current Time',
    activeTimer: 'Active Timer',
    since: 'since',
    totalTime: 'Total Time',
    pauseTime: 'Break Time',
    netTime: 'Net Time',
    startNewTracking: 'Start New Time Tracking',
    selectProject: 'Select Project',
    description: 'Description (optional)',
    descriptionPlaceholder: 'What are you working on?',
    characters: 'characters',
    startTracking: 'Start Tracking',
    quickActions: 'Quick Actions',
    breakTypes: 'Break Types',
    pauseActive: 'Break Active',
    endBreakToContinue: 'End your break to continue',
    endBreak: 'End Break',
    todaysBreaks: 'Today\'s Breaks',
    running: 'running',

    // Break Types
    lunchBreak: 'Lunch Break',
    coffeeBreak: 'Coffee Break',
    meeting: 'Meeting',
    personal: 'Personal',
    lunchDescription: 'Lunch and longer rest',
    coffeeDescription: 'Short refreshment break',
    meetingDescription: 'Meetings and appointments',
    personalDescription: 'Personal matters',

    // Projects
    projectManagement: 'Project Management',
    newProject: 'New Project',
    editProject: 'Edit Project',
    createNewProject: 'Create New Project',
    projectName: 'Project Name',
    client: 'Client',
    parentProject: 'Parent Project',
    mainProject: 'Main Project',
    hourlyRateEuro: 'Hourly Rate (€)',
    projectDescription: 'Description',
    color: 'Color',
    projectActive: 'Project is active',
    create: 'Create',
    update: 'Update',
    cancel: 'Cancel',
    noProjectsAvailable: 'No projects available',
    createFirstProject: 'Create your first project',
    createFirstProjectDesc: 'Create your first project to start time tracking.',
    subprojects: 'Subprojects',
    inactive: 'Inactive',

    // Analytics
    analysisReporting: 'Analysis & Reporting',
    lastWeek: 'Last Week',
    lastMonth: 'Last Month',
    lastQuarter: 'Last Quarter',
    lastYear: 'Last Year',
    allProjects: 'All Projects',
    overview: 'Overview',
    timeline: 'Timeline',
    export: 'Export',
    avgDailyHours: 'Avg Daily Hours',
    totalRevenue: 'Total Revenue',
    projectAnalysis: 'Project Analysis',
    noDataForPeriod: 'No data for selected period',
    timelineView: 'Timeline View',
    noEntriesForPeriod: 'No entries for selected period',
    unknownProject: 'Unknown Project',
    unknownClient: 'Unknown Client',
    entries: 'Entries',
    revenue: 'Revenue',

    // Settings
    settingsTitle: 'Settings',
    manageSettings: 'Manage your application settings and data',
    general: 'General',
    privacy: 'Privacy',
    data: 'Data',
    appearance: 'Appearance',
    lightTheme: 'Light Theme',
    darkTheme: 'Dark Theme',
    chooseTheme: 'Choose between light and dark theme',
    workingHours: 'Working Hours',
    dailyWorkHours: 'Daily Working Hours',
    language: 'Language',
    selectLanguage: 'Select Language',

    // Privacy & Security
    privacySecurity: 'Privacy & Security',
    localDataStorage: 'Local Data Storage',
    localDataDesc: 'All your data is stored locally in your browser. No server transmission.',
    gdprCompliance: 'GDPR Compliance',
    gdprDesc: 'The application meets all requirements of the General Data Protection Regulation.',
    dataProcessing: 'Data Processing',
    dataProcessingItems: [
      '• No cookies or tracking technologies',
      '• No data transmission to third parties',
      '• Complete control over your data',
      '• Deletable at any time by user'
    ],

    // Data Management
    dataManagement: 'Data Management',
    exportData: 'Export Data',
    exportDataDesc: 'Create a backup of all your time tracking data',
    exportAllData: 'Export All Data',
    importData: 'Import Data',
    importDataDesc: 'Upload a backup or external data',
    selectFile: 'Select File',
    deleteAllData: 'Delete All Data',
    deleteAllDataDesc: 'Permanently remove all stored data. This action cannot be undone.',
    deleteAllDataWarning: 'Delete all data permanently? This action cannot be undone.',

    // Work Session Summary
    workSessionEnded: 'Work Session Ended',
    workSessionDetails: 'Work Session Details',
    timeSummary: 'Time Summary',
    includesAllBreaks: 'Includes all breaks',
    pureWorkTime: 'Pure work time',
    estimatedEarnings: 'Estimated Earnings',
    hours: 'hours',
    breakDetails: 'Break Details',
    productivityMetrics: 'Productivity Metrics',
    close: 'Close',
    edit: 'Edit',
    exportSession: 'Export',

    // Common
    yes: 'Yes',
    no: 'No',
    save: 'Save',
    delete: 'Delete',
    confirm: 'Confirm',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    today: 'Today',
    yesterday: 'Yesterday',
    thisWeekShort: 'Week',
    thisMonthShort: 'Month',
    stop: 'Stop',
    pause: 'Pause',
    play: 'Play',
    start: 'Start',
  },

  de: {
    // Navigation
    dashboard: 'Dashboard',
    timeTracking: 'Zeiterfassung',
    projects: 'Projekte',
    analytics: 'Analyse',
    settings: 'Einstellungen',

    // Dashboard
    todaysWork: 'Heutige Arbeit',
    thisWeek: 'Diese Woche',
    thisMonth: 'Dieser Monat',
    totalWorkTime: 'Gesamtarbeitszeit',
    netWorkTime: 'Nettoarbeitszeit',
    breakTime: 'Pausenzeit',
    overtime: 'Überstunden',
    efficiency: 'Effizienz',
    recentEntries: 'Letzte Einträge',
    noEntriesYet: 'Noch keine Zeiteinträge vorhanden',
    workEfficiency: 'Arbeitseffizienz',
    breakPercentage: 'Pausenanteil',
    avgBreakLength: 'Ø Pausenlänge',
    hourlyRate: 'Stundenlohn',

    // Time Tracker
    currentTime: 'Aktuelle Zeit',
    activeTimer: 'Aktiver Timer',
    since: 'seit',
    totalTime: 'Gesamtzeit',
    pauseTime: 'Pausenzeit',
    netTime: 'Nettozeit',
    startNewTracking: 'Neue Zeiterfassung starten',
    selectProject: 'Projekt auswählen',
    description: 'Beschreibung (optional)',
    descriptionPlaceholder: 'Was machst du gerade?',
    characters: 'Zeichen',
    startTracking: 'Zeiterfassung starten',
    quickActions: 'Schnellaktionen',
    breakTypes: 'Pausentypen',
    pauseActive: 'Pause aktiv',
    endBreakToContinue: 'Beende deine Pause, um fortzufahren',
    endBreak: 'Pause beenden',
    todaysBreaks: 'Heutige Pausen',
    running: 'laufend',

    // Break Types
    lunchBreak: 'Mittagspause',
    coffeeBreak: 'Kaffeepause',
    meeting: 'Besprechung',
    personal: 'Privat',
    lunchDescription: 'Mittagessen und längere Erholung',
    coffeeDescription: 'Kurze Erfrischungspause',
    meetingDescription: 'Meetings und Termine',
    personalDescription: 'Persönliche Angelegenheiten',

    // Projects
    projectManagement: 'Projektverwaltung',
    newProject: 'Neues Projekt',
    editProject: 'Projekt bearbeiten',
    createNewProject: 'Neues Projekt erstellen',
    projectName: 'Projektname',
    client: 'Kunde',
    parentProject: 'Übergeordnetes Projekt',
    mainProject: 'Hauptprojekt',
    hourlyRateEuro: 'Stundensatz (€)',
    projectDescription: 'Beschreibung',
    color: 'Farbe',
    projectActive: 'Projekt ist aktiv',
    create: 'Erstellen',
    update: 'Aktualisieren',
    cancel: 'Abbrechen',
    noProjectsAvailable: 'Keine Projekte vorhanden',
    createFirstProject: 'Erstes Projekt erstellen',
    createFirstProjectDesc: 'Erstelle dein erstes Projekt, um mit der Zeiterfassung zu beginnen.',
    subprojects: 'Unterprojekte',
    inactive: 'Inaktiv',

    // Analytics
    analysisReporting: 'Analyse & Reporting',
    lastWeek: 'Letzte Woche',
    lastMonth: 'Letzter Monat',
    lastQuarter: 'Letztes Quartal',
    lastYear: 'Letztes Jahr',
    allProjects: 'Alle Projekte',
    overview: 'Übersicht',
    timeline: 'Verlauf',
    export: 'Export',
    avgDailyHours: 'Ø Tägliche Stunden',
    totalRevenue: 'Gesamtumsatz',
    projectAnalysis: 'Projektanalyse',
    noDataForPeriod: 'Keine Daten für den ausgewählten Zeitraum',
    timelineView: 'Zeitverlauf',
    noEntriesForPeriod: 'Keine Einträge für den ausgewählten Zeitraum',
    unknownProject: 'Unbekanntes Projekt',
    unknownClient: 'Unbekannter Kunde',
    entries: 'Einträge',
    revenue: 'Umsatz',

    // Settings
    settingsTitle: 'Einstellungen',
    manageSettings: 'Verwalte deine Anwendungseinstellungen und Daten',
    general: 'Allgemein',
    privacy: 'Datenschutz',
    data: 'Daten',
    appearance: 'Erscheinungsbild',
    lightTheme: 'Helles Design',
    darkTheme: 'Dunkles Design',
    chooseTheme: 'Wähle zwischen hellem und dunklem Design',
    workingHours: 'Arbeitszeiten',
    dailyWorkHours: 'Tägliche Arbeitszeit (Stunden)',
    language: 'Sprache',
    selectLanguage: 'Sprache auswählen',

    // Privacy & Security
    privacySecurity: 'Datenschutz & Sicherheit',
    localDataStorage: 'Lokale Datenspeicherung',
    localDataDesc: 'Alle deine Daten werden lokal in deinem Browser gespeichert. Keine Server-Übertragung.',
    gdprCompliance: 'DSGVO-Konformität',
    gdprDesc: 'Die Anwendung erfüllt alle Anforderungen der Datenschutz-Grundverordnung.',
    dataProcessing: 'Datenverarbeitung',
    dataProcessingItems: [
      '• Keine Cookies oder Tracking-Technologien',
      '• Keine Übertragung von Daten an Dritte',
      '• Vollständige Kontrolle über deine Daten',
      '• Jederzeit löschbar durch Nutzer'
    ],

    // Data Management
    dataManagement: 'Datenverwaltung',
    exportData: 'Daten exportieren',
    exportDataDesc: 'Erstelle eine Sicherungskopie all deiner Zeiterfassungsdaten',
    exportAllData: 'Alle Daten exportieren',
    importData: 'Daten importieren',
    importDataDesc: 'Lade eine Sicherungskopie oder externe Daten hoch',
    selectFile: 'Datei auswählen',
    deleteAllData: 'Alle Daten löschen',
    deleteAllDataDesc: 'Entferne alle gespeicherten Daten permanent. Diese Aktion ist nicht rückgängig machbar.',
    deleteAllDataWarning: 'Alle Daten unwiderruflich löschen? Diese Aktion kann nicht rückgängig gemacht werden.',

    // Work Session Summary
    workSessionEnded: 'Arbeitszeit beendet',
    workSessionDetails: 'Arbeitszeit-Details',
    timeSummary: 'Zeitzusammenfassung',
    includesAllBreaks: 'Inklusive aller Pausen',
    pureWorkTime: 'Reine Arbeitszeit',
    estimatedEarnings: 'Geschätzter Verdienst',
    hours: 'Stunden',
    breakDetails: 'Pausendetails',
    productivityMetrics: 'Produktivitätskennzahlen',
    close: 'Schließen',
    edit: 'Bearbeiten',
    exportSession: 'Exportieren',

    // Common
    yes: 'Ja',
    no: 'Nein',
    save: 'Speichern',
    delete: 'Löschen',
    confirm: 'Bestätigen',
    loading: 'Laden...',
    error: 'Fehler',
    success: 'Erfolg',
    today: 'Heute',
    yesterday: 'Gestern',
    thisWeekShort: 'Woche',
    thisMonthShort: 'Monat',
    stop: 'Stoppen',
    pause: 'Pause',
    play: 'Abspielen',
    start: 'Starten',
  },

  el: {
    // Navigation
    dashboard: 'Πίνακας Ελέγχου',
    timeTracking: 'Καταγραφή Χρόνου',
    projects: 'Έργα',
    analytics: 'Αναλυτικά',
    settings: 'Ρυθμίσεις',

    // Dashboard
    todaysWork: 'Σημερινή Εργασία',
    thisWeek: 'Αυτή την Εβδομάδα',
    thisMonth: 'Αυτόν τον Μήνα',
    totalWorkTime: 'Συνολικός Χρόνος Εργασίας',
    netWorkTime: 'Καθαρός Χρόνος Εργασίας',
    breakTime: 'Χρόνος Διαλείμματος',
    overtime: 'Υπερωρίες',
    efficiency: 'Αποδοτικότητα',
    recentEntries: 'Πρόσφατες Καταχωρήσεις',
    noEntriesYet: 'Δεν υπάρχουν καταχωρήσεις χρόνου ακόμα',
    workEfficiency: 'Αποδοτικότητα Εργασίας',
    breakPercentage: 'Ποσοστό Διαλείμματος',
    avgBreakLength: 'Μέσος Χρόνος Διαλείμματος',
    hourlyRate: 'Ωριαίος Μισθός',

    // Time Tracker
    currentTime: 'Τρέχουσα Ώρα',
    activeTimer: 'Ενεργό Χρονόμετρο',
    since: 'από',
    totalTime: 'Συνολικός Χρόνος',
    pauseTime: 'Χρόνος Διαλείμματος',
    netTime: 'Καθαρός Χρόνος',
    startNewTracking: 'Έναρξη Νέας Καταγραφής Χρόνου',
    selectProject: 'Επιλογή Έργου',
    description: 'Περιγραφή (προαιρετικό)',
    descriptionPlaceholder: 'Τι δουλεύεις;',
    characters: 'χαρακτήρες',
    startTracking: 'Έναρξη Καταγραφής',
    quickActions: 'Γρήγορες Ενέργειες',
    breakTypes: 'Τύποι Διαλείμματος',
    pauseActive: 'Διάλειμμα Ενεργό',
    endBreakToContinue: 'Τερμάτισε το διάλειμμα για να συνεχίσεις',
    endBreak: 'Τερματισμός Διαλείμματος',
    todaysBreaks: 'Σημερινά Διαλείμματα',
    running: 'τρέχει',

    // Break Types
    lunchBreak: 'Διάλειμμα Μεσημεριανού',
    coffeeBreak: 'Διάλειμμα Καφέ',
    meeting: 'Συνάντηση',
    personal: 'Προσωπικό',
    lunchDescription: 'Μεσημεριανό και μεγαλύτερη ανάπαυση',
    coffeeDescription: 'Σύντομο διάλειμμα αναψυχής',
    meetingDescription: 'Συναντήσεις και ραντεβού',
    personalDescription: 'Προσωπικές υποθέσεις',

    // Projects
    projectManagement: 'Διαχείριση Έργων',
    newProject: 'Νέο Έργο',
    editProject: 'Επεξεργασία Έργου',
    createNewProject: 'Δημιουργία Νέου Έργου',
    projectName: 'Όνομα Έργου',
    client: 'Πελάτης',
    parentProject: 'Γονικό Έργο',
    mainProject: 'Κύριο Έργο',
    hourlyRateEuro: 'Ωριαίος Μισθός (€)',
    projectDescription: 'Περιγραφή',
    color: 'Χρώμα',
    projectActive: 'Το έργο είναι ενεργό',
    create: 'Δημιουργία',
    update: 'Ενημέρωση',
    cancel: 'Ακύρωση',
    noProjectsAvailable: 'Δεν υπάρχουν διαθέσιμα έργα',
    createFirstProject: 'Δημιούργησε το πρώτο σου έργο',
    createFirstProjectDesc: 'Δημιούργησε το πρώτο σου έργο για να ξεκινήσεις την καταγραφή χρόνου.',
    subprojects: 'Υποέργα',
    inactive: 'Ανενεργό',

    // Analytics
    analysisReporting: 'Ανάλυση & Αναφορές',
    lastWeek: 'Προηγούμενη Εβδομάδα',
    lastMonth: 'Προηγούμενος Μήνας',
    lastQuarter: 'Προηγούμενο Τρίμηνο',
    lastYear: 'Προηγούμενο Έτος',
    allProjects: 'Όλα τα Έργα',
    overview: 'Επισκόπηση',
    timeline: 'Χρονολόγιο',
    export: 'Εξαγωγή',
    avgDailyHours: 'Μέσες Ημερήσιες Ώρες',
    totalRevenue: 'Συνολικά Έσοδα',
    projectAnalysis: 'Ανάλυση Έργων',
    noDataForPeriod: 'Δεν υπάρχουν δεδομένα για την επιλεγμένη περίοδο',
    timelineView: 'Προβολή Χρονολογίου',
    noEntriesForPeriod: 'Δεν υπάρχουν καταχωρήσεις για την επιλεγμένη περίοδο',
    unknownProject: 'Άγνωστο Έργο',
    unknownClient: 'Άγνωστος Πελάτης',
    entries: 'Καταχωρήσεις',
    revenue: 'Έσοδα',

    // Settings
    settingsTitle: 'Ρυθμίσεις',
    manageSettings: 'Διαχειρίσου τις ρυθμίσεις και τα δεδομένα της εφαρμογής σου',
    general: 'Γενικά',
    privacy: 'Απόρρητο',
    data: 'Δεδομένα',
    appearance: 'Εμφάνιση',
    lightTheme: 'Φωτεινό Θέμα',
    darkTheme: 'Σκοτεινό Θέμα',
    chooseTheme: 'Επίλεξε μεταξύ φωτεινού και σκοτεινού θέματος',
    workingHours: 'Ώρες Εργασίας',
    dailyWorkHours: 'Ημερήσιες Ώρες Εργασίας',
    language: 'Γλώσσα',
    selectLanguage: 'Επιλογή Γλώσσας',

    // Privacy & Security
    privacySecurity: 'Απόρρητο & Ασφάλεια',
    localDataStorage: 'Τοπική Αποθήκευση Δεδομένων',
    localDataDesc: 'Όλα τα δεδομένα σου αποθηκεύονται τοπικά στον περιηγητή σου. Χωρίς μετάδοση σε διακομιστή.',
    gdprCompliance: 'Συμμόρφωση GDPR',
    gdprDesc: 'Η εφαρμογή πληροί όλες τις απαιτήσεις του Γενικού Κανονισμού Προστασίας Δεδομένων.',
    dataProcessing: 'Επεξεργασία Δεδομένων',
    dataProcessingItems: [
      '• Χωρίς cookies ή τεχνολογίες παρακολούθησης',
      '• Χωρίς μετάδοση δεδομένων σε τρίτους',
      '• Πλήρης έλεγχος των δεδομένων σου',
      '• Διαγραφή ανά πάσα στιγμή από τον χρήστη'
    ],

    // Data Management
    dataManagement: 'Διαχείριση Δεδομένων',
    exportData: 'Εξαγωγή Δεδομένων',
    exportDataDesc: 'Δημιούργησε ένα αντίγραφο ασφαλείας όλων των δεδομένων καταγραφής χρόνου σου',
    exportAllData: 'Εξαγωγή Όλων των Δεδομένων',
    importData: 'Εισαγωγή Δεδομένων',
    importDataDesc: 'Ανέβασε ένα αντίγραφο ασφαλείας ή εξωτερικά δεδομένα',
    selectFile: 'Επιλογή Αρχείου',
    deleteAllData: 'Διαγραφή Όλων των Δεδομένων',
    deleteAllDataDesc: 'Μόνιμη αφαίρεση όλων των αποθηκευμένων δεδομένων. Αυτή η ενέργεια δεν μπορεί να αναιρεθεί.',
    deleteAllDataWarning: 'Διαγραφή όλων των δεδομένων οριστικά; Αυτή η ενέργεια δεν μπορεί να αναιρεθεί.',

    // Work Session Summary
    workSessionEnded: 'Η Συνεδρία Εργασίας Τερματίστηκε',
    workSessionDetails: 'Λεπτομέρειες Συνεδρίας Εργασίας',
    timeSummary: 'Σύνοψη Χρόνου',
    includesAllBreaks: 'Περιλαμβάνει όλα τα διαλείμματα',
    pureWorkTime: 'Καθαρός χρόνος εργασίας',
    estimatedEarnings: 'Εκτιμώμενα Κέρδη',
    hours: 'ώρες',
    breakDetails: 'Λεπτομέρειες Διαλείμματος',
    productivityMetrics: 'Μετρήσεις Παραγωγικότητας',
    close: 'Κλείσιμο',
    edit: 'Επεξεργασία',
    exportSession: 'Εξαγωγή',

    // Common
    yes: 'Ναι',
    no: 'Όχι',
    save: 'Αποθήκευση',
    delete: 'Διαγραφή',
    confirm: 'Επιβεβαίωση',
    loading: 'Φόρτωση...',
    error: 'Σφάλμα',
    success: 'Επιτυχία',
    today: 'Σήμερα',
    yesterday: 'Χθες',
    thisWeekShort: 'Εβδομάδα',
    thisMonthShort: 'Μήνας',
    stop: 'Στοπ',
    pause: 'Παύση',
    play: 'Αναπαραγωγή',
    start: 'Έναρξη',
  },
};