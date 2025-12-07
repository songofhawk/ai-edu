import re
import os
import asyncio
import edge_tts

VOICE = "zh-CN-YunzeNeural" # Deep, Confident Male
INPUT_FILE = "PPT配音稿_指数函数.md"
OUTPUT_DIR = "audio"

async def generate_audio(text, output_file):
    communicate = edge_tts.Communicate(text, VOICE, rate="+25%")
    await communicate.save(output_file)

def clean_text(text):
    # Remove bold markdown
    text = text.replace("**", "")
    text = text.replace("*", "")
    # Remove BGM instructions
    text = re.sub(r'\(BGM.*?\)', '', text)
    # Remove LaTeX markers (simplified for TTS)
    text = text.replace("$", "")
    return text.strip()

def parse_markdown(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    slides = []
    # Split by Slide headers (assuming format "**Slide X: Title**" or similar)
    # The regex looks for lines starting with "Slide" or "**Slide"
    
    # Strategy: Find all sections that look like a slide block.
    # We can rely on the structure:
    # **Slide X: Title**
    # "Content..."
    
    lines = content.split('\n')
    current_slide_num = 0
    current_text = []
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Detect Slide Header
        if "Slide" in line and ("**" in line or line.startswith("Slide")):
             if current_text:
                 # Save previous slide
                 slides.append((current_slide_num, " ".join(current_text)))
                 current_text = []
             
             # Extract slide number if possible, or increment
             match = re.search(r'Slide\s+(\d+)', line)
             if match:
                 current_slide_num = int(match.group(1))
             else:
                 current_slide_num += 1
                 
        elif line.startswith("“") or line.startswith('"'):
             # This is a dialogue/voiceover line
             # Remove quotes for TTS
             clean_line = line.replace('“', '').replace('”', '').replace('"', '')
             current_text.append(clean_text(clean_line))
        
    # Add the last slide
    if current_text:
        slides.append((current_slide_num, " ".join(current_text)))
        
    return slides

async def main():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        
    slides = parse_markdown(INPUT_FILE)
    
    print(f"Found {len(slides)} slides with voiceover content.")
    
    for slide_num, text in slides:
        if not text:
            continue
            
        filename = f"{OUTPUT_DIR}/Slide_{slide_num:02d}.mp3"
        print(f"Generating {filename}...")
        await generate_audio(text, filename)
        
    print("Done!")

if __name__ == "__main__":
    asyncio.run(main())
