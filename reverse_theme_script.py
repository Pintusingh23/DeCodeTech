import os

directory = '/Users/pintusingh/Desktop/JamnaTech/Janma/src/Components'

files_to_process = []
for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith(('Lecture.jsx', 'Assessment.jsx', 'Lab.jsx', 'Mysql.jsx', 'WebDevelopment.jsx', 'Dsa.jsx', 'Pythons.jsx', 'Dataminings.jsx', 'Aimls.jsx', 'computerArt.jsx')):
            if 'Admin' in file or 'Admin' in root:
                continue
            files_to_process.append(os.path.join(root, file))

for filepath in files_to_process:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Revert outer wrapper
    content = content.replace('className="min-h-screen bg-slate-50', 'className="min-h-screen bg-[#211D31]')
    
    # Revert texts
    content = content.replace('text-slate-900 tracking-tight', 'text-[#F8F7FF] tracking-tight')
    content = content.replace('text-slate-600 hover:text-indigo-600', 'text-[#B8B2CC] hover:text-[#9B8DE3]')
    
    # Revert lesson pill
    content = content.replace('bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-200', 
                              'bg-[rgba(255,255,255,0.06)] text-[#C8C1F0] text-xs font-semibold px-3 py-1 rounded-full border border-[#C8C1F0]/20')
    
    # Revert inner containers
    # The inner cards:
    content = content.replace('bg-[#211D31] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3)]', 'bg-[rgba(255,255,255,0.04)] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3)]')
    content = content.replace('bg-[#211D31] rounded-xl overflow-hidden', 'bg-[rgba(255,255,255,0.04)] rounded-xl overflow-hidden')
    content = content.replace('p-5 border-b border-[#C8C1F0]/10 bg-[#211D31]', 'p-5 border-b border-[#C8C1F0]/10 bg-[rgba(255,255,255,0.04)]')
    
    # Revert loading state colors
    content = content.replace('py-20 text-slate-500', 'py-20 text-[#B8B2CC]')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Reverted {len(files_to_process)} files to dark theme.")
