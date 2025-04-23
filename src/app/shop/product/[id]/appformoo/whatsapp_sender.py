"""
WhatsApp Integration Module for Love Message Sender

This module handles sending images and messages to WhatsApp using pywhatkit.
"""

import os
import time
from typing import Dict, Optional
import pywhatkit as kit
from datetime import datetime, timedelta

class WhatsAppSender:
    def __init__(self, config: Dict):
        """
        Initialize the WhatsAppSender with configuration settings.
        
        Args:
            config: Dictionary containing configuration settings
        """
        self.country_code = config.get('COUNTRY_CODE', '1')
        self.recipient_phone = config.get('RECIPIENT_PHONE', '')
        self.full_phone_number = f"+{self.country_code}{self.recipient_phone}"
        self.wait_time = 15  # seconds to wait for WhatsApp Web to open
        self.close_tab = True  # whether to close the tab after sending
    
    def send_image_with_message(self, image_path: str, message: str) -> bool:
        """
        Send an image with a message to the recipient via WhatsApp.
        
        Args:
            image_path: Path to the image file
            message: Message text to send with the image
            
        Returns:
            True if successful, False otherwise
        """
        if not os.path.exists(image_path):
            print(f"Error: Image file not found at {image_path}")
            return False
        
        if not self.recipient_phone or self.recipient_phone == '1234567890':
            print("Error: Valid recipient phone number not configured")
            return False
        
        try:
            # Get current time and add 1 minute to allow WhatsApp Web to load
            now = datetime.now()
            send_time = now + timedelta(minutes=1)
            
            print(f"Preparing to send message to {self.full_phone_number}")
            print(f"Message: {message}")
            print(f"Image: {image_path}")
            
            # Send image with message
            kit.sendwhats_image(
                receiver=self.full_phone_number,
                img_path=image_path,
                caption=message,
                wait_time=self.wait_time,
                tab_close=self.close_tab
            )
            
            print(f"Message and image sent successfully at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            return True
            
        except Exception as e:
            print(f"Error sending WhatsApp message: {e}")
            return False
    
    def send_message_only(self, message: str) -> bool:
        """
        Send a message without an image to the recipient via WhatsApp.
        
        Args:
            message: Message text to send
            
        Returns:
            True if successful, False otherwise
        """
        if not self.recipient_phone or self.recipient_phone == '1234567890':
            print("Error: Valid recipient phone number not configured")
            return False
        
        try:
            # Get current time and add 1 minute to allow WhatsApp Web to load
            now = datetime.now()
            send_hour = now.hour
            send_minute = now.minute + 1
            
            # Adjust hour if minute rolls over
            if send_minute >= 60:
                send_hour = (send_hour + 1) % 24
                send_minute = send_minute % 60
            
            print(f"Preparing to send message to {self.full_phone_number}")
            print(f"Message: {message}")
            
            # Send message
            kit.sendwhatmsg(
                phone_no=self.full_phone_number,
                message=message,
                time_hour=send_hour,
                time_min=send_minute,
                wait_time=self.wait_time,
                tab_close=self.close_tab
            )
            
            print(f"Message sent successfully at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            return True
            
        except Exception as e:
            print(f"Error sending WhatsApp message: {e}")
            return False
