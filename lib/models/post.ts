import mongoose from 'mongoose';

// Define the interface for our Post model
export interface IPost {
  _id?: mongoose.Types.ObjectId;
  title: string;
  excerpt: string;
  content: string;
  readTime: string;
  category: 'development' | 'personal';
  image: {
    url: string;
    publicId: string;
  };
  contentImages: Array<{
    url: string;
    publicId: string;
  }>;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  tags: string[];
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  likesCount: number;
}

// Type for lean documents
export type LeanPost = Omit<IPost, '_id'> & { _id: string };

// Create the schema
const postSchema = new mongoose.Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      trim: true,
      maxlength: [500, 'Excerpt cannot be more than 500 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    readTime: {
      type: String,
      required: [true, 'Read time is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['development', 'personal'],
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
    },
    contentImages: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
          required: true,
        },
      },
    ],
    author: {
      name: {
        type: String,
        required: [true, 'Author name is required'],
      },
      avatar: String,
      role: String,
    },
    tags: [{ type: String, trim: true }],
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Add indexes for better performance
postSchema.index({ slug: 1, isPublished: 1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ category: 1 });

// Create or retrieve model
export const Post =
  mongoose.models.Post || mongoose.model<IPost>('Post', postSchema);
