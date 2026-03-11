#!/usr/bin/env python3
"""
Validate i18n files: Check if other languages are mixed in target language files.
"""

import json
import re
from pathlib import Path

# Character ranges for different languages
HANGUL = r'[\uAC00-\uD7AF]'  # Korean
HIRAGANA = r'[\u3040-\u309F]'  # Japanese hiragana
KATAKANA = r'[\u30A0-\u30FF]'  # Japanese katakana
CJK = r'[\u4E00-\u9FFF]'  # Chinese/Japanese/Korean ideographs

def has_korean(text):
    return bool(re.search(HANGUL, text))

def has_japanese(text):
    return bool(re.search(HIRAGANA, text) or re.search(KATAKANA, text))

def has_chinese(text, exclude_korean=True):
    """Check for Chinese characters. If exclude_korean, exclude Korean text."""
    if not re.search(CJK, text):
        return False
    if exclude_korean and has_korean(text):
        return False
    return True

def validate_language(lang_code, file_path):
    """Validate a language file for mixed language content."""
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    issues = []
    
    # Check gameData.mystery.problems
    if 'gameData' in data and 'mystery' in data['gameData'] and 'problems' in data['gameData']['mystery']:
        problems = data['gameData']['mystery']['problems']
        
        for problem_id, problem in problems.items():
            # Skip checking English (en.json) as it's the reference
            if lang_code == 'en':
                continue
            
            # Check title
            title = problem.get('title', '')
            if 'description' in problem:
                desc = problem.get('description', '')
                scenario = problem.get('scenario', '')
                
                # Check suspects
                suspects = problem.get('suspects', {})
                for suspect_id, suspect in suspects.items():
                    name = suspect.get('name', '')
                    occupation = suspect.get('occupation', '')
                    statement = suspect.get('statement', '')
                    alibi = suspect.get('alibi', '')
                    
                    # Combine all text fields for checking
                    all_text = f"{title} {desc} {scenario} {name} {occupation} {statement} {alibi}"
                    
                    if lang_code == 'ko':
                        # Korean should not have Japanese hiragana/katakana
                        if has_japanese(all_text):
                            issues.append({
                                'level': problem_id,
                                'field': 'suspects',
                                'issue': 'Japanese characters found in Korean text',
                                'text': name[:50] + '...' if len(name) > 50 else name
                            })
                    
                    elif lang_code == 'ja':
                        # Japanese should not have Korean
                        if has_korean(all_text):
                            issues.append({
                                'level': problem_id,
                                'field': 'suspects',
                                'issue': 'Korean characters found in Japanese text',
                                'text': name[:50] + '...' if len(name) > 50 else name
                            })
                    
                    elif lang_code == 'zh':
                        # Chinese should not have Korean or Japanese hiragana/katakana
                        if has_korean(all_text) or has_japanese(all_text):
                            issues.append({
                                'level': problem_id,
                                'field': 'suspects',
                                'issue': 'Korean/Japanese characters found in Chinese text',
                                'text': name[:50] + '...' if len(name) > 50 else name
                            })
                
                # Check clues
                clues = problem.get('clues', {})
                for clue_id, clue_text in clues.items():
                    if lang_code == 'ko' and has_japanese(clue_text):
                        issues.append({
                            'level': problem_id,
                            'field': 'clues',
                            'issue': 'Japanese characters found in Korean text',
                            'text': clue_text[:50] + '...' if len(clue_text) > 50 else clue_text
                        })
                    elif lang_code == 'ja' and has_korean(clue_text):
                        issues.append({
                            'level': problem_id,
                            'field': 'clues',
                            'issue': 'Korean characters found in Japanese text',
                            'text': clue_text[:50] + '...' if len(clue_text) > 50 else clue_text
                        })
                    elif lang_code == 'zh' and (has_korean(clue_text) or has_japanese(clue_text)):
                        issues.append({
                            'level': problem_id,
                            'field': 'clues',
                            'issue': 'Korean/Japanese characters found in Chinese text',
                            'text': clue_text[:50] + '...' if len(clue_text) > 50 else clue_text
                        })
                
                # Check evidence
                evidence = problem.get('evidence', {})
                for ev_id, ev_data in evidence.items():
                    ev_name = ev_data.get('name', '')
                    ev_desc = ev_data.get('description', '')
                    ev_loc = ev_data.get('location', '')
                    
                    all_text = f"{ev_name} {ev_desc} {ev_loc}"
                    
                    if lang_code == 'ko' and has_japanese(all_text):
                        issues.append({
                            'level': problem_id,
                            'field': 'evidence',
                            'issue': 'Japanese characters found in Korean text',
                            'text': ev_name[:50] + '...' if len(ev_name) > 50 else ev_name
                        })
                    elif lang_code == 'ja' and has_korean(all_text):
                        issues.append({
                            'level': problem_id,
                            'field': 'evidence',
                            'issue': 'Korean characters found in Japanese text',
                            'text': ev_name[:50] + '...' if len(ev_name) > 50 else ev_name
                        })
                    elif lang_code == 'zh' and (has_korean(all_text) or has_japanese(all_text)):
                        issues.append({
                            'level': problem_id,
                            'field': 'evidence',
                            'issue': 'Korean/Japanese characters found in Chinese text',
                            'text': ev_name[:50] + '...' if len(ev_name) > 50 else ev_name
                        })
    
    return issues

def main():
    base_dir = Path('/Users/vamos/Documents/projects/mysterymind')
    messages_dir = base_dir / 'messages'
    
    languages = ['en', 'ko', 'ja', 'zh']
    
    print("=" * 60)
    print("I18N VALIDATION REPORT")
    print("=" * 60)
    print()
    
    all_passed = True
    
    for lang in languages:
        file_path = messages_dir / f'{lang}.json'
        if not file_path.exists():
            print(f"⚠️  {lang.upper()}: File not found")
            continue
        
        if lang == 'en':
            print(f"✅ {lang.upper()}: Skipped (reference language)")
            continue
        
        print(f"\n🔍 Validating {lang.upper()}...")
        issues = validate_language(lang, file_path)
        
        if issues:
            print(f"   ❌ Found {len(issues)} issue(s):")
            all_passed = False
            for issue in issues[:10]:  # Show first 10 issues
                print(f"      - [{issue['level']}] {issue['field']}: {issue['issue']}")
                print(f"        Text: {issue['text']}")
            if len(issues) > 10:
                print(f"      ... and {len(issues) - 10} more issue(s)")
        else:
            print(f"   ✅ PASSED - No mixed language detected")
    
    print()
    print("=" * 60)
    if all_passed:
        print("✅ ALL VALIDATIONS PASSED")
    else:
        print("❌ VALIDATION FAILED - Issues found")
    print("=" * 60)

if __name__ == '__main__':
    main()
