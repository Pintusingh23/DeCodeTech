import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Play, Bookmark, Settings, Maximize2, RotateCcw, Search, Loader2, CheckCircle2, XCircle } from 'lucide-react';

const problems = {
  "substring": {
    title: "Substring",
    difficulty: "Easy",
    score: "20/20",
    timeLimit: "2",
    memoryLimit: "256000",
    description: "Given two strings A and B, check if the string A is a sub-string of string B or not.",
    inputFormat: "First line of input contains a string A, the second line of the input contains the string B.",
    constraints: "1 <= |A| <= |B| <= 1000\n\nNote:- String will only contain lowercase english letters.",
    outputFormat: 'Print "Yes" if the string A is the substring of string B, else print "No".',
    samples: [
      {
        input: "ewt\nnewton",
        output: "Yes"
      },
      {
        input: "erf\nsdafa",
        output: "No"
      }
    ],
    defaultCode: `# Your code here
A=input()
B=input()
if A in B:
    print("Yes")
else:
    print("No")`
  },
  "make-strings-equal": {
    title: "Make Strings Equal (Contest)",
    difficulty: "Easy",
    score: "20/20",
    timeLimit: "2",
    memoryLimit: "256000",
    description: "You are given two strings S1 and S2 of length N. You need to make those strings equal by replacing any index in string S1 with any character. The cost incurred is as follows: You pay X units for the first replacement, you do not pay anything for the second replacement, you pay X units for the third replacement, you do not pay anything for the fourth replacement, and so on. Find the total units you need to pay to make S1 equal to S2.",
    inputFormat: "The first line of the input contains two integers, N and X.\nThe second and third lines of the input contain strings S1 and S2 respectively.",
    constraints: "1 <= N <= 200000\n1 <= X <= 100\nS1 and S2 contain lowercase characters of the english alphabet.",
    outputFormat: "Output a single integer, the number of units we need to pay.",
    samples: [
      {
        input: "5 2\nabcde\nbbcce",
        output: "2\n\nExplanation:\nStep 1: We replace character at index 1..."
      }
    ],
    defaultCode: `# N, X = map(int, input().split())
# S1 = input()
# S2 = input()
# count = 0
# cost=0
# for i in range(N):
#     if S1[i]!=S2[i]:
#         count+=1
#         if count%2!=0:
#             cost+=X
#         else:
#             cost+=0
# print(cost)`
  }
};

export default function PythonCodingInterface() {
  const navigate = useNavigate();
  const { problemId } = useParams();
  
  const problem = problems[problemId] || problems["substring"];
  const [code, setCode] = useState(problem.defaultCode);
  const [activeTab, setActiveTab] = useState('input');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [runOutput, setRunOutput] = useState('');
  const [submitResult, setSubmitResult] = useState(null);

  const handleRun = () => {
    setIsRunning(true);
    setActiveTab('output');
    setRunOutput("Executing...");
    setSubmitResult(null);
    
    setTimeout(() => {
      setIsRunning(false);
      // Basic simulation based on problem and code content
      if (problemId === 'substring') {
        if (code.includes('if A in B:') || code.includes('Yes')) {
          setRunOutput("Output:\nYes\n\nExpected Output:\nYes\n\nStatus: Accepted");
        } else {
          setRunOutput("Output:\nWrong Answer\n\nExpected Output:\nYes\n\nStatus: Failed");
        }
      } else {
        setRunOutput("Output:\n2\n\nExpected Output:\n2\n\nStatus: Accepted");
      }
    }, 1500);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setActiveTab('output');
    setRunOutput("");
    setSubmitResult("Evaluating against hidden test cases...");
    
    setTimeout(() => {
      setIsSubmitting(false);
      if (problemId === 'substring') {
        if (code.includes('if A in B:') || code.includes('Yes')) {
          setSubmitResult("Passed All Test Cases! \nScore: 20/20");
        } else {
          setSubmitResult("Failed Test Case 3/10. \nOutput did not match expected.");
        }
      } else {
        setSubmitResult("Passed All Test Cases! \nScore: 20/20");
      }
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Top Header */}
      <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4 mt-16">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/python/assignments')}
            className="flex items-center text-sm font-medium text-gray-700 hover:text-black mr-4"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </button>
          <div className="h-6 w-px bg-gray-300 mx-2"></div>
          <span className="text-sm font-semibold text-gray-900 ml-2">{problem.title}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center text-sm font-medium">
            <span className="text-gray-500 mr-2">Total XP</span>
            <span className="flex items-center text-gray-900 bg-yellow-50 px-2 py-1 rounded">
              <span className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-[10px] text-white mr-1">P</span>
              9,334
            </span>
          </div>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md border border-gray-200">
            <Bookmark className="w-4 h-4" />
          </button>
          <button 
            onClick={handleRun}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />} 
            Run
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Submit
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Side Navigation (Icons) */}
        <div className="w-12 border-r border-gray-200 flex flex-col items-center py-4 gap-6 bg-white">
          <div className="p-2 text-gray-400 hover:text-blue-600 cursor-pointer rounded-md hover:bg-blue-50"><Search className="w-5 h-5" /></div>
          <div className="p-2 text-blue-600 bg-blue-50 cursor-pointer rounded-md border-l-2 border-blue-600"><Bookmark className="w-5 h-5" /></div>
          <div className="p-2 text-gray-400 hover:text-blue-600 cursor-pointer rounded-md hover:bg-blue-50"><Settings className="w-5 h-5" /></div>
        </div>

        {/* Problem Description Panel */}
        <div className="w-1/3 min-w-[350px] border-r border-gray-200 flex flex-col bg-white overflow-y-auto">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-500 tracking-wider">QUESTION</span>
            <div className="flex gap-2">
              <Maximize2 className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
          </div>
          
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{problem.title}</h1>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded uppercase tracking-wider">
                {problem.difficulty}
              </span>
              <span className="px-2 py-1 bg-orange-50 text-orange-600 text-xs font-bold rounded">
                2x
              </span>
              <span className="flex items-center text-sm font-bold text-gray-700">
                <span className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-[10px] text-white mr-1 shadow-sm">P</span>
                {problem.score}
              </span>
            </div>
            
            <div className="text-xs text-gray-500 mb-6 font-medium">
              Time Limit: {problem.timeLimit}, Memory Limit: {problem.memoryLimit}
            </div>
            
            <div className="prose prose-sm max-w-none text-gray-700">
              <p className="mb-6">{problem.description}</p>
              
              <h3 className="text-sm font-bold text-gray-900 mb-2">Input</h3>
              <p className="mb-6 whitespace-pre-wrap">{problem.inputFormat}</p>
              
              <h3 className="text-sm font-bold text-gray-900 mb-2">Constraints:-</h3>
              <p className="mb-6 whitespace-pre-wrap">{problem.constraints}</p>
              
              <h3 className="text-sm font-bold text-gray-900 mb-2">Output</h3>
              <p className="mb-8 whitespace-pre-wrap">{problem.outputFormat}</p>
              
              <h3 className="text-sm font-bold text-gray-900 mb-4">Example</h3>
              
              {problem.samples.map((sample, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-100">
                  <div className="mb-4">
                    <div className="text-xs font-bold text-gray-500 mb-2">Sample Input-</div>
                    <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap">{sample.input}</pre>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-500 mb-2">Sample Output-</div>
                    <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap">{sample.output}</pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Code Editor Panel */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Editor Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
            <select className="text-sm bg-transparent border-none text-gray-700 font-medium focus:ring-0 cursor-pointer">
              <option>Python (3.10.1)</option>
              <option>Python (3.8.1)</option>
            </select>
            <div className="flex gap-3">
              <RotateCcw className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
              <Maximize2 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
          </div>
          
          {/* Editor */}
          <div className="flex-1 relative bg-white border-b border-gray-200">
            <div className="absolute top-0 left-0 bottom-0 w-12 bg-gray-50 border-r border-gray-100 flex flex-col items-end py-4 pr-2 select-none">
              {code.split('\n').map((_, i) => (
                <div key={i} className="text-xs text-blue-400 font-mono leading-6">{i + 1}</div>
              ))}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full pl-14 pr-4 py-4 bg-transparent text-sm text-green-700 font-mono leading-6 resize-none focus:outline-none"
              spellCheck="false"
            />
          </div>
          
          {/* Input/Output Panel */}
          <div className="h-48 flex flex-col bg-white">
            <div className="flex items-center border-b border-gray-200">
              <button 
                className={`px-4 py-2 text-xs font-bold ${activeTab === 'input' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('input')}
              >
                INPUT
              </button>
              <button 
                className={`px-4 py-2 text-xs font-bold ${activeTab === 'output' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('output')}
              >
                OUTPUT
              </button>
              <button 
                className={`px-4 py-2 text-xs font-bold ${activeTab === 'error' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('error')}
              >
                ERROR
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              {activeTab === 'input' && (
                <pre className="text-sm font-mono text-gray-800">{problem.samples[0].input}</pre>
              )}
              {activeTab === 'output' && (
                <div className="text-sm font-mono whitespace-pre-wrap">
                  {runOutput ? (
                    <span className={runOutput.includes('Failed') || runOutput.includes('Wrong') ? 'text-red-600' : 'text-green-600'}>
                      {runOutput}
                    </span>
                  ) : submitResult ? (
                    <div className="flex flex-col gap-2">
                      <div className={`flex items-center gap-2 font-bold ${submitResult.includes('Passed') ? 'text-emerald-600' : 'text-red-600'}`}>
                        {submitResult.includes('Passed') ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        {submitResult.split('\n')[0]}
                      </div>
                      <div className="text-gray-600">{submitResult.split('\n')[1]}</div>
                    </div>
                  ) : (
                    <span className="text-gray-500 italic">Run your code to see output...</span>
                  )}
                </div>
              )}
              {activeTab === 'error' && (
                <div className="text-sm text-red-500 font-mono">No errors detected.</div>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
