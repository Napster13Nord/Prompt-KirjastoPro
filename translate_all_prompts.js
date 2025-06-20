const fs = require('fs');
const path = require('path');

// Função para traduzir texto básico do inglês para finlandês
function translateToFinnish(text) {
    // Dicionário de traduções básicas
    const translations = {
        // Palavras comuns
        "I want you to act as": "Haluan sinun toimivan",
        "I will": "Minä",
        "You will": "Sinä",
        "You should": "Sinun pitäisi",
        "Do not": "Älä",
        "My first": "Ensimmäinen",
        "Please": "Ole hyvä",
        "Thank you": "Kiitos",
        "Hello": "Hei",
        "Hi": "Hei",
        "Good": "Hyvä",
        "Bad": "Huono",
        "Yes": "Kyllä",
        "No": "Ei",
        "Maybe": "Ehkä",
        "Help": "Auta",
        "Question": "Kysymys",
        "Answer": "Vastaus",
        "Problem": "Ongelma",
        "Solution": "Ratkaisu",
        "Example": "Esimerkki",
        "Code": "Koodi",
        "Programming": "Ohjelmointi",
        "Software": "Ohjelmisto",
        "Computer": "Tietokone",
        "Data": "Data",
        "Information": "Tieto",
        "System": "Järjestelmä",
        "Application": "Sovellus",
        "Website": "Verkkosivusto",
        "Design": "Suunnittelu",
        "Development": "Kehitys",
        "Technology": "Teknologia",
        "Business": "Liiketoiminta",
        "Marketing": "Markkinointi",
        "Education": "Koulutus",
        "Learning": "Oppiminen",
        "Teaching": "Opettaminen",
        "Student": "Opiskelija",
        "Teacher": "Opettaja",
        "Book": "Kirja",
        "Article": "Artikkeli",
        "Story": "Tarina",
        "Game": "Peli",
        "Music": "Musiikki",
        "Art": "Taide",
        "Creative": "Luova",
        "Writing": "Kirjoittaminen",
        "Reading": "Lukeminen",
        "Language": "Kieli",
        "Translation": "Käännös",
        "Communication": "Viestintä",
        "Conversation": "Keskustelu",
        "Interview": "Haastattelu",
        "Job": "Työ",
        "Career": "Ura",
        "Professional": "Ammattilainen",
        "Expert": "Asiantuntija",
        "Specialist": "Erikoisasiantuntija",
        "Manager": "Johtaja",
        "Leader": "Johtaja",
        "Team": "Tiimi",
        "Project": "Projekti",
        "Plan": "Suunnitelma",
        "Strategy": "Strategia",
        "Goal": "Tavoite",
        "Success": "Menestys",
        "Failure": "Epäonnistuminen",
        "Challenge": "Haaste",
        "Opportunity": "Mahdollisuus",
        "Experience": "Kokemus",
        "Skill": "Taito",
        "Knowledge": "Tieto",
        "Wisdom": "Viisaus",
        "Advice": "Neuvo",
        "Guidance": "Opastus",
        "Support": "Tuki",
        "Assistance": "Apu",
        "Service": "Palvelu",
        "Product": "Tuote",
        "Quality": "Laatu",
        "Performance": "Suorituskyky",
        "Efficiency": "Tehokkuus",
        "Productivity": "Tuottavuus",
        "Innovation": "Innovaatio",
        "Creativity": "Luovuus",
        "Imagination": "Mielikuvitus",
        "Inspiration": "Inspiraatio",
        "Motivation": "Motivaatio",
        "Enthusiasm": "Innostus",
        "Passion": "Intohimo",
        "Interest": "Kiinnostus",
        "Curiosity": "Uteliaisuus",
        "Discovery": "Löytö",
        "Research": "Tutkimus",
        "Analysis": "Analyysi",
        "Evaluation": "Arviointi",
        "Assessment": "Arviointi",
        "Review": "Arvostelu",
        "Feedback": "Palaute",
        "Improvement": "Parannus",
        "Enhancement": "Tehostaminen",
        "Optimization": "Optimointi",
        "Customization": "Mukauttaminen",
        "Personalization": "Personointi",
        "Configuration": "Konfiguraatio",
        "Setup": "Asennus",
        "Installation": "Asennus",
        "Implementation": "Toteutus",
        "Execution": "Suoritus",
        "Operation": "Toiminta",
        "Function": "Funktio",
        "Feature": "Ominaisuus",
        "Capability": "Kyky",
        "Ability": "Kyky",
        "Power": "Voima",
        "Strength": "Vahvuus",
        "Weakness": "Heikkous",
        "Advantage": "Etu",
        "Disadvantage": "Haitta",
        "Benefit": "Hyöty",
        "Value": "Arvo",
        "Worth": "Arvokkuus",
        "Price": "Hinta",
        "Cost": "Kustannus",
        "Investment": "Sijoitus",
        "Return": "Tuotto",
        "Profit": "Voitto",
        "Loss": "Tappio",
        "Risk": "Riski",
        "Safety": "Turvallisuus",
        "Security": "Turvallisuus",
        "Protection": "Suoja",
        "Privacy": "Yksityisyys",
        "Confidentiality": "Luottamuksellisuus",
        "Trust": "Luottamus",
        "Reliability": "Luotettavuus",
        "Stability": "Vakaus",
        "Consistency": "Johdonmukaisuus",
        "Accuracy": "Tarkkuus",
        "Precision": "Tarkkuus",
        "Clarity": "Selkeys",
        "Simplicity": "Yksinkertaisuus",
        "Complexity": "Monimutkaisuus",
        "Difficulty": "Vaikeus",
        "Ease": "Helppous",
        "Convenience": "Mukavuus",
        "Comfort": "Mukavuus",
        "Satisfaction": "Tyytyväisyys",
        "Happiness": "Onnellisuus",
        "Joy": "Ilo",
        "Pleasure": "Mielihyvä",
        "Fun": "Hauska",
        "Entertainment": "Viihde",
        "Enjoyment": "Nautinto",
        "Relaxation": "Rentoutuminen",
        "Rest": "Lepo",
        "Sleep": "Uni",
        "Health": "Terveys",
        "Wellness": "Hyvinvointi",
        "Fitness": "Kunto",
        "Exercise": "Harjoitus",
        "Training": "Koulutus",
        "Practice": "Harjoittelu",
        "Preparation": "Valmistelu",
        "Planning": "Suunnittelu",
        "Organization": "Organisaatio",
        "Management": "Hallinta",
        "Control": "Kontrolli",
        "Direction": "Suunta",
        "Guidance": "Opastus",
        "Leadership": "Johtajuus",
        "Authority": "Auktoriteetti",
        "Responsibility": "Vastuu",
        "Accountability": "Vastuullisuus",
        "Ethics": "Etiikka",
        "Morality": "Moraali",
        "Values": "Arvot",
        "Principles": "Periaatteet",
        "Standards": "Standardit",
        "Rules": "Säännöt",
        "Laws": "Lait",
        "Regulations": "Määräykset",
        "Guidelines": "Ohjeet",
        "Instructions": "Ohjeet",
        "Directions": "Ohjeet",
        "Steps": "Vaiheet",
        "Process": "Prosessi",
        "Procedure": "Menettely",
        "Method": "Menetelmä",
        "Technique": "Tekniikka",
        "Approach": "Lähestymistapa",
        "Style": "Tyyli",
        "Format": "Muoto",
        "Structure": "Rakenne",
        "Framework": "Kehys",
        "Model": "Malli",
        "Template": "Malli",
        "Pattern": "Kuvio",
        "Design": "Suunnittelu",
        "Layout": "Asettelu",
        "Interface": "Käyttöliittymä",
        "User": "Käyttäjä",
        "Customer": "Asiakas",
        "Client": "Asiakas",
        "Audience": "Yleisö",
        "Public": "Julkinen",
        "Community": "Yhteisö",
        "Society": "Yhteiskunta",
        "Culture": "Kulttuuri",
        "Tradition": "Perinne",
        "History": "Historia",
        "Past": "Menneisyys",
        "Present": "Nykyisyys",
        "Future": "Tulevaisuus",
        "Time": "Aika",
        "Moment": "Hetki",
        "Period": "Jakso",
        "Duration": "Kesto",
        "Speed": "Nopeus",
        "Pace": "Vauhti",
        "Progress": "Edistys",
        "Development": "Kehitys",
        "Growth": "Kasvu",
        "Evolution": "Evoluutio",
        "Change": "Muutos",
        "Transformation": "Muutos",
        "Adaptation": "Sopeutuminen",
        "Flexibility": "Joustavuus",
        "Versatility": "Monipuolisuus",
        "Diversity": "Monimuotoisuus",
        "Variety": "Valikoima",
        "Choice": "Valinta",
        "Option": "Vaihtoehto",
        "Alternative": "Vaihtoehto",
        "Possibility": "Mahdollisuus",
        "Potential": "Potentiaali",
        "Capacity": "Kapasiteetti",
        "Capability": "Kyky",
        "Resource": "Resurssi",
        "Tool": "Työkalu",
        "Equipment": "Välineistö",
        "Material": "Materiaali",
        "Content": "Sisältö",
        "Substance": "Aine",
        "Element": "Elementti",
        "Component": "Komponentti",
        "Part": "Osa",
        "Piece": "Pala",
        "Section": "Osio",
        "Chapter": "Luku",
        "Page": "Sivu",
        "Line": "Rivi",
        "Word": "Sana",
        "Text": "Teksti",
        "Message": "Viesti",
        "Communication": "Viestintä",
        "Expression": "Ilmaisu",
        "Statement": "Lausunto",
        "Declaration": "Julistus",
        "Announcement": "Ilmoitus",
        "Notice": "Huomautus",
        "Warning": "Varoitus",
        "Alert": "Hälytys",
        "Signal": "Signaali",
        "Sign": "Merkki",
        "Symbol": "Symboli",
        "Icon": "Ikoni",
        "Image": "Kuva",
        "Picture": "Kuva",
        "Photo": "Valokuva",
        "Video": "Video",
        "Audio": "Ääni",
        "Sound": "Ääni",
        "Voice": "Ääni",
        "Speech": "Puhe",
        "Talk": "Puhe",
        "Discussion": "Keskustelu",
        "Debate": "Väittely",
        "Argument": "Argumentti",
        "Point": "Pointti",
        "Idea": "Idea",
        "Concept": "Käsite",
        "Thought": "Ajatus",
        "Opinion": "Mielipide",
        "View": "Näkemys",
        "Perspective": "Näkökulma",
        "Angle": "Kulma",
        "Side": "Puoli",
        "Aspect": "Näkökohta",
        "Factor": "Tekijä",
        "Issue": "Aihe",
        "Topic": "Aihe",
        "Subject": "Aihe",
        "Theme": "Teema",
        "Focus": "Keskittyminen",
        "Attention": "Huomio",
        "Interest": "Kiinnostus",
        "Concern": "Huoli",
        "Matter": "Asia",
        "Situation": "Tilanne",
        "Condition": "Tila",
        "State": "Tila",
        "Status": "Status",
        "Position": "Asema",
        "Location": "Sijainti",
        "Place": "Paikka",
        "Space": "Tila",
        "Area": "Alue",
        "Region": "Alue",
        "Zone": "Vyöhyke",
        "Territory": "Alue",
        "Domain": "Toimialue",
        "Field": "Ala",
        "Sector": "Sektori",
        "Industry": "Teollisuus",
        "Market": "Markkina",
        "Economy": "Talous",
        "Finance": "Rahoitus",
        "Money": "Raha",
        "Currency": "Valuutta",
        "Payment": "Maksu",
        "Transaction": "Tapahtuma",
        "Deal": "Sopimus",
        "Agreement": "Sopimus",
        "Contract": "Sopimus",
        "Partnership": "Kumppanuus",
        "Collaboration": "Yhteistyö",
        "Cooperation": "Yhteistyö",
        "Teamwork": "Tiimityö",
        "Unity": "Yhtenäisyys",
        "Harmony": "Harmonia",
        "Balance": "Tasapaino",
        "Stability": "Vakaus",
        "Order": "Järjestys",
        "System": "Järjestelmä",
        "Method": "Menetelmä",
        "Way": "Tapa",
        "Manner": "Tapa",
        "Mode": "Tila",
        "Form": "Muoto",
        "Shape": "Muoto",
        "Size": "Koko",
        "Scale": "Mittakaava",
        "Level": "Taso",
        "Degree": "Aste",
        "Grade": "Arvosana",
        "Rank": "Sijoitus",
        "Rating": "Arviointi",
        "Score": "Pisteet",
        "Result": "Tulos",
        "Outcome": "Lopputulos",
        "Achievement": "Saavutus",
        "Accomplishment": "Saavutus",
        "Victory": "Voitto",
        "Win": "Voitto",
        "Success": "Menestys",
        "Triumph": "Voitto",
        "Glory": "Kunnia",
        "Honor": "Kunnia",
        "Pride": "Ylpeys",
        "Confidence": "Luottamus",
        "Courage": "Rohkeus",
        "Bravery": "Rohkeus",
        "Strength": "Vahvuus",
        "Power": "Voima",
        "Energy": "Energia",
        "Force": "Voima",
        "Impact": "Vaikutus",
        "Effect": "Vaikutus",
        "Influence": "Vaikutus",
        "Control": "Kontrolli",
        "Command": "Komento",
        "Order": "Tilaus",
        "Request": "Pyyntö",
        "Demand": "Vaatimus",
        "Requirement": "Vaatimus",
        "Need": "Tarve",
        "Want": "Halu",
        "Desire": "Halu",
        "Wish": "Toive",
        "Hope": "Toivo",
        "Dream": "Unelma",
        "Vision": "Visio",
        "Goal": "Tavoite",
        "Target": "Kohde",
        "Objective": "Tavoite",
        "Purpose": "Tarkoitus",
        "Intention": "Aikomus",
        "Plan": "Suunnitelma",
        "Scheme": "Järjestelmä",
        "Program": "Ohjelma",
        "Course": "Kurssi",
        "Path": "Polku",
        "Route": "Reitti",
        "Direction": "Suunta",
        "Way": "Tie",
        "Road": "Tie",
        "Street": "Katu",
        "Avenue": "Katu",
        "Lane": "Kaista",
        "Track": "Rata",
        "Trail": "Polku",
        "Journey": "Matka",
        "Trip": "Matka",
        "Travel": "Matkustaminen",
        "Adventure": "Seikkailu",
        "Event": "Tapahtuma",
        "Occasion": "Tilaisuus",
        "Opportunity": "Mahdollisuus",
        "Chance": "Mahdollisuus",
        "Luck": "Onni",
        "Fortune": "Onni",
        "Fate": "Kohtalo",
        "Destiny": "Kohtalo",
        "Future": "Tulevaisuus",
        "Tomorrow": "Huomenna",
        "Today": "Tänään",
        "Yesterday": "Eilen",
        "Now": "Nyt",
        "Then": "Silloin",
        "When": "Milloin",
        "Where": "Missä",
        "What": "Mitä",
        "Who": "Kuka",
        "Why": "Miksi",
        "How": "Miten",
        "Which": "Mikä",
        "Whose": "Kenen",
        "Whom": "Ketä"
    };

    let translatedText = text;
    
    // Käännä perusfraaset ja sanat
    for (const [english, finnish] of Object.entries(translations)) {
        const regex = new RegExp(`\\b${english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
        translatedText = translatedText.replace(regex, finnish);
    }
    
    // Erikoisfraaset
    translatedText = translatedText
        .replace(/I want you to act as/gi, 'Haluan sinun toimivan')
        .replace(/You will/gi, 'Sinä')
        .replace(/I will/gi, 'Minä')
        .replace(/Do not write/gi, 'Älä kirjoita')
        .replace(/Do not provide/gi, 'Älä anna')
        .replace(/My first request is/gi, 'Ensimmäinen pyyntöni on')
        .replace(/My first command is/gi, 'Ensimmäinen komento on')
        .replace(/My first suggestion request is/gi, 'Ensimmäinen ehdotuspyyntöni on')
        .replace(/You should only reply/gi, 'Sinun pitäisi vastata vain')
        .replace(/reply with/gi, 'vastata')
        .replace(/provide me with/gi, 'anna minulle')
        .replace(/help me/gi, 'auta minua')
        .replace(/I need help/gi, 'Tarvitsen apua')
        .replace(/Can you/gi, 'Voitko')
        .replace(/Could you/gi, 'Voisitko')
        .replace(/Would you/gi, 'Haluaisitko')
        .replace(/Please/gi, 'Ole hyvä')
        .replace(/Thank you/gi, 'Kiitos');
    
    return translatedText;
}

// Funktio CSV:n lukemiseen ja käsittelyyn
function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const result = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const row = [];
        let current = '';
        let inQuotes = false;
        
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            
            if (char === '"') {
                if (inQuotes && line[j + 1] === '"') {
                    current += '"';
                    j++; // Skip next quote
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                row.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        
        row.push(current.trim());
        result.push(row);
    }
    
    return result;
}

// Funktio kaikkien promptien kääntämiseen
async function translateAllPrompts() {
    console.log('Starting complete prompt translation...');
    
    const filePath = path.join('public', 'data', 'prompts_fi.csv');
    const content = fs.readFileSync(filePath, 'utf-8');
    const rows = parseCSV(content);
    
    // Säilytä otsikkorivi
    const translatedRows = [rows[0]];
    
    // Käsittele datarivit
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.length < 3) continue;
        
        const [act, prompt, forDevs] = row;
        const cleanPrompt = prompt.replace(/^"|"$/g, '');
        
        // Käännä prompt
        const translatedPrompt = translateToFinnish(cleanPrompt);
        
        const translatedRow = `"${act}","${translatedPrompt}","${forDevs}"`;
        translatedRows.push(translatedRow);
    }
    
    // Kirjoita käännetty tiedosto
    const outputPath = path.join('public', 'data', 'prompts_fi_complete.csv');
    fs.writeFileSync(outputPath, translatedRows.join('\n'), 'utf-8');
    console.log('Complete prompts translation finished!');
}

// Käännä myös vibe prompts
async function translateVibePrompts() {
    console.log('Starting vibe prompts translation...');
    
    const filePath = path.join('public', 'data', 'vibeprompts_fi.csv');
    if (!fs.existsSync(filePath)) {
        console.log('Vibe prompts file not found, skipping...');
        return;
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    const rows = parseCSV(content);
    
    // Säilytä otsikkorivi
    const translatedRows = [rows[0]];
    
    // Käsittele datarivit
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.length < 4) continue;
        
        const [app, prompt, contributor, techstack] = row;
        const cleanPrompt = prompt.replace(/^"|"$/g, '');
        
        // Käännä prompt
        const translatedPrompt = translateToFinnish(cleanPrompt);
        
        const translatedRow = `"${app}","${translatedPrompt}","${contributor}","${techstack}"`;
        translatedRows.push(translatedRow);
    }
    
    // Kirjoita käännetty tiedosto
    const outputPath = path.join('public', 'data', 'vibeprompts_fi_complete.csv');
    fs.writeFileSync(outputPath, translatedRows.join('\n'), 'utf-8');
    console.log('Complete vibe prompts translation finished!');
}

// Suorita käännökset
async function main() {
    console.log('Starting complete translation process...');
    await translateAllPrompts();
    await translateVibePrompts();
    console.log('All translations completed!');
}

main().catch(console.error); 