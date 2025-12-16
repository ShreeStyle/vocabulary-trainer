// Game Data - Words and Sentences by Difficulty

const gameData = {
    beginner: {
        words: [
            "eloquent", "resilient", "ambiguous", "meticulous", "pragmatic", "coherent", "diligent", "obsolete", "profound", "volatile",
            "endeavor", "integrity", "paradigm", "scrutiny", "arbitrary", "catalyst", "contemplate", "discourse", "eloquence", "feasible",
            "hypothesis", "inevitable", "innovation", "narrative", "objective", "perception", "plausible", "rational", "synthesis", "theoretical",
            "advocate", "benevolent", "competent", "cultivate", "empirical", "exemplify", "fluctuate", "hierarchy", "implicit", "inherent",
            "legitimate", "methodology", "perpetual", "prerequisite", "protocol", "reluctant", "subsequent", "terminate", "undertake", "vigilant"
        ],
        sentences: [
            "Success starts with practice.",
            "Learning opens new doors.",
            "Knowledge is powerful.",
            "Skills grow with effort.",
            "Practice makes progress.",
            "Focus brings results.",
            "Every step counts.",
            "Believe in yourself.",
            "Goals drive success.",
            "Time creates mastery.",
            "Growth needs patience.",
            "Dreams become reality.",
            "Effort leads forward.",
            "Change brings opportunity.",
            "Passion fuels achievement.",
            "Courage conquers fear.",
            "Action creates change.",
            "Vision guides direction.",
            "Excellence takes dedication.",
            "Winners never quit."
        ],
        timeLimit: 30,
        defaultSpeed: 0.75
    },
    intermediate: {
        words: [
            "ameliorate", "conscientious", "contemporaneous", "juxtaposition", "obfuscate", "quintessential", "recalcitrant", "sagacious", "ubiquitous", "verisimilitude",
            "acquiesce", "bellicose", "capricious", "deleterious", "ephemeral", "fastidious", "gregarious", "hegemony", "idiosyncrasy", "juxtapose",
            "languid", "magnanimous", "nefarious", "obsequious", "pernicious", "querulous", "recalcitrant", "supercilious", "tenacious", "ubiquitous",
            "vociferous", "zealous", "ameliorate", "anachronism", "antithesis", "apocryphal", "capitulate", "chicanery", "cogent", "conundrum",
            "dichotomy", "duplicity", "equanimity", "erudite", "esoteric", "exacerbate", "gregarious", "iconoclast", "impetuous", "inexorable"
        ],
        sentences: [
            "Mastering English unlocks global opportunities and connections.",
            "Consistent practice accelerates your learning journey significantly.",
            "Technology empowers us to achieve extraordinary results.",
            "Innovation drives progress in every industry worldwide.",
            "Strategic thinking separates leaders from followers consistently.",
            "Professional development requires dedication and continuous improvement.",
            "Digital skills are essential for modern career success.",
            "Effective communication builds stronger relationships and networks.",
            "Creative problem solving leads to breakthrough solutions.",
            "Data-driven decisions maximize business performance outcomes.",
            "Artificial intelligence transforms industries at unprecedented speed.",
            "Global markets create infinite possibilities for entrepreneurs.",
            "Remote work revolutionizes traditional employment models completely.",
            "Leadership excellence demands vision, courage, and integrity.",
            "Sustainable practices ensure long-term organizational success.",
            "Customer experience determines competitive advantage in markets.",
            "Agile methodologies accelerate product development cycles efficiently.",
            "Emotional intelligence enhances workplace collaboration and productivity.",
            "Continuous learning maintains relevance in changing environments.",
            "Strategic partnerships multiply growth potential exponentially."
        ],
        timeLimit: 30,
        defaultSpeed: 1.0
    },
    advanced: {
        words: [
            "abnegation", "abstemious", "acrimonious", "apocryphal", "assiduous", "beguiling", "circumlocution", "corroborate", "deleterious", "disparate",
            "ebullient", "enervate", "equivocate", "evanescent", "exculpate", "fastidious", "garrulous", "hapless", "ignominious", "imperious",
            "indefatigable", "insidious", "intransigent", "lachrymose", "loquacious", "magnanimity", "malevolent", "mendacious", "munificent", "nefarious",
            "obdurate", "obsequious", "ostensible", "parsimonious", "pellucid", "perfidious", "perspicacious", "prevaricate", "propitious", "pusillanimous",
            "quiescent", "recondite", "redolent", "refractory", "sacrosanct", "sanguine", "soporific", "specious", "truculent", "venal"
        ],
        sentences: [
            "The unprecedented technological advancements have revolutionized the way we communicate and interact with each other globally.",
            "Despite facing numerous obstacles, she demonstrated remarkable perseverance and ultimately accomplished her ambitious goals.",
            "The environmental consequences of climate change require immediate and comprehensive action from all nations worldwide.",
            "His extraordinary ability to analyze complex situations and provide innovative solutions impressed everyone in the organization.",
            "The pharmaceutical industry continues to invest heavily in research and development of groundbreaking treatments for various diseases.",
            "Understanding the psychological factors that influence human behavior is crucial for effective communication and leadership.",
            "The architectural design of the building seamlessly combines modern aesthetics with traditional cultural elements and sustainability.",
            "Successfully implementing organizational change requires strong leadership, clear communication, and stakeholder engagement throughout the process.",
            "The international conference brought together distinguished experts from diverse fields to discuss critical global challenges.",
            "Maintaining accountability and transparency in government operations is fundamental to building public trust and democratic integrity.",
            "The comprehensive educational curriculum was specifically designed to develop critical thinking skills and foster creativity.",
            "Economic inequality and social discrimination remain significant challenges that require systemic reforms and collective action.",
            "The sophisticated software system substantially improved operational efficiency and reduced costs across all departments.",
            "Scientific research has provided overwhelming evidence supporting the theory of evolution and natural selection over time.",
            "The transformation of traditional industries through digital innovation has created both opportunities and challenges for workers.",
            "His philanthropic efforts have positively impacted thousands of lives by supporting education and healthcare initiatives worldwide.",
            "Understanding the fundamental principles of quantum mechanics requires extensive mathematical knowledge and abstract thinking capabilities.",
            "The parliamentary debate highlighted the complex ethical considerations surrounding genetic engineering and biotechnology regulations.",
            "Effective rehabilitation programs must address both physical recovery and psychological well-being of individuals holistically.",
            "The infrastructure improvements will significantly enhance transportation efficiency and stimulate economic growth in the region."
        ],
        timeLimit: 30,
        defaultSpeed: 1.25
    },
    veryhard: {
        words: [
            "absquatulate", "adscititious", "apothegm", "apricity", "borborygmus", "brobdingnagian", "callipygian", "cataglottism", "chiaroscurist", "crepuscular",
            "defenestration", "dipsomaniac", "eburnean", "eleemosynary", "epeolatry", "eschatological", "exiguous", "floccinaucinihilipilification", "gaberlunzie", "grandiloquent",
            "honorificabilitudinitatibus", "iatrogenic", "incunabula", "jentacular", "kakorrhaphiophobia", "lethologica", "logorrhea", "macrosmatic", "malversation", "misoneism",
            "morosoph", "natation", "nidificate", "obambulate", "odontoloxia", "oligopsony", "omphaloskepsis", "ophidian", "oscitancy", "pandiculation",
            "parapraxis", "paronomasia", "philtrum", "phosphene", "pneumonoultramicroscopicsilicovolcanoconiosis", "prestidigitation", "proboscidean", "quodlibet", "rodomontade", "scurrility"
        ],
        sentences: [
            "The otorhinolaryngologist specialized in diagnosing and treating extraordinarily complicated nasopharyngeal diseases using state-of-the-art immunoelectrophoretically advanced technology.",
            "The psychoneuroendocrinological research demonstrated unequivocally that hypothalamic-pituitary-adrenocortical dysregulation significantly contributes to various psychopathological manifestations.",
            "The electroencephalographically monitored patient exhibited characteristically abnormal electrocardiographic patterns indicating possible cardiovascular decompensation requiring immediate intervention.",
            "Pneumonoultramicroscopicsilicovolcanoconiosis remains one of the longest words in the English dictionary representing a lung disease caused by inhaling very fine silicate or quartz dust.",
            "The counterrevolutionaries systematically implemented deinstitutionalization policies that fundamentally transformed socioeconomic infrastructure throughout multiple transnational jurisdictions.",
            "Dichlorodifluoromethane and other chlorofluorocarbon compounds have been scientifically proven to cause stratospheric ozone depletion through photochemical decomposition reactions.",
            "The spectrophotofluorometrically analyzed specimens revealed unprecedented concentrations of methylenedioxymethamphetamine derivatives in neurobiological tissue samples.",
            "Antidisestablishmentarianism historically represented a political position opposing the disestablishment of the Church of England as the official state church.",
            "The gastroenterocolostomy procedure involves surgically creating an anastomosis between the stomach and colon bypassing the small intestine entirely.",
            "Hippopotomonstrosesquippedaliophobia ironically describes the fear of long words despite being an extraordinarily lengthy polysyllabic term itself.",
            "The radioimmunoelectrophoresis technique combines radioactive isotope labeling with immunological precipitation and electrophoretic separation for protein analysis.",
            "Hepaticocholangiogastrostomy represents a complex surgical procedure establishing communication between the hepatic duct, bile duct, and stomach.",
            "The thyroparathyroidectomized patients required lifelong supplementation with calcium and vitamin D to maintain proper mineral homeostasis.",
            "Floccinaucinihilipilification describes the action or habit of estimating something as worthless, though the word itself is rarely used in everyday conversation.",
            "The unconstitutionality of the legislative proposal was debated extensively by constitutional scholars who examined its compatibility with fundamental rights.",
            "Trinitrophenylmethylnitramine, commonly known as tetryl, is a sensitive explosive compound used primarily in detonators and booster charges.",
            "The immunoelectrophoretically separated proteins demonstrated distinctive migration patterns indicative of specific antibody-antigen complex formations.",
            "Psychophysicotherapeutics encompasses the interdisciplinary study of psychological, physiological, and pharmacological approaches to mental health treatment.",
            "Overintellectualization represents a psychological defense mechanism whereby individuals use excessive abstract thinking to avoid experiencing uncomfortable emotions.",
            "The pancreaticoduodenectomy, commonly called the Whipple procedure, involves removing the pancreatic head, duodenum, gallbladder, and portion of the bile duct."
        ],
        timeLimit: 30,
        defaultSpeed: 1.5
    }
};

// Badge definitions
const badges = {
    streak5: {
        id: "streak5",
        name: "🔥 Hot Streak",
        description: "5 correct answers in a row!",
        requirement: 5
    },
    streak10: {
        id: "streak10",
        name: "🔥🔥 Fire Master",
        description: "10 correct answers in a row!",
        requirement: 10
    },
    streak20: {
        id: "streak20",
        name: "🔥🔥🔥 Legend",
        description: "20 correct answers in a row!",
        requirement: 20
    },
    dailyChallenge: {
        id: "dailyChallenge",
        name: "⭐ Daily Champion",
        description: "Completed 10 levels in one session!",
        requirement: 10
    }
};

// Get random challenge based on difficulty and mode
function getRandomChallenge(difficulty, mode) {
    const data = gameData[difficulty];
    const pool = mode === 'word' ? data.words : data.sentences;
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
}

// Get time limit for difficulty
function getTimeLimit(difficulty) {
    return gameData[difficulty].timeLimit;
}

// Get default speed for difficulty
function getDefaultSpeed(difficulty) {
    return gameData[difficulty].defaultSpeed;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { gameData, badges, getRandomChallenge, getTimeLimit, getDefaultSpeed };
}
