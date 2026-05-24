import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { DashboardLayout } from '../components/dashboard';
import Card from '../components/common/Card';

const FlashcardsPage: React.FC = () => {
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const flashcards = [
    { id: '1', question: 'What is Time Complexity?', answer: 'A measure of the amount of time an algorithm takes relative to input size' },
    { id: '2', question: 'What is Big O Notation?', answer: 'A mathematical notation to describe the limiting behavior of functions' },
    { id: '3', question: 'What is Space Complexity?', answer: 'The amount of memory space an algorithm requires as a function of input size' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-navy-800">Flashcards</h1>
          <p className="text-earth-500 mt-2">Master concepts with interactive flashcards</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="aspect-video flex items-center justify-center cursor-pointer p-8" onClick={() => setFlipped(!flipped)}>
            <div className="text-center transform transition-all" style={{ perspective: '1000px' }}>
              <p className="text-sm text-earth-500 mb-4">{flipped ? 'Answer' : 'Question'}</p>
              <p className="text-2xl font-semibold text-navy-800">
                {flipped ? flashcards[currentIndex].answer : flashcards[currentIndex].question}
              </p>
              <p className="text-xs text-earth-400 mt-6">Click to flip</p>
            </div>
          </Card>

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              className="px-6 py-2 rounded-lg border border-earth-200 text-navy-800 hover:bg-earth-100 disabled:opacity-50"
              disabled={currentIndex === 0}
            >
              Previous
            </button>
            <p className="text-earth-500">
              {currentIndex + 1} / {flashcards.length}
            </p>
            <button
              onClick={() => setCurrentIndex(Math.min(flashcards.length - 1, currentIndex + 1))}
              className="px-6 py-2 rounded-lg border border-earth-200 text-navy-800 hover:bg-earth-100 disabled:opacity-50"
              disabled={currentIndex === flashcards.length - 1}
            >
              Next
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-navy-800 mb-6">All Flashcards</h2>
          <div className="grid gap-4">
            {flashcards.map((card) => (
              <Card key={card.id} variant="glass" className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-navy-800">{card.question}</p>
                    <p className="text-sm text-earth-500 mt-2">{card.answer}</p>
                  </div>
                  <button className="p-2 hover:bg-red-50 rounded-lg text-red-600">
                    <Trash2 size={20} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FlashcardsPage;
