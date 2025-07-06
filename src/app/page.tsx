"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const highlightColors = [
  "from-pink-400 to-yellow-300",
  "from-teal-400 to-blue-300",
  "from-purple-400 to-pink-300",
  "from-orange-400 to-red-300",
  "from-green-400 to-teal-300",
];

interface WeightEntry {
  date: string;
  weight: number;
}

export default function Home() {
  const [colorIdx, setColorIdx] = useState(0);
  const [weightData, setWeightData] = useState<WeightEntry[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIdx((idx) => (idx + 1) % highlightColors.length);
    }, 2500);

    fetch('/data/weights.json')
      .then(response => response.json())
      .then(data => setWeightData(data));

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 flex flex-col items-center font-sans">
      <header className="w-full bg-gradient-to-r from-teal-500 to-blue-400 py-12 shadow-lg mb-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white text-center tracking-tight drop-shadow-lg">My Weight Loss Journey</h1>
        <p className="text-xl sm:text-2xl text-white/90 text-center mt-4 font-medium">Vaibhav Yadav</p>
      </header>
      <main className="w-full max-w-5xl flex-1 px-4 flex flex-col gap-10 items-center">
        <section className="w-full flex flex-col md:flex-row gap-8 items-center justify-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-xl w-full border border-gray-100">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">Meet Vaibhav Yadav</h2>
            <p className="text-gray-800 text-lg leading-relaxed">
              On <span className="font-semibold">May 22nd, 2025</span>, I began a life-changing journey weighing <span className="font-semibold">113.2 kg</span>.<br/>
              Through consistency, discipline, and a strong mindset, I&apos;ve brought my weight down to <span className="font-semibold">104.6 kg</span> — a loss of <span className="font-semibold">8.6 kg</span> and a major win in the direction of better health and self-confidence.<br/>
              <br/>
              This is just the beginning, and I&apos;m here to prove that with the right mindset, anything is possible.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <Image 
                  src="/images/before.jpg" 
                  alt="Vaibhav Yadav before weight loss" 
                  width={200} 
                  height={300} 
                  className="rounded-lg shadow-lg mx-auto object-cover w-full h-full"
                />
                <p className="mt-2 font-semibold text-gray-700">Before (113.2 kg)</p>
              </div>
              <div className="text-center">
                <Image 
                  src="/images/after.jpg" 
                  alt="Vaibhav Yadav after weight loss" 
                  width={200} 
                  height={300} 
                  className="rounded-lg shadow-lg mx-auto object-cover w-full h-full"
                />
                <p className="mt-2 font-semibold text-gray-700">After (104.6 kg)</p>
              </div>
            </div>
          </div>
          <div className={`rounded-3xl shadow-xl p-8 w-full max-w-xs text-center text-white font-bold text-xl transition-all duration-700 bg-gradient-to-br ${highlightColors[colorIdx]}`}>
            <span className="block mb-2 text-3xl">🔥</span>
            Stay Consistent, Stay Strong!
          </div>
        </section>
        
        <section className="w-full bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">Weight Progress Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={weightData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[(dataMin: number) => (dataMin - 2), (dataMax: number) => (dataMax + 2)]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="weight" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-6 text-center">
            <p className="text-lg font-semibold text-teal-700">
              Total Weight Lost: <span className="text-green-600">{(weightData.length > 0 ? 113.2 - weightData[weightData.length - 1].weight : 0).toFixed(1)} kg</span>
            </p>
          </div>
        </section>
        
        <section className="w-full bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 text-center">
          <h2 className="text-2xl font-bold text-teal-700 mb-6">Contact & Acknowledgements</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-gray-800">
            <div>
              <h3 className="font-semibold text-lg mb-2">Get in Touch</h3>
              <p>📧 <a href="mailto:yvaibbhav@gmail.com" className="hover:underline">yvaibbhav@gmail.com</a></p>
              <p>📱 7704868375</p>
            </div>
            <div className="border-l border-gray-300 h-16 hidden md:block"></div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Special Thanks</h3>
              <p>A huge thank you to all my amazing coaches for their incredible support on this journey!</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full max-w-5xl text-center text-gray-500 mt-12 mb-4 text-sm">
        © 2025 My Weight Loss Journey
      </footer>
    </div>
  );
}
