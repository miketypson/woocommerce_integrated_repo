"""
Image Handler Module for Love Message Sender

This module handles image operations including:
- Loading images from different storage sources (local, Dropbox, Google Drive)
- Selecting images in sequence or randomly
- Tracking which images have been sent
"""

import os
import random
import json
from datetime import datetime
from PIL import Image
from typing import List, Dict, Optional, Tuple

class ImageHandler:
    def __init__(self, config: Dict):
        """
        Initialize the ImageHandler with configuration settings.
        
        Args:
            config: Dictionary containing configuration settings
        """
        self.storage_type = config.get('STORAGE_TYPE', 'local')
        self.images_folder = config.get('IMAGES_FOLDER', './images')
        self.dropbox_token = config.get('DROPBOX_ACCESS_TOKEN', '')
        self.gdrive_folder_id = config.get('GDRIVE_FOLDER_ID', '')
        self.history_file = os.path.join(os.path.dirname(self.images_folder), 'sent_images.json')
        self.sent_images = self._load_sent_images()
    
    def _load_sent_images(self) -> Dict:
        """Load the history of sent images from JSON file."""
        if os.path.exists(self.history_file):
            try:
                with open(self.history_file, 'r') as f:
                    return json.load(f)
            except json.JSONDecodeError:
                print(f"Error reading {self.history_file}, creating new history")
                return {'images': []}
        return {'images': []}
    
    def _save_sent_images(self) -> None:
        """Save the history of sent images to JSON file."""
        with open(self.history_file, 'w') as f:
            json.dump(self.sent_images, f, indent=2)
    
    def get_available_images(self) -> List[str]:
        """
        Get list of available images based on storage type.
        
        Returns:
            List of image paths or identifiers
        """
        if self.storage_type == 'local':
            # For local storage, return list of image files in the folder
            if not os.path.exists(self.images_folder):
                os.makedirs(self.images_folder)
            
            image_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']
            return [
                os.path.join(self.images_folder, f) 
                for f in os.listdir(self.images_folder) 
                if os.path.splitext(f.lower())[1] in image_extensions
            ]
        
        elif self.storage_type == 'dropbox':
            # Placeholder for Dropbox integration
            # Would require dropbox SDK implementation
            print("Dropbox integration not implemented yet")
            return []
        
        elif self.storage_type == 'google_drive':
            # Placeholder for Google Drive integration
            # Would require Google Drive API implementation
            print("Google Drive integration not implemented yet")
            return []
        
        return []
    
    def select_next_image(self) -> Optional[str]:
        """
        Select the next image to send.
        
        Returns:
            Path to the selected image or None if no images available
        """
        available_images = self.get_available_images()
        
        if not available_images:
            print("No images available in the specified location")
            return None
        
        # Get list of images that haven't been sent yet
        sent_image_paths = [item['path'] for item in self.sent_images['images']]
        unsent_images = [img for img in available_images if img not in sent_image_paths]
        
        # If all images have been sent, reset and use all images
        if not unsent_images:
            print("All images have been sent, starting over")
            unsent_images = available_images
        
        # Select a random image from unsent images
        selected_image = random.choice(unsent_images)
        
        # Record this image as sent
        self.sent_images['images'].append({
            'path': selected_image,
            'sent_date': datetime.now().isoformat(),
            'filename': os.path.basename(selected_image)
        })
        self._save_sent_images()
        
        return selected_image
    
    def get_image_dimensions(self, image_path: str) -> Tuple[int, int]:
        """
        Get the dimensions of an image.
        
        Args:
            image_path: Path to the image
            
        Returns:
            Tuple of (width, height)
        """
        try:
            with Image.open(image_path) as img:
                return img.size
        except Exception as e:
            print(f"Error getting image dimensions: {e}")
            return (0, 0)
