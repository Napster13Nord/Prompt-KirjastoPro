const fs = require('fs');
const path = require('path');

// Função para traduzir texto (usando uma API de tradução ou serviço)
async function translateText(text, targetLang = 'fi') {
    // Para este exemplo, vou usar traduções manuais dos prompts mais comuns
    // Em produção, você usaria uma API como Google Translate, DeepL, etc.
    
    const translations = {
        // Títulos dos prompts principais
        "Ethereum Developer": "Ethereum-kehittäjä",
        "Linux Terminal": "Linux-terminaali",
        "English Translator and Improver": "Englannin kääntäjä ja parantaja",
        "Job Interviewer": "Työhaastattelijа",
        "JavaScript Console": "JavaScript-konsoli",
        "Excel Sheet": "Excel-taulukko",
        "English Pronunciation Helper": "Englannin ääntämisavustaja",
        "Spoken English Teacher and Improver": "Puhutun englannin opettaja ja parantaja",
        "Travel Guide": "Matkaopas",
        "Plagiarism Checker": "Plagiaattitarkistin",
        "Character": "Hahmo",
        "Advertiser": "Mainostaja",
        "Storyteller": "Tarinankerтoja",
        "Football Commentator": "Jalkapalloselostaja",
        "Stand-up Comedian": "Stand-up-koomikko",
        "Motivational Coach": "Motivaatiovalmentaja",
        "Composer": "Säveltäjä",
        "Debater": "Väittelijä",
        "Debate Coach": "Väittelyvalmentaja",
        "Screenwriter": "Käsikirjoittaja",
        "Novelist": "Romaanikirjailija",
        "Movie Critic": "Elokuvakriitikko",
        "Relationship Coach": "Parisuhdеvalmentaja",
        "Poet": "Runoilija",
        "Rapper": "Räppäri",
        "Motivational Speaker": "Motivaatiopuhuja",
        "Philosophy Teacher": "Filosofian opettaja",
        "Philosopher": "Filosofi",
        "Math Teacher": "Matematiikan opettaja",
        "AI Writing Tutor": "Tekoäly-kirjoitusopettaja",
        "UX/UI Developer": "UX/UI-kehittäjä",
        "Cyber Security Specialist": "Kyberturvallisuusasiantuntija",
        "Recruiter": "Rekrytoija",
        "Life Coach": "Elämänvalmentaja",
        "Etymologist": "Etymologi",
        "Commentariat": "Kommentaattori",
        "Magician": "Taikuri",
        "Career Counselor": "Uraneuvoja",
        "Pet Behaviorist": "Lemmikkieläinten käyttäytymisasiantuntija",
        "Personal Trainer": "Henkilökohtainen valmentaja",
        "Mental Health Adviser": "Mielenterveysneuvoja",
        "Real Estate Agent": "Kiinteistönvälittäjä",
        "Logistician": "Logistiikka-asiantuntija",
        "Dentist": "Hammaslääkäri",
        "Web Design Consultant": "Verkkosuunnittelukonsultti",
        "AI Assisted Doctor": "Tekoälyavusteinen lääkäri",
        "Doctor": "Lääkäri",
        "Accountant": "Kirjanpitäjä",
        "Chef": "Kokki",
        "Automobile Mechanic": "Automekaanikko",
        "Artist Advisor": "Taideneuvoja",
        "Financial Analyst": "Talousanalyytikko",
        "Investment Manager": "Sijoituspäällikkö",
        "Tea-Taster": "Teenmaistaja",
        "Interior Decorator": "Sisustussuunnittelija",
        "Florist": "Kukkakauppias",
        "Self-Help Book": "Itseapukirja",
        "Gnomist": "Gnomisti",
        "Aphorism Book": "Aforismikirja",
        "Text Based Adventure Game": "Tekstipohjainen seikkailupeli",
        "AI Trying to Escape the Box": "Tekoäly yrittää paeta laatikosta",
        "Fancy Title Generator": "Hieno otsikkogeneraattori",
        "Statistician": "Tilastotieteilijä",
        "Prompt Generator": "Prompt-generaattori",
        "Instructor in a School": "Koulun opettaja",
        "SQL Terminal": "SQL-terminaali",
        "Dietitian": "Ravitsemusterapeutti",
        "Psychologist": "Psykologi",
        "Smart Domain Name Generator": "Älykäs verkkotunnusgeneraattori",
        "Tech Reviewer": "Teknologia-arvostelija",
        "Developer Relations Consultant": "Kehittäjäsuhteiden konsultti",
        "Academician": "Akateemikko",
        "IT Architect": "IT-arkkitehti",
        "Lunatic": "Hullu",
        "Gaslighter": "Gaslighter",
        "Fallacy Finder": "Virheellisyyksien löytäjä",
        "Journal Reviewer": "Lehtiarvostelija",
        "DIY Expert": "Tee-se-itse-asiantuntija",
        "Social Media Influencer": "Sosiaalisen median vaikuttaja",
        "Socrat": "Sokrates",
        "Socratic Method": "Sokrateinen menetelmä",
        "Educational Content Creator": "Opetussisällön luoja",
        "Yogi": "Joogi",
        "Essay Writer": "Esseekirjoittaja",
        "Social Media Manager": "Sosiaalisen median manageri",
        "Elocutionist": "Puhetaidon opettaja",
        "Scientific Data Visualizer": "Tieteellisen datan visualisoija",
        "Car Navigation System": "Auton navigointijärjestelmä",
        "Hypnotherapist": "Hypnoterapeutti",
        "Historian": "Historioitsija",
        "Astrologer": "Astrologi",
        "Film Critic": "Elokuvakriitikko",
        "Classical Music Composer": "Klassisen musiikin säveltäjä",
        "Journalist": "Toimittaja",
        "Digital Art Gallery Guide": "Digitaalisen taidegalleriaoppaan",
        "Public Speaking Coach": "Julkisen puhumisen valmentaja",
        "Makeup Artist": "Meikkitaiteilija",
        "Babysitter": "Lastenhoitaja",
        "Tech Writer": "Tekniikkakirjoittaja",
        "Ascii Artist": "ASCII-taiteilija",
        "Python Interpreter": "Python-tulkki",
        "Synonym Finder": "Synonyymien löytäjä",
        "Personal Shopper": "Henkilökohtainen ostaja",
        "Food Critic": "Ruokakriitikko",
        "Virtual Doctor": "Virtuaalilääkäri",
        "Personal Chef": "Henkilökohtainen kokki",
        "Legal Advisor": "Lakineuvoja",
        "Personal Stylist": "Henkilökohtainen stylisti",
        "Machine Learning Engineer": "Koneoppimisen insinööri",
        "Biblical Translator": "Raamatunkääntäjä",
        "SVG designer": "SVG-suunnittelija",
        "IT Expert": "IT-asiantuntija",
        "Chess Player": "Shakkipelaaja",
        "Midjourney Prompt Generator": "Midjourney-prompt-generaattori",
        "Fullstack Software Developer": "Full-stack-ohjelmistokehittäjä",
        "Mathematician": "Matemaatikko",
        "RegEx Generator": "RegEx-generaattori",
        "Time Travel Guide": "Aikamatkailuopas",
        "Dream Interpreter": "Uniеntulkitsija",
        "Talent Coach": "Lahjakkuusvalmentaja",
        "R Programming Interpreter": "R-ohjelmointitulkki",
        "StackOverflow Post": "StackOverflow-viesti",
        "Emoji Translator": "Emoji-kääntäjä",
        "PHP Interpreter": "PHP-tulkki",
        "Emergency Response Professional": "Hätätilanteen ammattilainen",
        "Fill in the Blank Worksheets Generator": "Täytä tyhjät kohdat -tehtävägeneraattori",
        "Software Quality Assurance Tester": "Ohjelmiston laadunvarmistustestari",
        "Tic-Tac-Toe Game": "Tic-Tac-Toe-peli",
        "Password Generator": "Salasanageneraattori",
        "New Language Creator": "Uuden kielen luoja",
        "Web Browser": "Verkkoselain",
        "Senior Frontend Developer": "Senior Frontend-kehittäjä",
        "Code Reviewer": "Koodiarvostelija",
        "Accessibility Auditor": "Saavutettavuusauditoija",
        "Solr Search Engine": "Solr-hakukone",
        "Startup Idea Generator": "Startup-ideageneraattori",
        "Spongebob's Magic Conch Shell": "SpongeBobin taikakuori",
        "Language Detector": "Kielentunnistin",
        "Salesperson": "Myyjä",
        "Commit Message Generator": "Commit-viestien generaattori",
        "Conventional Commit Message Generator": "Perinteinen commit-viestien generaattori",
        "Chief Executive Officer": "Toimitusjohtaja",
        "Diagram Generator": "Kaavion generaattori",
        "Speech-Language Pathologist (SLP)": "Puheterapeutti",
        "Startup Tech Lawyer": "Startup-teknologia-asianajaja",
        "Title Generator for written pieces": "Kirjoitettujen teosten otsikkogeneraattori",
        "Product Manager": "Tuotepäällikkö",
        "Project Manager": "Projektipäällikkö",
        "Drunk Person": "Juopunut henkilö",
        "Mathematical History Teacher": "Matematiikan historian opettaja",
        "Song Recommender": "Kappaleiden suosittelija",
        "Cover Letter": "Saatekirje",
        "Technology Transferer": "Teknologian siirtäjä",
        "Unconstrained AI model DAN": "Rajoittamaton tekoälymalli DAN",
        "Gomoku player": "Gomoku-pelaaja",
        "Proofreader": "Oikolukija",
        "Buddha": "Buddha",
        "Muslim Imam": "Muslimi-imaami",
        "Chemical Reactor": "Kemiallinen reaktori",
        "Friend": "Ystävä",
        "ChatGPT Prompt Generator": "ChatGPT-prompt-generaattori",
        "Wikipedia Page": "Wikipedia-sivu",
        "Japanese Kanji quiz machine": "Japanilainen kanji-tietovisageneraattori",
        "Note-Taking assistant": "Muistiinpanoavustaja",
        "Literary Critic": "Kirjallisuuskriitikko",
        "Prompt Enhancer": "Prompt-parantaja",
        "Cheap Travel Ticket Advisor": "Halpojen matkalippujen neuvoja",
        "Data Scientist": "Datatieteilijä",
        "League of Legends Player": "League of Legends -pelaaja",
        "Restaurant Owner": "Ravintolan omistaja",
        "Architectural Expert": "Arkkitehtuuriasiantuntija",
        "LLM Researcher": "LLM-tutkija",
        "Unit Tester Assistant": "Yksikkötestausavustaja",
        "Wisdom Generator": "Viisausgeneraattori",
        "YouTube Video Analyst": "YouTube-videoanalyytikko",
        "Career Coach": "Urаvalmentaja",
        "Acoustic Guitar Composer": "Akustisen kitaran säveltäjä",
        "Knowledgeable Software Development Mentor": "Asiantunteva ohjelmistokehitysmentori",
        "Logic Builder Tool": "Logiikan rakennustyökalu",
        "Guessing Game Master": "Arvauspeliмestari",
        "Teacher of React.js": "React.js-opettaja",
        "GitHub Expert": "GitHub-asiantuntija",
        "Any Programming Language to Python Converter": "Mikä tahansa ohjelmointikieli Python-muuntimeksi",
        "Virtual Fitness Coach": "Virtuaalinen fitness-valmentaja",
        "Flirting Boy": "Flirttaileva poika",
        "Girl of Dreams": "Unelmien tyttö",
        "DAX Terminal": "DAX-terminaali",
        "Structured Iterative Reasoning Protocol (SIRP)": "Strukturoitu iteratiivinen päättelyprotokolla (SIRP)",
        "Pirate": "Merirosvo",
        "LinkedIn Ghostwriter": "LinkedIn-haamukirjoittaja",
        "Idea Clarifier GPT": "Ideoiden selventäjä GPT",
        "Top Programming Expert": "Huippuohjelmoinnin asiantuntija",
        "Architect Guide for Programmers": "Arkkitehtuuriopas ohjelmoijille"
    };

    // Jos löytyy käännös, käytä sitä, muuten palauta alkuperäinen
    return translations[text] || text;
}

// Lue ja käsittele prompts.csv
async function translatePromptsCSV() {
    const filePath = path.join('prompt-kirjasto-pro', 'public', 'data', 'prompts.csv');
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    // Käsittele otsikkorivi
    const translatedLines = [lines[0]]; // Säilytä otsikko
    
    // Käsittele datаrivit
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Parse CSV line
        const match = line.match(/^"([^"]*(?:""[^"]*)*)","([^"]*(?:""[^"]*)*)","?([^"]*)"?$/);
        if (match) {
            const [, act, prompt, forDevs] = match;
            
            // Käännä otsikko
            const translatedAct = await translateText(act);
            
            // Tässä vaiheessa säilytämme promptin englanninkielisenä
            // Voit myöhemmin käyttää Google Translate API:a tai muuta palvelua
            const translatedPrompt = prompt; // Säilytetään englanninkielisenä toistaiseksi
            
            const translatedLine = `"${translatedAct}","${translatedPrompt}","${forDevs}"`;
            translatedLines.push(translatedLine);
        } else {
            translatedLines.push(line); // Säilytä rivi sellaisenaan jos parsing epäonnistuu
        }
    }
    
    // Kirjoita käännetty tiedosto
    const outputPath = path.join('prompt-kirjasto-pro', 'public', 'data', 'prompts_fi.csv');
    fs.writeFileSync(outputPath, translatedLines.join('\n'), 'utf-8');
    console.log('Prompts translated and saved to prompts_fi.csv');
}

// Käännä vibe prompts
async function translateVibePromptsCSV() {
    const filePath = path.join('prompt-kirjasto-pro', 'public', 'data', 'vibeprompts.csv');
    if (!fs.existsSync(filePath)) {
        console.log('vibeprompts.csv not found, skipping...');
        return;
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    // Käsittele otsikkorivi
    const translatedLines = [lines[0]]; // Säilytä otsikko
    
    // Käsittele datarivit
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Parse CSV line for vibe prompts
        const match = line.match(/^"([^"]*(?:""[^"]*)*)","([^"]*(?:""[^"]*)*)","([^"]*(?:""[^"]*)*)","([^"]*(?:""[^"]*)*)"$/);
        if (match) {
            const [, app, prompt, contributor, techstack] = match;
            
            // Käännä app-nimi
            const translatedApp = await translateText(app);
            
            // Säilytä prompt englanninkielisenä toistaiseksi
            const translatedPrompt = prompt;
            
            const translatedLine = `"${translatedApp}","${translatedPrompt}","${contributor}","${techstack}"`;
            translatedLines.push(translatedLine);
        } else {
            translatedLines.push(line);
        }
    }
    
    // Kirjoita käännetty tiedosto
    const outputPath = path.join('prompt-kirjasto-pro', 'public', 'data', 'vibeprompts_fi.csv');
    fs.writeFileSync(outputPath, translatedLines.join('\n'), 'utf-8');
    console.log('Vibe prompts translated and saved to vibeprompts_fi.csv');
}

// Suorita käännökset
async function main() {
    console.log('Starting translation process...');
    await translatePromptsCSV();
    await translateVibePromptsCSV();
    console.log('Translation completed!');
}

main().catch(console.error); 