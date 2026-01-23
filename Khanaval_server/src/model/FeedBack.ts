import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
  rating: number;
  fullName: string;
  email: string;
  topic: string;
  message: string;
  createdAt: Date;
}

const FeedbackSchema: Schema = new Schema({
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 3 
  },
  fullName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    lowercase: true,
    trim: true 
  },
  topic: { 
    type: String, 
    required: true,
    enum: ['General Feedback', 'Order Issue', 'Provider Inquiry', 'Technical Bug', 'Suggestion']
  },
  message: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const Feedback = mongoose.model<IFeedback>('Feedback', FeedbackSchema);