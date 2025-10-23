# Certificates Folder

This folder contains certificate images that will be displayed when users click on certification cards in the achievements section.

## File Structure

Add your certificate images here with descriptive names:

- `aws-ml-specialist.jpg` - AWS Machine Learning Specialist certification
- `ibm-internship.jpg` - IBM Edunet Foundation internship certificate
- `sih-participation.jpg` - Smart India Hackathon participation certificate
- `msme-hackathon.jpg` - MSME Hackathon certificate

## Image Guidelines

- **Format**: JPG, PNG, or WebP
- **Size**: Recommended maximum 800x600 pixels
- **Quality**: High resolution for clear display
- **Naming**: Use descriptive, lowercase names with hyphens

## Usage

Certificates are automatically displayed when users click on certification achievement cards. The flip animation will show the certificate image on the back of the card.

To add a new certificate:
1. Upload the image to this folder
2. Update the corresponding achievement in `AchievementsSection.tsx`
3. Add the `certificateImage` property with the path to your image

Example:
```javascript
{
  title: "AWS ML Specialist",
  type: "Certification",
  certificateImage: "/content/certificates/aws-ml-specialist.jpg"
}
```
