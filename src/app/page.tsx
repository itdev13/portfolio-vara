'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // JSON-LD Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Venkata Vara Prasad Jaladanki",
    "alternateName": ["Varaprasad Prasad", "Vara Prasad", "Vara Jaladanki", "Engineer Vara"],
    "jobTitle": "Lead Engineer",
    "description": "Lead Engineer, SEO Expert, and Technical Problem Solver with 5+ years of experience in EdTech, FinTech, and CRM solutions",
    "url": "https://your-domain.com",
    "image": "https://your-domain.com/jvvprasad.jpg",
    "sameAs": [
      "https://linkedin.com/in/2116",
      "https://github.com/Varma2116",
      "https://aroundu.in"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    },
    "email": "jvvprasad123@gmail.com",
    "telephone": "+91-9502803691",
    "worksFor": {
      "@type": "Organization",
      "name": "HighLevel",
      "url": "https://www.linkedin.com/company/highlevel"
    },
    "alumniOf": [
      {
        "@type": "Organization",
        "name": "Vedantu Innovations"
      },
      {
        "@type": "Organization", 
        "name": "NewBazaar Technologies (Shopse)"
      }
    ],
    "founder": {
      "@type": "Organization",
      "name": "AroundU",
      "url": "https://aroundu.in",
      "description": "Social networking mobile application"
    },
    "knowsAbout": [
      "React", "Vue.js", "Node.js", "Python", "JavaScript", "Java",
      "AWS", "GCP", "MongoDB", "Firestore", "ElasticSearch", "Redis",
      "System Design", "SEO Optimization", "Technical Problem Solving",
      "Full Stack Development", "Microservices Architecture"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Lead Engineer",
      "occupationLocation": {
        "@type": "City",
        "name": "Bangalore"
      },
      "skills": [
        "React Development", "Node.js", "Python Programming", "AWS Cloud",
        "System Architecture", "SEO Optimization", "Technical Leadership",
        "Problem Solving", "Full Stack Development"
      ]
    },
    "award": [
      "Multiple Best Employee Awards at Shopse",
      "Outstanding Intern Award at Vedantu - Top 5%",
      "Promoted to Lead Engineer at HighLevel"
    ]
  };

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'founder', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Contact form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', mobile: '', description: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              VP
            </div>
            <div className="hidden md:flex space-x-8">
              {['About', 'Skills', 'Experience', 'Projects', 'Founder', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                    activeSection === item.toLowerCase()
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Profile Image */}
            <div className="mb-8">
              <img 
                src="/jvvprasad.jpg" 
                alt="Varaprasad Prasad" 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto border-4 border-white dark:border-gray-800 shadow-xl object-cover"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Venkata Vara Prasad Jaladanki
              </span>
          </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto">
              Lead Engineer & SEO Expert specializing in system design, scalable architecture, and technical problem solving
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Best freelancer with 5+ years expertise • Technical problem solver • SEO optimization specialist
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                🎓 EdTech
              </span>
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                💳 FinTech
              </span>
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                🏢 CRM Tools
              </span>
              <span className="px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm font-medium">
                🔍 SEO Expert
              </span>
              <span className="px-4 py-2 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full text-sm font-medium">
                💼 Best Freelancer
              </span>
        </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 border cursor-pointer border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Passionate software engineer with expertise in building scalable systems and leading technical teams
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">My Journey</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                With over 5 years of cross-domain experience, I've evolved from a full-stack developer 
                to a lead engineer driving system architecture and mentoring teams across diverse industries.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                My journey spans <strong>EdTech platforms</strong> (enhancing learning experiences for 100K+ students), 
                <strong>FinTech solutions</strong> (processing secure transactions for major banks), and now 
                <strong>CRM tools</strong> (optimizing customer relationship management at scale).
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg text-sm font-medium">
                  System Design
                </span>
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg text-sm font-medium">
                  Team Leadership
                </span>
                <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-lg text-sm font-medium">
                  Mentoring
                </span>
                </div>
                </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">5+</span>
              </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Years Experience</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">In software development</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">50+</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Projects Delivered</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Across different domains</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">10+</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Technologies</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Mastered and applied</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-900/10 dark:via-orange-900/10 dark:to-red-900/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Key Achievements</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Recognition and milestones throughout my career journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Career Progression */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-yellow-100 dark:border-yellow-900/30">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">Career Growth</h3>
              <div className="space-y-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">Lead Engineer</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Promoted at HighLevel</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-orange-600 dark:text-orange-400">5+ Years</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Cross-domain expertise</p>
                </div>
              </div>
            </div>

            {/* Awards & Recognition */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-yellow-100 dark:border-yellow-900/30">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">Awards</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="font-semibold text-yellow-600 dark:text-yellow-400">🥇 Best Employee</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Multiple quarters at Shopse</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-amber-600 dark:text-amber-400">⭐ Outstanding Intern</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Top 5% at Vedantu</p>
                </div>
              </div>
            </div>

            {/* Technical Impact */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-orange-100 dark:border-orange-900/30">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">Technical Impact</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">22%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Performance improvement</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">100K+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Users impacted</p>
                </div>
              </div>
            </div>

            {/* Entrepreneurship */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-purple-100 dark:border-purple-900/30">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">Entrepreneurship</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="font-semibold text-purple-600 dark:text-purple-400">🚀 AroundU Founder</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Social networking startup</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">600+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">App downloads</p>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement Timeline */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Achievement Timeline</h3>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400 via-orange-400 to-red-400 rounded-full"></div>
              
              <div className="space-y-12">
                {/* 2025 */}
                <div className="flex items-center">
                  <div className="flex-1 text-right pr-8">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md border-l-4 border-yellow-400">
                      <h4 className="font-bold text-gray-900 dark:text-white">2025</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Promoted to Lead Engineer at HighLevel</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Leading system architecture and team mentoring</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-yellow-400 rounded-full border-4 border-white dark:border-gray-900 relative z-10"></div>
                  <div className="flex-1 pl-8"></div>
                </div>

                {/* 2024 */}
                <div className="flex items-center">
                  <div className="flex-1 pr-8"></div>
                  <div className="w-4 h-4 bg-indigo-400 rounded-full border-4 border-white dark:border-gray-900 relative z-10"></div>
                  <div className="flex-1 text-left pl-8">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md border-r-4 border-indigo-400">
                      <h4 className="font-bold text-gray-900 dark:text-white">2024</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Founded AroundU startup</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Launched social networking app on iOS & Android</p>
                    </div>
                  </div>
                </div>

                {/* 2022-2024 */}
                <div className="flex items-center">
                  <div className="flex-1 pr-8"></div>
                  <div className="w-4 h-4 bg-orange-400 rounded-full border-4 border-white dark:border-gray-900 relative z-10"></div>
                  <div className="flex-1 text-left pl-8">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md border-r-4 border-orange-400">
                      <h4 className="font-bold text-gray-900 dark:text-white">2022-2024</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Multiple Best Employee Awards at Shopse</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">22% performance improvements delivered</p>
                    </div>
                  </div>
                </div>

                {/* 2019-2022 */}
                <div className="flex items-center">
                  <div className="flex-1 text-right pr-8">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md border-l-4 border-red-400">
                      <h4 className="font-bold text-gray-900 dark:text-white">2019-2022</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Vedantu Career Progression: Intern → SDE-1 → SDE-2</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Outstanding performance & 100K+ students impacted</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-red-400 rounded-full border-4 border-white dark:border-gray-900 relative z-10"></div>
                  <div className="flex-1 pl-8"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Technical Skills</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Technologies and tools I work with
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Programming Languages */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:scale-105">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">PL</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {['Java', 'JavaScript', 'Python', 'Node.js', 'SQL'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Frontend */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:scale-105">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">FE</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Vue.js', 'NextJs', 'Redux', 'Tailwind CSS'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend & Database */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:scale-105">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">BE</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Backend & DB</h3>
              <div className="flex flex-wrap gap-2">
                {['MongoDB', 'Firestore', 'AWS', 'GCP', 'Kafka', 'Redis', 'ElasticSearch'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Domain Expertise */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Domain Expertise</h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">🎓</span>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">EdTech</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Learning Management Systems, Video Streaming, Student Assessment APIs
                </p>
                <div className="text-xs text-blue-600 dark:text-blue-400">
                  <p>• 100K+ Students Impacted</p>
                  <p>• 60% Buffering Reduction</p>
                  <p>• 50K+ Concurrent Users</p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">💳</span>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">FinTech</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Payment Processing, Banking APIs, Fraud Detection, Transaction Security
                </p>
                <div className="text-xs text-green-600 dark:text-green-400">
                  <p>• Bank API Integration</p>
                  <p>• 22% Performance Boost</p>
                  <p>• 2sec Latency Reduction</p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">🏢</span>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">CRM Tools</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Customer Management, Marketing Automation, Lead Generation, Analytics
                </p>
                <div className="text-xs text-purple-600 dark:text-purple-400">
                  <p>• Lead Engineer Role</p>
                  <p>• System Architecture</p>
                  <p>• Team Mentoring</p>
                </div>
              </div>
            </div>
          </div>

          {/* SEO & Freelancing Expertise */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">SEO & Freelancing Expertise</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">🔍</span>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">SEO Optimization Expert</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Technical SEO specialist with expertise in performance optimization, search rankings, and website audits
                </p>
                <div className="text-xs text-orange-600 dark:text-orange-400">
                  <p>• Google Analytics & Search Console</p>
                  <p>• Technical SEO Audits</p>
                  <p>• Performance Optimization</p>
                  <p>• Keyword Research & Strategy</p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all text-center">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">💼</span>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">Best Freelancer & Problem Solver</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Top-rated technical problem solver offering freelance services for complex system design and development
                </p>
                <div className="text-xs text-teal-600 dark:text-teal-400">
                  <p>• Full-Stack Development</p>
                  <p>• System Architecture Design</p>
                  <p>• Performance Troubleshooting</p>
                  <p>• Technical Consulting</p>
                </div>
              </div>
            </div>
          </div>

          {/* Name Keywords for SEO */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Professional Identity</h3>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 text-center">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Also Known As</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {['Varaprasad Prasad', 'Vara Prasad', 'Vara Jaladanki', 'Venkata Vara Prasad', 'Engineer Vara', 'Jaladanki Varaprasad'].map((name) => (
                  <span key={name} className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium shadow-sm border border-gray-200 dark:border-gray-700">
                    {name}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm">
                Lead Engineer • SEO Expert • Technical Problem Solver • Best Freelancer • System Design Specialist
              </p>
            </div>
          </div>

          {/* Languages */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Languages</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">English</h4>
                <p className="text-blue-600 dark:text-blue-400 text-sm">Full Professional Proficiency</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Hindi</h4>
                <p className="text-green-600 dark:text-green-400 text-sm">Professional Working Proficiency</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Telugu</h4>
                <p className="text-purple-600 dark:text-purple-400 text-sm">Full Professional Proficiency</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Professional Experience</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              My journey in software development
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600 hidden md:block"></div>

            <div className="space-y-12">
              {/* HighLevel */}
              <div className="relative flex items-start">
                <div className="absolute left-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-900 hidden md:block"></div>
                <div className="md:ml-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 hover:shadow-lg transition-all hover:scale-[1.02]">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">HighLevel</h3>
                      <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">Lead Engineer</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Remote • CRM & Marketing Automation Platform</p>
                <a 
                  href="https://www.linkedin.com/company/highlevel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  LinkedIn Profile →
                </a>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 lg:mt-0">
                      <p className="font-medium">July 14, 2024 - Present</p>
                      <p>Current Position</p>
                    </div>
              </div>

                  <div className="grid md:grid-cols-2 gap-6">
              <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Responsibilities:</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    Lead system design and architecture
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    Write and review complex, scalable code
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    Mentor junior engineers
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    Solve high-impact technical problems
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    Collaborate across teams for delivery
                  </li>
                </ul>
              </div>
                <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technologies:</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {['React', 'Vue.js', 'Node.js', 'Python', 'TypeScript', 'AWS', 'GCP', 'MongoDB', 'Firestore', 'ElasticSearch', 'Tailwind CSS'].map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Achievement:</h4>
                      <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg p-3">
                        <p className="text-blue-800 dark:text-blue-200 text-sm font-medium">
                          🎉 Promoted from Senior Software Engineer to Lead Engineer
                  </p>
                </div>
                    </div>
                </div>
                </div>
              </div>
              
              {/* Shopse */}
              <div className="relative flex items-start">
                <div className="absolute left-6 w-4 h-4 bg-green-600 rounded-full border-4 border-white dark:border-gray-900 hidden md:block"></div>
                <div className="md:ml-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-8 hover:shadow-lg transition-all hover:scale-[1.02]">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">NewBazaar Technologies (Shopse)</h3>
                      <p className="text-lg text-green-600 dark:text-green-400 font-semibold">SDE-2</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Bangalore, India</p>
                <a 
                  href="https://www.linkedin.com/company/shopse/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                        className="text-green-600 dark:text-green-400 hover:underline text-sm"
                >
                  LinkedIn Profile →
                </a>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 lg:mt-0">
                      <p className="font-medium">November 14, 2022 - July 19, 2024</p>
                      <p>1 year 8 months</p>
                    </div>
              </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Achievements/Tasks:</h4>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">•</span>
                        Collaborated in designing, developing, and maintaining both front-end and back-end services for a cutting-edge fin tech platform facilitating transactions between banks and prominent brands like Blue Star, Apple.
                      </li>
                  <li className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">•</span>
                        Integrated with leading banks (HDFC, IDFC) APIs and financial institutions to enable secure and efficient transaction processing and fund transfers.
                  </li>
                  <li className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">•</span>
                        Implemented caching strategies using Redis and enhanced merchant application performance by 22%.
                  </li>
                  <li className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">•</span>
                        Added a load balancing layer to efficiently improve availability and fault tolerance.
                  </li>
                  <li className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">•</span>
                        Brought down the average transaction time by 2 seconds by reducing latency with optimization at the infrastructure level.
                      </li>
                    </ul>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
              <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Java', 'AWS', 'MongoDB', 'SQL', 'Kafka', 'ElasticSearch', 'Redis', 'JavaScript', 'Node.js', 'React', 'NextJs'].map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Achievement:</h4>
                      <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-3">
                        <p className="text-yellow-800 dark:text-yellow-200 text-sm font-medium">
                          🏆 Got quarterly best employee award multiple times
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

                            {/* Vedantu Career Progression */}
              <div className="relative flex items-start">
                <div className="absolute left-6 w-4 h-4 bg-orange-600 rounded-full border-4 border-white dark:border-gray-900 hidden md:block"></div>
                <div className="md:ml-20 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-8 hover:shadow-lg transition-all hover:scale-[1.02]">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Vedantu Innovations</h3>
                      <p className="text-lg text-orange-600 dark:text-orange-400 font-semibold">Software Development Engineer - II (SDE-2)</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Promoted from Intern → SDE-1 → SDE-2</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Bangalore, India • EdTech Platform</p>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 lg:mt-0">
                      <p className="font-medium">December 2019 - November 2022</p>
                      <p>3 years progression</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Career Progression & Achievements:</h4>
                    
                    {/* Intern Phase */}
                    <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/10 rounded-lg border-l-4 border-orange-400">
                      <h5 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">📚 Intern Phase (Dec 2019 - Dec 2020)</h5>
                      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2 mt-1">•</span>
                          Developed RESTful APIs using Java Spring Boot for backend services
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2 mt-1">•</span>
                          Built responsive React.js components for student dashboard
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-500 mr-2 mt-1">•</span>
                          Outstanding Intern Award - Top 5% performance
                        </li>
                      </ul>
                    </div>

                    {/* SDE-1 Phase */}
                    <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-lg border-l-4 border-amber-400">
                      <h5 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">🚀 SDE-1 Phase (Jan 2021 - Jun 2021)</h5>
                      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2 mt-1">•</span>
                          Led development of student assessment APIs handling 50K+ concurrent users
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2 mt-1">•</span>
                          Implemented real-time video streaming optimization reducing buffering by 60%
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2 mt-1">•</span>
                          Built automated testing framework increasing code coverage to 85%
                        </li>
                      </ul>
                    </div>

                    {/* SDE-2 Phase */}
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border-l-4 border-red-400">
                      <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">⭐ SDE-2 Phase (Jul 2021 - Nov 2022)</h5>
                      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2 mt-1">•</span>
                          Transformed monolithic architecture into 8+ microservices (40% performance boost)
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2 mt-1">•</span>
                          Reduced deployment time from 2 hours to 15 minutes through CI/CD optimization
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2 mt-1">•</span>
                          Mentored 3 junior developers and improved team onboarding by 50%
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2 mt-1">•</span>
                          Enhanced learning experience for 100K+ students with system optimizations
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technologies Mastered:</h4>
                      <div className="flex flex-wrap gap-2">
                        {['AWS', 'Java', 'Spring Boot', 'React', 'Node.js', 'MongoDB', 'Docker', 'Jenkins', 'Microservices'].map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Career Highlights:</h4>
                      <div className="space-y-2">
                        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-3">
                          <p className="text-yellow-800 dark:text-yellow-200 text-sm font-medium">
                            🌟 3-Level Promotion in 3 Years
                          </p>
                          <p className="text-yellow-700 dark:text-yellow-300 text-xs mt-1">
                            Intern → SDE-1 → SDE-2
                          </p>
                        </div>
                        <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3">
                          <p className="text-green-800 dark:text-green-200 text-sm font-medium">
                            🎯 100K+ Students Impacted
                          </p>
                          <p className="text-green-700 dark:text-green-300 text-xs mt-1">
                            Performance optimizations
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Some of the projects I've worked on
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Project 1 - Social Media Platform */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm hover:shadow-xl transition-all hover:scale-[1.02] border border-gray-100 dark:border-gray-800">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">📱</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Social Media Platform</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">Facebook/Instagram-like Application</p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Built a comprehensive social media platform with real-time features including user profiles, news feeds, 
                story sharing, live messaging, and content management system with advanced privacy controls.
              </p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Features:</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    Real-time news feed with infinite scroll and content optimization
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    Stories feature with 24-hour expiry and view analytics
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    Advanced user authentication with OAuth integration
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    Image/video upload with compression and CDN integration
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    Privacy controls and content moderation system
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Vue.js', 'Node.js', 'MongoDB', 'Redis', 'AWS S3', 'Socket.io', 'GCP'].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Impact:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-blue-600 dark:text-blue-400 font-bold">1M+</p>
                    <p className="text-gray-600 dark:text-gray-300">Daily Active Users</p>
                  </div>
                  <div>
                    <p className="text-purple-600 dark:text-purple-400 font-bold">99.9%</p>
                    <p className="text-gray-600 dark:text-gray-300">Uptime Achieved</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2 - Team Chat Application */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm hover:shadow-xl transition-all hover:scale-[1.02] border border-gray-100 dark:border-gray-800">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">💬</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Team Chat Platform</h3>
                  <p className="text-green-600 dark:text-green-400 font-medium">End-to-End Encrypted Communication</p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Developed a secure team collaboration platform with end-to-end encryption, real-time messaging, 
                file sharing, video calls, and advanced team management features for enterprise use.
              </p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Features:</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    End-to-end encryption with AES-256 and RSA key exchange
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    Real-time messaging with typing indicators and read receipts
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    Video/audio calls with screen sharing capabilities
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    File sharing with virus scanning and access controls
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    Channel management with role-based permissions
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    Message search with full-text indexing using ElasticSearch
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {['Node.js', 'Socket.io', 'React', 'MongoDB', 'Redis', 'WebRTC', 'Kafka', 'Docker', 'Kubernetes'].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Performance:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-green-600 dark:text-green-400 font-bold">50ms</p>
                    <p className="text-gray-600 dark:text-gray-300">Message Latency</p>
                  </div>
                  <div>
                    <p className="text-teal-600 dark:text-teal-400 font-bold">10K+</p>
                    <p className="text-gray-600 dark:text-gray-300">Concurrent Users</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 3 - FinTech Platform */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm hover:shadow-xl transition-all hover:scale-[1.02] border border-gray-100 dark:border-gray-800">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">💳</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Enterprise FinTech Platform</h3>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">Banking Integration & Payment Processing</p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Architected a comprehensive financial technology platform enabling secure transactions between banks 
                and major brands, with real-time payment processing and advanced fraud detection.
              </p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Features:</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-1">•</span>
                    Integration with major banks (HDFC, IDFC) APIs
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-1">•</span>
                    Real-time payment processing with fraud detection
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-1">•</span>
                    Load balancing and fault tolerance implementation
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-1">•</span>
                    Advanced caching strategies with Redis
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {['Java', 'Spring Boot', 'MongoDB', 'Redis', 'Kafka', 'AWS', 'Docker'].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Achievements:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-purple-600 dark:text-purple-400 font-bold">22%</p>
                    <p className="text-gray-600 dark:text-gray-300">Performance Boost</p>
                  </div>
                  <div>
                    <p className="text-pink-600 dark:text-pink-400 font-bold">2sec</p>
                    <p className="text-gray-600 dark:text-gray-300">Latency Reduction</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 4 - Microservices Architecture */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm hover:shadow-xl transition-all hover:scale-[1.02] border border-gray-100 dark:border-gray-800">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">🏗️</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Microservices Architecture</h3>
                  <p className="text-orange-600 dark:text-orange-400 font-medium">Scalable System Design & Implementation</p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Led the transformation of monolithic architecture into scalable microservices, implementing 
                containerization, service mesh, and automated deployment pipelines for improved reliability.
              </p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Features:</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2 mt-1">•</span>
                    Decomposed monolith into 15+ independent microservices
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2 mt-1">•</span>
                    Implemented API Gateway with rate limiting and authentication
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2 mt-1">•</span>
                    Service discovery and health monitoring with Consul
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2 mt-1">•</span>
                    CI/CD pipelines with automated testing and deployment
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {['Java', 'Spring Cloud', 'Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Consul'].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Results:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-orange-600 dark:text-orange-400 font-bold">300%</p>
                    <p className="text-gray-600 dark:text-gray-300">Scalability Increase</p>
                  </div>
                  <div>
                    <p className="text-red-600 dark:text-red-400 font-bold">99.9%</p>
                    <p className="text-gray-600 dark:text-gray-300">System Availability</p>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>

      {/* Founder & Entrepreneurship Section */}
      <section id="founder" className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Founder & Entrepreneur</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Building innovative solutions and leading tech ventures
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-3xl">🚀</span>
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AroundU</h3>
                      <p className="text-xl text-indigo-600 dark:text-indigo-400 font-semibold mb-2">Founder & CEO</p>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">NextGen Tech Solutions</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>📍 Bengaluru, Karnataka</span>
                        <span>🌐 aroundu.in</span>
                        <span>📱 iOS & Android</span>
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-0">
                      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg px-4 py-2">
                        <p className="text-indigo-800 dark:text-indigo-200 font-semibold text-sm">Active Startup</p>
                        <p className="text-indigo-600 dark:text-indigo-400 text-xs">2024 - Present</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About AroundU</h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      Founded and developed <strong>AroundU</strong>, a revolutionary social networking mobile application that connects people 
                      with others nearby for various activities. From organizing parties and jamming sessions to finding flatmates 
                      and trekking partners, AroundU bridges the gap between digital connections and real-world experiences.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Features Built:</h4>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2 mt-1">•</span>
                          Location-based social discovery and matching
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2 mt-1">•</span>
                          Real-time activity planning and event organization
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2 mt-1">•</span>
                          Secure user verification and safety features
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2 mt-1">•</span>
                          Cross-platform mobile app (iOS & Android)
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2 mt-1">•</span>
                          Interest-based community building tools
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Entrepreneurial Achievements:</h4>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2 mt-1">•</span>
                          End-to-end product development from concept to launch
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2 mt-1">•</span>
                          Established NextGen Tech Solutions as parent company
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2 mt-1">•</span>
                          Successfully launched on both App Store and Play Store
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2 mt-1">•</span>
                          Built and managed development team
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2 mt-1">•</span>
                          Handled product strategy, tech architecture, and operations
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-lg p-4">
                        <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">600+</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Total Downloads</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-4">
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">2</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Platform Launch</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">iOS & Android</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">100%</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Self-Funded</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Bootstrap Startup</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technology Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {['React Native', 'Node.js', 'MongoDB', 'Firebase', 'AWS', 'Socket.io', 'Redis', 'Express.js', 'JWT Auth'].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href="https://aroundu.in" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium text-center hover:from-indigo-700 hover:to-purple-700 transition-colors"
                    >
                      🌐 Visit Website
                    </a>
                    <a 
                      href="mailto:info@aroundu.in"
                      className="flex-1 border border-indigo-600 text-indigo-600 dark:text-indigo-400 px-6 py-3 rounded-lg font-medium text-center hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                    >
                      📧 Contact AroundU
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Entrepreneurial Vision */}
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Entrepreneurial Vision</h3>
                <p className="text-lg leading-relaxed max-w-3xl mx-auto">
                  "Building technology that brings people together in meaningful ways. AroundU represents my commitment 
                  to creating solutions that solve real-world problems while fostering genuine human connections in our 
                  increasingly digital world."
                </p>
                <div className="mt-6 flex justify-center items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    <span className="font-medium">Product Vision</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">👥</span>
                    <span className="font-medium">Team Leadership</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🚀</span>
                    <span className="font-medium">Innovation Drive</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Let's connect and discuss opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a 
              href="mailto:jvvprasad123@gmail.com"
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:scale-105 text-center group"
            >
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-red-700 transition-colors">
                <span className="text-white font-bold">@</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">jvvprasad123@gmail.com</p>
            </a>

            <a 
              href="tel:9502803691"
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:scale-105 text-center group"
            >
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-700 transition-colors">
                <span className="text-white font-bold">📞</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Phone</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">9502803691</p>
            </a>

            <a 
              href="https://linkedin.com/in/2116"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:scale-105 text-center group"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-700 transition-colors">
                <span className="text-white font-bold">in</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">LinkedIn</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">linkedin.com/in/2116</p>
            </a>

            <a 
              href="https://github.com/Varma2116"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:scale-105 text-center group"
            >
              <div className="w-12 h-12 bg-gray-800 dark:bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-900 dark:group-hover:bg-gray-500 transition-colors">
                <span className="text-white font-bold">GH</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">GitHub</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">github.com/Varma2116</p>
            </a>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-sm max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Location</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">📍 Bangalore, India</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Open to remote opportunities and relocation
              </p>
              </div>
            </div>

          {/* Contact Form */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-xl p-8 lg:p-12">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Send Me a Message</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Have a project in mind? Fill out the form below and I'll get back to you within 24 hours.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray transition-colors"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Mobile Field */}
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray transition-colors"
                    placeholder="Enter your mobile number (optional)"
                  />
                </div>

                {/* Description Field */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={6}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray transition-colors"
                    placeholder="Tell me about your project, requirements, timeline, and any specific technologies you'd like to use..."
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white bg-gray-500 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Message...
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <svg className="w-6 h-6 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-green-800 dark:text-green-200 font-medium">Message Sent Successfully!</span>
                    </div>
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      Thank you for reaching out. I'll get back to you within 24 hours.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <svg className="w-6 h-6 text-red-600 dark:text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-red-800 dark:text-red-200 font-medium">Failed to Send Message</span>
                    </div>
                    <p className="text-red-700 dark:text-red-300 text-sm">
                      Something went wrong. Please try again or contact me directly via email.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
          </div>
        </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Venkata Vara Prasad Jaladanki</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Lead Engineer</p>
            <div className="flex justify-center space-x-6">
              <a href="mailto:jvvprasad123@gmail.com" className="text-gray-400 hover:text-blue-600 transition-colors">
                Email
              </a>
              <a href="https://linkedin.com/in/2116" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                LinkedIn
              </a>
              <a href="https://github.com/Varma2116" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                GitHub
              </a>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © 2024 Venkata Vara Prasad Jaladanki. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
