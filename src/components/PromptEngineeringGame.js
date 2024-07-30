import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Sparkles } from 'lucide-react';
import { callOpenAI } from '../services/openAIService';

const prompts = [
  {
    level: 1,
    task: 'Ask the AI to write a short story about a dog',
    tips: 'Start with basic elements like character and setting.',
    criteria: [
      'Mentions a dog',
      'Includes a story',
      'Has a clear beginning and end',
    ],
  },
  {
    level: 2,
    task: 'Request a recipe for a vegan chocolate cake',
    tips: 'Include specific details about ingredients and preparation.',
    criteria: [
      'Lists vegan ingredients',
      'Includes preparation steps',
      'Mentions chocolate',
    ],
  },
  // Add more prompts here...
];

const PromptEngineeringGame = () => {
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showTips, setShowTips] = useState(false);
  const [score, setScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [celebration, setCelebration] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await callOpenAI(userInput);
      setAiResponse(response);

      const rating = evaluateAIResponse(
        response,
        prompts[currentPrompt].criteria
      );
      setCurrentScore(rating);
      setScore(score + rating);

      const { feedbackText, celebrationText } = generateFeedback(rating);
      setFeedback(feedbackText);
      setCelebration(celebrationText);
    } catch (error) {
      setFeedback('Error communicating with AI. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const evaluateAIResponse = (response, criteria) => {
    let metCriteria = 0;
    criteria.forEach((criterion) => {
      if (response.toLowerCase().includes(criterion.toLowerCase())) {
        metCriteria++;
      }
    });
    return Math.min(Math.ceil((metCriteria / criteria.length) * 3), 3);
  };

  const generateFeedback = (rating) => {
    let feedbackText = '';
    let celebrationText = '';

    switch (rating) {
      case 1:
        feedbackText =
          "The AI's response didn't fully meet the criteria. Try to be more specific in your prompt.";
        celebrationText = "Keep practicing! You're learning! 🌱";
        break;
      case 2:
        feedbackText =
          "Good job! The AI's response met some of the criteria. Consider how you can make your prompt even clearer.";
        celebrationText = "You're making progress! 🌟";
        break;
      case 3:
        feedbackText =
          'Excellent work! Your prompt led to an AI response that met all the criteria.';
        celebrationText = 'Outstanding prompt engineering! 🎉✨';
        break;
    }

    return { feedbackText, celebrationText };
  };

  const nextPrompt = () => {
    if (currentPrompt < prompts.length - 1) {
      setCurrentPrompt(currentPrompt + 1);
      setUserInput('');
      setFeedback('');
      setShowTips(false);
      setCelebration('');
      setCurrentScore(0);
      setAiResponse('');
    }
  };

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <CardHeader>
        <CardTitle>AI-Interactive Prompt Engineering Game</CardTitle>
        <p>Current Level: {prompts[currentPrompt].level}</p>
        <p>Total Score: {score}</p>
      </CardHeader>
      <CardContent>
        <p className='mb-4'>
          <strong>Task:</strong> {prompts[currentPrompt].task}
        </p>
        <Input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder='Enter your prompt here...'
          className='mb-4'
        />
        <Button onClick={handleSubmit} disabled={isLoading} className='mb-4'>
          {isLoading ? 'Waiting for AI...' : 'Submit Prompt'}
        </Button>
        {aiResponse && (
          <Alert className='mb-4'>
            <AlertTitle>AI Response</AlertTitle>
            <AlertDescription>{aiResponse}</AlertDescription>
          </Alert>
        )}
        {feedback && (
          <Alert className='mb-4'>
            <AlertTitle>Feedback</AlertTitle>
            <AlertDescription>{feedback}</AlertDescription>
          </Alert>
        )}
        {celebration && (
          <Alert className='mb-4'>
            <AlertTitle>
              <Sparkles className='inline mr-2' />
              Celebration
              <Sparkles className='inline ml-2' />
            </AlertTitle>
            <AlertDescription>{celebration}</AlertDescription>
          </Alert>
        )}
        <Button
          onClick={() => setShowTips(!showTips)}
          variant='outline'
          className='mb-4'
        >
          {showTips ? 'Hide Tips' : 'Show Tips'}
        </Button>
        {showTips && (
          <Alert className='mb-4'>
            <AlertTitle>Tips</AlertTitle>
            <AlertDescription>{prompts[currentPrompt].tips}</AlertDescription>
          </Alert>
        )}
        {currentScore > 0 && (
          <div className='mb-4'>
            <p>Prompt Quality:</p>
            <Progress value={currentScore * 33.33} className='w-full' />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={nextPrompt}
          disabled={currentPrompt === prompts.length - 1}
        >
          Next Challenge
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PromptEngineeringGame;
