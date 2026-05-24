import React, { useState } from 'react';
import { Mic, BarChart3, Play } from 'lucide-react';
import { DashboardLayout } from '../components/dashboard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';

const MockInterviewPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [interviews] = useState([
    {
      id: '1',
      type: 'Technical',
      date: '2 hours ago',
      duration: 45,
      score: 82,
      communicationScore: 85,
      technicalScore: 80,
      confidenceScore: 78,
    },
    {
      id: '2',
      type: 'HR',
      date: '1 day ago',
      duration: 30,
      score: 75,
      communicationScore: 78,
      technicalScore: 72,
      confidenceScore: 75,
    },
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-navy-800">AI Mock Interviews</h1>
            <p className="text-earth-500 mt-2">Practice with AI interviewers and get feedback</p>
          </div>
          <Button className="btn-primary flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
            <Mic size={20} />
            Start Interview
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card variant="glass">
            <div>
              <p className="text-sm text-earth-500">Interviews Completed</p>
              <p className="text-3xl font-bold text-navy-800 mt-1">12</p>
            </div>
          </Card>
          <Card variant="glass">
            <div>
              <p className="text-sm text-earth-500">Average Score</p>
              <p className="text-3xl font-bold text-navy-800 mt-1">79%</p>
            </div>
          </Card>
          <Card variant="glass">
            <div>
              <p className="text-sm text-earth-500">Best Score</p>
              <p className="text-3xl font-bold text-navy-800 mt-1">92%</p>
            </div>
          </Card>
          <Card variant="glass">
            <div>
              <p className="text-sm text-earth-500">Total Practice Time</p>
              <p className="text-3xl font-bold text-navy-800 mt-1">8h 45m</p>
            </div>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-navy-800 mb-6">Interview History</h2>
          <div className="space-y-4">
            {interviews.map((interview) => (
              <Card key={interview.id} variant="glass">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-navy-800">{interview.type} Interview</h3>
                      <p className="text-sm text-earth-500 mt-1">
                        {interview.date} • {interview.duration} minutes
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-brand-500">{interview.score}%</p>
                      <p className="text-sm text-earth-500">Overall Score</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 p-4 bg-white bg-opacity-50 rounded-lg">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-navy-800">{interview.communicationScore}</p>
                      <p className="text-xs text-earth-500 mt-1">Communication</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-navy-800">{interview.technicalScore}</p>
                      <p className="text-xs text-earth-500 mt-1">Technical</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-navy-800">{interview.confidenceScore}</p>
                      <p className="text-xs text-earth-500 mt-1">Confidence</p>
                    </div>
                  </div>

                  <Button variant="secondary" size="sm" className="w-full flex items-center justify-center gap-2">
                    <BarChart3 size={18} />
                    View Detailed Feedback
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Start Mock Interview" size="md">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-navy-800 mb-2">Interview Type</label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-earth-200 rounded-lg cursor-pointer hover:bg-brand-50">
                  <input type="radio" name="type" value="technical" defaultChecked className="w-4 h-4" />
                  <span className="font-medium text-navy-800">Technical Interview</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-earth-200 rounded-lg cursor-pointer hover:bg-brand-50">
                  <input type="radio" name="type" value="hr" className="w-4 h-4" />
                  <span className="font-medium text-navy-800">HR Interview</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-800 mb-2">Duration</label>
              <select className="w-full px-4 py-2 rounded-lg border border-earth-200 focus:border-brand-500 focus:outline-none">
                <option>15 minutes</option>
                <option selected>30 minutes</option>
                <option>45 minutes</option>
                <option>60 minutes</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button className="btn-primary flex-1 flex items-center justify-center gap-2">
                <Play size={18} />
                Start Interview
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default MockInterviewPage;
