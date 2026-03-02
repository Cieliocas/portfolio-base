export type LanguageMode = 'pt' | 'en'

export const siteCopy = {
  pt: {
    nav: {
      ariaLabel: 'Menu rapido',
      items: [
        { label: 'sobre', href: '#sobre' },
        { label: 'skills', href: '#skills' },
        { label: 'jornada', href: '#jornada' },
        { label: 'projetos', href: '#projetos' },
        { label: 'contato', href: '#contato' },
      ],
      settings: 'settings',
      panelTitle: 'Ajustes',
      theme: 'Tema',
      language: 'Idioma',
      dark: 'Escuro',
      light: 'Claro',
      pt: 'PT-BR',
      en: 'English',
      openSettings: 'Abrir ajustes',
    },
    hero: {
      badge: 'Computer Science @ UFPI',
      description: 'Infraestrutura, Cloud e HPC com foco em confiabilidade, automacao e observabilidade.',
      workflow: 'macOS workflow + terminal-first development',
      highlights: ['HPC Clusters', 'DevOps & Cloud', 'AI Infrastructure + Agents'],
      photoAlt: 'Foto de Francielio Castro',
      locationLabel: 'Base',
      roleLabel: 'Role',
      stackLabel: 'Stack',
      statusLabel: 'Status',
      statusValue: 'Open to work',
      terminalOutput1: 'OS: macOS · Shell: zsh · Focus: HPC/DevOps',
      terminalOutput2: 'Connected to Cluster TECHNE (Slurm + NVIDIA L4)',
    },
    about: {
      kicker: 'Sobre',
      title: 'Engenharia de infraestrutura com mentalidade de produto',
      notesTitle: 'Notas · Sobre mim',
      notes: [
        'Sou estudante de Ciencia da Computacao e pesquisador com atuacao em ambientes Linux, virtualizacao e computacao de alto desempenho.',
        'Trabalho com setup e operacao de cluster usando Proxmox e SLURM, com foco em estabilidade, performance e uso eficiente de recursos.',
        'Minha base de desenvolvimento e Golang para ferramentas de infraestrutura, containers, CI/CD e observabilidade com Grafana + PostgreSQL para workloads tecnicos e projetos academicos.',
      ],
      macBadge: 'MacOS-first workflow',
      macText: 'Meu ambiente principal e macOS, com fluxo orientado a terminal e automacao para produtividade em desenvolvimento de infraestrutura.',
      cards: [
        {
          title: 'Formacao',
          text: 'Ciencia da Computacao na UFPI, com previsao de conclusao em 2027.',
        },
        {
          title: 'Atuacao atual',
          text: 'Auxiliar de Infraestrutura e HPC no NCAD/UFPI (2025 - atual).',
        },
        {
          title: 'Foco tecnico',
          text: 'Cluster management, observabilidade, automacao e engenharia de plataforma.',
        },
        {
          title: 'Direcao',
          text: 'Evolucao em cloud, DevOps e infraestrutura para IA/ML.',
        },
      ],
    },
    skills: {
      kicker: 'Skills',
      title: 'Stack para operar, escalar e automatizar',
      groups: [
        {
          title: 'Infraestrutura e HPC',
          items: ['Linux', 'Proxmox', 'SLURM', 'Cluster Operations', 'Observabilidade', 'Shell Script'],
        },
        {
          title: 'Cloud e DevOps',
          items: ['Docker', 'Kubernetes (base)', 'CI/CD', 'GitHub Actions', 'AWS Fundamentals', 'Google Cloud Fundamentals'],
        },
        {
          title: 'Programacao e Dados',
          items: ['Golang', 'Python', 'TypeScript', 'Node.js', 'PostgreSQL', 'MySQL'],
        },
      ],
    },
    journey: {
      kicker: 'Jornada',
      title: 'Experiencia e projetos em infraestrutura',
      items: [
        {
          title: 'Auxiliar de Infraestrutura e HPC',
          org: 'Infra NCAD | UFPI',
          period: '2025 - Atual',
          bullets: [
            'Configuracao e gerenciamento de ambientes Linux virtualizados com Proxmox.',
            'Gestao de workloads e alocacao de recursos no cluster com SLURM.',
            'Suporte para execucao de aplicacoes de IA em GPUs NVIDIA (L4 e H100).',
            'Monitoramento com Grafana + PostgreSQL e automacao de rotinas administrativas.',
          ],
        },
        {
          title: 'Desenvolvimento de Ferramenta (Iniciacao Tecnologica e Cientifica)',
          org: 'CNPq | UFPI',
          period: '2025 - Atual',
          bullets: [
            'Desenvolvimento de ferramenta de apoio ao diagnostico com redes neurais.',
            'Integracao de processamento, testes e infraestrutura em ambiente Linux.',
          ],
        },
        {
          title: 'TechNE Cluster - Projeto Academico',
          org: 'Ambiente de Cluster para IA e HPC',
          period: '2025 - Atual',
          bullets: [
            'Configuracao experimental de cluster com Proxmox e SLURM.',
            'Simulacao de arquitetura distribuida para execucao de workloads.',
          ],
        },
      ],
    },
    projects: {
      kicker: 'Projetos',
      title: 'Projetos em desenvolvimento e pesquisa aplicada',
      meta: ['HPC + IA', 'Dados Clinicos e Telemetria', 'UX Tecnica + Observabilidade'],
      openImage: 'Abrir imagem',
      dialogLabel: 'Visualizacao ampliada da imagem',
      close: 'Fechar',
      items: [
        {
          title: 'Mamografia BI-RADS AI',
          subtitle: 'Ferramenta de Anotacao Semiautomatica de Achados Radiologicos em Mamografia',
          status: 'Pesquisa ativa',
          stack: ['Python', 'TensorFlow', 'Flask', 'Next.js', 'Tailwind', 'Slurm', 'NVIDIA L4'],
          highlights: [
            'Pipeline de segmentacao com U-Net para suporte a classificacao BI-RADS.',
            'Leitura DICOM com pydicom + preprocessamento com OpenCV.',
            'Fluxo semiautomatico para validacao medica com segunda opiniao em tempo real.',
            'Treinamento em cluster TechNE com GPUs NVIDIA L4 e jobs via Slurm.',
          ],
          footer: 'CNPq · UFPI · NCAD/Cluster TechNE · Orientacao Prof. Andre Castelo Branco Soares',
          linkLabel: 'Repositorio do projeto',
          images: [
            { src: '/mammoAi.png', alt: 'Interface principal do projeto Mamografia BI-RADS AI' },
            { src: '/mammoanot1.png', alt: 'Tela de anotacao semiautomatica em mamografia' },
            { src: '/mammoanot2.png', alt: 'Visualizacao de achados radiologicos com suporte de IA' },
          ],
        },
        {
          title: 'Cluster HPC TECHNE',
          subtitle: 'Documentacao tecnica da arquitetura, operacao e monitoramento do cluster',
          status: 'Infra ativa',
          stack: ['Slurm 23.11', 'Munge', 'PostgreSQL', 'MariaDB', 'Grafana', 'Python', 'CUDA'],
          highlights: [
            'Topologia com no controlador + nos heterogeneos com GPU NVIDIA L4.',
            'Configuracao centralizada do Slurm com particoes de GPU e accounting.',
            'Pipeline customizado de metricas (Python + PostgreSQL) alimentando dashboards Grafana.',
            'Operacao Linux com foco em observabilidade, fila de jobs e uso de recursos.',
          ],
          footer: 'INFRA NCAD/UFPI · Documentacao e evolucao continua da plataforma',
          linkLabel: 'Organizacao NCAD/UFPI',
          images: [
            { src: '/techne.png', alt: 'Capa do Cluster TECHNE - UFPI' },
            { src: '/cluster.jpeg', alt: 'Infraestrutura fisica do cluster TECHNE' },
            { src: '/techne-cluster.png', alt: 'Repositorio do Cluster TECHNE no GitHub' },
          ],
        },
      ],
    },
    contact: {
      kicker: 'Contato',
      title: 'Vamos construir algo robusto juntos',
      links: [
        { label: 'LinkedIn', value: '/in/cieliocas' },
        { label: 'GitHub', value: '@cieliocas' },
        { label: 'Email', value: 'Meu e-mail' },
        { label: 'Telefone', value: '+55 (86) 9 8821-7293' },
      ],
      summary: 'Disponivel para estagio e projetos em infraestrutura, platform engineering, cloud e AI ops.',
      downloadCv: 'Baixar CV',
      whatsappText: 'Ola, Francielio! Vim pelo seu portfolio.',
    },
    footer: {
      note: '2026 Francielio Castro · Code, Deploy, Repeat.',
    },
  },
  en: {
    nav: {
      ariaLabel: 'Quick menu',
      items: [
        { label: 'about', href: '#sobre' },
        { label: 'skills', href: '#skills' },
        { label: 'journey', href: '#jornada' },
        { label: 'projects', href: '#projetos' },
        { label: 'contact', href: '#contato' },
      ],
      settings: 'settings',
      panelTitle: 'Settings',
      theme: 'Theme',
      language: 'Language',
      dark: 'Dark',
      light: 'Light',
      pt: 'PT-BR',
      en: 'English',
      openSettings: 'Open settings',
    },
    hero: {
      badge: 'Computer Science @ UFPI',
      description: 'Infrastructure, Cloud, and HPC focused on reliability, automation, and observability.',
      workflow: 'macOS workflow + terminal-first development',
      highlights: ['HPC Clusters', 'DevOps & Cloud', 'AI Infrastructure + Agents'],
      photoAlt: 'Photo of Francielio Castro',
      locationLabel: 'Base',
      roleLabel: 'Role',
      stackLabel: 'Stack',
      statusLabel: 'Status',
      statusValue: 'Open to work',
      terminalOutput1: 'OS: macOS · Shell: zsh · Focus: HPC/DevOps',
      terminalOutput2: 'Connected to Cluster TECHNE (Slurm + NVIDIA L4)',
    },
    about: {
      kicker: 'About',
      title: 'Infrastructure engineering with a product mindset',
      notesTitle: 'Notes · About me',
      notes: [
        'I am a Computer Science student and researcher working with Linux environments, virtualization, and high performance computing.',
        'I work with cluster setup and operations using Proxmox and SLURM, focused on stability, performance, and efficient resource usage.',
        'My core development language is Golang for infrastructure tooling, containers, CI/CD, and observability with Grafana + PostgreSQL for technical workloads and academic projects.',
      ],
      macBadge: 'macOS-first workflow',
      macText: 'My main environment is macOS, with a terminal-oriented workflow and automation for infrastructure engineering productivity.',
      cards: [
        {
          title: 'Education',
          text: 'Computer Science at UFPI, expected graduation in 2027.',
        },
        {
          title: 'Current role',
          text: 'Infrastructure and HPC Assistant at NCAD/UFPI (2025 - present).',
        },
        {
          title: 'Technical focus',
          text: 'Cluster management, observability, automation, and platform engineering.',
        },
        {
          title: 'Direction',
          text: 'Growth in cloud, DevOps, and AI/ML infrastructure.',
        },
      ],
    },
    skills: {
      kicker: 'Skills',
      title: 'Stack to operate, scale, and automate',
      groups: [
        {
          title: 'Infrastructure and HPC',
          items: ['Linux', 'Proxmox', 'SLURM', 'Cluster Operations', 'Observability', 'Shell Script'],
        },
        {
          title: 'Cloud and DevOps',
          items: ['Docker', 'Kubernetes (base)', 'CI/CD', 'GitHub Actions', 'AWS Fundamentals', 'Google Cloud Fundamentals'],
        },
        {
          title: 'Programming and Data',
          items: ['Golang', 'Python', 'TypeScript', 'Node.js', 'PostgreSQL', 'MySQL'],
        },
      ],
    },
    journey: {
      kicker: 'Journey',
      title: 'Experience and infrastructure projects',
      items: [
        {
          title: 'Infrastructure and HPC Assistant',
          org: 'Infra NCAD | UFPI',
          period: '2025 - Present',
          bullets: [
            'Configuration and management of virtualized Linux environments with Proxmox.',
            'Workload management and cluster resource allocation with SLURM.',
            'Support for AI applications running on NVIDIA GPUs (L4 and H100).',
            'Monitoring with Grafana + PostgreSQL and automation of operational routines.',
          ],
        },
        {
          title: 'Tool Development (Technological and Scientific Initiation)',
          org: 'CNPq | UFPI',
          period: '2025 - Present',
          bullets: [
            'Development of AI-powered diagnostic support tooling.',
            'Integration of processing, testing, and infrastructure in Linux environments.',
          ],
        },
        {
          title: 'TechNE Cluster - Academic Project',
          org: 'Cluster environment for AI and HPC',
          period: '2025 - Present',
          bullets: [
            'Experimental cluster setup with Proxmox and SLURM.',
            'Distributed architecture simulation for workload execution.',
          ],
        },
      ],
    },
    projects: {
      kicker: 'Projects',
      title: 'Projects in development and applied research',
      meta: ['HPC + AI', 'Clinical Data and Telemetry', 'Technical UX + Observability'],
      openImage: 'Open image',
      dialogLabel: 'Expanded image preview',
      close: 'Close',
      items: [
        {
          title: 'Mammography BI-RADS AI',
          subtitle: 'Semi-automatic annotation tool for radiological findings in mammography exams',
          status: 'Active research',
          stack: ['Python', 'TensorFlow', 'Flask', 'Next.js', 'Tailwind', 'Slurm', 'NVIDIA L4'],
          highlights: [
            'U-Net segmentation pipeline to support BI-RADS classification.',
            'DICOM reading with pydicom and preprocessing with OpenCV.',
            'Semi-automatic flow for medical validation with real-time second opinion.',
            'Training on TechNE cluster using NVIDIA L4 GPUs and Slurm jobs.',
          ],
          footer: 'CNPq · UFPI · NCAD/Cluster TechNE · Advisor Prof. Andre Castelo Branco Soares',
          linkLabel: 'Project repository',
          images: [
            { src: '/mammoAi.png', alt: 'Main interface of the Mammography BI-RADS AI project' },
            { src: '/mammoanot1.png', alt: 'Semi-automatic mammography annotation screen' },
            { src: '/mammoanot2.png', alt: 'Radiological findings view with AI support' },
          ],
        },
        {
          title: 'HPC Cluster TECHNE',
          subtitle: 'Technical documentation for cluster architecture, operations, and monitoring',
          status: 'Active infrastructure',
          stack: ['Slurm 23.11', 'Munge', 'PostgreSQL', 'MariaDB', 'Grafana', 'Python', 'CUDA'],
          highlights: [
            'Topology with a control node and heterogeneous compute nodes with NVIDIA L4 GPUs.',
            'Centralized Slurm configuration with GPU partitions and accounting.',
            'Custom metrics pipeline (Python + PostgreSQL) feeding Grafana dashboards.',
            'Linux operations focused on observability, queue status, and resource usage.',
          ],
          footer: 'INFRA NCAD/UFPI · Continuous documentation and platform evolution',
          linkLabel: 'NCAD/UFPI organization',
          images: [
            { src: '/techne.png', alt: 'TECHNE Cluster cover - UFPI' },
            { src: '/cluster.jpeg', alt: 'Physical infrastructure of the TECHNE cluster' },
            { src: '/techne-cluster.png', alt: 'TECHNE Cluster repository on GitHub' },
          ],
        },
      ],
    },
    contact: {
      kicker: 'Contact',
      title: "Let's build something robust together",
      links: [
        { label: 'LinkedIn', value: '/in/cieliocas' },
        { label: 'GitHub', value: '@cieliocas' },
        { label: 'Email', value: 'My email' },
        { label: 'Phone', value: '+55 (86) 9 8821-7293' },
      ],
      summary: 'Available for internships and projects in infrastructure, platform engineering, cloud, and AI ops.',
      downloadCv: 'Download CV',
      whatsappText: 'Hi Francielio! I came from your portfolio.',
    },
    footer: {
      note: '2026 Francielio Castro · Code, Deploy, Repeat.',
    },
  },
} as const
