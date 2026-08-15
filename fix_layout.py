import os
import re

files_to_update = [
    "src/Components/HOME/DsaLecture.jsx",
    "src/Components/HOME/DsaAssessment.jsx",
    "src/Components/HOME/Python/PythonLecture.jsx",
    "src/Components/HOME/Python/PythonAssessment.jsx",
    "src/Components/HOME/Datamining/DataMiningLecture.jsx",
    "src/Components/HOME/Datamining/DataMiningAssessment.jsx",
    "src/Components/HOME/AIML/AimlLecture.jsx",
    "src/Components/HOME/AIML/AimlAssessment.jsx",
    "src/Components/HOME/ComputerArchitectures/ComputerArtLecture.jsx",
    "src/Components/HOME/ComputerArchitectures/ComputerArtAssessment.jsx",
    "src/Components/Mysqls/MysqlLecture.jsx",
    "src/Components/Mysqls/MysqlAssessment.jsx",
    "src/Components/HOME/WebDevelopment/WebLecture.jsx",
    "src/Components/HOME/WebDevelopment/WebAssessment.jsx"
]

for file_path in files_to_update:
    full_path = os.path.join('/Users/pintusingh/Desktop/JamnaTech/Janma', file_path)
    if not os.path.exists(full_path):
        continue
        
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Increase Top Padding to safely clear navbar
    content = re.sub(r'pt-24', 'pt-32', content)
    content = re.sub(r'pt-20', 'pt-32', content)

    # 2. Restructure the Header Layout
    # Old structure:
    # className="mb-8 flex items-center justify-between"
    content = content.replace(
        'className="mb-8 flex items-center justify-between"',
        'className="mb-8 flex flex-col gap-5"'
    )

    pattern = r'(<div>\s*)(<Link.*?<\/Link>\s*)(<h1.*?)(\s*<\/div>\s*<div className="hidden sm:block">.*?<\/span>\s*<\/div>\s*)(<\/motion\.div>)'
    
    def replacer(match):
        # match.group(2) is the Link element
        # match.group(3) is the h1 element and its text
        # match.group(4) is the closing div and start of the badge div, to the end of badge div
        link = match.group(2)
        h1 = match.group(3)
        rest = match.group(4)
        end_motion = match.group(5)
        
        # Remove mb-2 from Link since we wrap it
        link = link.replace("mb-2", "")
        
        return f'<div className="w-full">\n            <div className="mb-4">\n              {link}            </div>\n            <div className="flex items-center justify-between w-full">\n              {h1}{rest}          </div>\n        {end_motion}'

    content = re.sub(pattern, replacer, content, flags=re.DOTALL)

    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Updated layouts.")
