import { CodeXml, Database, Server, Workflow } from 'lucide-react'

export const expertise = [
  {
    id: 'software',
    icon: CodeXml,
    tags: ['csharp', 'aspnet', 'python', 'javascript', 'entityFramework'],
  },
  {
    id: 'erp',
    icon: Workflow,
    tags: ['erp', 'businessProcesses', 'sql', 'processAnalysis'],
  },
  {
    id: 'it',
    icon: Server,
    tags: ['linux', 'ubuntuServer', 'hadoop', 'virtualBox'],
  },
  {
    id: 'data',
    icon: Database,
    tags: ['python', 'selenium', 'pandas', 'hive', 'kafka', 'pyspark'],
  },
] as const
