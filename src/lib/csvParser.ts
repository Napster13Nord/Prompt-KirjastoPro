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
  
  if (actLower.includes('developer') || actLower.includes('programmer') || 
      actLower.includes('code') || actLower.includes('tech')) {
    return 'Kehitys';
  } else if (actLower.includes('writer') || actLower.includes('content') || 
             actLower.includes('editor') || actLower.includes('journalist')) {
    return 'Kirjoittaminen';
  } else if (actLower.includes('teacher') || actLower.includes('tutor') || 
             actLower.includes('instructor') || actLower.includes('coach')) {
    return 'Koulutus';
  } else if (actLower.includes('business') || actLower.includes('manager') || 
             actLower.includes('consultant') || actLower.includes('analyst')) {
    return 'Liiketoiminta';
  } else if (actLower.includes('design') || actLower.includes('artist') || 
             actLower.includes('creative')) {
    return 'Luova';
  } else if (actLower.includes('health') || actLower.includes('doctor') || 
             actLower.includes('medical') || actLower.includes('fitness')) {
    return 'Terveys';
  } else if (actLower.includes('game') || actLower.includes('entertainment')) {
    return 'Viihde';
  }
  
  return 'Yleinen';
}

function categorizeVibePrompt(app: string, techstack: string): string {
  const combined = `${app} ${techstack}`.toLowerCase();
  
  if (combined.includes('game') || combined.includes('3d') || combined.includes('three.js')) {
    return 'Pelit';
  } else if (combined.includes('tool') || combined.includes('calculator') || 
             combined.includes('generator') || combined.includes('converter')) {
    return 'Työkalut';
  } else if (combined.includes('dashboard') || combined.includes('chart') || 
             combined.includes('analytics')) {
    return 'Analytiikka';
  } else if (combined.includes('chat') || combined.includes('social') || 
             combined.includes('messaging')) {
    return 'Kommunikointia';
  } else if (combined.includes('ecommerce') || combined.includes('shop') || 
             combined.includes('store')) {
    return 'Verkkokauppa';
  } else if (combined.includes('health') || combined.includes('fitness') || 
             combined.includes('medical')) {
    return 'Terveys';
  } else if (combined.includes('education') || combined.includes('learning') || 
             combined.includes('quiz')) {
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
  if (combined.includes('database')) tags.push('Database');
  if (combined.includes('ai') || combined.includes('artificial intelligence')) tags.push('AI');
  
  // Role-based tags
  if (combined.includes('beginner')) tags.push('Aloittelija');
  if (combined.includes('advanced')) tags.push('Edistynyt');
  if (combined.includes('professional')) tags.push('Ammattilainen');
  
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