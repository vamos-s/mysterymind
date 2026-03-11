import { MysteryProblem } from './mystery';
import { useTranslations } from 'next-intl';

/**
 * Get translated mystery problem data
 * Falls back to original mystery.ts data if translation is not available
 */
export function useTranslatedMysteryProblem(problem: MysteryProblem, locale: string): MysteryProblem {
  // For now, we use the original data
  // In the future, we can load translations from messages/[locale].json
  // This function provides a structure for future i18n expansion
  
  // TODO: When translations for all 50 levels are ready, uncomment this:
  /*
  const t = useTranslations(`gameData.mystery.problems.${problem.id}`);
  
  return {
    ...problem,
    title: t('title', { defaultValue: problem.title }),
    description: t('description', { defaultValue: problem.description }),
    scenario: t('scenario', { defaultValue: problem.scenario }),
    suspects: problem.suspects.map((suspect, index) => ({
      ...suspect,
      name: t(`suspects.${index}.name`, { defaultValue: suspect.name }),
      occupation: t(`suspects.${index}.occupation`, { defaultValue: suspect.occupation || '' }),
      statement: t(`suspects.${index}.statement`, { defaultValue: suspect.statement }),
      alibi: t(`suspects.${index}.alibi`, { defaultValue: suspect.alibi || '' }),
    })),
    clues: problem.clues.map((clue, index) => ({
      ...clue,
      description: t(`clues.${index}`, { defaultValue: clue.description }),
    })),
    evidence: problem.evidence.map((ev, index) => ({
      ...ev,
      name: t(`evidence.${index}.name`, { defaultValue: ev.name }),
      description: t(`evidence.${index}.description`, { defaultValue: ev.description }),
      location: t(`evidence.${index}.location`, { defaultValue: ev.location }),
    })),
    timeline: problem.timeline.map((entry) => ({
      ...entry,
      suspectLocations: entry.suspectLocations.map((loc) => ({
        ...loc,
        location: t(`timeline.locations.${loc.suspectId}`, { defaultValue: loc.location }),
        activity: t(`timeline.activities.${loc.suspectId}`, { defaultValue: loc.activity }),
      })),
    })),
    explanation: t('explanation', { defaultValue: problem.explanation }),
  };
  */

  return problem;
}

/**
 * Get translated text for a specific field
 * This can be used in components to access translations
 */
export function getTranslatedMysteryText(
  problemId: string,
  field: string,
  locale: string,
  defaultValue?: string
): string {
  // Placeholder for future i18n implementation
  // When translations are ready, this will read from messages/[locale].json
  return defaultValue || '';
}
