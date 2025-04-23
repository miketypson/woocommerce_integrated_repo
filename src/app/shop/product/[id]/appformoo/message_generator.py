"""
Message Generator Module for Love Message Sender

This module handles the generation of romantic and reassuring messages using OpenAI's API.
It creates personalized messages based on configuration settings.
"""

import os
import json
import random
from typing import Dict, List, Optional
from datetime import datetime
import openai

class MessageGenerator:
    def __init__(self, config: Dict):
        """
        Initialize the MessageGenerator with configuration settings.
        
        Args:
            config: Dictionary containing configuration settings
        """
        self.openai_api_key = config.get('OPENAI_API_KEY', '')
        self.your_name = config.get('YOUR_NAME', 'Your Name')
        self.girlfriend_name = config.get('GIRLFRIEND_NAME', 'Her Name')
        self.relationship_duration = config.get('RELATIONSHIP_DURATION', '')
        self.history_file = os.path.join(os.path.dirname(config.get('IMAGES_FOLDER', './images')), 'sent_messages.json')
        self.sent_messages = self._load_sent_messages()
        
        # Set OpenAI API key
        if self.openai_api_key and self.openai_api_key != 'your_openai_api_key_here':
            openai.api_key = self.openai_api_key
    
    def _load_sent_messages(self) -> Dict:
        """Load the history of sent messages from JSON file."""
        if os.path.exists(self.history_file):
            try:
                with open(self.history_file, 'r') as f:
                    return json.load(f)
            except json.JSONDecodeError:
                print(f"Error reading {self.history_file}, creating new history")
                return {'messages': []}
        return {'messages': []}
    
    def _save_sent_messages(self) -> None:
        """Save the history of sent messages to JSON file."""
        with open(self.history_file, 'w') as f:
            json.dump(self.sent_messages, f, indent=2)
    
    def generate_message(self) -> str:
        """
        Generate a romantic and reassuring message using OpenAI API.
        
        Returns:
            A personalized love message
        """
        if not self.openai_api_key or self.openai_api_key == 'your_openai_api_key_here':
            return self._get_fallback_message()
        
        try:
            # Create a prompt for the AI
            prompt = f"""
            Generate a heartfelt, romantic message from {self.your_name} to {self.girlfriend_name}.
            The message should express deep love, reassurance, and appreciation.
            It should be personal, warm, and make {self.girlfriend_name} feel special and loved.
            The message should be 3-5 sentences long and suitable to accompany a romantic photo.
            
            Some context about their relationship: They have been together for {self.relationship_duration}.
            
            The message should NOT include any placeholders or variables like [NAME] or similar.
            The message should be ready to send as-is.
            """
            
            # Call OpenAI API
            response = openai.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a romantic message writer helping someone express their love."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=200,
                temperature=0.7
            )
            
            # Extract and clean the message
            message = response.choices[0].message.content.strip()
            
            # Record this message as sent
            self.sent_messages['messages'].append({
                'message': message,
                'sent_date': datetime.now().isoformat()
            })
            self._save_sent_messages()
            
            return message
            
        except Exception as e:
            print(f"Error generating message with OpenAI: {e}")
            return self._get_fallback_message()
    
    def _get_fallback_message(self) -> str:
        """
        Get a fallback message when OpenAI API is not available.
        
        Returns:
            A pre-written love message
        """
        fallback_messages = [
            f"My dearest {self.girlfriend_name}, every day with you feels like a beautiful adventure. Your smile brightens my world in ways I never thought possible. I love you more than words can express.",
            f"{self.girlfriend_name}, you are the most precious person in my life. I cherish every moment we spend together and look forward to creating countless more memories. My love for you grows stronger each day.",
            f"To my amazing {self.girlfriend_name}, you fill my heart with joy and my life with purpose. I'm so grateful to have you by my side through everything. You are truly irreplaceable.",
            f"My love for you, {self.girlfriend_name}, knows no bounds. Your kindness, strength, and beauty inspire me every day. I'm the luckiest person in the world to call you mine.",
            f"Thinking of you, {self.girlfriend_name}, always brings a smile to my face. You are the most wonderful person I know, and I'm endlessly thankful for your love. You mean everything to me."
        ]
        
        # Try to avoid repeating the most recent message
        recent_messages = [item['message'] for item in self.sent_messages['messages'][-5:]] if self.sent_messages['messages'] else []
        available_messages = [msg for msg in fallback_messages if msg not in recent_messages]
        
        # If all recent messages have been used, just pick a random one
        if not available_messages:
            available_messages = fallback_messages
        
        message = random.choice(available_messages)
        
        # Record this message as sent
        self.sent_messages['messages'].append({
            'message': message,
            'sent_date': datetime.now().isoformat()
        })
        self._save_sent_messages()
        
        return message
