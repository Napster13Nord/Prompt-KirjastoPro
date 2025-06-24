import { Prompt, VibePrompt } from '@/types';

export function parseCSV(csvText: string): string[][] {
  const lines = csvText.split('\n');
  const result: string[][] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const row: string[] = [];
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

export function csvToPrompts(csvText: string): Prompt[] {
  const rows = parseCSV(csvText);
  if (rows.length <= 1) return [];
  
  const [, ...dataRows] = rows;
  
  return dataRows
    .filter(row => row.length >= 3 && row[0] && row[1])
    .map((row, index) => {
      const [act, prompt, forDevsStr] = row;
      
      return {
        id: `prompt-${index + 1}`,
        act: act.replace(/^"|"$/g, ''),
        prompt: prompt.replace(/^"|"$/g, ''),
        for_devs: forDevsStr?.toLowerCase() === 'true',
        category: categorizePrompt(act),
        tags: extractTags(act, prompt),
        platforms: ['ChatGPT', 'Claude', 'Gemini'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    });
}

export function csvToVibePrompts(csvText: string): VibePrompt[] {
  const rows = parseCSV(csvText);
  if (rows.length <= 1) return [];
  
  const [, ...dataRows] = rows;
  
  return dataRows
    .filter(row => row.length >= 4 && row[0] && row[1])
    .map((row, index) => {
      const [app, prompt, contributor, techstack] = row;
      
      return {
        id: `vibe-${index + 1}`,
        app: app.replace(/^"|"$/g, ''),
        prompt: prompt.replace(/^"|"$/g, ''),
        contributor: contributor?.replace(/^"|"$/g, '') || '@unknown',
        techstack: techstack?.replace(/^"|"$/g, '') || '',
        category: categorizeVibePrompt(app, techstack),
        tags: extractVibePromptTags(app, prompt, techstack),
        platforms: ['ChatGPT', 'Claude', 'Gemini'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    });
}

function categorizePrompt(act: string): string {
  const actLower = act.toLowerCase();
  
  // Kehitys/Development terms
  if (actLower.includes('developer') || actLower.includes('programmer') || 
      actLower.includes('code') || actLower.includes('tech') ||
      actLower.includes('kehittäjä') || actLower.includes('ohjelmoija') ||
      actLower.includes('insinööri') || actLower.includes('arkkitehti') ||
      actLower.includes('devops') || actLower.includes('it-') ||
      actLower.includes('javascript') || actLower.includes('python') ||
      actLower.includes('react') || actLower.includes('sql') ||
      actLower.includes('regex') || actLower.includes('linux') ||
      actLower.includes('github') || actLower.includes('tekninen')) {
    return 'Kehitys';
  } 
  
  // Kirjoittaminen/Writing terms
  else if (actLower.includes('writer') || actLower.includes('content') || 
           actLower.includes('editor') || actLower.includes('journalist') ||
           actLower.includes('kirjoittaja') || actLower.includes('kirjailija') ||
           actLower.includes('toimittaja') || actLower.includes('sisällön') ||
           actLower.includes('käsikirjoittaja') || actLower.includes('runoilija') ||
           actLower.includes('essee') || actLower.includes('kirjallisuus') ||
           actLower.includes('kääntäjä') || actLower.includes('tekstin')) {
    return 'Kirjoittaminen';
  } 
  
  // Koulutus/Education terms
  else if (actLower.includes('teacher') || actLower.includes('tutor') || 
           actLower.includes('instructor') || actLower.includes('coach') ||
           actLower.includes('opettaja') || actLower.includes('kouluttaja') ||
           actLower.includes('mentori') || actLower.includes('valmentaja') ||
           actLower.includes('ohjaaja') || actLower.includes('koulutus') ||
           actLower.includes('opintojen') || actLower.includes('opiskelun') ||
           actLower.includes('akateemikko') || actLower.includes('professori')) {
    return 'Koulutus';
  } 
  
  // Liiketoiminta/Business terms
  else if (actLower.includes('business') || actLower.includes('manager') || 
           actLower.includes('consultant') || actLower.includes('analyst') ||
           actLower.includes('liiketoiminta') || actLower.includes('johtaja') ||
           actLower.includes('konsultti') || actLower.includes('analyytikko') ||
           actLower.includes('myyjä') || actLower.includes('markkinointi') ||
           actLower.includes('startup') || actLower.includes('talous') ||
           actLower.includes('sijoitus') || actLower.includes('rekrytoija') ||
           actLower.includes('kirjanpitäjä') || actLower.includes('juristi')) {
    return 'Liiketoiminta';
  } 
  
  // Luova/Creative terms
  else if (actLower.includes('design') || actLower.includes('artist') || 
           actLower.includes('creative') || actLower.includes('taiteilija') ||
           actLower.includes('suunnittelija') || actLower.includes('luova') ||
           actLower.includes('säveltäjä') || actLower.includes('musiikki') ||
           actLower.includes('taikuri') || actLower.includes('koomikko') ||
           actLower.includes('elokuva') || actLower.includes('meikki') ||
           actLower.includes('sisustus') || actLower.includes('kuvaaja')) {
    return 'Luova';
  } 
  
  // Terveys/Health terms
  else if (actLower.includes('health') || actLower.includes('doctor') || 
           actLower.includes('medical') || actLower.includes('fitness') ||
           actLower.includes('terveys') || actLower.includes('lääkäri') ||
           actLower.includes('hammaslääkäri') || actLower.includes('valmentaja') ||
           actLower.includes('kunto') || actLower.includes('ravitsemus') ||
           actLower.includes('terapeutti') || actLower.includes('mielenterveys') ||
           actLower.includes('hypno') || actLower.includes('joogi') ||
           actLower.includes('ayurveda') || actLower.includes('parantava')) {
    return 'Terveys';
  } 
  
  // Viihde/Entertainment terms
  else if (actLower.includes('game') || actLower.includes('entertainment') ||
           actLower.includes('peli') || actLower.includes('viihde') ||
           actLower.includes('pelaaja') || actLower.includes('gomoku') ||
           actLower.includes('shakki') || actLower.includes('tietokilpailu') ||
           actLower.includes('sudoku') || actLower.includes('räppäri') ||
           actLower.includes('stand-up') || actLower.includes('tarinankertoja')) {
    return 'Viihde';
  }
  
  return 'Yleinen';
}

function categorizeVibePrompt(app: string, techstack: string): string {
  const combined = `${app} ${techstack}`.toLowerCase();
  
  // Pelit/Games
  if (combined.includes('game') || combined.includes('3d') || combined.includes('three.js') ||
      combined.includes('peli') || combined.includes('moninpeli') || combined.includes('racing') ||
      combined.includes('fps') || combined.includes('sudoku') || combined.includes('tietokilpailu') ||
      combined.includes('shakki') || combined.includes('muistikortti') || combined.includes('avaruus')) {
    return 'Pelit';
  } 
  
  // Työkalut/Tools
  else if (combined.includes('tool') || combined.includes('calculator') || 
           combined.includes('generator') || combined.includes('converter') ||
           combined.includes('työkalu') || combined.includes('laskin') || 
           combined.includes('generaattori') || combined.includes('muunnin') ||
           combined.includes('sääkojelauta') || combined.includes('salasana') ||
           combined.includes('color picker') || combined.includes('valuutta') ||
           combined.includes('tiedosto') || combined.includes('url') ||
           combined.includes('tekstianalysaattori') || combined.includes('kuvankäsittely')) {
    return 'Työkalut';
  } 
  
  // Analytiikka/Analytics
  else if (combined.includes('dashboard') || combined.includes('chart') || 
           combined.includes('analytics') || combined.includes('mittaristo') ||
           combined.includes('tilastot') || combined.includes('seuranta') ||
           combined.includes('budjetti') || combined.includes('verkkopakettianalysaattori')) {
    return 'Analytiikka';
  } 
  
  // Terveys/Health
  else if (combined.includes('health') || combined.includes('fitness') || 
           combined.includes('medical') || combined.includes('terveys') ||
           combined.includes('terveysmittareiden') || combined.includes('meditaatio')) {
    return 'Terveys';
  } 
  
  // Koulutus/Education
  else if (combined.includes('education') || combined.includes('learning') || 
           combined.includes('quiz') || combined.includes('koulutus') ||
           combined.includes('flashcard') || combined.includes('muistiinpanot') ||
           combined.includes('kirjoitusnopeuden')) {
    return 'Koulutus';
  }
  
  return 'Web-sovellukset';
}

function extractTags(act: string, prompt: string): string[] {
  const combined = `${act} ${prompt}`.toLowerCase();
  const tags: string[] = [];
  
  // Common tech tags
  if (combined.includes('javascript') || combined.includes('js')) tags.push('JavaScript');
  if (combined.includes('python')) tags.push('Python');
  if (combined.includes('react')) tags.push('React');
  if (combined.includes('api')) tags.push('API');
  if (combined.includes('database') || combined.includes('tietokanta')) tags.push('Database');
  if (combined.includes('html') || combined.includes('css')) tags.push('Web');
  if (combined.includes('sql')) tags.push('SQL');
  if (combined.includes('linux')) tags.push('Linux');
  if (combined.includes('github') || combined.includes('git')) tags.push('Git');
  
  // Role-based tags in Finnish and English
  if (combined.includes('beginner') || combined.includes('aloittelija')) tags.push('Aloittelija');
  if (combined.includes('advanced') || combined.includes('edistynyt')) tags.push('Edistynyt');
  if (combined.includes('professional') || combined.includes('ammattilainen')) tags.push('Ammattilainen');
  
  // Finnish specific role tags
  if (combined.includes('opettaja') || combined.includes('teacher')) tags.push('Opettaja');
  if (combined.includes('kehittäjä') || combined.includes('developer')) tags.push('Kehittäjä');
  if (combined.includes('kirjoittaja') || combined.includes('writer')) tags.push('Kirjoittaja');
  if (combined.includes('liiketoiminta') || combined.includes('business')) tags.push('Liiketoiminta');
  if (combined.includes('luova') || combined.includes('creative')) tags.push('Luova');
  if (combined.includes('terveys') || combined.includes('health')) tags.push('Terveys');
  
  return tags;
}

function extractVibePromptTags(app: string, prompt: string, techstack: string): string[] {
  const combined = `${app} ${prompt} ${techstack}`.toLowerCase();
  const tags: string[] = [];
  
  // Tech stack tags
  const techStackItems = techstack.split(',').map(item => item.trim());
  techStackItems.forEach(tech => {
    if (tech) tags.push(tech);
  });
  
  // Feature tags
  if (combined.includes('responsive')) tags.push('Responsive');
  if (combined.includes('real-time') || combined.includes('realtime')) tags.push('Real-time');
  if (combined.includes('multiplayer')) tags.push('Multiplayer');
  if (combined.includes('mobile')) tags.push('Mobile');
  if (combined.includes('pwa')) tags.push('PWA');
  if (combined.includes('offline')) tags.push('Offline');
  
  return tags;
} 