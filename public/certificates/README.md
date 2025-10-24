# Certificates Folder

## Instructions for Uploading Certificates

Please upload your certificate files to this folder. The certificates section now supports both **PDF** and **image** formats (PNG, JPG, etc.).

### File Naming Convention

Upload your certificates with the following names (or update the paths in `SkillsSection.tsx` accordingly):

1. **Patent Certificate**
   - File name: `patent-certificate.pdf` (or `.png`, `.jpg`)
   - Currently configured for: Patent Filed - Smart Helmet

2. **Innovation Ambassador Certificate**
   - File name: `innovation-ambassador.pdf` (or `.png`, `.jpg`)
   - Currently configured for: IIC Innovation Ambassador

3. **IBM Internship Certificate**
   - File name: `ibm-internship.pdf` (or `.png`, `.jpg`)
   - Currently configured for: IBM Edunet Foundation Internship

### How to Update Certificate Paths

If you want to use different file names, update the `certificateImage` property in `src/components/SkillsSection.tsx`:

```tsx
const certificates: Certificate[] = [
  {
    title: "Patent Filed - Smart Helmet",
    issuedBy: "Government of India Patent Office",
    year: "2024",
    description: "Emergency alert system, under review",
    icon: "📜",
    certificateImage: "/certificates/your-file-name.pdf" // Change this
  },
  // ... other certificates
];
```

### Supported Formats

- **PDF files**: Will be displayed in an embedded iframe viewer
- **Image files**: PNG, JPG, JPEG - Will be displayed as responsive images

### Features

✅ Auto-scrolling carousel (5 seconds per certificate)  
✅ Pause on hover  
✅ Manual navigation with dots  
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
