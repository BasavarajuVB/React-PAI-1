import { 
  ref, 
  push, 
  set, 
  remove, 
  onValue, 
  query, 
  orderByChild, 
  orderByKey, 
  limitToFirst, 
  startAfter,
  get
} from 'firebase/database';
import { database } from './config';

// Sample images data
const sampleImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 1",
    title: "Mountain Landscape",
    tags: ["nature", "mountain", "landscape"]
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 2",
    title: "Forest Path",
    tags: ["nature", "forest", "path"]
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 3",
    title: "Ocean Waves",
    tags: ["nature", "ocean", "waves"]
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 4",
    title: "Tropical Beach",
    tags: ["nature", "beach", "tropical"]
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 5",
    title: "Autumn Forest",
    tags: ["nature", "forest", "autumn"]
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 6",
    title: "Desert Sunset",
    tags: ["nature", "desert", "sunset"]
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 7",
    title: "Waterfall",
    tags: ["nature", "waterfall", "water"]
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 8",
    title: "Snowy Mountains",
    tags: ["nature", "mountain", "snow"]
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1441829266145-b7a0d9b2a4b9?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 9",
    title: "Lake Reflection",
    tags: ["nature", "lake", "reflection"]
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 10",
    title: "Meadow Flowers",
    tags: ["nature", "flowers", "meadow"]
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 11",
    title: "Canyon View",
    tags: ["nature", "canyon", "rock"]
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 12",
    title: "River Valley",
    tags: ["nature", "river", "valley"]
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 13",
    title: "Desert Dunes",
    tags: ["nature", "desert", "dunes"]
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 14",
    title: "Palm Trees",
    tags: ["nature", "palm", "trees"]
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 15",
    title: "Forest Bridge",
    tags: ["nature", "forest", "bridge"]
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 16",
    title: "Mountain Peak",
    tags: ["nature", "mountain", "peak"]
  },
  {
    id: 17,
    src: "https://images.unsplash.com/photo-1441829266145-b7a0d9b2a4b9?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 17",
    title: "Peaceful Lake",
    tags: ["nature", "lake", "peaceful"]
  },
  {
    id: 18,
    src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 18",
    title: "Wildflower Field",
    tags: ["nature", "wildflowers", "field"]
  },
  {
    id: 19,
    src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 19",
    title: "Rock Formation",
    tags: ["nature", "rock", "formation"]
  }
];

// Initialize database with sample data (only once)
let isInitialized = false;

export const initializeDatabase = async () => {
  if (isInitialized) return;
  
  const imagesRef = ref(database, 'images');
  const snapshot = await get(imagesRef);
  
  if (!snapshot.exists() || snapshot.size === 0) {
    console.log('Initializing database with sample images...');
    // Add sample images to database
    for (const image of sampleImages) {
      const newImageRef = push(imagesRef);
      await set(newImageRef, {
        ...image,
        id: newImageRef.key
      });
    }
    console.log('Sample images added successfully');
  }
  
  isInitialized = true;
};

// Get all images
export const getImages = (callback) => {
  const imagesRef = ref(database, 'images');
  return onValue(imagesRef, callback);
};

// Add new image
export const addImage = async (imageData) => {
  try {
    const imagesRef = ref(database, 'images');
    const newImageRef = push(imagesRef);
    await set(newImageRef, {
      ...imageData,
      id: newImageRef.key
    });
    return { success: true, id: newImageRef.key };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Update image
export const updateImage = async (imageId, imageData) => {
  try {
    const imageRef = ref(database, `images/${imageId}`);
    await set(imageRef, { ...imageData, id: imageId });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Delete image
export const deleteImage = async (imageId) => {
  try {
    const imageRef = ref(database, `images/${imageId}`);
    await remove(imageRef);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Search images by title or tags
export const searchImages = (searchTerm, callback) => {
  const imagesRef = ref(database, 'images');
  return onValue(imagesRef, (snapshot) => {
    if (snapshot.exists()) {
      const images = snapshot.val();
      const filteredImages = Object.entries(images).filter(([key, image]) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          image.title.toLowerCase().includes(searchLower) ||
          image.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }).map(([key, image]) => ({ id: key, ...image }));
      
      callback({ val: () => filteredImages });
    } else {
      callback({ val: () => [] });
    }
  });
};

// Get images with pagination
export const getImagesPaginated = (pageSize = 10, lastKey = null, callback) => {
  const imagesRef = ref(database, 'images');
  let queryRef = query(imagesRef, limitToFirst(pageSize));
  
  if (lastKey) {
    queryRef = query(imagesRef, orderByKey(), startAfter(lastKey), limitToFirst(pageSize));
  }
  
  return onValue(queryRef, callback);
};
