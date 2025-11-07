import { NextResponse } from 'next/server';

interface Settings {
  siteName: string;
  contactEmail: string;
  phoneNumber: string;
  address: string;
  currency: string;
  taxRate: number;
  shippingFee: number;
  freeShippingThreshold: number;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

// In-memory store for settings (replace with database in production)
let settings: Settings = {
  siteName: 'Lingerie Boutique',
  contactEmail: 'contact@lingerieboutique.com',
  phoneNumber: '+1 (555) 123-4567',
  address: '123 Fashion Street, New York, NY 10001',
  currency: 'USD',
  taxRate: 8.5,
  shippingFee: 5.99,
  freeShippingThreshold: 50,
  socialMedia: {
    facebook: 'https://facebook.com/lingerieboutique',
    instagram: 'https://instagram.com/lingerieboutique',
    twitter: 'https://twitter.com/lingerieboutique'
  }
};

export async function GET() {
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  try {
    const newSettings = await request.json();
    
    // Validate required fields
    if (!newSettings.siteName || !newSettings.contactEmail) {
      return NextResponse.json(
        { error: 'Site name and contact email are required' },
        { status: 400 }
      );
    }

    // Update settings
    settings = {
      ...settings,
      ...newSettings,
      // Ensure socialMedia object is properly updated
      socialMedia: {
        ...settings.socialMedia,
        ...newSettings.socialMedia
      }
    };

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
} 
