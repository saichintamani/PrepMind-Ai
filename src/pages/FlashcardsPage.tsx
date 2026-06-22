import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { DashboardLayout } from '../components/dashboard';
import Card from '../components/common/Card';
import { useStudyStore } from '../store/studyStore';
import { useToastStore } from '../store/toastStore';

const FlashcardsPage: React.FC = () => {
  const { flashcards, removeFlashcard } = useStudyStore();
  const toast = useToastStore();
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (flashcards.length === 0) {
    return (
      <DashboardLayout>
        <Card>
          <p className="text-center py-8 text-earth-500">
            No flashcards. Import the ML reference pack from Notes to populate revision cards.
          </p>
        </Card>
      </DashboardLayout>
    );
  }

  const current = flashcards[currentIndex];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-navy-800 dark:text-earth-100">Flashcards</h1>
          <p className="text-earth-500 dark:text-earth-400 mt-2">
            ML & interview revision cards from your study library
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card
            className="aspect-video flex items-center justify-center cursor-pointer p-8"
            onClick={() => setFlipped(!flipped)}
          >
            <div className="text-center">
              <p className="text-sm text-brand-500 mb-2">{current.topic}</p>
              <p className="text-sm text-earth-500 mb-4">{flipped ? 'Answer' : 'Question'}</p>
              <p className="text-xl font-semibold text-navy-800 dark:text-earth-100">
                {flipped ? current.answer : current.question}
              </p>
              <p className="text-xs text-earth-400 mt-6">Click to flip</p>
            </div>
          </Card>

          <div className="flex items-center justify-between mt-8">
            <button
              type="button"
              onClick={() => {
                setCurrentIndex(Math.max(0, currentIndex - 1));
                setFlipped(false);
              }}
              className="px-6 py-2 rounded-lg border border-earth-200 dark:border-navy-600 text-navy-800 dark:text-earth-100 hover:bg-earth-100 dark:hover:bg-navy-700 disabled:opacity-50"
              disabled={currentIndex === 0}
            >
              Previous
            </button>
            <p className="text-earth-500">
              {currentIndex + 1} / {flashcards.length}
            </p>
            <button
              type="button"
              onClick={() => {
                setCurrentIndex(Math.min(flashcards.length - 1, currentIndex + 1));
                setFlipped(false);
              }}
              className="px-6 py-2 rounded-lg border border-earth-200 dark:border-navy-600 text-navy-800 dark:text-earth-100 hover:bg-earth-100 dark:hover:bg-navy-700 disabled:opacity-50"
              disabled={currentIndex === flashcards.length - 1}
            >
              Next
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-navy-800 dark:text-earth-100 mb-6">All Flashcards</h2>
          <div className="grid gap-4">
            {flashcards.map((card, idx) => (
              <Card key={card.id} variant="glass" className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-brand-500 mb-1">{card.topic}</p>
                    <p className="font-semibold text-navy-800 dark:text-earth-100">{card.question}</p>
                    <p className="text-sm text-earth-500 mt-2 line-clamp-2">{card.answer}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      type="button"
                      className="text-sm text-brand-500 font-semibold"
                      onClick={() => {
                        setCurrentIndex(idx);
                        setFlipped(false);
                      }}
                    >
                      Study
                    </button>
                    <button
                      type="button"
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg text-red-600"
                      onClick={() => {
                        removeFlashcard(card.id);
                        if (currentIndex >= flashcards.length - 1) {
                          setCurrentIndex(Math.max(0, currentIndex - 1));
                        }
                        toast.show('Flashcard removed', 'info');
                      }}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
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
