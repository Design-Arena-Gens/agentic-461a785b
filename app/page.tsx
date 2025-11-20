'use client'

import { useState, useEffect } from 'react'

const prompts = [
  {
    id: 1,
    title: 'THE DREAM SUBURB',
    timestamp: '0:00',
    description: 'A cinematic, high-definition 1960s home-movie style shot of a pristine suburban street at golden hour. A bright red vintage station wagon drives slowly down a tree-lined street past manicured green lawns and white picket fences. Children are running on the grass in the background. The lighting is warm and nostalgic with a vibrant retro color palette. 35mm film grain, soft lens flare, slow smooth camera movement following the car, evoking a sense of infinite peace.',
    specs: '--ar 16:9',
    color: 'from-red-600 to-orange-400',
    bgGradient: 'from-red-900/20 to-orange-900/20',
    icon: '🏡'
  },
  {
    id: 2,
    title: 'THE BOOMING METROPOLIS',
    timestamp: '0:15',
    description: 'Low-angle establishing shot looking up at a gleaming, brand-new glass skyscraper in 1960s New York City, reflecting a clear blue sky. The camera slowly tilts down to street level to reveal a bustling, energetic scene of vintage yellow taxis driving fast and businessmen in grey suits walking with purpose. The atmosphere is energetic. Technicolor aesthetic, sharp focus, heavy traffic motion, vintage urban energy.',
    specs: '--ar 16:9',
    color: 'from-blue-600 to-cyan-400',
    bgGradient: 'from-blue-900/20 to-cyan-900/20',
    icon: '🏙️'
  },
  {
    id: 3,
    title: 'THE CONTINUATION',
    timestamp: '0:30',
    description: 'The story continues with more vintage cinematic magic from the 1960s golden age...',
    specs: '--ar 16:9',
    color: 'from-purple-600 to-pink-400',
    bgGradient: 'from-purple-900/20 to-pink-900/20',
    icon: '🎬'
  }
]

export default function Home() {
  const [activePrompt, setActivePrompt] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setActivePrompt((prev) => (prev + 1) % prompts.length)
        setIsVisible(true)
      }, 500)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const currentPrompt = prompts[activePrompt]

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className={`absolute inset-0 bg-gradient-to-br ${currentPrompt.bgGradient} transition-all duration-1000`} />
        <div className="absolute inset-0 grain" />
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 pt-8 pb-4 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent animate-fade-in">
            CINEMATIC 1960s
          </h1>
          <p className="text-gray-400 mt-2 text-lg">A Golden Age Film Experience</p>
        </div>
      </header>

      {/* Main content */}
      <div className="relative z-10 px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Timeline navigation */}
          <div className="flex gap-4 mb-12 justify-center flex-wrap">
            {prompts.map((prompt, index) => (
              <button
                key={prompt.id}
                onClick={() => {
                  setIsVisible(false)
                  setTimeout(() => {
                    setActivePrompt(index)
                    setIsVisible(true)
                  }, 300)
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activePrompt === index
                    ? `bg-gradient-to-r ${prompt.color} text-white shadow-2xl scale-110`
                    : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                }`}
              >
                <span className="mr-2">{prompt.icon}</span>
                {prompt.timestamp}
              </button>
            ))}
          </div>

          {/* Main prompt display */}
          <div
            className={`transition-all duration-500 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
              {/* Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`text-6xl animate-float`}>{currentPrompt.icon}</div>
                <div>
                  <h2 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${currentPrompt.color} bg-clip-text text-transparent`}>
                    {currentPrompt.title}
                  </h2>
                  <p className="text-gray-400 text-xl mt-1">{currentPrompt.timestamp}</p>
                </div>
              </div>

              {/* Description */}
              <div className="bg-black/30 rounded-2xl p-8 mb-6 border border-white/5">
                <p className="text-lg md:text-xl leading-relaxed text-gray-200">
                  {currentPrompt.description}
                </p>
              </div>

              {/* Specs */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="bg-white/10 rounded-full px-6 py-2 border border-white/20">
                  <span className="text-gray-300 font-mono text-sm">{currentPrompt.specs}</span>
                </div>
                <div className="bg-white/10 rounded-full px-6 py-2 border border-white/20">
                  <span className="text-gray-300 font-mono text-sm">35mm Film</span>
                </div>
                <div className="bg-white/10 rounded-full px-6 py-2 border border-white/20">
                  <span className="text-gray-300 font-mono text-sm">Technicolor</span>
                </div>
                <div className="bg-white/10 rounded-full px-6 py-2 border border-white/20">
                  <span className="text-gray-300 font-mono text-sm">HD Cinematic</span>
                </div>
              </div>

              {/* Progress indicator */}
              <div className="mt-8">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${currentPrompt.color} transition-all duration-8000 ease-linear`}
                    style={{
                      width: isVisible ? '100%' : '0%',
                      transition: 'width 8s linear',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scene cards grid */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {prompts.map((prompt, index) => (
              <div
                key={prompt.id}
                onClick={() => {
                  setIsVisible(false)
                  setTimeout(() => {
                    setActivePrompt(index)
                    setIsVisible(true)
                  }, 300)
                }}
                className={`cursor-pointer group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:scale-105 hover:border-white/30 ${
                  activePrompt === index ? 'ring-2 ring-white/50 shadow-2xl' : ''
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${prompt.bgGradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className="text-4xl mb-3">{prompt.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{prompt.title}</h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-3">{prompt.description}</p>
                  <div className="flex items-center gap-2">
                    <span className={`inline-block w-2 h-2 rounded-full bg-gradient-to-r ${prompt.color}`} />
                    <span className="text-xs text-gray-500">{prompt.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-8 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            Experience the golden age of cinema • Technicolor Dreams • 1960s Nostalgia
          </p>
        </div>
      </footer>
    </main>
  )
}
