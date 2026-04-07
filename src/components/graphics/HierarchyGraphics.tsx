import React from 'react';
import { Globe, Folder, FileText, User, Shield, Zap, GitBranch, Settings, Code, Terminal, Brain, ChevronRight, ChevronDown, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export const HierarchyLayers = () => {
  const layers = [
    {
      title: 'Global',
      path: '~/.claude/CLAUDE.md',
      icon: <Globe className="text-blue-500" />,
      desc: 'Personal style & "always" rules.',
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      badge: 'Personal Only',
      tag: 'User Level'
    },
    {
      title: 'Project',
      path: './CLAUDE.md',
      icon: <Folder className="text-indigo-500" />,
      desc: 'Tech stack & team conventions.',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      badge: 'Team Shared',
      tag: 'Team Level'
    },
    {
      title: 'Local',
      path: './CLAUDE.local.md',
      icon: <Shield className="text-orange-500" />,
      desc: 'Personal project overrides.',
      color: 'bg-orange-50 border-orange-200 text-orange-700',
      badge: 'Gitignored',
      tag: 'Personal Level'
    },
    {
      title: 'Directory',
      path: '.../sub/CLAUDE.md',
      icon: <FileText className="text-purple-500" />,
      desc: 'Specific logic for a module.',
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      badge: 'Sub-directory',
      tag: 'Module Level'
    }
  ];

  return (
    <div className="relative w-full max-w-7xl mx-auto py-4 px-4">
      {/* Background connecting line */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 hidden md:block" />
      
      <div className="flex flex-col md:flex-row gap-4 relative z-10">
        {layers.map((layer, i) => (
          <React.Fragment key={layer.title}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "flex-1 p-4 rounded-3xl border-2 shadow-lg flex flex-col items-center text-center relative overflow-hidden bg-white",
                layer.color.split(' ')[1] // Use the border color
              )}
            >
              <div className={cn("absolute top-0 left-0 w-full h-1", layer.color.split(' ')[0])} />
              
              <div className="mb-3 p-3 rounded-2xl bg-gray-50">
                {React.cloneElement(layer.icon as React.ReactElement<any>, { size: 28 })}
              </div>
              
              <span className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">
                {layer.tag}
              </span>
              <h3 className="text-lg font-black mb-1">{layer.title}</h3>
              <p className="text-[10px] font-mono mb-3 opacity-60 bg-gray-50 px-2 py-1 rounded">
                {layer.path}
              </p>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                {layer.desc}
              </p>
              
              <div className="mt-auto">
                <span className={cn(
                  "text-[9px] uppercase tracking-tighter font-bold px-2 py-0.5 rounded-full border",
                  layer.color.split(' ')[2] // Use the text color for the border
                )}>
                  {layer.badge}
                </span>
              </div>
            </motion.div>
            
            {i < layers.length - 1 && (
              <div className="flex items-center justify-center md:w-8">
                <ChevronRight className="text-gray-300 hidden md:block" />
                <ChevronDown className="text-gray-300 md:hidden" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="mt-6 flex items-center justify-center space-x-8">
        <div className="flex items-center space-x-2 text-gray-400">
          <User size={20} />
          <span className="text-sm font-medium">Specificity increases →</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <Shield size={20} />
          <span className="text-sm font-medium">Overrides previous layers</span>
        </div>
      </div>
    </div>
  );
};

export const LoadingOrder = () => {
  const items = [
    { title: 'CLAUDE.local.md', desc: 'Personal project tweaks, gitignored', color: 'bg-orange-50 border-orange-200 text-orange-900', priority: 'Highest' },
    { title: './CLAUDE.md (root)', desc: 'Team instructions, committed to git', color: 'bg-blue-50 border-blue-200 text-blue-900', priority: 'High' },
    { title: '~/.claude/CLAUDE.md', desc: 'Your global preferences', color: 'bg-green-50 border-green-200 text-green-900', priority: 'Medium' },
    { title: 'Managed Policy', desc: 'IT-deployed, cannot be overridden', color: 'bg-purple-50 border-purple-200 text-purple-700', priority: 'Base' },
  ];

  return (
    <div className="flex items-center justify-center w-full max-w-5xl mx-auto py-2">
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center space-x-2 text-gray-400 mb-4 self-start ml-12">
          <Zap size={16} className="text-yellow-500" />
          <span className="text-xs font-black uppercase tracking-widest">Priority Stack</span>
        </div>
        
        <div className="relative w-full max-w-3xl">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "w-full p-4 rounded-2xl border-2 shadow-md flex items-center justify-between relative bg-white mb-3",
                item.color.split(' ')[1],
                i === 0 ? "ring-4 ring-orange-100 ring-offset-2" : ""
              )}
            >
              <div className="flex items-center space-x-4">
                <div className={cn("p-3 rounded-xl", item.color.split(' ')[0])}>
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="font-black text-lg">{item.title}</h4>
                  <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded-md",
                  item.color.split(' ')[0],
                  item.color.split(' ')[2]
                )}>
                  {item.priority}
                </span>
                {i < items.length - 1 && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 text-gray-300">
                    <ArrowDown size={20} />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 flex items-center space-x-6 bg-white p-4 rounded-[2rem] border-2 border-green-100 shadow-xl max-w-lg">
          <div className="bg-green-500 p-4 rounded-2xl text-white shadow-lg rotate-3">
            <Brain size={32} />
          </div>
          <div className="text-left">
            <p className="text-lg font-black text-gray-900">Merged at session start</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Claude sees all layers combined. <span className="text-indigo-600 font-bold">Specificity wins</span> in conflicts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WindsurfHierarchy = () => {
  const layers = [
    {
      title: 'System',
      path: '/etc/windsurf/...',
      icon: <Shield className="text-red-500" />,
      desc: 'Enterprise-level, OS-specific paths.',
      color: 'bg-red-50 border-red-200 text-red-700',
      badge: 'Enterprise Only',
      tag: 'Admin Level'
    },
    {
      title: 'Global',
      path: '~/.codeium/windsurf/memories/global_rules.md',
      icon: <Globe className="text-blue-500" />,
      desc: 'Personal "always" rules. 6K limit.',
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      badge: 'Personal Only',
      tag: 'User Level'
    },
    {
      title: 'Workspace',
      path: './.windsurf/rules/*.md',
      icon: <Folder className="text-indigo-500" />,
      desc: 'Project rules. 12K limit per file.',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      badge: 'Team Shared',
      tag: 'Project Level'
    },
    {
      title: 'Directory',
      path: '.../sub/.windsurf/rules/',
      icon: <FileText className="text-purple-500" />,
      desc: 'Nested rules for sub-modules.',
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      badge: 'Sub-directory',
      tag: 'Module Level'
    },
    {
      title: 'Fallback',
      path: './AGENTS.md',
      icon: <Brain className="text-green-500" />,
      desc: 'Cross-tool fallback instructions.',
      color: 'bg-green-50 border-green-200 text-green-700',
      badge: 'Universal',
      tag: 'Standard'
    }
  ];

  return (
    <div className="relative w-full max-w-7xl mx-auto py-4 px-4">
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 hidden lg:block" />
      
      <div className="flex flex-col lg:flex-row gap-4 relative z-10">
        {layers.map((layer, i) => (
          <React.Fragment key={layer.title}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "flex-1 p-4 rounded-3xl border-2 shadow-lg flex flex-col items-center text-center relative overflow-hidden bg-white",
                layer.color.split(' ')[1]
              )}
            >
              <div className={cn("absolute top-0 left-0 w-full h-1", layer.color.split(' ')[0])} />
              
              <div className="mb-3 p-3 rounded-2xl bg-gray-50">
                {React.cloneElement(layer.icon as React.ReactElement<any>, { size: 28 })}
              </div>
              
              <span className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">
                {layer.tag}
              </span>
              <h3 className="text-lg font-black mb-1">{layer.title}</h3>
              <p className="text-[9px] font-mono mb-3 opacity-60 bg-gray-50 px-2 py-1 rounded break-all">
                {layer.path}
              </p>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                {layer.desc}
              </p>
              
              <div className="mt-auto">
                <span className={cn(
                  "text-[9px] uppercase tracking-tighter font-bold px-2 py-0.5 rounded-full border",
                  layer.color.split(' ')[2]
                )}>
                  {layer.badge}
                </span>
              </div>
            </motion.div>
            
            {i < layers.length - 1 && (
              <div className="flex items-center justify-center lg:w-8">
                <ChevronRight className="text-gray-300 hidden lg:block" />
                <ChevronDown className="text-gray-300 lg:hidden" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
export const FolderAnatomy = () => {
  const tree = [
    { name: 'your-project/', type: 'dir', icon: <Folder size={14} />, desc: 'Root directory' },
    { name: '  CLAUDE.md', type: 'file', icon: <FileText size={14} />, desc: 'Team instructions, committed to git', color: 'text-green-600', badge: 'Team' },
    { name: '  CLAUDE.local.md', type: 'file', icon: <FileText size={14} />, desc: 'Personal overrides, gitignored', color: 'text-orange-600', badge: 'Personal' },
    { name: '  .claude/', type: 'dir', icon: <Folder size={14} />, desc: 'The control center', color: 'text-blue-600' },
    { name: '    settings.json', type: 'file', icon: <Settings size={14} />, desc: 'Permissions + config, committed', color: 'text-green-600' },
    { name: '    commands/', type: 'dir', icon: <Terminal size={14} />, desc: 'Custom slash commands' },
    { name: '      review.md', type: 'file', icon: <FileText size={14} />, desc: '→ /project:review' },
    { name: '    rules/', type: 'dir', icon: <Code size={14} />, desc: 'Modular instruction files' },
    { name: '      testing.md', type: 'file', icon: <FileText size={14} />, desc: 'Specific testing conventions' },
    { name: '    skills/', type: 'dir', icon: <Zap size={14} />, desc: 'Auto-invoked workflows' },
    { name: '    agents/', type: 'dir', icon: <Brain size={14} />, desc: 'Subagent personas' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-[2.5rem] border-4 border-gray-100 shadow-2xl overflow-hidden flex flex-col md:flex-row">
      <div className="p-6 bg-gray-50/50 border-r-4 border-gray-100 md:w-3/5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-black text-gray-800 flex items-center">
            <GitBranch className="mr-3 text-indigo-500" size={24} />
            The .claude/ folder
          </h3>
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
        </div>
        
        <div className="font-mono text-sm space-y-2">
          {tree.map((item, i) => (
            <motion.div 
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center group cursor-default hover:bg-white p-1 rounded-lg transition-colors"
            >
              <span className="text-gray-300 mr-3">
                {item.name.startsWith('    ') ? '│   │   ' : item.name.startsWith('  ') ? '│   ' : ''}
                {item.name.includes('.') ? '📄' : '📁'}
              </span>
              <span className={cn("font-bold flex-grow", item.color || "text-gray-700")}>
                {item.name.trim()}
              </span>
              {item.badge && (
                <span className={cn(
                  "text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ml-4",
                  item.color?.replace('text-', 'bg-').replace('-600', '-50'),
                  item.color?.replace('-600', '-200'),
                  item.color
                )}>
                  {item.badge}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="p-6 md:w-2/5 flex flex-col justify-center space-y-6 bg-white">
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
              <Settings size={20} />
            </div>
            <div>
              <h4 className="font-black text-gray-900">Control Center</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Permissions, config, and global settings live here.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 p-3 rounded-2xl text-purple-600">
              <Code size={20} />
            </div>
            <div>
              <h4 className="font-black text-gray-900">Modular Rules</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Split giant files into smaller, topic-specific rules.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-yellow-100 p-3 rounded-2xl text-yellow-600">
              <Zap size={20} />
            </div>
            <div>
              <h4 className="font-black text-gray-900">Workflows</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Skills and agents for specialized automation.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-indigo-900 p-4 rounded-3xl text-white shadow-xl transform -rotate-1">
          <p className="text-sm font-bold opacity-80 mb-2 uppercase tracking-widest">The Goal</p>
          <p className="text-lg font-black leading-tight">
            Everything Claude needs to know about your project lives right here.
          </p>
        </div>
      </div>
    </div>
  );
};
