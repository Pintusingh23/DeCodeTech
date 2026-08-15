import os
import re

files_to_update = [
    "src/Components/HOME/Contact.jsx"
]

for file_path in files_to_update:
    full_path = os.path.join('/Users/pintusingh/Desktop/JamnaTech/Janma', file_path)
    if not os.path.exists(full_path):
        continue
        
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Backgrounds
    content = re.sub(r'bg-slate-50', 'bg-[#211D31]', content)
    content = re.sub(r'bg-white', 'bg-[rgba(255,255,255,0.06)] backdrop-blur-xl', content)
    content = re.sub(r'bg-slate-900', 'bg-[#29243A]/80', content)
    content = re.sub(r'bg-slate-800/80', 'bg-[#211D31]/80', content)
    
    # Shadows
    content = re.sub(r'shadow-xl', 'shadow-[0_8px_30px_rgba(0,0,0,0.3)]', content)
    
    # Text colors
    content = re.sub(r'text-slate-900', 'text-[#F8F7FF]', content)
    content = re.sub(r'text-slate-800', 'text-[#F8F7FF]', content)
    content = re.sub(r'text-slate-700', 'text-[#F8F7FF]', content)
    content = re.sub(r'text-slate-600', 'text-[#B8B2CC]', content)
    content = re.sub(r'text-slate-500', 'text-[#B8B2CC]', content)
    content = re.sub(r'text-slate-400', 'text-[#B8B2CC]', content)
    
    # Borders
    content = re.sub(r'border-slate-200', 'border-[#C8C1F0]/20', content)
    content = re.sub(r'border-slate-100', 'border-[#C8C1F0]/10', content)

    # Generalized replacements for all color themes (red, blue, green, fuchsia, amber, teal, cyan etc)
    content = re.sub(r'bg-[a-z]+-100', 'bg-[rgba(255,255,255,0.06)]', content)
    content = re.sub(r'text-[a-z]+-800', 'text-[#C8C1F0]', content)
    content = re.sub(r'border-[a-z]+-200', 'border-[#C8C1F0]/20', content)
    
    content = re.sub(r'text-[a-z]+-500', 'text-[#9B8DE3]', content)
    content = re.sub(r'bg-[a-z]+-50', 'bg-[rgba(117,96,199,0.15)]', content)
    content = re.sub(r'border-[a-z]+-500', 'border-[#9B8DE3]', content)
    
    content = re.sub(r'text-[a-z]+-600', 'text-[#9B8DE3]', content)
    content = re.sub(r'text-[a-z]+-700', 'text-[#F8F7FF]', content)
    content = re.sub(r'fill-[a-z]+-100', 'fill-[#9B8DE3]/20', content)
    
    content = re.sub(r'hover:text-[a-z]+-600', 'hover:text-[#9B8DE3]', content)
    content = re.sub(r'from-[a-z]+-600 to-[a-z]+-500', 'from-[#7560C7] to-[#9B8DE3]', content)
    content = re.sub(r'from-[a-z]+-500 to-[a-z]+-400', 'from-[#7560C7] to-[#9B8DE3]', content)
    
    content = re.sub(r'bg-[a-z]+-400/15', 'bg-[#7560C7]/15', content)
    content = re.sub(r'bg-[a-z]+-400/5', 'bg-[#7560C7]/5', content)

    # Sidebar active/hover states
    content = re.sub(r'hover:bg-slate-50', 'hover:bg-[rgba(255,255,255,0.02)]', content)

    # Input/Textarea fixes for glassmorphism
    # It might use bg-white inside inputs, let's fix focus states
    content = content.replace("focus:border-blue-500", "focus:border-[#9B8DE3]")
    content = content.replace("focus:ring-blue-500/20", "focus:ring-[#9B8DE3]/20")

    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Updated Contact Us colors.")
