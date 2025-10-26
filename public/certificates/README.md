# Certificates Folder

## Instructions

Upload your certificate files (PDF, JPG, PNG) to this folder. The certificates are displayed in the Skills section with a 3D circular carousel.

## How to Add Certificates

1. **Upload Files**: Add your certificate PDFs or images to this folder

2. **Update Component**: Edit `src/components/SkillsSection.tsx` and add to the `certificates` array:

```tsx
const certificates: Certificate[] = [
  {
    title: "Your Certificate Name",
    issuedBy: "Issuing Organization",
    year: "2025",
    description: "Brief description",
    icon: "🏆",  // Choose an emoji icon
    certificateImage: `${import.meta.env.BASE_URL}certificates/your-file-name.pdf`
  },
  // ... more certificates
];
```

## Supported Formats

- **PDF files**: Displayed in iframe viewer
- **Image files**: PNG, JPG, JPEG - Displayed as images

## Features

✅ 3D Circular carousel with edge navigation  
✅ Drag, scroll, and keyboard navigation  
✅ Animated arrow buttons  
✅ Responsive design  
✅ Click to view full certificate  

## File Naming

Use descriptive names with hyphens:
- `innovation-ambassador-foundation.pdf`
- `ibm-internship-certificate.pdf`
- `data-science-certification.jpg`

Keep filenames lowercase with hyphens for consistency.

✅ "View Certificate" button  
✅ Full-screen popup modal  
✅ Responsive design  
✅ Smooth animations  
✅ "Issued By" field for each certificate  

### Notes

- Make sure file names match exactly (case-sensitive on some systems)
- All paths are relative to the `public` folder
- Certificates are displayed in a carousel loop
- The carousel pauses for 5 seconds when stopped, then resumes automatically
