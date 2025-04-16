import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom'; // optional, if using React Router

const tools = [
  {
    name: 'JWT Decoder',
    description: 'Decode and view the structure of JSON Web Tokens in a clean UI.',
    link: '/jwt',
  },
  {
    name: 'Complexity Analyzer',
    description: 'Analyze time and space complexity of code snippets.',
    link: '/time-space',
  },
  {
    name: 'Base64 Encoder and Decoder',
    description: 'Encode your base64 string and decode your hashed string.',
    link: '/base64',
  },
  {
    name: 'Python online complier',
    description: 'A Simple python online compiler',
    link: '/python',
  },
  // Add more tools here as needed
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      {/* Header */}
      <motion.header
        className="text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">2LS</h1>
        <p className="text-gray-500 text-lg">A suite of developer utilities – minimal, fast & intuitive.</p>
      </motion.header>

      {/* Tools Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{tool.name}</h2>
              <p className="text-gray-600 text-sm">{tool.description}</p>
            </div>
            <Link
              to={tool.link}
              className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Open Tool <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-400 text-sm">
        Developed by Mohan
      </footer>
    </div>
  );
};

export default Home;
