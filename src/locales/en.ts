import PHPIcon from '~icons/devicon/php'
import LaravelIcon from '~icons/devicon/laravel'
import NestjsIcon from '~icons/devicon/nestjs'
import TSIcon from '~icons/devicon/typescript'
import JSIcon from '~icons/devicon/javascript'
import VueIcon from '~icons/devicon/vuejs'
import NodeIcon from '~icons/devicon/nodejs'
import RabbitMQIcon from '~icons/devicon/rabbitmq'
import ESIcon from '~icons/devicon/elasticsearch'
import NextJSIcon from '~icons/devicon/nextjs'
import RubyIcon from '~icons/devicon/ruby'
import RoRIcon from '~icons/mdi/language-ruby-on-rails'
import PSQLIcon from '~icons/devicon/postgresql'
import MongoDBIcon from '~icons/devicon/mongodb'
import DockerIcon from '~icons/devicon/docker'
import MariaDBIcon from '~icons/devicon/mariadb'
import NgIcon from '~icons/devicon/angularjs'
import ReactIcon from '~icons/devicon/react'
import SentryIcon from '~icons/devicon/sentry'

const en = {
  app: {
    languageLabel: 'Language'
  },
  locales: {
    en: 'English',
    'pt-BR': 'Portuguese (BR)'
  },
  hero: {
    windowTitle: '{name}.exe',
    cta: {
      projects: 'View projects',
      email: 'Send email'
    }
  },
  about: {
    title: 'About me',
    body:
      `Passionate about technology since childhood, I have worked in software development for almost a decade. My experience is primarily concentrated in the JavaScript/TypeScript ecosystem, contributing to the construction, evolution, and modernization of complex systems, always seeking simple, efficient, and maintainable solutions.
      I have a special interest in software architecture, distributed systems, observability, and automation. Beyond professional work, I maintain several personal projects related to audio and streaming, including desktop applications, browser extensions, and bots for communication platforms.`,
    nav: {
      skills: 'Skills',
      projects: 'Projects',
      timeline: 'Timeline',
      contact: 'Contact'
    }
  },
  timeline: {
    title: 'Timeline'
  },
  contact: {
    title: 'Contact',
    pingTitle: 'Talk to me',
    emailLabel: 'Email',
    githubLabel: 'GitHub',
    linkedinLabel: 'LinkedIn'
  },
  profile: {
    name: 'Danilo Gomes',
    role: 'Fullstack Developer',
    location: 'Remote • UTC-3',
    tagline:
      'Turning complex problems into simple solutions through software engineering. Passionate about systems architecture, data flows, real-time streaming, and audio-related projects.',
    email: 'danilo@moshi.moe',
    github: 'https://github.com/udaanilo',
    linkedin: 'https://linkedin.com/in/udaanilo'
  },
  portfolio: {
    badges: [
      {
        title: 'Node.js',
        icon: NodeIcon
      },
      {
        title: 'Typescript',
        icon: TSIcon
      },
      {
        title: 'Vue',
        icon: VueIcon
      },
      {
        title: 'React',
        icon: ReactIcon
      }
    ],
    timeline: [
      {
        title: 'Neocrédito 2023 - Present',
        description: [
          'I led the development team technically, defining architecture, providing technical direction, reviewing code, and supporting the team members professional growth.',
          'I was the main person responsible for the company BaaS platform, ensuring its evolution, stability, and scalability.',
          'I served as maintainer of the proposal management application, performing maintenance, fixes, and continuous evolution of the legacy system developed in AngularJS and PHP.',
          'I led the implementation of the applications observability strategy, including monitoring, distributed tracing, and performance analysis, increasing operational visibility of the systems.',
          'I was responsible for maintaining and evolving CI/CD pipelines, automating integration, testing, and continuous delivery processes.',
          'I conducted the architectural planning and migration of the company main system to a new modern platform, defining technologies, standards, and legacy transition strategies.'
        ],
        stack: [
          {
            icon: LaravelIcon,
            title: 'Laravel'
          },
          {
            icon: PHPIcon,
            title: 'PHP'
          },
          {
            icon: NgIcon,
            title: 'AngularJS'
          },
          {
            icon: NestjsIcon,
            title: 'NestJS'
          },
          {
            icon: TSIcon,
            title: 'TypeScript'
          },
          {
            icon: VueIcon,
            title: 'Vue.js'
          },
          {
            icon: NextJSIcon,
            title: 'Next.js'
          },
          {
            icon: NodeIcon,
            title: 'Node.js'
          },
          {
            icon: MariaDBIcon,
            title: 'MariaDB'
          },
          {
            icon: RabbitMQIcon,
            title: 'RabbitMQ'
          },
          {
            icon: ESIcon,
            title: 'Elasticsearch'
          },
          {
            icon: DockerIcon,
            title: 'Docker'
          }
        ]
      },
      {
        title: 'VIVA10 2021 - 2023',
        description: [
          'I worked on the development of a marketplace platform, contributing to the architecture and evolution of critical business components.',
          'I led the system integration with the payment gateway, designing and implementing the platform financial transaction flows.',
          'I implemented the company CI/CD strategy, reducing manual activities and increasing the reliability of the software delivery process.',
          'I was responsible for the evolution of the Chatwoot-based support platform, developing customizations and integrations aligned with business needs.',
          'I built an integration with the WhatsApp Business API before the project official support, enabling early adoption of the communication channel and adding operational advantage to the company.'
        ],
        stack: [
          {
            icon: RubyIcon,
            title: 'Ruby'
          },
          {
            icon: RoRIcon,
            title: 'Ruby on Rails'
          },
          {
            icon: VueIcon,
            title: 'Vue.js'
          },
          {
            icon: PSQLIcon,
            title: 'PostgreSQL'
          },
          {
            icon: JSIcon,
            title: 'JavaScript'
          },
          {
            icon: NodeIcon,
            title: 'Node.js'
          },
          {
            icon: NextJSIcon,
            title: 'Next.js'
          },
          {
            icon: MongoDBIcon,
            title: 'MongoDB'
          },
          {
            icon: SentryIcon,
            title: 'Sentry'
          },
          {
            icon: DockerIcon,
            title: 'Docker'
          }
        ]
      }
    ]
  },
  aria: {
    mascot: '3D mascot rendered with Three.js'
  }
}

export default en
