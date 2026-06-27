// Mock data for Sarkari Sahayak
export type Lang = "en" | "kn" | "hi";

export interface Scheme {
  id: string;
  name: Record<Lang, string>;
  category: string;
  description: Record<Lang, string>;
  eligibility: Record<Lang, string>;
  documents: string[];
  process: Record<Lang, string>;
  link: string;
}

export interface GovDocument {
  id: string;
  name: Record<Lang, string>;
  category: "Identity" | "Certificate" | "Financial";
  purpose: Record<Lang, string>;
  requirements: string[];
  process: Record<Lang, string>;
  time: string;
}

export interface Service {
  id: string;
  name: Record<Lang, string>;
  category: string;
  description: Record<Lang, string>;
  steps: string[];
  documents: string[];
}

export const schemes: Scheme[] = [
  {
    id: "pm-kisan",
    name: { en: "PM Kisan Samman Nidhi", kn: "ಪಿಎಂ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ", hi: "पीएम किसान सम्मान निधि" },
    category: "Agriculture",
    description: {
      en: "₹6,000 per year direct income support to all landholding farmer families.",
      kn: "ಎಲ್ಲಾ ಭೂಮಿ ಹೊಂದಿರುವ ರೈತ ಕುಟುಂಬಗಳಿಗೆ ವಾರ್ಷಿಕ ₹6,000 ಆದಾಯ ಬೆಂಬಲ.",
      hi: "सभी भूमिधारक किसान परिवारों को प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता।",
    },
    eligibility: {
      en: "Small and marginal farmers owning cultivable land.",
      kn: "ಕೃಷಿಯೋಗ್ಯ ಭೂಮಿ ಹೊಂದಿರುವ ಸಣ್ಣ ಮತ್ತು ಅತಿ ಸಣ್ಣ ರೈತರು.",
      hi: "खेती योग्य भूमि वाले छोटे और सीमांत किसान।",
    },
    documents: ["Aadhaar Card", "Bank Account", "Land Records"],
    process: {
      en: "Register at pmkisan.gov.in with Aadhaar and land details.",
      kn: "pmkisan.gov.in ನಲ್ಲಿ ಆಧಾರ್ ಮತ್ತು ಭೂಮಿ ವಿವರಗಳೊಂದಿಗೆ ನೋಂದಾಯಿಸಿ.",
      hi: "आधार और भूमि विवरण के साथ pmkisan.gov.in पर पंजीकरण करें।",
    },
    link: "https://pmkisan.gov.in",
  },
  {
    id: "ayushman",
    name: { en: "Ayushman Bharat (PM-JAY)", kn: "ಆಯುಷ್ಮಾನ್ ಭಾರತ್", hi: "आयुष्मान भारत" },
    category: "Healthcare",
    description: {
      en: "Health cover of ₹5 lakh per family per year for secondary and tertiary care.",
      kn: "ಪ್ರತಿ ಕುಟುಂಬಕ್ಕೆ ವಾರ್ಷಿಕ ₹5 ಲಕ್ಷ ಆರೋಗ್ಯ ರಕ್ಷಣೆ.",
      hi: "प्रति परिवार प्रति वर्ष ₹5 लाख का स्वास्थ्य कवर।",
    },
    eligibility: {
      en: "Families listed in SECC 2011 database.",
      kn: "SECC 2011 ಪಟ್ಟಿಯಲ್ಲಿರುವ ಕುಟುಂಬಗಳು.",
      hi: "SECC 2011 सूची में शामिल परिवार।",
    },
    documents: ["Aadhaar Card", "Ration Card", "Family ID"],
    process: {
      en: "Visit nearest empanelled hospital or CSC centre with Aadhaar.",
      kn: "ಆಧಾರ್‌ನೊಂದಿಗೆ ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ ಅಥವಾ CSC ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ.",
      hi: "आधार के साथ निकटतम सूचीबद्ध अस्पताल या CSC केंद्र पर जाएँ।",
    },
    link: "https://pmjay.gov.in",
  },
  {
    id: "nsp",
    name: { en: "National Scholarship", kn: "ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾರ್ಥಿವೇತನ", hi: "राष्ट्रीय छात्रवृत्ति" },
    category: "Education",
    description: {
      en: "Centralized scholarships for pre-matric, post-matric and merit students.",
      kn: "ಪ್ರೀ-ಮೆಟ್ರಿಕ್, ಪೋಸ್ಟ್-ಮೆಟ್ರಿಕ್ ಮತ್ತು ಮೆರಿಟ್ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವಿದ್ಯಾರ್ಥಿವೇತನ.",
      hi: "प्री-मैट्रिक, पोस्ट-मैट्रिक और मेधावी छात्रों के लिए छात्रवृत्ति।",
    },
    eligibility: {
      en: "Students from SC/ST/OBC/Minority with family income criteria.",
      kn: "SC/ST/OBC/ಅಲ್ಪಸಂಖ್ಯಾತ ವಿದ್ಯಾರ್ಥಿಗಳು (ಆದಾಯ ಮಾನದಂಡ).",
      hi: "SC/ST/OBC/अल्पसंख्यक छात्र (आय मानदंड के साथ)।",
    },
    documents: ["Aadhaar", "Income Certificate", "Marksheet", "Bank Passbook"],
    process: {
      en: "Apply on scholarships.gov.in during the academic window.",
      kn: "scholarships.gov.in ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.",
      hi: "scholarships.gov.in पर आवेदन करें।",
    },
    link: "https://scholarships.gov.in",
  },
  {
    id: "pmay",
    name: { en: "PM Awas Yojana", kn: "ಪಿಎಂ ಆವಾಸ್ ಯೋಜನೆ", hi: "पीएम आवास योजना" },
    category: "Housing",
    description: {
      en: "Affordable housing assistance for urban and rural poor.",
      kn: "ನಗರ ಮತ್ತು ಗ್ರಾಮೀಣ ಬಡವರಿಗೆ ಕೈಗೆಟುಕುವ ವಸತಿ ಸಹಾಯ.",
      hi: "शहरी और ग्रामीण गरीबों के लिए किफायती आवास सहायता।",
    },
    eligibility: {
      en: "EWS/LIG/MIG families without pucca house.",
      kn: "ಪಕ್ಕಾ ಮನೆ ಇಲ್ಲದ EWS/LIG/MIG ಕುಟುಂಬಗಳು.",
      hi: "पक्के घर के बिना EWS/LIG/MIG परिवार।",
    },
    documents: ["Aadhaar", "Income Proof", "Bank Account"],
    process: {
      en: "Apply through pmaymis.gov.in or Gram Panchayat.",
      kn: "pmaymis.gov.in ಅಥವಾ ಗ್ರಾಮ ಪಂಚಾಯತಿ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.",
      hi: "pmaymis.gov.in या ग्राम पंचायत के माध्यम से आवेदन करें।",
    },
    link: "https://pmaymis.gov.in",
  },
  {
    id: "vayoshri",
    name: { en: "Indira Gandhi Old Age Pension", kn: "ಇಂದಿರಾ ಗಾಂಧಿ ವೃದ್ಧಾಪ್ಯ ಪಿಂಚಣಿ", hi: "इंदिरा गांधी वृद्धावस्था पेंशन" },
    category: "Social Welfare",
    description: {
      en: "Monthly pension for citizens above 60 years from BPL families.",
      kn: "BPL ಕುಟುಂಬಗಳ 60+ ವಯಸ್ಸಿನ ನಾಗರಿಕರಿಗೆ ಮಾಸಿಕ ಪಿಂಚಣಿ.",
      hi: "BPL परिवारों के 60+ वर्ष नागरिकों के लिए मासिक पेंशन।",
    },
    eligibility: {
      en: "60+ years, below poverty line.",
      kn: "60+ ವರ್ಷ, ಬಡತನ ರೇಖೆಗಿಂತ ಕೆಳಗೆ.",
      hi: "60+ वर्ष, गरीबी रेखा से नीचे।",
    },
    documents: ["Aadhaar", "Age Proof", "BPL Card", "Bank Account"],
    process: {
      en: "Apply at Taluk office or Seva Sindhu portal.",
      kn: "ತಾಲೂಕು ಕಚೇರಿ ಅಥವಾ ಸೇವಾ ಸಿಂಧು ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.",
      hi: "तालुक कार्यालय या सेवा सिंधु पोर्टल पर आवेदन करें।",
    },
    link: "https://sevasindhu.karnataka.gov.in",
  },
  {
    id: "ujjwala",
    name: { en: "PM Ujjwala Yojana", kn: "ಪಿಎಂ ಉಜ್ವಲ ಯೋಜನೆ", hi: "पीएम उज्ज्वला योजना" },
    category: "Social Welfare",
    description: {
      en: "Free LPG connections to women from BPL households.",
      kn: "BPL ಕುಟುಂಬಗಳ ಮಹಿಳೆಯರಿಗೆ ಉಚಿತ LPG ಸಂಪರ್ಕ.",
      hi: "BPL परिवारों की महिलाओं को मुफ्त LPG कनेक्शन।",
    },
    eligibility: { en: "Adult women from BPL families.", kn: "BPL ಕುಟುಂಬದ ವಯಸ್ಕ ಮಹಿಳೆಯರು.", hi: "BPL परिवार की वयस्क महिलाएँ।" },
    documents: ["Aadhaar", "BPL Ration Card", "Bank Account"],
    process: {
      en: "Apply at nearest LPG distributor with KYC documents.",
      kn: "KYC ದಾಖಲೆಗಳೊಂದಿಗೆ ಹತ್ತಿರದ LPG ವಿತರಕರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      hi: "KYC दस्तावेज़ों के साथ निकटतम LPG वितरक से संपर्क करें।",
    },
    link: "https://pmuy.gov.in",
  },
];

export const documents: GovDocument[] = [
  {
    id: "aadhaar",
    name: { en: "Aadhaar Card", kn: "ಆಧಾರ್ ಕಾರ್ಡ್", hi: "आधार कार्ड" },
    category: "Identity",
    purpose: { en: "Unique 12-digit identity for all citizens.", kn: "ಎಲ್ಲಾ ನಾಗರಿಕರಿಗೆ 12-ಅಂಕಿಯ ಗುರುತಿನ ಚೀಟಿ.", hi: "सभी नागरिकों के लिए 12-अंकीय पहचान।" },
    requirements: ["Proof of Identity", "Proof of Address", "Date of Birth Proof"],
    process: { en: "Book appointment at UIDAI centre and complete biometrics.", kn: "UIDAI ಕೇಂದ್ರದಲ್ಲಿ ಬಯೋಮೆಟ್ರಿಕ್ ಸಲ್ಲಿಸಿ.", hi: "UIDAI केंद्र पर बायोमेट्रिक पूरा करें।" },
    time: "7-30 days",
  },
  {
    id: "pan",
    name: { en: "PAN Card", kn: "ಪ್ಯಾನ್ ಕಾರ್ಡ್", hi: "पैन कार्ड" },
    category: "Identity",
    purpose: { en: "Tax identification for financial transactions.", kn: "ತೆರಿಗೆ ಗುರುತಿನ ಸಂಖ್ಯೆ.", hi: "कर पहचान संख्या।" },
    requirements: ["Aadhaar", "Photo", "DOB Proof"],
    process: { en: "Apply on incometax.gov.in or NSDL portal.", kn: "incometax.gov.in ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.", hi: "incometax.gov.in पर आवेदन करें।" },
    time: "15 days",
  },
  {
    id: "income",
    name: { en: "Income Certificate", kn: "ಆದಾಯ ಪ್ರಮಾಣ ಪತ್ರ", hi: "आय प्रमाण पत्र" },
    category: "Certificate",
    purpose: { en: "Proof of annual family income.", kn: "ವಾರ್ಷಿಕ ಕುಟುಂಬ ಆದಾಯದ ಪುರಾವೆ.", hi: "वार्षिक पारिवारिक आय का प्रमाण।" },
    requirements: ["Aadhaar", "Ration Card", "Salary Slip / Affidavit"],
    process: { en: "Apply on Seva Sindhu or Nadakacheri portal.", kn: "ಸೇವಾ ಸಿಂಧು / ನಾಡಕಚೇರಿಯಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.", hi: "सेवा सिंधु / नादकचेरी पर आवेदन करें।" },
    time: "21 days",
  },
  {
    id: "caste",
    name: { en: "Caste Certificate", kn: "ಜಾತಿ ಪ್ರಮಾಣ ಪತ್ರ", hi: "जाति प्रमाण पत्र" },
    category: "Certificate",
    purpose: { en: "Proof of caste for reservations and benefits.", kn: "ಮೀಸಲಾತಿಗಾಗಿ ಜಾತಿಯ ಪುರಾವೆ.", hi: "आरक्षण हेतु जाति प्रमाण।" },
    requirements: ["Aadhaar", "Father's Caste Certificate", "Ration Card"],
    process: { en: "Apply at Nadakacheri / Taluk office.", kn: "ನಾಡಕಚೇರಿ / ತಾಲೂಕು ಕಚೇರಿಯಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.", hi: "नादकचेरी / तालुक कार्यालय में आवेदन करें।" },
    time: "21 days",
  },
  {
    id: "birth",
    name: { en: "Birth Certificate", kn: "ಜನನ ಪ್ರಮಾಣ ಪತ್ರ", hi: "जन्म प्रमाण पत्र" },
    category: "Certificate",
    purpose: { en: "Legal proof of birth.", kn: "ಜನನದ ಕಾನೂನು ಪುರಾವೆ.", hi: "जन्म का कानूनी प्रमाण।" },
    requirements: ["Hospital Record", "Parents' ID", "Address Proof"],
    process: { en: "Apply at Municipal office or eJanma portal.", kn: "ಮುನಿಸಿಪಲ್ ಕಚೇರಿ ಅಥವಾ eJanma ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.", hi: "नगरपालिका कार्यालय या eJanma पर आवेदन करें।" },
    time: "7-14 days",
  },
  {
    id: "voter",
    name: { en: "Voter ID", kn: "ಮತದಾರರ ಗುರುತಿನ ಚೀಟಿ", hi: "मतदाता पहचान पत्र" },
    category: "Identity",
    purpose: { en: "Identification for voting in elections.", kn: "ಚುನಾವಣೆಯಲ್ಲಿ ಮತದಾನಕ್ಕಾಗಿ.", hi: "चुनाव में मतदान के लिए पहचान।" },
    requirements: ["Aadhaar", "Address Proof", "Photo"],
    process: { en: "Apply on voters.eci.gov.in (Form 6).", kn: "voters.eci.gov.in (ಫಾರಂ 6) ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.", hi: "voters.eci.gov.in (फॉर्म 6) पर आवेदन करें।" },
    time: "30 days",
  },
];

export const services: Service[] = [
  {
    id: "edu-1",
    name: { en: "Apply for Scholarship", kn: "ವಿದ್ಯಾರ್ಥಿವೇತನಕ್ಕೆ ಅರ್ಜಿ", hi: "छात्रवृत्ति आवेदन" },
    category: "Education",
    description: { en: "Central and state scholarships for students.", kn: "ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವಿದ್ಯಾರ್ಥಿವೇತನ.", hi: "छात्रों के लिए छात्रवृत्ति।" },
    steps: ["Register on NSP", "Fill application", "Upload documents", "Submit for verification"],
    documents: ["Aadhaar", "Income Certificate", "Marksheet", "Bank Passbook"],
  },
  {
    id: "health-1",
    name: { en: "Ayushman Health Card", kn: "ಆಯುಷ್ಮಾನ್ ಆರೋಗ್ಯ ಕಾರ್ಡ್", hi: "आयुष्मान स्वास्थ्य कार्ड" },
    category: "Healthcare",
    description: { en: "Enroll for cashless health treatment.", kn: "ನಗದು ರಹಿತ ಚಿಕಿತ್ಸೆಗೆ ನೋಂದಣಿ.", hi: "कैशलेस उपचार के लिए नामांकन।" },
    steps: ["Visit CSC / hospital", "Aadhaar verification", "Print health card"],
    documents: ["Aadhaar", "Ration Card"],
  },
  {
    id: "agri-1",
    name: { en: "Soil Health Card", kn: "ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಕಾರ್ಡ್", hi: "मृदा स्वास्थ्य कार्ड" },
    category: "Agriculture",
    description: { en: "Test soil and get recommendations for farmers.", kn: "ರೈತರಿಗೆ ಮಣ್ಣು ಪರೀಕ್ಷೆ.", hi: "किसानों के लिए मृदा परीक्षण।" },
    steps: ["Register at krishi office", "Sample collection", "Receive card"],
    documents: ["Aadhaar", "Land Records"],
  },
  {
    id: "emp-1",
    name: { en: "Employment Exchange Registration", kn: "ಉದ್ಯೋಗ ವಿನಿಮಯ ನೋಂದಣಿ", hi: "रोजगार पंजीकरण" },
    category: "Employment",
    description: { en: "Register for state employment notifications.", kn: "ರಾಜ್ಯ ಉದ್ಯೋಗ ಸೂಚನೆಗಳಿಗೆ ನೋಂದಾಯಿಸಿ.", hi: "राज्य रोजगार अधिसूचनाओं हेतु पंजीकरण।" },
    steps: ["Visit exchange office", "Submit qualifications", "Get registration number"],
    documents: ["Aadhaar", "Education Certificates"],
  },
  {
    id: "cert-1",
    name: { en: "Domicile Certificate", kn: "ವಸತಿ ಪ್ರಮಾಣ ಪತ್ರ", hi: "निवास प्रमाण पत्र" },
    category: "Certificate",
    description: { en: "Proof of residence in state.", kn: "ರಾಜ್ಯದಲ್ಲಿ ವಾಸಸ್ಥಳದ ಪುರಾವೆ.", hi: "राज्य में निवास का प्रमाण।" },
    steps: ["Apply on Seva Sindhu", "Verification", "Download certificate"],
    documents: ["Aadhaar", "Address Proof", "School Certificate"],
  },
  {
    id: "social-1",
    name: { en: "Widow Pension", kn: "ವಿಧವಾ ಪಿಂಚಣಿ", hi: "विधवा पेंशन" },
    category: "Social Welfare",
    description: { en: "Monthly assistance to widows.", kn: "ವಿಧವೆಯರಿಗೆ ಮಾಸಿಕ ಸಹಾಯ.", hi: "विधवाओं को मासिक सहायता।" },
    steps: ["Apply at Taluk office", "Document verification", "Pension credited"],
    documents: ["Aadhaar", "Death Certificate of Spouse", "Bank Account"],
  },
];

export const serviceCategories = [
  { id: "Education", icon: "GraduationCap", color: "text-blue-600" },
  { id: "Healthcare", icon: "HeartPulse", color: "text-rose-600" },
  { id: "Agriculture", icon: "Sprout", color: "text-green-600" },
  { id: "Employment", icon: "Briefcase", color: "text-amber-600" },
  { id: "Social Welfare", icon: "Users", color: "text-purple-600" },
  { id: "Certificate", icon: "FileBadge", color: "text-cyan-600" },
];
